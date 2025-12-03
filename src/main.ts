import './style.css';
import { GM_xmlhttpRequest } from '$';

console.log('Tampermonkey Script Started: Side Pane Data Viewer (TS + Tailwind)');

// ==========================================
// CONFIGURATION
// ==========================================
const CONFIG = {
    API_URL: 'https://jsonplaceholder.typicode.com/users',
    PANE_TITLE: 'Data Viewer',
    AUTO_LOAD: true
};

// ==========================================
// UI CREATION
// ==========================================
function createUI() {
    if (document.getElementById('sp-toggle-btn')) return;

    console.log('Creating Side Pane UI...');

    // Toggle Button
    const toggleBtn = document.createElement('div');
    toggleBtn.id = 'sp-toggle-btn';
    toggleBtn.textContent = 'DATA PANE';
    toggleBtn.className = `
        fixed top-1/2 right-0 -translate-y-1/2
        bg-blue-400 text-gray-900
        py-3 px-2 rounded-l-lg cursor-pointer
        z-[2147483647] font-bold shadow-lg
        transition-all duration-300
        [writing-mode:vertical-rl] select-none
        hover:brightness-110
    `;
    toggleBtn.onclick = togglePane;
    document.body.appendChild(toggleBtn);

    // Main Pane
    const pane = document.createElement('div');
    pane.id = 'sp-pane';
    pane.className = `
        fixed top-0 right-[-400px]
        w-[400px] h-screen
        bg-slate-900 text-slate-200
        z-[2147483647] shadow-xl
        transition-all duration-300
        flex flex-col border-l border-slate-700
    `;

    pane.innerHTML = `
        <div class="p-5 border-b border-slate-700 flex justify-between items-center bg-black/10">
            <h2 class="text-xl font-bold text-blue-400 m-0">${CONFIG.PANE_TITLE}</h2>
            <button class="sp-close-btn text-2xl text-slate-400 hover:text-red-400 bg-transparent border-none cursor-pointer leading-none">&times;</button>
        </div>
        <div class="p-4 border-b border-slate-700 flex gap-2">
            <button id="sp-refresh-btn" class="flex-1 bg-slate-700 text-slate-200 border border-slate-600 py-2 px-4 rounded hover:bg-blue-400 hover:text-gray-900 transition-colors cursor-pointer">Refresh Data</button>
        </div>
        <div id="sp-content" class="flex-1 overflow-y-auto p-5">
            <div class="text-center p-5 italic opacity-70">Click Refresh to load data...</div>
        </div>
    `;
    document.body.appendChild(pane);

    // Event Listeners
    const closeBtn = pane.querySelector('.sp-close-btn') as HTMLElement;
    const refreshBtn = pane.querySelector('#sp-refresh-btn') as HTMLElement;

    if (closeBtn) closeBtn.onclick = togglePane;
    if (refreshBtn) refreshBtn.onclick = fetchData;

    if (CONFIG.AUTO_LOAD) {
        fetchData();
    }
}

function togglePane() {
    const pane = document.getElementById('sp-pane');
    const btn = document.getElementById('sp-toggle-btn');

    if (!pane || !btn) return;

    if (pane.style.right === '0px') {
        pane.style.right = '-400px';
        btn.style.right = '0';
    } else {
        pane.style.right = '0px';
        btn.style.right = '400px';
    }
}

// ==========================================
// DATA FETCHING
// ==========================================
function fetchData() {
    const contentDiv = document.getElementById('sp-content');
    if (!contentDiv) return;

    contentDiv.innerHTML = '<div class="text-center p-5 italic opacity-70">Loading data...</div>';

    GM_xmlhttpRequest({
        method: "GET",
        url: CONFIG.API_URL,
        onload: function(response) {
            if (response.status === 200) {
                try {
                    const data = JSON.parse(response.responseText);
                    renderData(data);
                } catch (e) {
                    showError('Failed to parse JSON data.');
                    console.error(e);
                }
            } else {
                showError(`API Error: ${response.status} ${response.statusText}`);
            }
        },
        onerror: function(err) {
            showError('Network error occurred.');
            console.error(err);
        }
    });
}

// ==========================================
// RENDERING
// ==========================================
function renderData(data: any) {
    const contentDiv = document.getElementById('sp-content');
    if (!contentDiv) return;

    contentDiv.innerHTML = '';

    const items = Array.isArray(data) ? data : [data];

    if (items.length === 0) {
        contentDiv.innerHTML = '<div class="text-center p-5 italic opacity-70">No data found.</div>';
        return;
    }

    items.forEach((item: any) => {
        const el = document.createElement('div');
        el.className = `
            bg-white/5 border border-slate-700
            rounded-md p-3 mb-3
            transition-transform duration-200
            hover:-translate-x-0.5 hover:border-blue-400
        `;

        const title = item.name || item.title || 'Unknown Item';
        const subtitle = item.email || item.body || '';
        const detail = item.company ? item.company.name : '';

        el.innerHTML = `
            <div class="font-bold mb-1 text-blue-400">${title}</div>
            ${subtitle ? `<div class="text-sm opacity-80 mb-0.5">${subtitle}</div>` : ''}
            ${detail ? `<div class="text-xs text-blue-300">${detail}</div>` : ''}
        `;
        contentDiv.appendChild(el);
    });
}

function showError(msg: string) {
    const contentDiv = document.getElementById('sp-content');
    if (!contentDiv) return;

    contentDiv.innerHTML = `
        <div class="text-red-400 p-2 bg-red-400/10 border border-red-400/20 rounded">
            ${msg}
        </div>
    `;
}

// ==========================================
// PERSISTENCE & INIT
// ==========================================
createUI();

// SPA Support
// @ts-ignore
if (window.onurlchange === null) {
    window.addEventListener('urlchange', (info: any) => {
        console.log('URL changed:', info.url);
        createUI();
    });
}

setInterval(() => {
    if (!document.getElementById('sp-toggle-btn')) {
        console.log('UI missing, re-injecting...');
        createUI();
    }
}, 1000);
