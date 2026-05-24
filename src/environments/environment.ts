export const environment = {
  production: false,

  apiUrl: 'http://localhost:9090/api',

  /** API Spring « gestion produit » (CRUD catalogue) */
  productApiUrl: 'http://localhost:9090/product',

  /** URL de base pour les QR codes (tunnel ngrok, domaine, etc.). Vide = window.location.origin */
  qrCodeBaseUrl: ''
};
