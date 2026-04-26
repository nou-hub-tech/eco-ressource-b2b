import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';

export interface PDFReportData {
  products: any[];
  scanResult?: any;
  date: Date;
  type: 'inventory' | 'comparison';
}

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {
  
  async generateInventoryReport(products: any[]): Promise<void> {
    const pdf = new jsPDF('p', 'mm', 'a4');
    let yOffset = 20;
    
    // Header
    pdf.setFontSize(20);
    pdf.setTextColor(40, 40, 40);
    pdf.text('Inventory Report', 20, yOffset);
    yOffset += 10;
    
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Generated: ${new Date().toLocaleString()}`, 20, yOffset);
    yOffset += 15;
    
    // Summary metrics
    const withBarcode = products.filter(p => p.product?.barcode).length;
    const expiringSoon = products.filter(p => {
      if (!p.expirationDate) return false;
      const days = Math.round((new Date(p.expirationDate).getTime() - Date.now()) / 86400000);
      return days >= 0 && days < 60;
    }).length;
    
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Total Products: ${products.length}`, 20, yOffset);
    pdf.text(`With Barcode: ${withBarcode}`, 80, yOffset);
    pdf.text(`Expiring Soon: ${expiringSoon}`, 140, yOffset);
    yOffset += 15;
    
    // Products table header
    pdf.setFillColor(240, 240, 240);
    pdf.rect(20, yOffset, 170, 8, 'F');
    pdf.setFontSize(9);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Product', 22, yOffset + 5);
    pdf.text('Barcode', 70, yOffset + 5);
    pdf.text('Qty', 110, yOffset + 5);
    pdf.text('Condition', 125, yOffset + 5);
    pdf.text('Expiration', 150, yOffset + 5);
    yOffset += 10;
    
    // Products data
    for (const p of products) {
      if (yOffset > 270) {
        pdf.addPage();
        yOffset = 20;
      }
      
      const name = p.product.name.substring(0, 20);
      const barcode = p.product.barcode || '—';
      const qty = p.qty;
      const condition = p.condition;
      const expDate = p.expirationDate ? new Date(p.expirationDate).toLocaleDateString() : '—';
      
      pdf.setFontSize(8);
      pdf.text(name, 22, yOffset + 3);
      pdf.text(barcode, 70, yOffset + 3);
      pdf.text(String(qty), 110, yOffset + 3);
      pdf.text(condition, 125, yOffset + 3);
      pdf.text(expDate, 150, yOffset + 3);
      
      yOffset += 6;
    }
    
    pdf.save(`inventory-report-${Date.now()}.pdf`);
  }
  
  async generateComparisonReport(scanResult: any): Promise<void> {
    const pdf = new jsPDF('p', 'mm', 'a4');
    let yOffset = 20;
    
    // Header
    pdf.setFontSize(20);
    pdf.setTextColor(40, 40, 40);
    pdf.text('Inventory Comparison Report', 20, yOffset);
    yOffset += 10;
    
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Generated: ${new Date().toLocaleString()}`, 20, yOffset);
    yOffset += 15;
    
    // Product info
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Product: ${scanResult.product.name}`, 20, yOffset);
    yOffset += 8;
    pdf.setFontSize(10);
    pdf.text(`Category: ${scanResult.product.category}`, 20, yOffset);
    pdf.text(`Barcode: ${scanResult.product.barcode}`, 80, yOffset);
    yOffset += 12;
    
    // Status badge
    const status = scanResult.mismatches === 0 ? '✓ IN SYNC' : `⚠ ${scanResult.mismatches} DISCREPANCY(IES)`;
    pdf.setFillColor(scanResult.mismatches === 0 ? 76 : 244, scanResult.mismatches === 0 ? 175 : 67, scanResult.mismatches === 0 ? 80 : 54);
    pdf.rect(20, yOffset - 5, 50, 8, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.text(status, 22, yOffset);
    pdf.setTextColor(0, 0, 0);
    yOffset += 12;
    
    // Comparison table
    pdf.setFillColor(240, 240, 240);
    pdf.rect(20, yOffset, 170, 8, 'F');
    pdf.setFontSize(9);
    pdf.text('Field', 22, yOffset + 5);
    pdf.text('Digital (DB)', 70, yOffset + 5);
    pdf.text('Real (Scanned)', 120, yOffset + 5);
    pdf.text('Status', 160, yOffset + 5);
    yOffset += 10;
    
    // Rows
    const comparisons = [
      { field: 'Quantity', digital: scanResult.digital?.qty, real: scanResult.real?.qty },
      { field: 'Condition', digital: scanResult.digital?.condition, real: scanResult.real?.condition },
      { field: 'Location', digital: scanResult.digital?.location, real: scanResult.real?.location }
    ];
    
    for (const comp of comparisons) {
      const isMatch = String(comp.digital).toLowerCase() === String(comp.real).toLowerCase();
      
      pdf.setFontSize(9);
      pdf.text(comp.field, 22, yOffset + 3);
      pdf.text(String(comp.digital), 70, yOffset + 3);
      pdf.text(String(comp.real), 120, yOffset + 3);
      
      if (isMatch) {
        pdf.setTextColor(76, 175, 80);
        pdf.text('✓ Match', 160, yOffset + 3);
      } else {
        pdf.setTextColor(244, 67, 54);
        pdf.text('⚠ Mismatch', 160, yOffset + 3);
      }
      pdf.setTextColor(0, 0, 0);
      
      yOffset += 8;
    }
    
    // Expiration info
    if (scanResult.expirationDate) {
      yOffset += 5;
      pdf.setFontSize(10);
      pdf.text(`Expiration Date: ${new Date(scanResult.expirationDate).toLocaleDateString()}`, 20, yOffset);
      yOffset += 8;
    }
    
    // Action needed
    if (scanResult.mismatches > 0) {
      yOffset += 5;
      pdf.setFillColor(255, 243, 224);
      pdf.rect(20, yOffset, 170, 25, 'F');
      pdf.setFontSize(9);
      pdf.setTextColor(0, 0, 0);
      pdf.text('ACTION NEEDED:', 25, yOffset + 5);
      
      if (scanResult.digital?.qty !== scanResult.real?.qty) {
        pdf.text(`• Stock count mismatch: DB says ${scanResult.digital?.qty}, physical is ${scanResult.real?.qty}`, 25, yOffset + 12);
      }
      if (scanResult.digital?.condition !== scanResult.real?.condition) {
        pdf.text(`• Condition changed from "${scanResult.digital?.condition}" to "${scanResult.real?.condition}"`, 25, yOffset + 19);
      }
      if (scanResult.digital?.location !== scanResult.real?.location) {
        pdf.text(`• Location mismatch: DB says "${scanResult.digital?.location}", found at "${scanResult.real?.location}"`, 25, yOffset + 26);
      }
    }
    
    pdf.save(`comparison-report-${scanResult.product.barcode}-${Date.now()}.pdf`);
  }
  
  // FIXED: Properly handle SVG to canvas conversion with correct typing
  private async svgToDataURL(svgElement: SVGSVGElement): Promise<string | null> {
    try {
      // Create a clone of the SVG
      const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement;
      
      // Get SVG dimensions - now using correct type
      const width = svgElement.width?.baseVal?.value || 90;
      const height = svgElement.height?.baseVal?.value || 35;
      
      // Alternative: get from viewBox or attributes
      const finalWidth = width || 90;
      const finalHeight = height || 35;
      
      // Serialize SVG to string
      const serializer = new XMLSerializer();
      let svgString = serializer.serializeToString(clonedSvg);
      
      // Add namespace if missing
      if (!svgString.includes('xmlns="http://www.w3.org/2000/svg"')) {
        svgString = svgString.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
      }
      
      // Convert to data URL
      const svgDataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
      
      // Load into image and draw on canvas
      const img = new Image();
      const canvas = document.createElement('canvas');
      canvas.width = finalWidth;
      canvas.height = finalHeight;
      
      return new Promise((resolve) => {
        img.onload = () => {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, finalWidth, finalHeight);
            resolve(canvas.toDataURL('image/png'));
          } else {
            resolve(null);
          }
        };
        img.onerror = () => {
          console.error('Failed to load SVG image');
          resolve(null);
        };
        img.src = svgDataUrl;
      });
    } catch (error) {
      console.error('SVG to canvas conversion failed:', error);
      return null;
    }
  }
  
  async generateFullReport(products: any[], scanResult?: any): Promise<void> {
    const pdf = new jsPDF('p', 'mm', 'a4');
    let yOffset = 20;
    
    // Title
    pdf.setFontSize(24);
    pdf.setTextColor(33, 33, 33);
    pdf.text('Inventory Management Report', 20, yOffset);
    yOffset += 12;
    
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Generated: ${new Date().toLocaleString()}`, 20, yOffset);
    pdf.text(`Report ID: ${Date.now()}`, 150, yOffset);
    yOffset += 15;
    
    // Divider
    pdf.setDrawColor(200, 200, 200);
    pdf.line(20, yOffset, 190, yOffset);
    yOffset += 10;
    
    // Summary section
    pdf.setFontSize(16);
    pdf.setTextColor(33, 33, 33);
    pdf.text('Executive Summary', 20, yOffset);
    yOffset += 10;
    
    const totalProducts = products.length;
    const totalValue = products.reduce((sum, p) => sum + (p.qty * (p.product.price || 0)), 0);
    const lowStock = products.filter(p => p.qty < 10).length;
    
    pdf.setFontSize(10);
    pdf.text(`• Total Products in Inventory: ${totalProducts}`, 25, yOffset);
    pdf.text(`• Estimated Total Value: $${totalValue.toLocaleString()}`, 25, yOffset + 7);
    pdf.text(`• Low Stock Items (<10 units): ${lowStock}`, 25, yOffset + 14);
    yOffset += 25;
    
    // Products section
    pdf.setFontSize(16);
    pdf.text('Detailed Inventory', 20, yOffset);
    yOffset += 10;
    
    // Generate barcode images for products
    for (let i = 0; i < Math.min(products.length, 20); i++) {
      const p = products[i];
      if (yOffset > 250) {
        pdf.addPage();
        yOffset = 20;
      }
      
      // Create a temporary container for barcode generation
      if (p.product.barcode) {
        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'absolute';
        tempDiv.style.left = '-9999px';
        tempDiv.style.top = '-9999px';
        document.body.appendChild(tempDiv);
        
        // Create SVG element with correct type
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg') as SVGSVGElement;
        svg.setAttribute('width', '90');
        svg.setAttribute('height', '35');
        tempDiv.appendChild(svg);
        
        try {
          // Dynamically import JsBarcode
          const JsBarcodeModule = await import('jsbarcode');
          const JsBarcode = JsBarcodeModule.default;
          
          // Generate barcode in SVG
          JsBarcode(svg, p.product.barcode, {
            format: 'CODE128',
            width: 1.2,
            height: 35,
            displayValue: false,
            margin: 0
          });
          
          // Wait a bit for the barcode to render
          await new Promise(resolve => setTimeout(resolve, 50));
          
          // Convert SVG to data URL using our fixed method
          const imgData = await this.svgToDataURL(svg);
          if (imgData) {
            pdf.addImage(imgData, 'PNG', 140, yOffset - 5, 40, 15);
          } else {
            // Fallback: just show barcode as text
            pdf.setFontSize(6);
            pdf.text(p.product.barcode, 140, yOffset + 5);
          }
        } catch (e) {
          console.error('Barcode generation failed for', p.product.barcode, e);
          // Fallback: show barcode as text
          pdf.setFontSize(6);
          pdf.text(p.product.barcode, 140, yOffset + 5);
        } finally {
          // Clean up temporary DOM element
          document.body.removeChild(tempDiv);
        }
      }
      
      // Product details
      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`${i + 1}. ${p.product.name.substring(0, 40)}`, 20, yOffset);
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Qty: ${p.qty} | Condition: ${p.condition} | Location: ${p.location || '—'}`, 20, yOffset + 5);
      
      if (p.expirationDate) {
        const days = Math.round((new Date(p.expirationDate).getTime() - Date.now()) / 86400000);
        const expColor = days < 0 ? [244, 67, 54] : days < 60 ? [255, 152, 0] : [76, 175, 80];
        pdf.setTextColor(expColor[0], expColor[1], expColor[2]);
        pdf.text(`Expires: ${new Date(p.expirationDate).toLocaleDateString()} (${days < 0 ? 'Expired' : days + 'd left'})`, 20, yOffset + 10);
      }
      
      // Reset text color
      pdf.setTextColor(0, 0, 0);
      yOffset += 20;
    }
    
    if (products.length > 20) {
      pdf.setFontSize(9);
      pdf.setTextColor(150, 150, 150);
      pdf.text(`... and ${products.length - 20} more products`, 20, yOffset);
    }
    
    // Add scan result summary if available
    if (scanResult) {
      pdf.addPage();
      yOffset = 20;
      pdf.setFontSize(16);
      pdf.setTextColor(33, 33, 33);
      pdf.text('Last Scan Comparison', 20, yOffset);
      yOffset += 15;
      
      pdf.setFontSize(10);
      pdf.text(`Product: ${scanResult.product.name}`, 20, yOffset);
      pdf.text(`Barcode: ${scanResult.product.barcode}`, 20, yOffset + 7);
      yOffset += 20;
      
      const status = scanResult.mismatches === 0 ? 'IN SYNC' : `${scanResult.mismatches} DISCREPANCY(IES)`;
      pdf.text(`Status: ${status}`, 20, yOffset);
    }
    
    pdf.save(`full-inventory-report-${Date.now()}.pdf`);
  }
}