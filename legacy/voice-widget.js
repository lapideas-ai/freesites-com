// FreeSites xAI Voice Widget
// Drop this script tag on any page: <script src="/voice-widget.js"></script>
// Requires: /netlify/functions/voice-token.js on the server

(function() {
  'use strict';

  var AGENT_ID = 'agent_BN1cRSL8ZKJdSZWX';
  var ws = null;
  var mediaStream = null;
  var audioContext = null;
  var processor = null;
  var isConnected = false;
  var isMuted = false;
  var audioQueue = [];
  var isPlaying = false;

  // ── Build the floating widget UI ──────────────────────────────────────────
  function buildWidget() {
    var style = document.createElement('style');
    style.textContent = `
      #fs-voice-btn {
        position: fixed; bottom: 28px; right: 28px; z-index: 9999;
        width: 60px; height: 60px; border-radius: 50%;
        background: linear-gradient(135deg, #f97316, #ea6c0a);
        border: none; cursor: pointer; box-shadow: 0 4px 20px rgba(249,115,22,.5);
        display: flex; align-items: center; justify-content: center;
        transition: all .2s; font-size: 24px;
        animation: fsPulse 2.5s infinite;
      }
      @keyframes fsPulse {
        0%,100% { box-shadow: 0 4px 20px rgba(249,115,22,.5); }
        50% { box-shadow: 0 4px 32px rgba(249,115,22,.8), 0 0 0 8px rgba(249,115,22,.15); }
      }
      #fs-voice-btn:hover { transform: scale(1.1); }
      #fs-voice-btn.active { background: linear-gradient(135deg,#16a34a,#15803d); animation: none; box-shadow: 0 4px 20px rgba(22,163,74,.5); }
      #fs-voice-btn.loading { background: linear-gradient(135deg,#1a6bbf,#2080d0); animation: none; }
      #fs-voice-panel {
        position: fixed; bottom: 100px; right: 28px; z-index: 9998;
        width: 320px; background: #1e3a5f;
        border-radius: 20px; padding: 20px;
        box-shadow: 0 16px 48px rgba(0,0,0,.35);
        display: none; flex-direction: column; gap: 12px;
        border: 1px solid rgba(255,255,255,.1);
        font-family: 'Inter', system-ui, sans-serif;
      }
      #fs-voice-panel.open { display: flex; animation: fsSlideUp .25s ease; }
      @keyframes fsSlideUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
      .fs-panel-header { display:flex; align-items:center; gap:10px; }
      .fs-live-dot { width:8px; height:8px; border-radius:50%; background:#22c55e; animation:fsPulse 2s infinite; flex-shrink:0; }
      .fs-live-dot.idle { background: #64748b; animation: none; }
      .fs-panel-title { font-size:15px; font-weight:700; color:#fff; }
      .fs-panel-sub { font-size:12px; color:rgba(255,255,255,.55); line-height:1.5; }
      .fs-transcript { min-height:60px; max-height:120px; overflow-y:auto; font-size:13px; color:rgba(255,255,255,.8); line-height:1.6; background:rgba(255,255,255,.06); border-radius:10px; padding:10px 12px; }
      .fs-transcript.empty::before { content:"Say hello to get started..."; color:rgba(255,255,255,.3); font-style:italic; }
      .fs-controls { display:flex; gap:8px; }
      .fs-ctrl-btn { flex:1; padding:10px; border-radius:9px; border:none; font-size:13px; font-weight:600; cursor:pointer; font-family:inherit; transition:all .15s; }
      .fs-ctrl-btn.mute { background:rgba(255,255,255,.1); color:rgba(255,255,255,.8); }
      .fs-ctrl-btn.mute:hover { background:rgba(255,255,255,.18); }
      .fs-ctrl-btn.end { background:rgba(220,38,38,.2); color:#fca5a5; border:1px solid rgba(220,38,38,.3); }
      .fs-ctrl-btn.end:hover { background:rgba(220,38,38,.35); }
      .fs-cta { display:block; text-align:center; background:#f97316; color:#fff; padding:10px; border-radius:9px; font-size:13px; font-weight:700; text-decoration:none; margin-top:4px; transition:all .15s; }
      .fs-cta:hover { background:#ea6c0a; }
      .fs-status { font-size:11px; color:rgba(255,255,255,.35); text-align:center; }
    `;
    document.head.appendChild(style);

    // Floating button
    var btn = document.createElement('button');
    btn.id = 'fs-voice-btn';
    btn.title = 'Talk to FreeSites';
    btn.innerHTML = '🎙️';
    btn.addEventListener('click', togglePanel);
    document.body.appendChild(btn);

    // Panel
    var panel = document.createElement('div');
    panel.id = 'fs-voice-panel';
    panel.innerHTML = `
      <div class="fs-panel-header">
        <span class="fs-live-dot idle" id="fsLiveDot"></span>
        <span class="fs-panel-title">Talk to FreeSites</span>
      </div>
      <div class="fs-panel-sub">Ask anything about SmartSites, pricing, or how it works. Our smart assistant replies instantly — in your browser.</div>
      <div class="fs-transcript empty" id="fsTranscript"></div>
      <div class="fs-controls" id="fsControls" style="display:none">
        <button class="fs-ctrl-btn mute" id="fsMuteBtn" onclick="fsMute()">🎤 Mute</button>
        <button class="fs-ctrl-btn end" onclick="fsEnd()">End Call</button>
      </div>
      <div id="fsStartArea">
        <button class="fs-cta" id="fsStartBtn" onclick="fsStart()" style="background:#1a6bbf;margin-bottom:8px">🎙️ Start Talking — It's Free</button>
        <div class="fs-status">No phone needed · Works in your browser</div>
      </div>
      <a href="https://freesites.com/form/" class="fs-cta" id="fsBuildBtn" style="display:none">⚡ Build My Free SmartSite →</a>
    `;
    document.body.appendChild(panel);
  }

  function togglePanel() {
    var panel = document.getElementById('fs-voice-panel');
    panel.classList.toggle('open');
  }

  // ── Audio helpers ─────────────────────────────────────────────────────────
  function appendTranscript(text, role) {
    var el = document.getElementById('fsTranscript');
    el.classList.remove('empty');
    var line = document.createElement('div');
    line.style.cssText = 'margin-bottom:6px;' + (role === 'agent' ? 'color:rgba(255,255,255,.9)' : 'color:#93c5fd');
    line.textContent = (role === 'agent' ? '🤖 ' : '👤 ') + text;
    el.appendChild(line);
    el.scrollTop = el.scrollHeight;
  }

  function playPCM(pcmData) {
    audioQueue.push(pcmData);
    if (!isPlaying) drainQueue();
  }

  function drainQueue() {
    if (audioQueue.length === 0) { isPlaying = false; return; }
    isPlaying = true;
    var pcm = audioQueue.shift();
    if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });
    var samples = new Int16Array(pcm.buffer, pcm.byteOffset, pcm.byteLength / 2);
    var float32 = new Float32Array(samples.length);
    for (var i = 0; i < samples.length; i++) float32[i] = samples[i] / 32768;
    var buf = audioContext.createBuffer(1, float32.length, 24000);
    buf.getChannelData(0).set(float32);
    var src = audioContext.createBufferSource();
    src.buffer = buf;
    src.connect(audioContext.destination);
    src.onended = drainQueue;
    src.start();
  }

  // ── WebSocket connection ───────────────────────────────────────────────────
  window.fsStart = async function() {
    var btn = document.getElementById('fsStartBtn');
    btn.textContent = '⏳ Connecting...';
    btn.style.background = '#1a6bbf';
    btn.disabled = true;
    document.getElementById('fs-voice-btn').classList.add('loading');

    try {
      // Get ephemeral token from our Netlify proxy
      var tokenRes=await fetch('https://freesites.ai/.netlify/functions/voice-token');
      if (!tokenRes.ok) throw new Error('Could not get voice token');
      var { token } = await tokenRes.json();

      // Get microphone
      mediaStream = await navigator.mediaDevices.getUserMedia({ audio: { sampleRate: 24000, channelCount: 1 } });

      // Connect to xAI WebSocket
      ws = new WebSocket('wss://api.x.ai/v1/realtime?agent_id=' + AGENT_ID, ['realtime', token]);

      ws.onopen = function() {
        isConnected = true;
        document.getElementById('fsLiveDot').classList.remove('idle');
        document.getElementById('fs-voice-btn').classList.remove('loading');
        document.getElementById('fs-voice-btn').classList.add('active');
        document.getElementById('fs-voice-btn').innerHTML = '🔴';
        document.getElementById('fsStartArea').style.display = 'none';
        document.getElementById('fsControls').style.display = 'flex';
        appendTranscript('Connected! How can I help you today?', 'agent');
        startCapture();
      };

      ws.onmessage = function(event) {
        var msg = JSON.parse(event.data);
        if (msg.type === 'response.output_audio.delta') {
          var bytes = Uint8Array.from(atob(msg.delta), function(c) { return c.charCodeAt(0); });
          playPCM(bytes);
        } else if (msg.type === 'response.output_audio_transcript.delta') {
          // accumulate transcript
        } else if (msg.type === 'response.output_audio_transcript.done') {
          if (msg.transcript) appendTranscript(msg.transcript, 'agent');
        } else if (msg.type === 'conversation.item.input_audio_transcription.completed') {
          if (msg.transcript) appendTranscript(msg.transcript, 'user');
        }
      };

      ws.onclose = function() {
        isConnected = false;
        fsCleanup();
      };

      ws.onerror = function() {
        appendTranscript('Connection issue — please try again.', 'agent');
        fsCleanup();
      };

    } catch(e) {
      btn.textContent = '🎙️ Start Talking — It\'s Free';
      btn.style.background = '#1a6bbf';
      btn.disabled = false;
      document.getElementById('fs-voice-btn').classList.remove('loading');
      if (e.name === 'NotAllowedError') {
        appendTranscript('Microphone access needed — please allow and try again.', 'agent');
      } else {
        appendTranscript('Could not connect. Please try again.', 'agent');
      }
    }
  }

  function startCapture() {
    if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });
    var source = audioContext.createMediaStreamSource(mediaStream);
    processor = audioContext.createScriptProcessor(4096, 1, 1);
    processor.onaudioprocess = function(e) {
      if (!isConnected || isMuted || !ws || ws.readyState !== WebSocket.OPEN) return;
      var float32 = e.inputBuffer.getChannelData(0);
      var int16 = new Int16Array(float32.length);
      for (var i = 0; i < float32.length; i++) int16[i] = Math.max(-32768, Math.min(32767, float32[i] * 32768));
      var base64 = btoa(String.fromCharCode.apply(null, new Uint8Array(int16.buffer)));
      ws.send(JSON.stringify({ type: 'input_audio_buffer.append', audio: base64 }));
    };
    source.connect(processor);
    processor.connect(audioContext.destination);
  }

  window.fsMute = function() {
    isMuted = !isMuted;
    document.getElementById('fsMuteBtn').textContent = isMuted ? '🔇 Unmute' : '🎤 Mute';
  };

  window.fsEnd = function() {
    if (ws) ws.close();
    fsCleanup();
  };

  function fsCleanup() {
    isConnected = false;
    if (processor) { processor.disconnect(); processor = null; }
    if (mediaStream) { mediaStream.getTracks().forEach(function(t) { t.stop(); }); mediaStream = null; }
    document.getElementById('fs-voice-btn').classList.remove('active', 'loading');
    document.getElementById('fs-voice-btn').innerHTML = '🎙️';
    document.getElementById('fsLiveDot').classList.add('idle');
    document.getElementById('fsControls').style.display = 'none';
    document.getElementById('fsStartArea').style.display = 'block';
    document.getElementById('fsStartBtn').textContent = '🎙️ Talk Again';
    document.getElementById('fsStartBtn').disabled = false;
    document.getElementById('fsBuildBtn').style.display = 'block';
  }

  // Init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildWidget);
  } else {
    buildWidget();
  }

})();
