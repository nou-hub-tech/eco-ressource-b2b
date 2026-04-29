import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../core/services/product';
import { Product } from '../../core/models/product.model';
import { FileUploadService } from '../../core/services/file-upload.service';
import { BrokenProductService } from '../../core/services/broken-product'; // ADD THIS IMPORT
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-chatbot',
  standalone: false,
  templateUrl: './chatbot.html',
  styleUrls: ['./chatbot.css']
})
export class Chatbot implements OnInit {
  @ViewChild('scrollMe') private scrollContainer!: ElementRef;
  @ViewChild('audioInput') audioInput!: ElementRef;
  
  products: Product[] = [];
  messages: { role: string; text: string; cards: Product[]; image?: string }[] = [];
  userInput: string = '';
  loading: boolean = false;
  conversationHistory: { role: string; content: string }[] = [];

  // Voice recognition
  isListening: boolean = false;
  recognition: any = null;
  supportedLanguages: string[] = ['en-US', 'fr-FR', 'es-ES', 'de-DE', 'it-IT'];
  currentLanguage: string = 'en-US';

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private fileUploadService: FileUploadService,
    private brokenProductService: BrokenProductService  // ADD THIS
  ) {
    this.initSpeechRecognition();
  }

  ngOnInit(): void {
    this.messages.push({
      role: 'bot',
      text: 'Hello! 👋 I\'m your AI product assistant. Describe the product you\'re looking for, and I\'ll find the best matches from our catalog. Feel free to ask about materials, recyclability, or specific features! You can also use the microphone to speak or attach images of products!',
      cards: []
    });
    this.productService.getAll().subscribe(data => {
      this.products = data;
      this.cdr.detectChanges();
    });
  }

  // ========== SPEECH RECOGNITION ==========
  initSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = this.currentLanguage;
      this.recognition.maxAlternatives = 1;

      this.recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        this.userInput = transcript;
        this.cdr.detectChanges();
        this.isListening = false;
        setTimeout(() => this.send(), 100);
      };

      this.recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        this.isListening = false;
        this.addBotMessage('⚠️ Sorry, I couldn\'t hear you. Please check your microphone and try again, or type your question.');
        this.cdr.detectChanges();
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.cdr.detectChanges();
      };
    } else {
      console.warn('Speech recognition not supported');
    }
  }

  startListening(): void {
    if (!this.recognition) {
      alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }
    
    this.isListening = true;
    this.recognition.start();
    this.cdr.detectChanges();
  }

  stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
      this.cdr.detectChanges();
    }
  }

  changeLanguage(lang: string): void {
    this.currentLanguage = lang;
    if (this.recognition) {
      this.recognition.lang = lang;
    }
    this.addBotMessage(`🌐 Language changed to ${this.getLanguageName(lang)}. You can now speak in this language.`);
  }

  getLanguageName(lang: string): string {
    const languages: any = {
      'en-US': 'English',
      'fr-FR': 'French',
      'es-ES': 'Spanish',
      'de-DE': 'German',
      'it-IT': 'Italian'
    };
    return languages[lang] || lang;
  }

  // ========== IMAGE UPLOAD & ANALYSIS - REPLACED VERSION ==========
  async onImageSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (!input.files || !input.files[0]) return;

    const file = input.files[0];
    
    // Show preview in chat
    const reader = new FileReader();
    reader.onload = async (e: any) => {
      const imageUrl = e.target.result;
      
      // Add user message with image
      this.messages.push({
        role: 'user',
        text: `📷 Uploaded image: ${file.name}`,
        cards: [],
        image: imageUrl
      });
      this.cdr.detectChanges();
      this.scrollToBottom();

      // Analyze image using your WORKING detection system
      this.loading = true;
      this.cdr.detectChanges();

      try {
        // Use your existing broken product detection (which already handles iPhone/iPod matching!)
        const result = await firstValueFrom(this.brokenProductService.detect(file));
        
        let replyText = '';
        
        if (result.matchFound && result.matchedProduct) {
          // SUCCESS: Product found in database
          replyText = `🔍 **I see what you're looking for!**\n\n` +
                      `The image shows a **${result.detectedLabel}** (${result.detectedConfidence} confidence).\n\n` +
                      `✅ **Match found in our catalog:** **${result.matchedProduct.name}**\n\n` +
                      `📋 **Product Information:**\n` +
                      `• **ID:** ${result.matchedProduct.id_product}\n` +
                      `• **Category:** ${result.matchedProduct.category || 'N/A'}\n` +
                      `• **Material:** ${result.matchedProduct.materialType || 'N/A'}\n` +
                      `• **Recyclable:** ${result.matchedProduct.recyclable ? 'Yes ♻️' : 'No'}\n` +
                      `• **Description:** ${result.matchedProduct.description || 'No description available'}\n\n` +
                      `Would you like to see similar products or need more information about this item?`;
        } else {
          // NO MATCH: Show what was detected
          const topPredictions = result.allPredictions?.slice(0, 3).map((p: any) => 
            `• ${p.label} (${(p.score * 100).toFixed(1)}%)`
          ).join('\n');
          
          replyText = `🔍 **Image Analysis Complete**\n\n` +
                      `I detected: **${result.detectedLabel}** (${result.detectedConfidence})\n\n` +
                      `⚠️ **Not in catalog:** This product isn't available in our database yet.\n\n` +
                      `**Other possibilities detected:**\n${topPredictions}\n\n` +
                      `Could you describe what type of product you're looking for? I can help find similar items!`;
        }
        
        this.messages.push({
          role: 'bot',
          text: replyText,
          cards: this.extractProductsFromText(replyText)
        });
        
      } catch (error) {
        console.error('Image analysis error:', error);
        this.messages.push({
          role: 'bot',
          text: '⚠️ Sorry, I couldn\'t analyze the image. Please describe the product you\'re looking for in text, or try uploading a clearer image.',
          cards: []
        });
      } finally {
        this.loading = false;
        this.cdr.detectChanges();
        this.scrollToBottom();
      }
    };
    reader.readAsDataURL(file);
    input.value = '';
  }

  async analyzeImageForProducts(imageFilename: string): Promise<string> {
    const prompt = `A user has uploaded an image of a product (filename: ${imageFilename}). Based on the image filename and context, what kind of product might this be? Please suggest similar products from our catalog and ask clarifying questions if needed. Be helpful and conversational.`;

    try {
      const response = await fetch('/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inputs: prompt,
          parameters: { max_new_tokens: 200, temperature: 0.3 }
        })
      });

      if (!response.ok) throw new Error('Analysis failed');
      const data = await response.json();
      return data?.choices?.[0]?.message?.content || 'I see you uploaded an image. Could you describe what product you\'re looking for in more detail?';
    } catch (error) {
      console.error('Analysis error:', error);
      return 'I see you uploaded an image. Could you please describe what product you\'re looking for?';
    }
  }


  // ========== HELPER METHODS ==========
  addBotMessage(text: string): void {
    this.messages.push({ role: 'bot', text, cards: [] });
    this.cdr.detectChanges();
    this.scrollToBottom();
  }

  extractProductsFromText(text: string): Product[] {
    const idMatches = text.match(/ID[:\s]+(\d+)/gi);
    let cards: Product[] = [];

    if (idMatches && idMatches.length > 0) {
      const ids = idMatches.map(m => parseInt(m.replace(/ID[:\s]+/i, '')));
      const uniqueIds = [...new Set(ids)];
      cards = uniqueIds
        .map(id => this.products.find(p => p.id_product === id))
        .filter(p => p !== undefined) as Product[];
    }
    return cards;
  }

  goToProducts(): void {
    this.router.navigate(['/admin/products']);
  }

  clearChat(): void {
    if (confirm('Clear the entire conversation?')) {
      this.messages = [{
        role: 'bot',
        text: 'Conversation cleared. How can I help you find products today?',
        cards: []
      }];
      this.conversationHistory = [];
      this.cdr.detectChanges();
      this.scrollToBottom();
    }
  }

  refreshSuggestions(): void {
    this.cdr.detectChanges();
  }

  quickSend(message: string): void {
    this.userInput = message;
    this.send();
  }

  viewProduct(productId: number | undefined): void {
    if (productId) {
      this.router.navigate(['/admin/products/detail', productId]);
    }
  }

  formatMessage(text: string): string {
    let formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/ID:(\d+)/g, '<span class="product-id-highlight">ID:$1</span>')
      .replace(/\n/g, '<br>');
    return formatted;
  }

  truncateText(text: string, maxLength: number): string {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  getCurrentTime(): string {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  autoResize(event: any): void {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  }

  onScroll(): void {}

  scrollToBottom(): void {
    setTimeout(() => {
      if (this.scrollContainer) {
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      }
    }, 100);
  }

  async send(): Promise<void> {
    const text = this.userInput.trim();
    if (!text || this.loading) return;

    this.messages.push({ role: 'user', text, cards: [] });
    this.userInput = '';
    this.loading = true;
    this.conversationHistory.push({ role: 'user', content: text });
    this.cdr.detectChanges();
    this.scrollToBottom();

    const productList = this.products.map(p =>
      `ID:${p.id_product} | Name:${this.clean(p.name)} | Category:${this.clean(p.category)} | Material:${this.clean(p.materialType)} | Recyclable:${p.recyclable} | Description:${this.clean(p.description)}`
    ).join('\n');

    const prompt = `You are a friendly and helpful product finder assistant. Here is the product catalog:\n${productList}\n\nUser request: ${this.clean(text)}\n\nFind the best matching product(s). You MUST include the product ID in your response like this: "ID:X". Give a helpful, conversational explanation. If multiple products match, list them with their IDs. If no product matches, suggest alternatives or ask for more details.`;

    try {
      const response = await fetch('/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 300,
            temperature: 0.3,
            top_p: 0.95
          }
        })
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      const data = await response.json();
      let reply = data?.choices?.[0]?.message?.content || '❌ Could not get a response. Please try again.';

      this.conversationHistory.push({ role: 'assistant', content: reply });
      const cards = this.extractProductsFromText(reply);
      this.messages.push({ role: 'bot', text: reply, cards });

    } catch (e: any) {
      console.error('Error:', e);
      this.messages.push({
        role: 'bot',
        text: '⚠️ Network error. Please check your connection and try again.',
        cards: []
      });
    }

    this.loading = false;
    this.cdr.detectChanges();
    this.scrollToBottom();
  }

  clean(value: string): string {
    if (!value) return '';
    return value
      .replace(/\\/g, '')
      .replace(/"/g, "'")
      .replace(/\n/g, ' ')
      .replace(/\r/g, ' ')
      .replace(/\t/g, ' ')
      .trim();
  }

  onEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }
}