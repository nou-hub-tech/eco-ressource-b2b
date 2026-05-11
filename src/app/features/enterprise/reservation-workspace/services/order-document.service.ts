import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as QRCode from 'qrcode';
import { Order } from '../reservation-workspace.models';

@Injectable({ providedIn: 'root' })
export class OrderDocumentService {
  async generateInvoice(order: Order): Promise<void> {
    const doc = new jsPDF();
    const qrDataUrl = await QRCode.toDataURL(order.qrValue, {
      width: 160,
      margin: 1,
      color: { dark: '#0c1a24', light: '#ffffff' }
    });

    doc.setFillColor(2, 132, 199);
    doc.rect(0, 0, 210, 38, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text('EcoRessource Tunisie - Order Invoice', 14, 18);
    doc.setFontSize(10);
    doc.text(`Invoice ${order.invoiceNumber}`, 14, 27);

    doc.setTextColor(12, 26, 36);
    doc.setFontSize(11);
    doc.text(`Counterparty: ${order.customer}`, 14, 52);
    doc.text(`Order ID: ${order.code}`, 14, 60);
    doc.text(`Created: ${order.createdAt}`, 14, 68);
    doc.text(`Due date: ${order.dueDate}`, 14, 76);

    doc.addImage(qrDataUrl, 'PNG', 154, 45, 38, 38);
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('Use the QR code to validate or route this order.', 132, 88);

    autoTable(doc, {
      startY: 96,
      head: [['Item', 'Qty', 'Unit Price', 'Line Total']],
      body: order.items.map((item) => [
        item.label,
        item.quantity.toString(),
        `${item.unitPrice.toFixed(2)} TND`,
        `${(item.quantity * item.unitPrice).toFixed(2)} TND`
      ]),
      headStyles: {
        fillColor: [12, 26, 36],
        textColor: 255,
        fontStyle: 'bold'
      },
      bodyStyles: {
        textColor: [51, 65, 85],
        fontSize: 10
      },
      styles: {
        cellPadding: 4
      }
    });

    const finalY =
      (doc as jsPDF & { lastAutoTable?: { finalY?: number } }).lastAutoTable?.finalY ?? 126;

    doc.setFillColor(248, 250, 252);
    doc.roundedRect(118, finalY + 10, 74, 30, 4, 4, 'F');
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(9);
    doc.text('Subtotal', 124, finalY + 20);
    doc.text('Tax', 124, finalY + 28);
    doc.text('Total', 124, finalY + 38);

    doc.setTextColor(12, 26, 36);
    doc.setFontSize(10);
    doc.text(`${order.amount.toFixed(2)} TND`, 184, finalY + 20, { align: 'right' });
    doc.text(`${order.tax.toFixed(2)} TND`, 184, finalY + 28, { align: 'right' });
    doc.setFontSize(14);
    doc.text(`${order.total.toFixed(2)} TND`, 184, finalY + 38, { align: 'right' });

    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text(
      `Review level: ${order.fraudRisk}% · Segment: ${order.spendingCluster}`,
      14,
      278
    );
    doc.text('Booking and order follow-up', 196, 278, { align: 'right' });

    doc.save(`${order.invoiceNumber}.pdf`);
  }
}
