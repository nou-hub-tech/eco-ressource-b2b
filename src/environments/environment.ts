import type { AppEnvironment } from './app-environment';

export const environment: AppEnvironment = {
  production: false,
  apiUrl: '/api',
  /**
   * URL de base stable pour le QR (domaine, tunnel ngrok, etc.).
   * Vide = `window.location.origin`.
   */
  qrCodeBaseUrl: ''
};
