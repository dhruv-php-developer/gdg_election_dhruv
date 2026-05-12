import './style.css'

// --- Mock Data ---
const PARTIES = {
  NDA: { name: 'NDA', count: 0, prev: 0, color: '#f97316' },
  INDIA: { name: 'INDIA', count: 0, prev: 0, color: '#2563eb' },
  OTH: { name: 'OTH', count: 0, prev: 0, color: '#64748b' }
};

const INSIGHTS_TEMPLATES = [
  "<strong>Urban Shift:</strong> High voter turnout in Mumbai and Delhi favoring {party}.",
  "<strong>Rural Momentum:</strong> Agricultural belt in UP showing strong support for {party}.",
  "<strong>Battleground Alert:</strong> Close contest in Varanasi, margin narrowing to 5,000 votes.",
  "<strong>Swing Factor:</strong> 4% swing detected in Southern states compared to 2019.",
  "<strong>Anti-Incumbency:</strong> Economic concerns driving votes toward {party} in industrial hubs."
];

const CONSTITUENCIES = [
  { 
    name: 'Varanasi', lead: 'NDA', margin: '1.2L', prevWinner: 'NDA', prevMargin: '4.8L', swing: -12,
    candidates: [
      { name: 'Narendra Modi', party: 'NDA', votes: '6,74,322', share: 63 },
      { name: 'Ajay Rai', party: 'INDIA', votes: '5,54,321', share: 31 },
      { name: 'Athar Jamal Lari', party: 'OTH', votes: '45,211', share: 6 }
    ]
  },
  { 
    name: 'Wayanad', lead: 'INDIA', margin: '85k', prevWinner: 'INDIA', prevMargin: '4.3L', swing: -5,
    candidates: [
      { name: 'Rahul Gandhi', party: 'INDIA', votes: '4,50,000', share: 55 },
      { name: 'Annie Raja', party: 'OTH', votes: '3,65,000', share: 38 },
      { name: 'K. Surendran', party: 'NDA', votes: '85,000', share: 7 }
    ]
  },
  { 
    name: 'Lucknow', lead: 'NDA', margin: '42k', prevWinner: 'NDA', prevMargin: '3.4L', swing: +8,
    candidates: [
      { name: 'Rajnath Singh', party: 'NDA', votes: '5,12,000', share: 52 },
      { name: 'Ravidas Mehrotra', party: 'INDIA', votes: '4,70,000', share: 44 },
      { name: 'Sarwar Malik', party: 'OTH', votes: '42,000', share: 4 }
    ]
  },
  { 
    name: 'Hyderabad', lead: 'OTH', margin: '15k', prevWinner: 'OTH', prevMargin: '2.8L', swing: +2,
    candidates: [
      { name: 'Asaduddin Owaisi', party: 'OTH', votes: '3,25,000', share: 48 },
      { name: 'K. Madhavi Latha', party: 'NDA', votes: '3,10,000', share: 45 },
      { name: 'Sammidi Venkat Reddy', party: 'INDIA', votes: '15,000', share: 7 }
    ]
  },
  { 
    name: 'Baramati', lead: 'INDIA', margin: '12k', prevWinner: 'INDIA', prevMargin: '1.5L', swing: -20,
    candidates: [
      { name: 'Supriya Sule', party: 'INDIA', votes: '2,12,000', share: 49 },
      { name: 'Sunetra Pawar', party: 'NDA', votes: '2,00,000', share: 46 },
      { name: 'Sagar Khomane', party: 'OTH', votes: '12,000', share: 5 }
    ]
  }
];

const CANDIDATES = [
  { name: 'Narendra Modi', party: 'NDA', con: 'Varanasi', status: 'Winning', margin: '1.2L' },
  { name: 'Rahul Gandhi', party: 'INDIA', con: 'Rae Bareli', status: 'Winning', margin: '3.4L' },
  { name: 'Amit Shah', party: 'NDA', con: 'Gandhinagar', status: 'Winning', margin: '5.6L' },
  { name: 'Akhilesh Yadav', party: 'INDIA', con: 'Kannauj', status: 'Winning', margin: '1.1L' },
  { name: 'Asaduddin Owaisi', party: 'OTH', con: 'Hyderabad', status: 'Winning', margin: '15k' }
];

// --- State Management ---
const state = {
  nda: 245,
  india: 198,
  oth: 100,
  lastUpdated: new Date()
};

