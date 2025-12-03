import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css';

console.log('Tampermonkey Script Started: Side Pane Data Viewer (React + shadcn/ui)');

const rootId = 'sp-root';
let rootDiv = document.getElementById(rootId);

if (!rootDiv) {
  rootDiv = document.createElement('div');
  rootDiv.id = rootId;
  document.body.appendChild(rootDiv);
}

ReactDOM.createRoot(rootDiv).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// SPA Support
// @ts-ignore
if (window.onurlchange === null) {
    window.addEventListener('urlchange', (info: any) => {
        console.log('URL changed:', info.url);
        // React handles its own state, but if the root div is removed, we might need to re-mount.
        // For now, let's just ensure the root div exists.
        if (!document.getElementById(rootId)) {
             // Re-mounting logic would go here if needed, but usually SPAs don't wipe the body completely.
             // If they do, we'd need a more robust observer.
             console.log('Root div missing!');
        }
    });
}
