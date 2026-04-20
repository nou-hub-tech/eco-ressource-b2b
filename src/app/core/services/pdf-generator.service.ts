import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Shipment } from '../models/shipment';
import { DeliveryOrder } from '../models/delivery-order';
import { StatutExpedition } from '../models/statut';

@Injectable({
    providedIn: 'root'
})
export class PdfGeneratorService {
    
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
            ['Statut', this.getStatusText(shipment.statut)],
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
            ['Statut actuel', this.getStatusText(shipment.statut)],
            ['Progression', this.getProgressPercentage(shipment.statut) + '%'],
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
        const progress = this.getProgressPercentage(shipment.statut);
        
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
        const pageCount = doc.getNumberOfPages();
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
    
    private getStatusText(statut: StatutExpedition): string {
        switch(statut) {
            case StatutExpedition.EN_ATTENTE: return 'En attente';
            case StatutExpedition.EN_COURS: return 'En cours de livraison';
            case StatutExpedition.LIVREE: return 'Livree';
            default: return statut;
        }
    }
    
    private getStatusLevel(statut: StatutExpedition): string {
        switch(statut) {
            case StatutExpedition.EN_ATTENTE: return 'Niveau 1 - En attente';
            case StatutExpedition.EN_COURS: return 'Niveau 2 - En transit';
            case StatutExpedition.LIVREE: return 'Niveau 3 - Finalise';
            default: return 'Niveau 0';
        }
    }
    
    private getProgressPercentage(statut: StatutExpedition): number {
        switch(statut) {
            case StatutExpedition.EN_ATTENTE: return 25;
            case StatutExpedition.EN_COURS: return 60;
            case StatutExpedition.LIVREE: return 100;
            default: return 0;
        }
    }
}