// --- UI Logic ---
function renderMarginTiers() {
  const container = document.querySelector('#margin-tiers-chart');
  const tiers = [
    { label: 'Safe (>1L)', count: 185, color: '#4ade80' },
    { label: 'Competitive (20k-1L)', count: 240, color: '#fbbf24' },
    { label: 'Edge-of-Seat (<20k)', count: 118, color: '#f87171' }
  ];
  
  const total = 543;
  
  container.innerHTML = `
    <div class="tier-track">
      ${tiers.map(t => `<div class="tier-segment" style="width: ${(t.count/total)*100}%; background: ${t.color}" title="${t.label}: ${t.count} seats"></div>`).join('')}
    </div>
    <div class="tier-labels">
      ${tiers.map(t => `
        <div class="tier-label-item">
          <span class="dot" style="background: ${t.color}"></span>
          <span>${t.label}: <strong>${t.count}</strong></span>
        </div>
      `).join('')}
    </div>
  `;
}

function renderLeaderboard() {
  const container = document.querySelector('#state-leaderboard');
  const states = [
    { name: 'Gujarat', party: 'NDA', efficiency: 100 },
    { name: 'Tamil Nadu', party: 'INDIA', efficiency: 92 },
    { name: 'Uttar Pradesh', party: 'NDA', efficiency: 65 },
    { name: 'West Bengal', party: 'INDIA', efficiency: 58 },
    { name: 'Maharashtra', party: 'NDA', efficiency: 52 }
  ];
  
  container.innerHTML = states.map((s, i) => `
    <div class="leader-item">
      <div class="rank">#${i + 1}</div>
      <div class="state-name">${s.name}</div>
      <div class="efficiency-badge" style="background: ${s.party === 'NDA' ? 'var(--party-nda)' : 'var(--party-india)'}20; color: ${s.party === 'NDA' ? 'var(--party-nda)' : 'var(--party-india)'}">
        ${s.efficiency}%
      </div>
    </div>
  `).join('');
}

window.handleSearch = (query) => {
  const resultsEl = document.querySelector('#search-results');
  if (!query || query.length < 2) {
    resultsEl.classList.add('hidden');
    return;
  }
  
  const filtered = CONSTITUENCIES.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase())
  );
  
  if (filtered.length > 0) {
    resultsEl.innerHTML = filtered.map(c => `
      <div class="search-item" onclick="window.openConstituency('${c.name}')">
        <span>${c.name}</span>
        <small style="color: ${c.lead === 'NDA' ? 'var(--party-nda)' : 'var(--party-india)'}">${c.lead} Lead</small>
      </div>
    `).join('');
    resultsEl.classList.remove('hidden');
  } else {
    resultsEl.classList.add('hidden');
  }
};

window.toggleTheme = () => {
  const isLight = document.querySelector('#theme-toggle').checked;
  document.body.setAttribute('data-theme', isLight ? 'light' : 'dark');
};

