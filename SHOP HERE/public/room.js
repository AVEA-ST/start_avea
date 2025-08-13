// room.js - WebRTC mesh client
// Features: up to 6 participants, chat via Socket.IO, screen sharing, mic/cam toggles, responsive grid

const pcConfig = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
};

const MAX_PARTICIPANTS = 6;

// Parse roomId and name
const pathParts = window.location.pathname.split('/');
const roomId = decodeURIComponent(pathParts[pathParts.length - 1] || '');
const urlParams = new URLSearchParams(window.location.search);
const displayName = urlParams.get('name') || 'Guest';

// UI elements
const grid = document.getElementById('grid');
const roomInfo = document.getElementById('roomInfo');
const copyLinkBtn = document.getElementById('copyLink');
const toggleMicBtn = document.getElementById('toggleMic');
const toggleCamBtn = document.getElementById('toggleCam');
const shareScreenBtn = document.getElementById('shareScreen');
const leaveBtn = document.getElementById('leave');

const messagesEl = document.getElementById('messages');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');

roomInfo.textContent = `Room: ${roomId}`;
copyLinkBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    copyLinkBtn.textContent = 'Copied!';
    setTimeout(() => (copyLinkBtn.textContent = 'Copy Link'), 1500);
  } catch {}
});

// Global state
let localStream; // current camera/mic stream
let screenStream; // current screen stream if active
let audioEnabled = true;
let videoEnabled = true;

// Map of peerId -> { pc, videoEl, streams: { camera, screen }, name }
const peers = new Map();

// Socket.IO
// In production (Vercel static), set window.SIGNAL_URL in config.js to your signaling server origin.
// Example: window.SIGNAL_URL = 'https://your-railway-app.up.railway.app';
const SIGNAL_URL = window.SIGNAL_URL || undefined; // undefined => same-origin (local dev)
const socket = io(SIGNAL_URL, {
  transports: ['websocket', 'polling'],
});

// Media helpers
async function getCameraStream() {
  return await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: { width: { ideal: 1280 }, height: { ideal: 720 } },
  });
}

async function getScreenStream() {
  return await navigator.mediaDevices.getDisplayMedia({
    video: true,
    audio: true,
  });
}

// UI helpers
function addTile(id, label, isMe = false) {
  const tile = document.createElement('div');
  tile.className = 'tile';
  tile.dataset.id = id;

  const video = document.createElement('video');
  video.autoplay = true;
  video.playsInline = true;
  video.muted = isMe; // avoid feedback for local

  const nameBadge = document.createElement('div');
  nameBadge.className = 'label';
  nameBadge.textContent = label;

  const meBadge = document.createElement('div');
  meBadge.className = 'me';
  meBadge.textContent = isMe ? 'You' : '';

  tile.appendChild(video);
  tile.appendChild(nameBadge);
  tile.appendChild(meBadge);
  grid.appendChild(tile);
  return video;
}

function removeTile(id) {
  const el = grid.querySelector(`.tile[data-id="${id}"]`);
  if (el) el.remove();
}

