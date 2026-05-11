import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
  cards: any[];
  time: string;
  imagePreview?: string;   // base64 preview shown inside user bubble
}

@Component({
  selector: 'app-market-chatbot',
  standalone: false,
  templateUrl: './market-chatbot.html',
  styleUrls: ['./market-chatbot.css']
})
export class MarketChatbot implements OnInit {

  @ViewChild('scrollMe') private scrollContainer!: ElementRef;
  @ViewChild('imageFileInput') private imageFileInput!: ElementRef;

  messages: ChatMessage[] = [];
  userInput = '';
  loading = false;
  analyzingImage = false;
  conversationHistory: { role: string; content: string }[] = [];

  // Pending image (selected but not sent yet)
  pendingImageFile: File | null = null;
  pendingImagePreview: string | null = null;

  // All market products (from other enterprises)
  marketItems: any[] = [];
  marketLoaded = false;

  // Voice
  isListening = false;
  recognition: any = null;

  private readonly finderApi    = `${environment.apiUrl}/enterprise/finder`;
  private readonly aiApi        = '/ai/chat';
  private readonly classifyApi  = '/ai/classify-image';  // HuggingFace VIT — uses confirmed HF key

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    this.initSpeech();
  }

  ngOnInit(): void {
    this.addBot(
      '👋 Hi! I\'m your **Market Assistant**. Tell me what product or material you\'re looking for — ' +
      'I\'ll search across all enterprises on the platform!\n\n' +
      '📷 You can also **upload a photo** of any product and I\'ll identify it and find matches in our market.',
      []
    );
    this.loadMarket();
  }

  // ── Load all market products ──────────────────────────────
  private loadMarket(): void {
    this.http.get<any[]>(`${this.finderApi}/market`).subscribe({
      next: items => {
        this.marketItems  = items;
        this.marketLoaded = true;
        this.cdr.detectChanges();
      },
      error: () => {
        this.marketLoaded = true;
        this.cdr.detectChanges();
      }
    });
  }

  // ── Image selection ───────────────────────────────────────
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || !input.files[0]) return;

    const file = input.files[0];
    this.pendingImageFile = file;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.pendingImagePreview = e.target.result;
      this.cdr.detectChanges();
      this.scrollToBottom();
    };
    reader.readAsDataURL(file);

    // Reset input so same file can be re-selected
    input.value = '';
  }

  clearPendingImage(): void {
    this.pendingImageFile    = null;
    this.pendingImagePreview = null;
    this.cdr.detectChanges();
  }

  // ── Main send (handles both text-only and image+text) ─────
  async send(): Promise<void> {
    const text      = this.userInput.trim();
    const imageFile = this.pendingImageFile;
    const imagePrev = this.pendingImagePreview;

    if (!text && !imageFile) return;
    if (this.loading) return;

    // Add user message with optional image preview
    this.messages.push({
      role: 'user',
      text: text || (imageFile ? '' : ''),
      cards: [],
      time: this.now(),
      imagePreview: imagePrev || undefined
    });

    this.userInput           = '';
    this.pendingImageFile    = null;
    this.pendingImagePreview = null;
    this.loading             = true;
    this.cdr.detectChanges();
    this.scrollToBottom();

    try {
      let searchQuery = text;

      // ── STEP 1: If image attached, run vision recognition first ──
      if (imageFile) {
        this.analyzingImage = true;
        this.cdr.detectChanges();

        searchQuery = await this.recognizeImageProduct(imageFile, text);

        this.analyzingImage = false;
        this.cdr.detectChanges();
      }

      // ── STEP 2: Run catalog search with the (possibly enriched) query ──
      this.conversationHistory.push({ role: 'user', content: searchQuery });
      const reply = await this.searchWithAI(searchQuery);
      this.conversationHistory.push({ role: 'assistant', content: reply.text });

      this.messages.push({ role: 'bot', text: reply.text, cards: reply.cards, time: this.now() });

    } catch (err) {
      this.analyzingImage = false;
      this.messages.push({
        role: 'bot',
        text: '⚠️ Connection error. Please check your connection and try again.',
        cards: [],
        time: this.now()
      });
    }

    this.loading = false;
    this.cdr.detectChanges();
    this.scrollToBottom();
  }

  // ── Vision: classify image via HuggingFace VIT, map label to search query ──
  private async recognizeImageProduct(file: File, userNote: string): Promise<string> {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const resp = await fetch(this.classifyApi, {
        method: 'POST',
        body: formData
      });

      if (!resp.ok) throw new Error(`Classification API returned ${resp.status}`);
      const data = await resp.json();

      if (data.error) throw new Error(data.error);

      // Extract top labels from HuggingFace VIT response
      const topLabel: string  = data.detectedLabel || '';
      const topLabels: string[] = data.topLabels || [topLabel];
      const confidence: number = data.confidence || 0;

      // VIT returns ImageNet class names like "coffee mug", "water bottle", "laptop" etc.
      // Map them to B2B material/product search terms
      const searchTerms = this.mapLabelsToSearchTerms(topLabels);

      console.log(`[Image] Detected: "${topLabel}" (${(confidence * 100).toFixed(1)}%) → search: "${searchTerms}"`);

      // Show the user what was recognized as a bot hint
      this.messages.push({
        role: 'bot',
        text: `🔍 **Image recognized:** ${topLabel} (${(confidence * 100).toFixed(0)}% confidence)\n\nSearching for similar products in the market…`,
        cards: [],
        time: this.now()
      });
      this.cdr.detectChanges();
      this.scrollToBottom();

      const combined = userNote
        ? `I'm looking for "${searchTerms}". Additional context: ${userNote}`
        : `I'm looking for a product like: ${searchTerms}. Find the closest matching products.`;

      return combined;

    } catch (err) {
      console.warn('Image recognition failed:', err);
      // Graceful fallback — don't crash, just search with user's text
      const fallback = userNote || 'Show me all available products in the catalog.';
      this.messages.push({
        role: 'bot',
        text: `⚠️ Image analysis failed (model may be warming up). Searching with your text instead…`,
        cards: [],
        time: this.now()
      });
      this.cdr.detectChanges();
      return fallback;
    }
  }

  // ── Map ImageNet VIT labels → useful B2B market search terms ──────────────
  private mapLabelsToSearchTerms(labels: string[]): string {
    // Combine all top labels for broader matching
    const joined = labels.join(' ').toLowerCase();

    // Electronics
    if (/iphone|smartphone|phone|mobile|cellular/.test(joined)) return 'smartphone phone electronic mobile device';
    if (/laptop|computer|notebook/.test(joined)) return 'laptop computer electronic device';
    if (/camera|digital camera/.test(joined)) return 'camera electronic optical device';
    if (/television|monitor|screen|display/.test(joined)) return 'screen display electronic';
    if (/keyboard|mouse|remote/.test(joined)) return 'electronic peripheral device';
    if (/headphone|earphone|speaker/.test(joined)) return 'audio electronic device';
    if (/printer|scanner/.test(joined)) return 'electronic office equipment';

    // Metal / industrial
    if (/can|tin|aluminum|aluminium|steel|metal/.test(joined)) return 'metal aluminium scrap';
    if (/wire|cable/.test(joined)) return 'copper wire metal cable';
    if (/pipe|tube/.test(joined)) return 'metal pipe tube industrial';
    if (/wrench|tool|hammer/.test(joined)) return 'metal tool industrial equipment';

    // Plastic / containers
    if (/bottle|plastic bottle|water bottle/.test(joined)) return 'plastic bottle container';
    if (/bag|plastic bag/.test(joined)) return 'plastic bag packaging';
    if (/bucket|container|tub/.test(joined)) return 'plastic container';
    if (/cup|plastic cup/.test(joined)) return 'plastic cup container';

    // Glass / ceramics
    if (/mug|coffee mug|ceramic/.test(joined)) return 'ceramic mug tableware';
    if (/glass bottle|wine glass|drinking glass/.test(joined)) return 'glass bottle container';
    if (/vase|jar/.test(joined)) return 'glass ceramic container';
    if (/plate|bowl|dish/.test(joined)) return 'ceramic tableware dish';

    // Paper / cardboard
    if (/book|paper|notebook|cardboard|box/.test(joined)) return 'paper cardboard packaging';
    if (/envelope|carton/.test(joined)) return 'paper packaging cardboard';

    // Textile / clothing
    if (/shirt|jersey|cloth|fabric|textile|sweater|jacket/.test(joined)) return 'textile fabric clothing';
    if (/sock|shoe|boot/.test(joined)) return 'textile footwear';
    if (/bag|backpack|handbag/.test(joined)) return 'textile bag fabric';

    // Wood
    if (/wood|wooden|furniture|chair|table/.test(joined)) return 'wood furniture timber';
    if (/barrel|cask/.test(joined)) return 'wood barrel container';

    // Food / organic
    if (/fruit|vegetable|food/.test(joined)) return 'organic food material';

    // Default: use the raw top label directly
    return labels[0] || 'product material';
  }

  // ── AI catalog search — filtering done in TypeScript, AI only writes the reply ──
  private async searchWithAI(searchQuery: string): Promise<{ text: string; cards: any[] }> {
    // ── STEP 1: Client-side filtering (100% reliable) ─────────────────────────
    const filtered = this.filterMarketItems(searchQuery);

    if (filtered.length === 0) {
      const kw = this.extractKeyword(searchQuery);
      return {
        text: `❌ No products found matching "${kw || searchQuery}". Try a different material, category, or quantity.`,
        cards: []
      };
    }

    const topResults = filtered.slice(0, 3);

    // ── STEP 2: Ask AI to write a friendly summary only ───────────────────────
    const catalogSnippet = topResults.map(item => {
      const p = item.product;
      return `ID:${p.id_product} | Name:${p.name} | Category:${p.category} | Material:${p.materialType} | Qty:${item.totalQty} | Price:${item.minUnitPrice} DT | Seller:${item.seller?.companyName || '?'}`;
    }).join('\n');

    const prompt = `You are a B2B marketplace assistant. Write a SHORT, friendly summary (max 60 words) of these matching products for the user's request: "${this.clean(searchQuery)}".

Products:
${catalogSnippet}

Rules:
- Mention each product by name, ID, and available quantity.
- Do NOT add any product that is not in the list above.
- If the request was about quantity/units, confirm how many units each product has.
- Format: "Found X matching product(s): [names with IDs and qty]"`;

    try {
      const resp = await fetch(this.aiApi, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inputs: prompt,
          parameters: { max_new_tokens: 150, temperature: 0.2 }
        })
      });
      if (!resp.ok) throw new Error('AI error');
      const data = await resp.json();
      const aiText: string = data?.choices?.[0]?.message?.content?.trim() || '';
      return { text: aiText, cards: topResults };
    } catch {
      // AI failed — show plain summary
      const names = topResults.map(i => `**${i.product.name}**`).join(', ');
      return {
        text: `✅ Found ${topResults.length} matching product(s): ${names}`,
        cards: topResults
      };
    }
  }

  // ── Master filter — parses intent then filters precisely ──────────────────
  private filterMarketItems(query: string): any[] {
    const q = query.toLowerCase().trim();

    // ── 1. RECYCLABLE filter ───────────────────────────────────────────────────
    if (/recyclable|recycl/.test(q)) {
      const results = this.marketItems.filter(item => item.product?.recyclable === true);
      // Also apply material keyword if present
      const kw = this.extractMaterialKeyword(q);
      if (kw) return results.filter(item => this.matchesKeyword(item, kw)).slice(0, 3);
      return results.slice(0, 3);
    }

    // ── 2. QUANTITY filter: "at least 100 units", "more than 50 kg", "50 units" ─
    const comparator = q.match(/(at least|more than|minimum|min|over|above)\s+(\d+)/i);
    const unitQty    = q.match(/(\d+)\s*(unit|kg|ton|pcs|piece|litre|liter|m²|m2)\b/i);
    if (comparator || unitQty) {
      const minQty = parseInt(comparator ? comparator[2] : unitQty![1]);
      let results  = this.marketItems.filter(item => (item.totalQty || 0) >= minQty);
      const kw     = this.extractMaterialKeyword(q);
      if (kw) results = results.filter(item => this.matchesKeyword(item, kw));
      return results.slice(0, 3);
    }

    // ── 3. PRICE filter: "under 100 DT", "less than 50", "cheap", "expensive" ──
    const priceMax = q.match(/(under|less than|below|cheaper than|max)\s+(\d+)/i);
    const priceMin = q.match(/(over|more than|above|expensive|min)\s+(\d+)\s*(dt|dinar|tnd)?/i);
    if (priceMax) {
      const max = parseInt(priceMax[2]);
      return this.marketItems.filter(item => (item.minUnitPrice || 0) <= max).slice(0, 3);
    }
    if (priceMin) {
      const min = parseInt(priceMin[2]);
      return this.marketItems.filter(item => (item.minUnitPrice || 0) >= min).slice(0, 3);
    }

    // ── 4. SELLER / COMPANY filter ─────────────────────────────────────────────
    const sellerMatch = q.match(/(?:from|by|seller|sold by|company)\s+(.+)/i);
    if (sellerMatch) {
      const sellerQuery = sellerMatch[1].trim();
      return this.marketItems.filter(item =>
        (item.seller?.companyName || '').toLowerCase().includes(sellerQuery)
      ).slice(0, 3);
    }

    // ── 5. MATERIAL / CATEGORY keyword ────────────────────────────────────────
    const kw = this.extractMaterialKeyword(q);
    if (kw) {
      return this.marketItems.filter(item => this.matchesKeyword(item, kw)).slice(0, 3);
    }

    // ── 6. PRODUCT NAME search ─────────────────────────────────────────────────
    const words = q.split(/\s+/).filter(w => w.length > 2);
    const byName = this.marketItems.filter(item => {
      const name = (item.product?.name || '').toLowerCase();
      return words.some(w => name.includes(w));
    });
    if (byName.length > 0) return byName.slice(0, 3);

    // ── 7. GENERAL browse — single short query or generic words ───────────────
    const isGeneral = q.split(' ').length <= 2 ||
      /^(show|list|all|any|what|give|display|catalog|products?|items?)\b/.test(q);
    if (isGeneral) return this.marketItems.slice(0, 3);

    // ── 8. Broad fuzzy — search ALL text fields ───────────────────────────────
    const fuzzy = this.marketItems.filter(item => {
      const haystack = [
        item.product?.name, item.product?.category,
        item.product?.materialType, item.product?.description,
        item.seller?.companyName
      ].join(' ').toLowerCase();
      return words.some(w => haystack.includes(w));
    });
    return fuzzy.length > 0 ? fuzzy.slice(0, 3) : this.marketItems.slice(0, 3);
  }

  // ── Check if a market item matches a material/category keyword ─────────────
  private matchesKeyword(item: any, kw: string): boolean {
    const cat = (item.product?.category    || '').toLowerCase();
    const mat = (item.product?.materialType || '').toLowerCase();
    const nam = (item.product?.name         || '').toLowerCase();
    return cat.includes(kw) || mat.includes(kw) || nam.includes(kw);
  }

  // ── Extract material/category keyword from query ───────────────────────────
  private extractKeyword(query: string): string {
    return this.extractMaterialKeyword(query.toLowerCase());
  }

  private extractMaterialKeyword(q: string): string {
    const keywords = [
      'metal', 'plastic', 'glass', 'textile', 'paper', 'wood',
      'ceramic', 'electronic', 'electron', 'alumin', 'copper', 'steel',
      'chemical', 'rubber', 'leather', 'fabric', 'cardboard',
      'iphone', 'phone', 'camera', 'laptop', 'bottle', 'mug',
      'dress', 'satin', 'cotton', 'coton', 'assiette', 'notebook',
      'airpod', 'tableware'
    ];
    for (const kw of keywords) {
      if (q.includes(kw)) return kw;
    }
    return '';
  }

  // ── Quick prompts ──────────────────────────────────────────
  quickSend(msg: string): void { this.userInput = msg; this.send(); }

  // ── Navigate to full product finder ───────────────────────
  viewInFinder(item: any): void {
    this.router.navigate(['/enterprise/product-finder']);
  }

  clearChat(): void {
    if (!confirm('Clear this conversation?')) return;
    this.messages = [];
    this.conversationHistory = [];
    this.pendingImageFile    = null;
    this.pendingImagePreview = null;
    this.addBot('Conversation cleared. What product are you looking for?', []);
    this.cdr.detectChanges();
  }

  // ── Voice ──────────────────────────────────────────────────
  private initSpeech(): void {
    const SR = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SR) return;
    this.recognition = new SR();
    this.recognition.continuous     = false;
    this.recognition.interimResults  = false;
    this.recognition.lang            = 'en-US';
    this.recognition.onresult = (e: any) => {
      this.userInput   = e.results[0][0].transcript;
      this.isListening = false;
      this.cdr.detectChanges();
      setTimeout(() => this.send(), 100);
    };
    this.recognition.onerror = () => { this.isListening = false; this.cdr.detectChanges(); };
    this.recognition.onend   = () => { this.isListening = false; this.cdr.detectChanges(); };
  }

  toggleVoice(): void {
    if (!this.recognition) { alert('Speech recognition not supported in this browser.'); return; }
    if (this.isListening) { this.recognition.stop(); }
    else { this.isListening = true; this.recognition.start(); }
    this.cdr.detectChanges();
  }

  // ── Helpers ───────────────────────────────────────────────
  private addBot(text: string, cards: any[]): void {
    this.messages.push({ role: 'bot', text, cards, time: this.now() });
    this.cdr.detectChanges();
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.scrollContainer)
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }, 80);
  }

  private now(): string {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  private clean(v: string | undefined): string {
    if (!v) return '';
    return v.replace(/\\/g, '').replace(/"/g, "'").replace(/\n/g, ' ').trim();
  }

  formatText(text: string): string {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/ID:(\d+)/g, '<span class="id-tag">ID:$1</span>')
      .replace(/\n/g, '<br>');
  }

  onEnter(e: KeyboardEvent): void {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.send(); }
  }

  autoResize(e: any): void {
    const t = e.target;
    t.style.height = 'auto';
    t.style.height = Math.min(t.scrollHeight, 120) + 'px';
  }

  getImageUrl(img: string | undefined): string {
    if (!img || img === 'default.png' || img === 'undefined') return '';
    if (img.startsWith('http')) return img;
    return `/files/${img}`;
  }

  getCategoryColor(cat: string): string {
    const m: Record<string, string> = {
      Metal: '#3b82f6', Plastic: '#10b981', Paper: '#f59e0b',
      Glass: '#8b5cf6', Textile: '#ec4899', Electronics: '#06b6d4',
      Wood: '#78350f', Chemical: '#ef4444'
    };
    return m[cat] || '#6b7280';
  }

  goBack(): void { this.router.navigate(['/enterprise/product-finder']); }
}
