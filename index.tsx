
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 使用絕對路徑註冊 SW
// 一次性移除舊的 Service Worker + 清除 caches（只在 production、只執行一次）
if (import.meta.env && import.meta.env.PROD && 'serviceWorker' in navigator) {
  const SW_CLEANUP_KEY = 'sw_cleanup_v1';
  // 如果尚未執行過清理，於 load 時嘗試 unregister 舊的 service workers 並清除 caches
  if (!localStorage.getItem(SW_CLEANUP_KEY)) {
    window.addEventListener('load', async () => {
      try {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map(r => r.unregister()));
        const keys = await caches.keys();
        await Promise.all(keys.map(k => caches.delete(k)));
        localStorage.setItem(SW_CLEANUP_KEY, '1');
        console.log('One-time SW cleanup done. Please refresh to load fresh assets.');
        // 強制重新載入以避免殘留舊資源
        location.reload();
      } catch (err) {
        console.warn('SW cleanup failed:', err);
      }
    });
  }

  // 在清理機制之後（且仍在 production），註冊新的 service worker（若需要）
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}
