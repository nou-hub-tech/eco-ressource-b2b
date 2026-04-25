import { Pipe, PipeTransform } from '@angular/core';
import { Invoice } from '../../../core/models/finance.model';

/**
 * 🧾 Pipe pour compter les factures par statut dans le template.
 * Usage : {{ invoices | invoiceFilter:'UNPAID' }}
 */
@Pipe({ name: 'invoiceFilter', standalone: false })
export class InvoiceFilterPipe implements PipeTransform {
  transform(invoices: Invoice[], status: string): number {
    if (!invoices) return 0;
    return invoices.filter(i => i.status === status).length;
  }
}
