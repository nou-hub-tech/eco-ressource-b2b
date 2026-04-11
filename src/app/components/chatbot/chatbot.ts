import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../../core/services/product';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-chatbot',
  standalone: false,
  templateUrl: './chatbot.html',
  styleUrls: ['./chatbot.css']
})
export class Chatbot implements OnInit {
  products: Product[] = [];
  messages: { role: string; text: string; cards: Product[] }[] = [];
  userInput: string = '';
  loading: boolean = false;
  conversationHistory: { role: string; content: string }[] = [];

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.messages.push({
      role: 'bot',
      text: 'Hello! Describe the product you are looking for and I will find the best match from our catalog.',
      cards: []
    });
    this.productService.getAll().subscribe(data => {
      this.products = data;
      this.cdr.detectChanges();
    });
  }

  async send(): Promise<void> {
    const text = this.userInput.trim();
    if (!text || this.loading) return;

    this.messages.push({ role: 'user', text, cards: [] });
    this.userInput = '';
    this.loading = true;
    this.conversationHistory.push({ role: 'user', content: text });
    this.cdr.detectChanges();

    const productList = this.products.map(p =>
      `ID:${p.id_product} | Name:${this.clean(p.name)} | Category:${this.clean(p.category)} | Material:${this.clean(p.materialType)} | Recyclable:${p.recyclable} | Description:${this.clean(p.description)}`
    ).join('\n');

    const prompt = `You are a product finder. Here is the product catalog:\n${productList}\n\nUser request: ${this.clean(text)}\n\nFind the best matching product. You MUST include the product ID in your response like this: "ID:X". Give a short explanation. If no product matches, say so.`;

    try {
      const response = await fetch('http://localhost:8080/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 200,
            temperature: 0.3
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error:', errorText);
        this.messages.push({ role: 'bot', text: 'Server error: ' + errorText, cards: [] });
        this.loading = false;
        this.cdr.detectChanges();
        return;
      }

      const data = await response.json();
      console.log('HF response:', data);

      let reply = '';
      if (data?.choices && data.choices[0]?.message?.content) {
        reply = data.choices[0].message.content.trim();
      } else if (data?.error) {
        reply = 'Model is loading, please wait 30 seconds and try again.';
      } else {
        reply = 'Could not get a response. Please try again.';
      }

      this.conversationHistory.push({ role: 'assistant', content: reply });

      // extract IDs mentioned in the reply like ID:1 or ID:2
      const idMatches = reply.match(/ID[:\s]+(\d+)/gi);
      let cards: Product[] = [];

      if (idMatches && idMatches.length > 0) {
        const ids = idMatches.map(m => parseInt(m.replace(/ID[:\s]+/i, '')));
        const uniqueIds = [...new Set(ids)];
        cards = uniqueIds
          .map(id => this.products.find(p => p.id_product === id))
          .filter(p => p !== undefined) as Product[];
      }

      this.messages.push({ role: 'bot', text: reply, cards });

    } catch (e: any) {
      console.error('Error:', e);
      this.messages.push({
        role: 'bot',
        text: 'Error: ' + e.message,
        cards: []
      });
    }

    this.loading = false;
    this.cdr.detectChanges();
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