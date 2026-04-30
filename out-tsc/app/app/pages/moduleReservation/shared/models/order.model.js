/**
 * Order domain model
 * ------------------
 * Procurement order tied to a material + supplier.
 * Status flows: DRAFT -> CONFIRMED -> SHIPPED -> DELIVERED.
 * Soft delete keeps the row for audit (eco metrics may matter for reporting).
 */
