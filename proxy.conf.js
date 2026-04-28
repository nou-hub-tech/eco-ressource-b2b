/**
 * Proxy dev → Spring (port 8080).
 *
 * Si vous ouvrez l’app sur http://127.0.0.1:4200, le navigateur envoie
 * Origin: http://127.0.0.1:4200 ; Spring ne l’a souvent pas dans sa liste CORS
 * (seulement localhost:4200), ce qui peut donner 403 sur POST /api/auth/login.
 * On réécrit Origin/Referer côté proxy pour correspondre au contrat backend habituel.
 */
const TARGET = 'http://localhost:8080';

/** Doit matcher une origine autorisée par Spring en dev (voir FRONTEND spec / CORS). */
const PROXY_ORIGIN = 'http://localhost:4200';

function devProxyContext() {
  return {
    target: TARGET,
    secure: false,
    changeOrigin: true,
    onProxyReq(proxyReq) {
      proxyReq.setHeader('Origin', PROXY_ORIGIN);
      proxyReq.setHeader('Referer', `${PROXY_ORIGIN}/`);
    }
  };
}

function devWsProxyContext() {
  return {
    target: TARGET,
    secure: false,
    changeOrigin: true,
    ws: true,
    onProxyReq(proxyReq) {
      proxyReq.setHeader('Origin', PROXY_ORIGIN);
      proxyReq.setHeader('Referer', `${PROXY_ORIGIN}/`);
    },
    onProxyReqWs(proxyReq) {
      proxyReq.setHeader('Origin', PROXY_ORIGIN);
    }
  };
}

module.exports = {
  '/api': devProxyContext(),
  '/ws': devWsProxyContext(),
  '/ws-sockjs': devWsProxyContext(),
  '/product': devProxyContext(),
  '/files': devProxyContext(),
  '/ai': devProxyContext(),
  '/stockitem': devProxyContext(),
  '/stock-movement': devProxyContext(),
  '/inventory': devProxyContext(),
  '/broken-product': devProxyContext()
};
