// extension/media/main.js
(function () {
  const vscode = acquireVsCodeApi();

  // ----- DOM -----
  const chatEl    = document.getElementById('chat');
  const promptEl  = document.getElementById('prompt');
  const sendBtn   = document.getElementById('send');
  const anchorBtn = document.getElementById('anchor');
  const statusEl  = document.getElementById('status');

  // ----- Config (updated by init message) -----
  const cfg = {
    backendUrl: 'http://127.0.0.1:8001',
    backendWs:  'ws://127.0.0.1:8001/ws/echo'
  };

  let ws = null;

  // ===== Helpers =====
  function setStatus(s) { statusEl.textContent = s; }
  function esc(s) {
    return String(s ?? '').replace(/[&<>"']/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[m]));
  }
  function add(role, text, cls) {
    const div = document.createElement('div');
    div.className = cls || (role === 'You' ? 'user' : 'assistant');
    div.textContent = text;
    chatEl.appendChild(div);
    chatEl.scrollTop = chatEl.scrollHeight;
  }
  async function showIdentity() {
    try {
      const r = await fetch(`${cfg.backendUrl}/api/echo/identity`);
      const id = await r.json();
      const who = id?.owner?.displayName || 'Guest';
      const mode = id?.owner?.mode || 'guest';
      const model = id?.model || '';
      add('Echo', `Hello ${who} (${mode}) — model: ${model}`);
    } catch { /* ignore */ }
  }

  // ===== WS connect (optional streaming) =====
  function connectWS() {
    try {
      ws = new WebSocket(cfg.backendWs);
      ws.onopen = () => { showIdentity(); };
      ws.onmessage = (ev) => {
        try {
          const msg = JSON.parse(ev.data);
          if (msg.type === 'token') add('Echo', msg.content);
          else if (msg.type === 'final' && msg.text) add('Echo', msg.text);
          else if (msg.type === 'patch') vscode.postMessage({ type: 'applyPatch', patch: msg.patch });
          else if (msg.type === 'alert') vscode.postMessage({ type: 'alert', message: msg.message });
        } catch {
          // non-JSON token; show raw
          add('Echo', String(ev.data));
        }
      };
      ws.onclose = () => { ws = null; /* passive: reconnect only on next send */ };
    } catch {
      ws = null;
    }
  }

  // ===== Send logic =====
  async function send() {
    const text = promptEl.value.trim();
    if (!text) return;

    add('You', text, 'user');
    promptEl.value = '';
    setStatus('thinking…');
    sendBtn.disabled = true;

    try {
      // Prefer WS if open
      if (ws && ws.readyState === 1) {
        ws.send(JSON.stringify({ type: 'chat', prompt: text }));
        // The stream will render via ws.onmessage above
      } else {
        // Fallback: HTTP POST
        const r = await fetch(`${cfg.backendUrl}/api/echo/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: text })
        });
        const data = await r.json().catch(() => ({}));
        const reply = data.text || data.output || '[no response]';
        add('Echo', reply, 'assistant');
        // lazily (re)establish WS for next time
        if (!ws) connectWS();
      }
    } catch (e) {
      add('Echo', `[error] ${e?.message || String(e)}`, 'error');
    } finally {
      sendBtn.disabled = false;
      setStatus('ready');
      promptEl.focus();
    }
  }

  // ===== UI Events =====
  sendBtn.addEventListener('click', send);
  promptEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  });
  anchorBtn.addEventListener('click', () => {
    vscode.postMessage({ type: 'anchor' }); // extension opens today’s scribe
  });

  // ===== Receive init from extension (backend URLs, context) =====
  window.addEventListener('message', (event) => {
    const m = event?.data || {};
    if (m.type === 'init' && m.data) {
      Object.assign(cfg, m.data);
      setStatus('ready');
      // try to connect WS once we have final URL
      connectWS();
    }
  });

  // tell extension we're ready to receive init
  vscode.postMessage({ type: 'webview-ready' });
})();
