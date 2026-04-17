import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { StockMovementService } from '../../../core/services/stock-movement.service';
import { StockMovement } from '../../../core/models/stock-movement.model';

@Component({
  selector: 'app-stock-all-history',
  standalone: false,
  templateUrl: './stock-all-history.html',
  styleUrls: ['./stock-all-history.css']
})
export class StockAllHistoryComponent implements OnInit {
  history: StockMovement[] = [];
  filteredHistory: StockMovement[] = [];
  searchTerm: string = '';
  filterType: string = 'all';
  sharingEmail = false;
  showShareOptions = false;
  shareMethod: 'summary' | 'full' | 'csv' = 'summary';

  constructor(
    private movementService: StockMovementService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    this.movementService.getAllHistory().subscribe({
      next: (data) => { 
        this.history = data; 
        this.filteredHistory = [...data];
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  filterHistory(): void {
    let filtered = [...this.history];
    
    if (this.filterType !== 'all') {
      filtered = filtered.filter(h => h.movementType === this.filterType);
    }
    
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(h => 
        h.stockItem?.product?.name?.toLowerCase().includes(term) ||
        h.description?.toLowerCase().includes(term)
      );
    }
    
    this.filteredHistory = filtered;
  }

  getMovementCount(type: string): number {
    return this.history.filter(h => h.movementType === type).length;
  }

  getMovementIcon(type: string): string {
    switch(type) {
      case 'IN': return '📥';
      case 'OUT': return '📤';
      case 'UPDATE': return '✏️';
      default: return '📋';
    }
  }

  getBadgeClass(type: string): string {
    switch(type) {
      case 'IN': return 'badge-in';
      case 'OUT': return 'badge-out';
      case 'UPDATE': return 'badge-update';
      default: return 'badge-neutral';
    }
  }

  back(): void { 
    this.router.navigate(['/admin/stockitems']); 
  }

  toggleShareOptions(): void {
    this.showShareOptions = !this.showShareOptions;
  }

  // Option 1: Share summary only (fast, small)
  shareSummary(): void {
    const summary = this.generateSummaryText();
    const subject = `Stock Summary - ${new Date().toLocaleDateString()}`;
    this.openEmailClient(subject, summary);
    this.showShareOptions = false;
  }

  // Option 2: Share as CSV attachment (best for large data)
  shareAsCSV(): void {
    const csv = this.generateCSV();
    this.downloadCSV(csv);
    alert('✅ CSV file downloaded! You can now attach it to an email.');
    this.showShareOptions = false;
  }

  // Option 3: Share as HTML (opens in new tab for copying)
  shareAsHTML(): void {
    const html = this.generateHTMLReport();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    setTimeout(() => URL.revokeObjectURL(url), 100);
    alert('📄 Report opened in new tab. Copy and paste into email.');
    this.showShareOptions = false;
  }

  // Generate summary text (lightweight)
  generateSummaryText(): string {
    const date = new Date();
    const totalIn = this.getMovementCount('IN');
    const totalOut = this.getMovementCount('OUT');
    const netChange = totalIn - totalOut;
    
    let text = `STOCK MOVEMENT SUMMARY - ${date.toLocaleDateString()}\n`;
    text += `===========================================\n\n`;
    text += `📊 QUICK OVERVIEW:\n`;
    text += `• Total Movements: ${this.history.length}\n`;
    text += `• Stock Additions (IN): ${totalIn}\n`;
    text += `• Stock Removals (OUT): ${totalOut}\n`;
    text += `• Updates: ${this.getMovementCount('UPDATE')}\n`;
    text += `• Net Change: ${netChange > 0 ? '+' : ''}${netChange}\n\n`;
    
    text += `📈 TOP PRODUCTS (Most Active):\n`;
    const productCount = new Map<string, number>();
    this.history.forEach(h => {
      const name = h.stockItem?.product?.name || 'Unknown';
      productCount.set(name, (productCount.get(name) || 0) + 1);
    });
    const topProducts = Array.from(productCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    topProducts.forEach(([name, count]) => {
      text += `• ${name}: ${count} movements\n`;
    });
    
    text += `\n💡 TIP: For full details, use the "Export CSV" option.\n`;
    text += `===========================================\n`;
    text += `Report generated from Inventory Management System\n`;
    
    return text;
  }

  // Generate CSV for email attachment
  generateCSV(): string {
    const headers = ['Date', 'Product', 'Location', 'Type', 'Quantity', 'Description'];
    const rows = this.filteredHistory.map(h => [
      new Date(h.movementDate).toLocaleString(),
      h.stockItem?.product?.name || 'Unknown',
      h.stockItem?.location || 'N/A',
      h.movementType,
      h.quantity,
      h.description || ''
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    return csvContent;
  }

  // Generate HTML report
  generateHTMLReport(): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Stock Movement Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #333; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th { background: #4CAF50; color: white; padding: 10px; text-align: left; }
          td { padding: 8px; border-bottom: 1px solid #ddd; }
          tr:hover { background: #f5f5f5; }
          .summary { background: #f0f0f0; padding: 15px; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <h1>📊 Stock Movement Report</h1>
        <p>Generated: ${new Date().toLocaleString()}</p>
        
        <div class="summary">
          <strong>Summary:</strong><br>
          Total Movements: ${this.history.length} |
          IN: ${this.getMovementCount('IN')} |
          OUT: ${this.getMovementCount('OUT')} |
          Updates: ${this.getMovementCount('UPDATE')}
        </div>
        
         <table>
          <thead>
            <tr><th>Date</th><th>Product</th><th>Type</th><th>Quantity</th><th>Description</th></tr>
          </thead>
          <tbody>
            ${this.filteredHistory.slice(0, 50).map(h => `
              <tr>
                <td>${new Date(h.movementDate).toLocaleString()}</td>
                <td>${h.stockItem?.product?.name || 'Unknown'}</td>
                <td>${h.movementType}</td>
                <td>${h.movementType === 'IN' ? '+' : h.movementType === 'OUT' ? '-' : ''}${h.quantity}</td>
                <td>${h.description || '—'}</td>
              </tr>
            `).join('')}
          </tbody>
         </table>
         ${this.filteredHistory.length > 50 ? `<p><em>... and ${this.filteredHistory.length - 50} more records</em></p>` : ''}
      </body>
      </html>
    `;
  }

  // Open email client with content
  openEmailClient(subject: string, body: string): void {
    try {
      const encodedSubject = encodeURIComponent(subject);
      const encodedBody = encodeURIComponent(body);
      window.location.href = `mailto:?subject=${encodedSubject}&body=${encodedBody}`;
    } catch (error) {
      console.error('Failed to open email client', error);
      alert('Unable to open email client. Please check your email settings.');
    }
  }

  // Download CSV file
  downloadCSV(csv: string): void {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', `stock_history_${new Date().toISOString().slice(0,19)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Copy to clipboard with progress indicator
  async copyToClipboard(): Promise<void> {
    this.sharingEmail = true;
    try {
      const text = this.generateSummaryText();
      await navigator.clipboard.writeText(text);
      alert('✅ Summary copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('Failed to copy to clipboard.');
    } finally {
      setTimeout(() => { this.sharingEmail = false; }, 500);
    }
  }
}