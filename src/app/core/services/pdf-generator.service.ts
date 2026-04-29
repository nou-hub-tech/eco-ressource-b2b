import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as QRCode from 'qrcode';
import { Shipment } from '../models/shipment';
import { DeliveryOrder } from '../models/delivery-order';
import { StatutExpedition } from '../models/statut';
import { StatutCommande } from '../models/statut';
import { QrCodeService } from './qr-code.service';

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

  constructor(private qrCodeService: QrCodeService) {}

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
  // ========== MÉTHODES POUR LES EXPÉDITIONS ==========
    
    generateShipmentPDF(shipment: Shipment, deliveryOrder: DeliveryOrder | null): void {
        const doc = new jsPDF();
        
        // En-tête avec logo texte
        doc.setFontSize(22);
        doc.setTextColor(33, 37, 41);
        doc.text('DETAILS DE L\'EXPEDITION', 14, 20);
        
        doc.setFontSize(9);
        doc.setTextColor(108, 117, 125);
        doc.text(`Document genere le : ${new Date().toLocaleString('fr-FR')}`, 14, 30);
        
        // Ligne de séparation
        doc.setDrawColor(200, 200, 200);
        doc.line(14, 35, 196, 35);
        
        // ========== SECTION 1 : INFORMATIONS GENERALES ==========
        doc.setFontSize(13);
        doc.setTextColor(52, 152, 219);
        doc.text('INFORMATIONS GENERALES', 14, 48);
        
        const generalInfo = [
            ['ID Expedition', `#${shipment.id.toString()}`],
            ['Date de depart', new Date(shipment.dateDepart).toLocaleString('fr-FR')],
            ['Statut', this.getShipmentStatusText(shipment.statut)],
            ['Quantite', `${shipment.quantite} unite(s)`],
            ['ID Transporteur', shipment.idTransporter.toString()],
        ];
        
        autoTable(doc, {
            startY: 52,
            head: [['CHAMP', 'VALEUR']],
            body: generalInfo,
            theme: 'striped',
            headStyles: { 
                fillColor: [52, 152, 219], 
                textColor: 255, 
                fontSize: 10,
                fontStyle: 'bold'
            },
            bodyStyles: { fontSize: 9 },
            columnStyles: {
                0: { cellWidth: 60, fontStyle: 'bold' },
                1: { cellWidth: 120 }
            },
            margin: { left: 14 },
            alternateRowStyles: { fillColor: [248, 249, 250] }
        });
        
        let currentY = (doc as any).lastAutoTable.finalY + 10;
        
        // ========== SECTION 2 : INFORMATIONS COMMANDE CLIENT ==========
        if (deliveryOrder) {
            doc.setFontSize(13);
            doc.setTextColor(46, 204, 113);
            doc.text('INFORMATIONS COMMANDE CLIENT', 14, currentY);
            
            const orderInfo = [
                ['ID Commande', `#${deliveryOrder.idDelivery.toString()}`],
                ['Nom du client', deliveryOrder.nomClient || 'Non specifie'],
                ['Telephone', deliveryOrder.telephoneClient || 'Non specifie'],
                ['Adresse de livraison', deliveryOrder.adresseLivraison || 'Non specifiee']
            ];
            
            autoTable(doc, {
                startY: currentY + 5,
                head: [['CHAMP', 'VALEUR']],
                body: orderInfo,
                theme: 'striped',
                headStyles: { 
                    fillColor: [46, 204, 113], 
                    textColor: 255, 
                    fontSize: 10,
                    fontStyle: 'bold'
                },
                bodyStyles: { fontSize: 9 },
                columnStyles: {
                    0: { cellWidth: 60, fontStyle: 'bold' },
                    1: { cellWidth: 120 }
                },
                margin: { left: 14 },
                alternateRowStyles: { fillColor: [248, 249, 250] }
            });
            
            currentY = (doc as any).lastAutoTable.finalY + 10;
        }
        
        // ========== SECTION 3 : STATUT ET SUIVI ==========
        doc.setFontSize(13);
        doc.setTextColor(255, 193, 7);
        doc.text('STATUT ET SUIVI', 14, currentY);
        
        const statusInfo = [
            ['Statut actuel', this.getShipmentStatusText(shipment.statut)],
            ['Progression', this.getShipmentProgressPercentage(shipment.statut) + '%'],
            ['Derniere mise a jour', new Date().toLocaleString('fr-FR')]
        ];
        
        autoTable(doc, {
            startY: currentY + 5,
            body: statusInfo,
            theme: 'plain',
            styles: { fontSize: 10 },
            columnStyles: {
                0: { cellWidth: 60, fontStyle: 'bold', textColor: [52, 58, 64] },
                1: { cellWidth: 120 }
            },
            margin: { left: 14 }
        });
        
        // ========== SECTION 4 : BARRE DE PROGRESSION VISUELLE ==========
        currentY = (doc as any).lastAutoTable.finalY + 10;
        const progress = this.getShipmentProgressPercentage(shipment.statut);
        
        doc.setFontSize(10);
        doc.setTextColor(108, 117, 125);
        doc.text('Progression de l\'expedition :', 14, currentY);
        
        // Dessiner la barre de progression
        const barWidth = 180;
        const barHeight = 8;
        const barX = 14;
        const barY = currentY + 5;
        
        // Fond gris
        doc.setFillColor(233, 236, 239);
        doc.rect(barX, barY, barWidth, barHeight, 'F');
        
        // Barre colorée selon le statut
        let fillColor: [number, number, number];
        switch(shipment.statut) {
            case StatutExpedition.EN_ATTENTE:
                fillColor = [255, 193, 7];
                break;
            case StatutExpedition.EN_COURS:
                fillColor = [23, 162, 184];
                break;
            case StatutExpedition.LIVREE:
                fillColor = [40, 167, 69];
                break;
            default:
                fillColor = [108, 117, 125];
        }
        
        doc.setFillColor(fillColor[0], fillColor[1], fillColor[2]);
        doc.rect(barX, barY, (barWidth * progress) / 100, barHeight, 'F');
        
        // Pourcentage
        doc.setFontSize(9);
        doc.setTextColor(52, 58, 64);
        doc.text(`${progress}%`, barX + barWidth + 5, barY + 6);
        
        // ========== SECTION 5 : INFORMATIONS SUPPLEMENTAIRES ==========
        currentY = barY + barHeight + 10;
        
        if (currentY < 250) {
            doc.setFontSize(13);
            doc.setTextColor(108, 117, 125);
            doc.text('INFORMATIONS SUPPLEMENTAIRES', 14, currentY);
            
            const additionalInfo = [
                ['Type de document', 'Bon d\'expedition'],
                ['Genere par', 'Systeme de gestion des expeditions'],
                ['Signature requise', shipment.statut === StatutExpedition.LIVREE ? 'Oui' : 'Non']
            ];
            
            autoTable(doc, {
                startY: currentY + 5,
                body: additionalInfo,
                theme: 'plain',
                styles: { fontSize: 9 },
                columnStyles: {
                    0: { cellWidth: 60, fontStyle: 'bold', textColor: [52, 58, 64] },
                    1: { cellWidth: 120 }
                },
                margin: { left: 14 }
            });
        }
        
        // ========== PIED DE PAGE ==========
        const pageCount = (doc as any).getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(173, 181, 189);
            doc.text(
                `Page ${i} / ${pageCount} • Document d'expedition #${shipment.id}`,
                doc.internal.pageSize.getWidth() / 2,
                doc.internal.pageSize.getHeight() - 10,
                { align: 'center' }
            );
        }
        
        // Sauvegarder le PDF
        doc.save(`expedition_${shipment.id}_${new Date().getTime()}.pdf`);
    }
    
    // ========== MÉTHODE POUR LES COMMANDES DE LIVRAISON ==========
    
    async generateDeliveryOrderPDF(order: DeliveryOrder): Promise<void> {
        const doc = new jsPDF();
        
        // En-tête
        doc.setFontSize(22);
        doc.setTextColor(33, 37, 41);
        doc.text('BON DE LIVRAISON', 14, 20);
        
        doc.setFontSize(9);
        doc.setTextColor(108, 117, 125);
        doc.text(`Document genere le : ${new Date().toLocaleString('fr-FR')}`, 14, 30);
        
        // Ligne de séparation
        doc.setDrawColor(200, 200, 200);
        doc.line(14, 35, 196, 35);
        
        // ========== SECTION 1 : INFORMATIONS COMMANDE ==========
        doc.setFontSize(13);
        doc.setTextColor(52, 152, 219);
        doc.text('INFORMATIONS COMMANDE', 14, 48);
        
        const orderInfo = [
            ['ID Commande', `#${order.idDelivery.toString()}`],
            ['Nom du client', order.nomClient || 'Non specifie'],
            ['Telephone', order.telephoneClient || 'Non specifie'],
            ['Adresse de livraison', order.adresseLivraison || 'Non specifiee'],
            ['Date prevue', new Date(order.datePrevue).toLocaleString('fr-FR')],
            ['Statut', this.getOrderStatusText(order.statut)]
        ];
        
        autoTable(doc, {
            startY: 52,
            head: [['CHAMP', 'VALEUR']],
            body: orderInfo,
            theme: 'striped',
            headStyles: { 
                fillColor: [52, 152, 219], 
                textColor: 255, 
                fontSize: 10,
                fontStyle: 'bold'
            },
            bodyStyles: { fontSize: 9 },
            columnStyles: {
                0: { cellWidth: 60, fontStyle: 'bold' },
                1: { cellWidth: 120 }
            },
            margin: { left: 14 },
            alternateRowStyles: { fillColor: [248, 249, 250] }
        });
        
        let currentY = (doc as any).lastAutoTable.finalY + 10;
        
        // ========== SECTION 2 : STATUT ET SUIVI ==========
        doc.setFontSize(13);
        doc.setTextColor(255, 193, 7);
        doc.text('STATUT ET SUIVI', 14, currentY);
        
        const statusInfo = [
            ['Statut actuel', this.getOrderStatusText(order.statut)],
            ['Progression', this.getOrderProgressPercentage(order.statut) + '%'],
            ['Derniere mise a jour', new Date().toLocaleString('fr-FR')]
        ];
        
        autoTable(doc, {
            startY: currentY + 5,
            body: statusInfo,
            theme: 'plain',
            styles: { fontSize: 10 },
            columnStyles: {
                0: { cellWidth: 60, fontStyle: 'bold', textColor: [52, 58, 64] },
                1: { cellWidth: 120 }
            },
            margin: { left: 14 }
        });
        
        // ========== SECTION 3 : BARRE DE PROGRESSION VISUELLE ==========
        currentY = (doc as any).lastAutoTable.finalY + 10;
        const progress = this.getOrderProgressPercentage(order.statut);
        
        doc.setFontSize(10);
        doc.setTextColor(108, 117, 125);
        doc.text('Progression de la commande :', 14, currentY);
        
        // Dessiner la barre de progression
        const barWidth = 180;
        const barHeight = 8;
        const barX = 14;
        const barY = currentY + 5;
        
        // Fond gris
        doc.setFillColor(233, 236, 239);
        doc.rect(barX, barY, barWidth, barHeight, 'F');
        
        // Barre colorée selon le statut
        let fillColor: [number, number, number];
        switch(order.statut) {
            case StatutCommande.EN_ATTENTE:
                fillColor = [255, 193, 7];
                break;
            case StatutCommande.EN_COURS:
                fillColor = [23, 162, 184];
                break;
            case StatutCommande.LIVREE:
                fillColor = [40, 167, 69];
                break;
            default:
                fillColor = [108, 117, 125];
        }
        
        doc.setFillColor(fillColor[0], fillColor[1], fillColor[2]);
        doc.rect(barX, barY, (barWidth * progress) / 100, barHeight, 'F');
        
        // Pourcentage
        doc.setFontSize(9);
        doc.setTextColor(52, 58, 64);
        doc.text(`${progress}%`, barX + barWidth + 5, barY + 6);
        
        // ========== SECTION 4 : QR CODE POUR CONFIRMATION ==========
        currentY = barY + barHeight + 15;
        
        doc.setFontSize(13);
        doc.setTextColor(40, 167, 69);
        doc.text('CONFIRMATION DE LIVRAISON', 14, currentY);
        
        doc.setFontSize(10);
        doc.setTextColor(108, 117, 125);
        doc.text('Scannez ce QR code pour confirmer la livraison :', 14, currentY + 8);
        
        // Générer le QR code
        try {
            const qrUrl = this.qrCodeService.generateQrData(order.idDelivery);
            const qrDataURL = await QRCode.toDataURL(qrUrl, {
                width: 150,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            });
            
            // Ajouter le QR code au PDF
            doc.addImage(qrDataURL, 'PNG', 14, currentY + 15, 40, 40);
            
            doc.setFontSize(8);
            doc.setTextColor(173, 181, 189);
            doc.text('QR Code de confirmation', 14, currentY + 60);
        } catch (error) {
            console.error('Erreur lors de la génération du QR code:', error);
            doc.setFontSize(8);
            doc.setTextColor(173, 181, 189);
            doc.text('[Erreur génération QR code]', 14, currentY + 25);
            doc.text(`URL: https://exes-unreal-movable.ngrok-free.dev/api/delivery-orders/update-by-qr/${order.idDelivery}`, 14, currentY + 35);
        }
        
        // ========== SECTION 5 : INFORMATIONS SUPPLEMENTAIRES ==========
        currentY = currentY + 70;
        
        if (currentY < 250) {
            doc.setFontSize(13);
            doc.setTextColor(108, 117, 125);
            doc.text('INFORMATIONS SUPPLEMENTAIRES', 14, currentY);
            
            const additionalInfo = [
                ['Type de document', 'Bon de livraison'],
                ['Genere par', 'Systeme de gestion des commandes'],
                ['Signature requise', order.statut === StatutCommande.LIVREE ? 'Oui' : 'Non']
            ];
            
            autoTable(doc, {
                startY: currentY + 5,
                body: additionalInfo,
                theme: 'plain',
                styles: { fontSize: 9 },
                columnStyles: {
                    0: { cellWidth: 60, fontStyle: 'bold', textColor: [52, 58, 64] },
                    1: { cellWidth: 120 }
                },
                margin: { left: 14 }
            });
        }
        
        // ========== PIED DE PAGE ==========
        const pageCount = (doc as any).getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(173, 181, 189);
            doc.text(
                `Page ${i} / ${pageCount} • Bon de livraison #${order.idDelivery}`,
                doc.internal.pageSize.getWidth() / 2,
                doc.internal.pageSize.getHeight() - 10,
                { align: 'center' }
            );
        }
        
        // Sauvegarder le PDF
        doc.save(`bon_livraison_${order.idDelivery}_${new Date().getTime()}.pdf`);
    }
    
    // ========== MÉTHODES PRIVÉES POUR LES EXPÉDITIONS ==========
    
    private getShipmentStatusText(statut: StatutExpedition): string {
        switch(statut) {
            case StatutExpedition.EN_ATTENTE: return 'En attente';
            case StatutExpedition.EN_COURS: return 'En cours de livraison';
            case StatutExpedition.LIVREE: return 'Livree';
            default: return statut;
        }
    }
    
    private getShipmentProgressPercentage(statut: StatutExpedition): number {
        switch(statut) {
            case StatutExpedition.EN_ATTENTE: return 25;
            case StatutExpedition.EN_COURS: return 60;
            case StatutExpedition.LIVREE: return 100;
            default: return 0;
        }
    }
    
    // ========== MÉTHODES PRIVÉES POUR LES COMMANDES ==========
    
    private getOrderStatusText(statut: StatutCommande): string {
        switch(statut) {
            case StatutCommande.EN_ATTENTE: return 'En attente';
            case StatutCommande.EN_COURS: return 'En cours';
            case StatutCommande.LIVREE: return 'Livree';
            default: return statut;
        }
    }
    
    private getOrderProgressPercentage(statut: StatutCommande): number {
        switch(statut) {
            case StatutCommande.EN_ATTENTE: return 25;
            case StatutCommande.EN_COURS: return 60;
            case StatutCommande.LIVREE: return 100;
            default: return 0;
        }
    }

}