function appendMessage({ name, message, ts }) {
  const d = document.createElement('div');
  d.className = 'msg';
  const meta = document.createElement('div');
  meta.className = 'meta';
  meta.textContent = `${name} • ${new Date(ts).toLocaleTimeString()}`;
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.textContent = message;
  d.appendChild(meta);
  d.appendChild(bubble);
  messagesEl.appendChild(d);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

// Peer connection management
function createPeerConnection(peerId) {
  const pc = new RTCPeerConnection(pcConfig);

  pc.onicecandidate = (e) => {
    if (e.candidate) {
      socket.emit('signal', { to: peerId, data: { type: 'candidate', candidate: e.candidate } });
    }
  };

  pc.ontrack = (e) => {
    let entry = peers.get(peerId);
    if (!entry) return;
    const [stream] = e.streams;
    entry.videoEl.srcObject = stream;
  };

  pc.onconnectionstatechange = () => {
    if (pc.connectionState === 'failed' || pc.connectionState === 'disconnected') {
      cleanupPeer(peerId);
    }
  };

  return pc;
}

function attachLocalTracks(pc) {
  if (localStream) {
    localStream.getTracks().forEach((t) => pc.addTrack(t, localStream));
  }
  if (screenStream) {
    screenStream.getTracks().forEach((t) => pc.addTrack(t, screenStream));
  }
}

function replaceTrackOnPeers(kind, newTrack, oldStreamLabel) {
  peers.forEach(({ pc }) => {
    const senders = pc.getSenders().filter((s) => s.track && s.track.kind === kind);
    if (senders[0]) senders[0].replaceTrack(newTrack);
  });
}

function cleanupPeer(peerId) {
  const entry = peers.get(peerId);
  if (!entry) return;
  try { entry.pc.close(); } catch {}
  removeTile(peerId);
  peers.delete(peerId);
}

// Signaling handlers
socket.on('existing-peers', async ({ peers: existing }) => {
  // Create offer to each existing peer
  for (const peerId of existing) {
    if (peers.size >= MAX_PARTICIPANTS - 1) break; // -1 accounting for self
    await connectToPeer(peerId, true);
  }
});

socket.on('peer-joined', async ({ socketId, name }) => {
  if (peers.has(socketId)) return;
  if (peers.size >= MAX_PARTICIPANTS - 1) return;
  await connectToPeer(socketId, true);
});

socket.on('peer-left', ({ socketId }) => {
  cleanupPeer(socketId);
});

socket.on('signal', async ({ from, data }) => {
  let entry = peers.get(from);
  if (!entry) {
    // Late create if incoming offer
    await connectToPeer(from, false);
    entry = peers.get(from);
  }
  const pc = entry.pc;
  if (data.type === 'candidate' && data.candidate) {
    try { await pc.addIceCandidate(data.candidate); } catch {}
  } else if (data.type === 'offer') {
    await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    socket.emit('signal', { to: from, data: { type: 'answer', sdp: pc.localDescription } });
  } else if (data.type === 'answer') {
    await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
  }
});

async function connectToPeer(peerId, isInitiator) {
  if (peers.has(peerId)) return;

  const videoEl = addTile(peerId, 'Peer', false);
  const pc = createPeerConnection(peerId);
  peers.set(peerId, { pc, videoEl, name: 'Peer' });

  attachLocalTracks(pc);

  if (isInitiator) {
    const offer = await pc.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true });
    await pc.setLocalDescription(offer);
    socket.emit('signal', { to: peerId, data: { type: 'offer', sdp: pc.localDescription } });
  }
}

// Chat
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;
  const payload = { roomId, name: displayName, message: text, ts: Date.now() };
  socket.emit('chat-message', payload);
  appendMessage(payload);
  chatInput.value = '';
});

socket.on('chat-message', ({ name, message, ts, from }) => {
  // Show others' messages; our own are already appended
  if (from === socket.id) return;
  appendMessage({ name, message, ts });
});

// Controls
toggleMicBtn.addEventListener('click', () => {
  audioEnabled = !audioEnabled;
  if (localStream) localStream.getAudioTracks().forEach((t) => (t.enabled = audioEnabled));
  toggleMicBtn.textContent = audioEnabled ? 'Mute' : 'Unmute';
});

toggleCamBtn.addEventListener('click', () => {
  videoEnabled = !videoEnabled;
  if (localStream) localStream.getVideoTracks().forEach((t) => (t.enabled = videoEnabled));
  toggleCamBtn.textContent = videoEnabled ? 'Stop Video' : 'Start Video';
});

shareScreenBtn.addEventListener('click', async () => {
  if (!screenStream) {
    try {
      screenStream = await getScreenStream();
      // Replace outgoing video with screen for all peers
      const screenTrack = screenStream.getVideoTracks()[0];
      replaceTrackOnPeers('video', screenTrack, 'screen');

      screenStream.getVideoTracks()[0].addEventListener('ended', () => {
        stopScreenShare();
      });
    } catch (e) {
      console.error('Screen share failed', e);
    }
  } else {
    stopScreenShare();
  }
  shareScreenBtn.textContent = screenStream ? 'Stop Sharing' : 'Share Screen';
});

function stopScreenShare() {
  if (!screenStream) return;
  const camTrack = localStream?.getVideoTracks()[0] || null;
  if (camTrack) replaceTrackOnPeers('video', camTrack, 'camera');
  screenStream.getTracks().forEach((t) => t.stop());
  screenStream = null;
}

leaveBtn.addEventListener('click', () => {
  // Close connections and navigate back
  peers.forEach(({ pc }, id) => {
    try { pc.close(); } catch {}
  });
  peers.clear();
  if (localStream) localStream.getTracks().forEach((t) => t.stop());
  if (screenStream) screenStream.getTracks().forEach((t) => t.stop());
  window.location.href = '/';
});

// Start
(async function init() {
  try {
    // Create local tile
    const meVideo = addTile('me', displayName, true);
    localStream = await getCameraStream();
    meVideo.srcObject = localStream;

    // Join room
    socket.emit('join-room', { roomId, name: displayName });
  } catch (e) {
    alert('Could not access camera/microphone. Please allow permissions.');
    console.error(e);
  }
})();