window.openConstituency = (name) => {
  const c = CONSTITUENCIES.find(con => con.name === name);
  if (!c) return;
  
  const page = document.querySelector('#detail-page');
  const content = document.querySelector('#detail-page-content');
  const navName = document.querySelector('#nav-con-name');
  const resultsEl = document.querySelector('#search-results');
  
  resultsEl.classList.add('hidden');
  navName.innerText = c.name;
  
  content.innerHTML = `
    <div class="con-detail">
      <div class="con-header">
        <div>
          <h2>${c.name} Constituency</h2>
          <span class="live-badge">Live Results</span>
        </div>
        <div class="con-swing-badge" style="color: ${c.swing >= 0 ? '#4ade80' : '#f87171'}">
          ${c.swing >= 0 ? '▲' : '▼'} ${Math.abs(c.swing)}% Swing from 2019
        </div>
      </div>

      <div class="electoral-stats-bar glass">
        <div class="e-stat">
          <label>Total Electors</label>
          <div class="e-val">${c.total_electors || 'N/A'}</div>
        </div>
        <div class="e-stat">
          <label>Voter Turnout</label>
          <div class="e-val">${c.turnout || 'N/A'}%</div>
        </div>
        <div class="e-stat">
          <label>Victory Margin</label>
          <div class="e-val" style="color: var(--accent-cyan)">${c.margin}</div>
        </div>
      </div>

      <div class="candidates-table-wrap">
        <div class="table-header-flex">
          <label>Comprehensive Candidate Breakdown</label>
          <span class="count-tag">${c.candidates.length} Contestants</span>
        </div>
        <div class="table-scroll-wrap">
          <table class="candidates-table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Votes</th>
                <th>Share (%)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${c.candidates.map((can, i) => `
                <tr class="${can.party === c.lead ? 'leading' : ''}">
                  <td>
                    <div class="can-name-cell">
                      <span class="rank-num">#${i + 1}</span>
                      <img src="${can.image || 'https://ui-avatars.com/api/?name=' + can.name}" alt="${can.name}" class="table-can-img">
                      <span class="party-dot" style="background: ${getPartyColor(can.party)}"></span>
                      <div>
                        <div class="name">${can.name}</div>
                        <div class="party-name">${can.party}</div>
                      </div>
                    </div>
                  </td>
                  <td class="votes">${can.votes}</td>
                  <td>
                    <div class="share-cell">
                      <span>${can.share}%</span>
                      <div class="share-mini-bar"><div style="width: ${can.share}%; background: ${getPartyColor(can.party)}"></div></div>
                    </div>
                  </td>
                  <td>
                    <span class="status-badge ${(can.status || '').toLowerCase()}">${can.status || 'N/A'}</span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="con-stats-grid">
        <div class="stat-box glass">
          <label>2019 Historic Winner</label>
          <div class="val">${c.prevWinner}</div>
        </div>
        <div class="stat-box glass">
          <label>2019 Victory Margin</label>
          <div class="val">${c.prevMargin}</div>
        </div>
      </div>
    </div>
  `;
  
  page.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // Lock scroll on main page
};

window.closeDetailPage = () => {
  document.querySelector('#detail-page').classList.add('hidden');
  document.body.style.overflow = 'auto';
};

function getPartyColor(party) {
  if (party === 'NDA') return 'var(--party-nda)';
  if (party === 'INDIA') return 'var(--party-india)';
  if (party === 'NONE') return '#94a3b8';
  return '#64748b';
}

window.closeModal = () => {
  document.querySelector('#con-modal').classList.add('hidden');
};

function updateTally() {
  const ndaEl = document.querySelector('#party-a .seat-count');
  const indiaEl = document.querySelector('#party-b .seat-count');
  const progressEl = document.querySelector('.progress-bar');
  
  // Animate numbers
  animateNumber(ndaEl, state.nda);
  animateNumber(indiaEl, state.india);
  
  // Update Progress Bar
  const total = 543;
  const ndaWidth = (state.nda / total) * 100;
  progressEl.style.width = `${ndaWidth}%`;
}

function animateNumber(el, target) {
  const start = parseInt(el.innerText) || 0;
  const duration = 1000;
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    el.innerText = Math.floor(progress * (target - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  }
  window.requestAnimationFrame(step);
}

function speak(text) {
  const checkbox = document.querySelector('#voice-checkbox');
  if (checkbox && checkbox.checked) {
    const utterance = new SpeechSynthesisUtterance(text.replace(/<[^>]*>/g, ''));
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  }
}

function addInsight() {
  const feed = document.querySelector('#insight-feed');
  const party = Math.random() > 0.5 ? 'NDA' : 'INDIA';
  const template = INSIGHTS_TEMPLATES[Math.floor(Math.random() * INSIGHTS_TEMPLATES.length)];
  const text = template.replace('{party}', party);
  
  const item = document.createElement('div');
  item.className = 'insight-item';
  item.innerHTML = text;
  
  // Remove loading if present
  const loading = feed.querySelector('.loading');
  if (loading) loading.remove();
  
  feed.prepend(item);
  speak(text); // Voice alert!
  
  // Keep only last 5
  if (feed.children.length > 5) {
    feed.lastElementChild.remove();
  }
}

function updateBattlegrounds() {
  const list = document.querySelector('#battlegrounds');
  list.innerHTML = CONSTITUENCIES.map(c => {
    const swingColor = c.swing >= 0 ? '#4ade80' : '#f87171';
    const swingIcon = c.swing >= 0 ? '▲' : '▼';
    
    return `
      <div class="battle-item swing-item" onclick="window.openConstituency('${c.name}')" style="cursor: pointer">
        <div class="battle-main">
          <span class="battle-name">${c.name}</span>
          <span class="battle-status" style="color: ${c.lead === 'NDA' ? 'var(--party-nda)' : 'var(--party-india)'}">
            ${c.lead} Lead (+${c.margin})
          </span>
        </div>
        <div class="swing-badge" style="background: ${swingColor}20; color: ${swingColor}">
          ${swingIcon} ${Math.abs(c.swing)}% Swing
        </div>
        <div class="prev-info">vs 2019: ${c.prevWinner} (+${c.prevMargin})</div>
      </div>
    `;
  }).join('');
}

function updateClock() {
  const el = document.querySelector('#current-time');
  const now = new Date();
  el.innerText = now.toLocaleString('en-IN', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  });
}

// --- Coalition Builder Logic ---
let coalitionNda = 0;
let coalitionIndia = 0;
const INITIAL_OTH = 100;

window.buildCoalition = (target) => {
  const step = 5;
  if (state.oth >= step) {
    state.oth -= step;
    if (target === 'NDA') coalitionNda += step;
    else coalitionIndia += step;
    
    updateCoalitionUI();
    updateTally();
  }
};

window.resetCoalition = () => {
  state.oth += (coalitionNda + coalitionIndia);
  coalitionNda = 0;
  coalitionIndia = 0;
  updateCoalitionUI();
  updateTally();
};

function updateCoalitionUI() {
  document.querySelector('#oth-pool-count').innerText = state.oth;
  const ndaTotal = state.nda + coalitionNda;
  const msg = document.querySelector('#coalition-message');
  
  if (ndaTotal >= 272) {
    msg.innerHTML = `<span style="color: #4ade80">NDA coalition achieves majority (${ndaTotal})!</span>`;
  } else {
    msg.innerText = `NDA needs ${272 - ndaTotal} more seats for majority.`;
  }
}

function renderShareChart() {
  const container = document.querySelector('#share-chart');
  const data = [
    { party: 'NDA', votes: 38, seats: 52 },
    { party: 'INDIA', votes: 42, seats: 36 },
    { party: 'OTH', votes: 20, seats: 12 }
  ];
  
  container.innerHTML = data.map(d => `
    <div class="share-row">
      <div class="share-label">${d.party}</div>
      <div class="share-bars">
        <div class="share-bar vote" style="width: ${d.votes}%" title="Vote Share: ${d.votes}%"></div>
        <div class="share-bar seat" style="width: ${d.seats}%" title="Seat Share: ${d.seats}%"></div>
      </div>
      <div class="share-legend">
        <span>V: ${d.votes}%</span>
        <span>S: ${d.seats}%</span>
      </div>
    </div>
  `).join('');
}

function renderCandidates() {
  const track = document.querySelector('#candidate-list');
  track.innerHTML = CANDIDATES.map(c => `
    <div class="candidate-card glass" onclick="window.openConstituency('${c.con}')">
      <div class="can-header-flex">
        <img src="${c.image}" alt="${c.name}" class="can-img-circle" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=1e293b&color=fff'">
        <div class="can-status-badge ${c.status.toLowerCase()}">${c.status}</div>
      </div>
      <div class="can-main-info">
        <h3>${c.name}</h3>
        <p class="con-name">${c.con}</p>
      </div>
      <div class="can-footer-metrics">
        <div class="m-box">
          <label>Margin</label>
          <div class="m-val">+${c.margin}</div>
        </div>
        <div class="party-tag ${c.party.toLowerCase()}">${c.party}</div>
      </div>
    </div>
  `).join('');
}

window.switchMapView = (view) => {
  const map = document.querySelector('#india-map');
  const demo = document.querySelector('#demographics-view');
  const buttons = document.querySelectorAll('.view-toggle button');
  
  buttons.forEach(b => b.classList.remove('active'));
  if (view === 'map') {
    map.classList.remove('hidden');
    demo.classList.add('hidden');
    buttons[0].classList.add('active');
  } else {
    map.classList.add('hidden');
    demo.classList.remove('hidden');
    buttons[1].classList.add('active');
    renderDemographics();
  }
};

function renderDemographics() {
  const container = document.querySelector('#demographics-view');
  const data = [
    { label: 'Youth (18-35)', nda: 42, india: 38 },
    { label: 'Women', nda: 45, india: 40 },
    { label: 'Rural', nda: 38, india: 48 },
    { label: 'Urban', nda: 52, india: 32 }
  ];
  
  container.innerHTML = `
    <div class="demo-list">
      ${data.map(d => `
        <div class="demo-item">
          <div class="demo-info">
            <span>${d.label}</span>
            <span class="demo-gap">${Math.abs(d.nda - d.india)}% Gap</span>
          </div>
          <div class="demo-bar-track">
            <div class="demo-bar nda" style="width: ${d.nda}%"></div>
            <div class="demo-bar india" style="width: ${d.india}%"></div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}
// --- What-If Simulator Logic ---
const BASE_NDA = 245;
const BASE_INDIA = 198;
const BASE_OTH = 100;

window.runScenario = (type) => {
  const msg = document.querySelector('#scenario-impact-msg');
  // Reset first
  state.nda = BASE_NDA;
  state.india = BASE_INDIA;
  state.oth = BASE_OTH;
  
  switch(type) {
    case 'up-sweep':
      state.india += 40;
      state.nda -= 30;
      state.oth -= 10;
      msg.innerText = "INDIA alliance gains major momentum in North India.";
      break;
    case 'south-wave':
      state.nda += 25;
      state.oth -= 25;
      msg.innerText = "NDA makes unexpected inroads into Southern strongholds.";
      break;
    case 'oth-surge':
      state.oth += 30;
      state.nda -= 15;
      state.india -= 15;
      msg.innerText = "Regional players dominate, leading to a possible hung parliament.";
      break;
    default:
      msg.innerText = "Select a scenario to see the impact.";
  }
  
  updateTally();
  updateCoalitionUI();
};

function updateSentiment() {
  const fill = document.querySelector('#sentiment-fill');
  const val = document.querySelector('#sentiment-val');
  const score = Math.floor(Math.random() * 40) + 40; // 40-80%
  
  fill.style.width = `${score}%`;
  if (score > 70) {
    val.innerText = 'Bullish';
    fill.style.background = 'linear-gradient(to right, #4ade80, #22d3ee)';
  } else if (score > 55) {
    val.innerText = 'Stable';
    fill.style.background = 'linear-gradient(to right, #fbbf24, #4ade80)';
  } else {
    val.innerText = 'Volatile';
    fill.style.background = 'linear-gradient(to right, #f87171, #fbbf24)';
  }
}

// --- Data Engine ---
async function fetchData() {
  try {
    const response = await fetch('/data.json');
    const data = await response.json();
    
    // Update global state and constants
    state.nda = data.tally.nda;
    state.india = data.tally.india;
    state.oth = data.tally.oth;
    
    // Overwrite constants with JSON data
    CONSTITUENCIES.length = 0;
    CONSTITUENCIES.push(...data.constituencies);
    
    CANDIDATES.length = 0;
    CANDIDATES.push(...data.key_candidates);
    
    // Initial UI Render
    updateTally();
    updateBattlegrounds();
    renderCandidates();
    renderShareChart();
    renderLeaderboard();
    renderMarginTiers();
    updateSentiment();
    
    // Populate initial insights
    const feed = document.querySelector('#insight-feed');
    feed.innerHTML = data.insights.map(text => `<div class="insight-item">${text}</div>`).join('');
    
    return data;
  } catch (error) {
    console.error('Error fetching election data:', error);
  }
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', async () => {
  updateClock();
  updateCoalitionUI();
  setInterval(updateClock, 1000);
  
  // Load real data from JSON
  await fetchData();
  
  // Simulate live data updates (small fluctuations)
  setInterval(() => {
    state.nda += Math.floor(Math.random() * 3) - 1;
    state.india += Math.floor(Math.random() * 3) - 1;
    updateTally();
    updateCoalitionUI();
    updateSentiment();
  }, 10000); // Slower updates for "Real Data" mode
  
  // Simulate new insights
  setInterval(addInsight, 12000);
  
  // Initial Map Render
  renderMap();
});

const STATE_DATA = {
  "Uttar Pradesh": { nda: 35, india: 43, oth: 2, lead: 'INDIA' },
  "Gujarat": { nda: 26, india: 0, oth: 0, lead: 'NDA' },
  "Tamil Nadu": { nda: 0, india: 39, oth: 0, lead: 'INDIA' },
  "Maharashtra": { nda: 17, india: 30, oth: 1, lead: 'INDIA' },
  "West Bengal": { nda: 12, india: 29, oth: 1, lead: 'INDIA' },
  "Madhya Pradesh": { nda: 29, india: 0, oth: 0, lead: 'NDA' },
  "Bihar": { nda: 30, india: 9, oth: 1, lead: 'NDA' },
  "Rajasthan": { nda: 14, india: 11, oth: 0, lead: 'NDA' },
  "Karnataka": { nda: 19, india: 9, oth: 0, lead: 'NDA' }
};

function renderMap() {
  const container = document.querySelector('#india-map-svg');
  if (!container) return;

  // High-Fidelity Simplified India State Paths
  const states = [
    { name: "Jammu & Kashmir", d: "M150,20 L180,30 L190,60 L160,70 L140,50 Z" },
    { name: "Punjab", d: "M135,75 L160,75 L165,100 L130,105 Z" },
    { name: "Rajasthan", d: "M80,120 L150,110 L165,185 L90,195 L85,150 Z" },
    { name: "Gujarat", d: "M60,200 L115,200 L125,260 L75,275 L65,230 Z" },
    { name: "Maharashtra", d: "M110,270 L190,270 L205,340 L125,350 L115,310 Z" },
    { name: "Karnataka", d: "M130,355 L175,350 L185,420 L140,430 L130,390 Z" },
    { name: "Kerala", d: "M145,435 L165,435 L160,480 L140,480 Z" },
    { name: "Tamil Nadu", d: "M175,425 L210,425 L205,480 L170,480 Z" },
    { name: "Andhra Pradesh", d: "M195,345 L245,345 L255,415 L190,420 Z" },
    { name: "Telangana", d: "M195,300 L235,300 L240,340 L190,340 Z" },
    { name: "Odisha", d: "M245,280 L290,280 L300,340 L240,340 Z" },
    { name: "Chhattisgarh", d: "M210,230 L250,230 L255,295 L205,295 Z" },
    { name: "Madhya Pradesh", d: "M140,190 L220,190 L230,265 L145,265 Z" },
    { name: "Uttar Pradesh", d: "M175,120 L245,110 L265,175 L180,185 Z" },
    { name: "Bihar", d: "M250,135 L300,130 L310,180 L255,185 Z" },
    { name: "West Bengal", d: "M300,190 L330,190 L320,270 L295,270 Z" },
    { name: "Assam", d: "M340,140 L390,140 L390,180 L340,180 Z" }
  ];

  container.innerHTML = `
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid meet">
      ${states.map(s => {
        const data = STATE_DATA[s.name] || { lead: 'oth', nda: 0, india: 0, oth: 0 };
        return `
          <path d="${s.d}" 
                class="state ${data.lead.toLowerCase()}" 
                data-name="${s.name}"
                onmouseover="window.showMapTooltip(event, '${s.name}')" 
                onmouseout="window.hideMapTooltip()"
                onclick="window.openStateInsights('${s.name}')" />
        `;
      }).join('')}
      <text x="200" y="490" text-anchor="middle" fill="var(--text-dim)" font-size="10" font-weight="600">
        TAP STATES FOR REGIONAL DRILL-DOWN
      </text>
    </svg>
  `;
}

window.showMapTooltip = (e, name) => {
  const tooltip = document.querySelector('#map-tooltip');
  const data = STATE_DATA[name];
  if (!data) return;

  tooltip.innerHTML = `
    <div class="tooltip-header">${name}</div>
    <div class="tooltip-stat">
      <label>NDA</label>
      <span class="val" style="color: var(--party-nda)">${data.nda}</span>
    </div>
    <div class="tooltip-stat">
      <label>INDIA</label>
      <span class="val" style="color: var(--party-india)">${data.india}</span>
    </div>
    <div class="tooltip-stat">
      <label>OTH</label>
      <span class="val">${data.oth}</span>
    </div>
  `;
  
  tooltip.classList.remove('hidden');
  tooltip.style.left = `${e.pageX + 15}px`;
  tooltip.style.top = `${e.pageY + 15}px`;
};

window.hideMapTooltip = () => {
  document.querySelector('#map-tooltip').classList.add('hidden');
};

window.openStateInsights = (name) => {
  const data = STATE_DATA[name];
  speak(`${name} results: NDA leading in ${data.nda} seats, INDIA in ${data.india} seats.`);
  // Filter search to show constituencies from this state
  const searchInput = document.querySelector('#con-search');
  searchInput.value = name;
  window.handleSearch(name);
};

/* Professional Carousel Logic - High Reliability Version */
window.scrollCarousel = (direction) => {
  // Target the viewport that has the overflow-x: auto
  const viewport = document.querySelector('.carousel-viewport');
  if (!viewport) return;
  
  // Get the width of a single card dynamically
  const card = viewport.querySelector('.candidate-card');
  const scrollDistance = card ? card.offsetWidth + 24 : 300; // card + gap

  viewport.scrollBy({
    left: direction * scrollDistance,
    behavior: 'smooth'
  });
};

