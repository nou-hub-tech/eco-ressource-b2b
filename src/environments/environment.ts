export const environment = {
  production: false,
  /**
   * Chemins relatifs → le même origine que `ng serve` évite le CORS en dev.
   * Redirigés vers Spring par `proxy.conf.json` (voir racine du projet).
   */
  apiUrl: '/api',
  /** API Spring « gestion produit » (CRUD catalogue) */
  productApiUrl: '/product'
};
