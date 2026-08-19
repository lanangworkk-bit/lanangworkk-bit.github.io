/* ============================================================
   VOLINK — Complete App JavaScript
   ============================================================ */

/* ============================================================
   STATE
   ============================================================ */
let currentScreen = 'splash';
let previousScreen = 'home';
let obStep = 0;
let currentActivity = null;
let joinedActivities = [];

let userProfile = {
  name: 'Raka',
  causes: [],
  skills: [],
  skillLevels: {},
  skillLevelSingle: '',
  activityTypes: [],
  days: [],
  startTime: '08:00',
  endTime: '17:00',
  location: '',
  distance: 10,
  causeScores: {},
};

const MAIN_SCREENS = ['home', 'explore', 'activities', 'impact', 'profile'];

/* ============================================================
   ONBOARDING STEPS
   ============================================================ */
const obSteps = [
  {
    title: 'Pilihan Minat',
    subtitle: 'Bidang sosial apa yang paling ingin kamu dukung?',
    data: 'causes',
    type: 'multi',
    items: CAUSES,
  },
  {
    title: 'Skill & Strengths',
    subtitle: 'Skill apa saja yang kamu miliki?',
    data: 'skills',
    type: 'multi',
    items: SKILLS,
  },
  {
    title: 'Level Kemampuan',
    subtitle: 'Seberapa mahir kamu dalam skill yang dipilih?',
    data: 'skillLevelSingle',
    type: 'level',
    items: SKILL_LEVELS,
  },
  {
    title: 'Preferensi Aktivitas',
    subtitle: 'Jenis aktivitas seperti apa yang kamu suka?',
    data: 'activityTypes',
    type: 'multi',
    items: ACTIVITY_TYPES,
  },
  {
    title: 'Ketersediaan',
    subtitle: 'Kapan waktu luangmu untuk volunteer?',
    data: 'days',
    type: 'availability',
  },
  {
    title: 'Lokasi & Jarak',
    subtitle: 'Di mana lokasi terdekatmu?',
    data: 'location',
    type: 'location',
  },
];

/* ============================================================
   SCREEN NAVIGATION
   ============================================================ */
function showScreen(name) {
  const prev = currentScreen;
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(`screen-${name}`);
  if (target) {
    target.classList.add('active');
    target.style.animation = 'none';
    target.offsetHeight;
    target.style.animation = '';
  }
  currentScreen = name;

  const bottomNav = document.getElementById('bottomNav');
  if (MAIN_SCREENS.includes(name)) {
    bottomNav.style.display = 'flex';
    document.querySelectorAll('.nav-item').forEach(n => {
      n.classList.toggle('active', n.dataset.screen === name);
    });
  } else {
    bottomNav.style.display = 'none';
  }

  if (name !== prev) previousScreen = prev;

  renderScreen(name);
  window.scrollTo(0, 0);
}

function tabTo(name) {
  showScreen(name);
}

function goBack() {
  if (previousScreen && previousScreen !== currentScreen) {
    showScreen(previousScreen);
  } else {
    showScreen('home');
  }
}

function renderScreen(name) {
  switch(name) {
    case 'home': renderHome(); break;
    case 'explore': renderExplore(); break;
    case 'activities': renderActivities(); break;
    case 'passport': renderPassport(); break;
    case 'impact': renderImpact(); break;
    case 'profile': renderProfile(); break;
    case 'dna': renderDNA(); break;
    case 'next-recommendation': renderNextRecommendation(); break;
    case 'checkin': renderCheckin(); break;
  }
}

/* ============================================================
   SPLASH
   ============================================================ */
function goToLogin() {
  showScreen('login');
}

function skipToApp() {
  const saved = localStorage.getItem('volink-profile');
  if (saved) {
    userProfile = JSON.parse(saved);
    showScreen('home');
  } else {
    showScreen('login');
  }
}

/* ============================================================
   LOGIN
   ============================================================ */
function togglePass() {
  const input = document.getElementById('loginPass');
  input.type = input.type === 'password' ? 'text' : 'password';
}

function doLogin() {
  const name = document.getElementById('loginName').value;
  if (name) userProfile.name = name;
  showScreen('onboarding');
  renderOnboarding();
}

/* ============================================================
   ONBOARDING
   ============================================================ */
function renderOnboarding() {
  const step = obSteps[obStep];
  document.getElementById('obTitle').textContent = step.title;
  document.getElementById('obSubtitle').textContent = step.subtitle;
  document.getElementById('obProgress').style.width = `${((obStep + 1) / obSteps.length) * 100}%`;
  document.getElementById('obPercent').textContent = `${Math.round(((obStep + 1) / obSteps.length) * 100)}%`;
  document.getElementById('obStepLabel').textContent = `Langkah ${obStep + 1} dari ${obSteps.length}`;
  document.getElementById('obBack').style.display = obStep === 0 ? 'none' : 'flex';

  const body = document.getElementById('obBody');
  body.innerHTML = '';

  if (step.type === 'multi') {
    renderMultiStep(body, step);
  } else if (step.type === 'level') {
    renderLevelStep(body, step);
  } else if (step.type === 'availability') {
    renderAvailabilityStep(body, step);
  } else if (step.type === 'location') {
    renderLocationStep(body, step);
  }

  updateObButton();
}

function renderMultiStep(container, step) {
  container.innerHTML = `<div class="step-title">${step.subtitle}</div><div class="option-grid" id="obOptions"></div>`;
  const grid = document.getElementById('obOptions');

  step.items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'option-card';
    const selected = (userProfile[step.data] || []).includes(item.id);
    if (selected) card.classList.add('selected');
    card.innerHTML = `<span class="emoji">${item.emoji}</span><span class="label">${item.label}</span>`;
    card.addEventListener('click', () => {
      const arr = userProfile[step.data];
      const idx = arr.indexOf(item.id);
      if (idx >= 0) arr.splice(idx, 1);
      else arr.push(item.id);
      card.classList.toggle('selected');
      updateObButton();
    });
    grid.appendChild(card);
  });
}

function renderLevelStep(container, step) {
  container.innerHTML = `<div class="step-title">${step.subtitle}</div><div class="level-grid" id="obLevels"></div>`;
  const grid = document.getElementById('obLevels');
  const icons = ['🌱', '🌿', '🌳'];
  const descs = ['Baru belajar dan ingin mencoba', 'Punya pengalaman volunteer sebelumnya', 'Sangat mahir dan berpengalaman'];

  step.items.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'level-card';
    if (userProfile.skillLevelSingle === item.id) card.classList.add('selected');
    card.innerHTML = `
      <div class="level-icon">${icons[i]}</div>
      <div class="level-info"><h4>${item.label}</h4><p>${descs[i]}</p></div>`;
    card.addEventListener('click', () => {
      userProfile.skillLevelSingle = item.id;
      grid.querySelectorAll('.level-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      updateObButton();
    });
    grid.appendChild(card);
  });
}

function renderAvailabilityStep(container, step) {
  container.innerHTML = `
    <div class="step-title">${step.subtitle}</div>
    <div class="availability-grid">
      <div class="avail-section">
        <div class="avail-label">Pilih hari</div>
        <div class="day-pills" id="dayPills"></div>
      </div>
      <div class="avail-section">
        <div class="avail-label">Jam tersedia</div>
        <div class="time-inputs">
          <input type="time" class="time-input" id="startTime" value="${userProfile.startTime}" onchange="userProfile.startTime=this.value">
          <span class="time-separator">s/d</span>
          <input type="time" class="time-input" id="endTime" value="${userProfile.endTime}" onchange="userProfile.endTime=this.value">
        </div>
      </div>
    </div>`;

  const pills = document.getElementById('dayPills');
  DAYS.forEach(day => {
    const pill = document.createElement('button');
    pill.className = 'day-pill' + (userProfile.days.includes(day) ? ' selected' : '');
    pill.textContent = day;
    pill.addEventListener('click', () => {
      const idx = userProfile.days.indexOf(day);
      if (idx >= 0) userProfile.days.splice(idx, 1);
      else userProfile.days.push(day);
      pill.classList.toggle('selected');
      updateObButton();
    });
    pills.appendChild(pill);
  });
}

function renderLocationStep(container, step) {
  container.innerHTML = `
    <div class="step-title">${step.subtitle}</div>
    <div class="option-grid" id="obLocations" style="grid-template-columns:1fr"></div>
    <div class="slider-container" style="margin-top:20px">
      <div class="slider-header">
        <span class="slider-label">Jarak maksimal</span>
        <span class="slider-value" id="distValue">${userProfile.distance} km</span>
      </div>
      <input type="range" class="slider-track" min="1" max="20" value="${userProfile.distance}"
        oninput="userProfile.distance=parseInt(this.value);document.getElementById('distValue').textContent=this.value+' km'">
    </div>`;

  const grid = document.getElementById('obLocations');
  LOCATIONS.forEach(loc => {
    const card = document.createElement('div');
    card.className = 'option-card';
    if (userProfile.location === loc.id) card.classList.add('selected');
    card.style.textAlign = 'left';
    card.style.display = 'flex';
    card.style.alignItems = 'center';
    card.style.gap = '12px';
    card.style.padding = '16px';
    card.innerHTML = `<span class="emoji">📍</span><span class="label">${loc.label}</span>`;
    card.addEventListener('click', () => {
      userProfile.location = loc.id;
      grid.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      updateObButton();
    });
    grid.appendChild(card);
  });
}

function updateObButton() {
  const btn = document.getElementById('obNext');
  const step = obSteps[obStep];
  let hasSelection = false;

  if (step.type === 'multi') {
    hasSelection = (userProfile[step.data] || []).length > 0;
  } else if (step.type === 'level') {
    hasSelection = !!userProfile.skillLevelSingle;
  } else if (step.type === 'availability') {
    hasSelection = (userProfile.days || []).length > 0;
  } else if (step.type === 'location') {
    hasSelection = !!userProfile.location;
  }

  btn.disabled = !hasSelection;
  btn.textContent = obStep === obSteps.length - 1 ? 'Lihat Impact DNA →' : 'Lanjut →';
}

function obNext() {
  if (obStep < obSteps.length - 1) {
    obStep++;
    renderOnboarding();
  } else {
    generateSkillLevels();
    calculateCauseScores();
    saveProfile();
    showScreen('dna');
  }
}

function obBack() {
  if (obStep > 0) {
    obStep--;
    renderOnboarding();
  }
}

function generateSkillLevels() {
  const levels = ['pemula', 'menengah', 'ahli'];
  userProfile.skills.forEach(s => {
    if (!userProfile.skillLevels[s]) {
      userProfile.skillLevels[s] = levels[Math.floor(Math.random() * 3)];
    }
  });
}

function calculateCauseScores() {
  CAUSES.forEach(c => {
    let score = userProfile.causes.includes(c.id)
      ? 65 + Math.random() * 30
      : 10 + Math.random() * 25;
    userProfile.causeScores[c.id] = Math.round(Math.min(score, 98));
  });
}

function saveProfile() {
  localStorage.setItem('volink-profile', JSON.stringify(userProfile));
}

/* ============================================================
   IMPACT DNA RENDER
   ============================================================ */
function renderDNA() {
  const sorted = Object.entries(userProfile.causeScores).sort((a, b) => b[1] - a[1]);
  const topCauses = sorted.slice(0, 5);

  const barsContainer = document.getElementById('dnaBars');
  barsContainer.innerHTML = '';
  topCauses.forEach(([id, score]) => {
    const cause = CAUSES.find(c => c.id === id);
    barsContainer.innerHTML += `
      <div class="dna-bar-row animate-in animate-delay-${topCauses.indexOf([id, score]) % 3 + 1}">
        <div class="dna-bar-label">${cause.emoji} ${cause.label}</div>
        <div class="dna-bar-track"><div class="dna-bar-fill" data-width="${score}"></div></div>
        <div class="dna-bar-value">${score}%</div>
      </div>`;
  });

  setTimeout(() => {
    document.querySelectorAll('.dna-bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.width + '%';
    });
  }, 200);

  const skillsContainer = document.getElementById('dnaSkills');
  skillsContainer.innerHTML = '';
  userProfile.skills.forEach(s => {
    const skill = SKILLS.find(sk => sk.id === s);
    const level = userProfile.skillLevels[s] || 'Pemula';
    const levelLabel = SKILL_LEVELS.find(l => l.id === level)?.label || 'Pemula';
    skillsContainer.innerHTML += `
      <span class="dna-skill">${skill.emoji} ${skill.label} <span class="level">${levelLabel}</span></span>`;
  });

  const titles = ['Community Changemaker', 'Social Impact Hero', 'Purposeful Volunteer', 'Impact Pioneer'];
  document.getElementById('dnaName').textContent = titles[Math.floor(Math.random() * titles.length)];
}

/* ============================================================
   MATCHING ALGORITHM
   ============================================================ */
function calculateFit(activity) {
  let score = 0;

  const causeMatch = activity.causes.some(c => userProfile.causes.includes(c));
  if (causeMatch) {
    const matchedCauses = activity.causes.filter(c => userProfile.causes.includes(c));
    score += 25 + Math.min(matchedCauses.length * 2.5, 5);
  } else {
    score += 5;
  }

  const skillMatch = activity.skills.some(s => userProfile.skills.includes(s));
  if (skillMatch) {
    const matchedSkills = activity.skills.filter(s => userProfile.skills.includes(s));
    score += 20 + Math.min(matchedSkills.length * 2.5, 5);
  } else {
    score += 5;
  }

  if (userProfile.days.length > 0) {
    const activityDay = new Date(activity.date + 'T00:00:00').toLocaleDateString('id-ID', { weekday: 'long' });
    if (userProfile.days.includes(activityDay)) score += 18;
    else score += 8;
  } else {
    score += 10;
  }

  if (activity.location === userProfile.location) {
    score += 15;
  } else {
    score += 5;
  }

  const typeMatch = activity.activityType.some(t => userProfile.activityTypes.includes(t));
  if (typeMatch) score += 10;
  else score += 3;

  return Math.min(Math.round(score), 97);
}

function getMatchReasons(activity) {
  const reasons = [];

  if (activity.causes.some(c => userProfile.causes.includes(c))) {
    const cause = CAUSES.find(c => activity.causes.includes(c.id) && userProfile.causes.includes(c.id));
    if (cause) reasons.push(`Sesuai minat ${cause.label}`);
  }
  if (activity.skills.some(s => userProfile.skills.includes(s))) {
    const skill = SKILLS.find(sk => activity.skills.includes(sk.id) && userProfile.skills.includes(sk.id));
    if (skill) reasons.push(`Sesuai skill ${skill.label}`);
  }
  if (activity.activityType.some(t => userProfile.activityTypes.includes(t))) {
    reasons.push('Sesuai preferensi aktivitas');
  }
  if (activity.location === userProfile.location) {
    const loc = LOCATIONS.find(l => l.id === activity.location);
    if (loc) reasons.push(`Lokasi di ${loc.label}`);
  }
  if (userProfile.days.length > 0) {
    const activityDay = new Date(activity.date + 'T00:00:00').toLocaleDateString('id-ID', { weekday: 'long' });
    if (userProfile.days.includes(activityDay)) {
      reasons.push('Hari sesuai jadwal');
    }
  }

  return reasons;
}

/* ============================================================
   ACTIVITY CARD
   ============================================================ */
function createActivityCard(activity, showFit = true, compact = false) {
  const community = getCommunity(activity.community);
  const fit = calculateFit(activity);
  const cause = CAUSES.find(c => c.id === activity.causes[0]);

  const card = document.createElement('div');
  card.className = 'activity-card';
  card.innerHTML = `
    <div class="activity-card-top">
      <div class="activity-card-icon" style="background:${cause?.color || '#16A34A'}18">${activity.image}</div>
      <div class="activity-card-info">
        <h3>${activity.title}</h3>
        <p>${community ? community.emoji + ' ' + community.name : ''}</p>
      </div>
      ${showFit ? `<div class="activity-fit">${fit}% Fit</div>` : ''}
    </div>
    <div class="activity-card-meta">
      <span class="activity-meta-item">📅 ${formatDateShort(activity.date)}</span>
      <span class="activity-meta-item">📍 ${LOCATIONS.find(l => l.id === activity.location)?.label || activity.location}</span>
      <span class="activity-meta-item">👥 ${activity.slotsFilled}/${activity.slots}</span>
    </div>
    <div class="activity-card-tags">
      ${activity.causes.map(c => {
        const x = CAUSES.find(y => y.id === c);
        return `<span class="activity-tag">${x.emoji} ${x.label}</span>`;
      }).join('')}
      ${activity.activityType.map(t => {
        const x = ACTIVITY_TYPES.find(y => y.id === t);
        return `<span class="activity-tag">${x.emoji} ${x.label}</span>`;
      }).join('')}
    </div>`;
  card.addEventListener('click', () => openDetail(activity));
  return card;
}

/* ============================================================
   HOME / DASHBOARD
   ============================================================ */
function renderHome() {
  const name = userProfile.name || 'Raka';
  document.getElementById('homeName').textContent = name;
  document.getElementById('completionName').textContent = name;

  const hour = new Date().getHours();
  let greeting = 'Siap menciptakan dampak hari ini?';
  if (hour < 11) greeting = 'Selamat pagi! Siap berkontribusi?';
  else if (hour < 15) greeting = 'Selamat siang! Ada kegiatan untukmu';
  else if (hour < 18) greeting = 'Selamat sore! Waktunya berdampak';
  else greeting = 'Malam! Lihat kegiatan besok?';
  document.getElementById('homeGreeting').textContent = greeting;

  const pillsContainer = document.getElementById('causePills');
  pillsContainer.innerHTML = '';
  CAUSES.forEach(cause => {
    const pill = document.createElement('div');
    pill.className = 'cause-pill';
    const isSelected = userProfile.causes.includes(cause.id);
    if (isSelected) pill.classList.add('active');
    pill.innerHTML = `${cause.emoji} ${cause.label}`;
    pill.addEventListener('click', () => {
      pill.classList.toggle('active');
      filterHome();
    });
    pillsContainer.appendChild(pill);
  });

  filterHome();
}

function filterHome() {
  const keyword = document.getElementById('homeSearch')?.value?.toLowerCase() || '';
  const activePills = document.querySelectorAll('.cause-pill.active');
  const activeCauses = Array.from(activePills).map(p => {
    const cause = CAUSES.find(c => p.textContent.includes(c.label));
    return cause?.id;
  }).filter(Boolean);

  const container = document.getElementById('homeRecommendations');
  container.innerHTML = '';

  let filtered = ACTIVITIES.filter(a => {
    const matchKeyword = !keyword || a.title.toLowerCase().includes(keyword) || a.description.toLowerCase().includes(keyword);
    const matchCause = activeCauses.length === 0 || a.causes.some(c => activeCauses.includes(c));
    return matchKeyword && matchCause;
  });

  filtered.sort((a, b) => calculateFit(b) - calculateFit(a));

  if (filtered.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">🔍</div><h4>Tidak ditemukan</h4><p>Coba kata kunci atau filter lain</p></div>`;
    return;
  }

  filtered.slice(0, 4).forEach(a => container.appendChild(createActivityCard(a)));
}

/* ============================================================
   EXPLORE
   ============================================================ */
let exploreFilter = 'Semua';

function renderExplore() {
  const filtersContainer = document.getElementById('exploreFilters');
  filtersContainer.innerHTML = '';
  const filters = ['Semua', ...CAUSES.map(c => c.label)];
  filters.forEach(f => {
    const chip = document.createElement('div');
    chip.className = 'filter-chip' + (f === exploreFilter ? ' active' : '');
    chip.textContent = f;
    chip.addEventListener('click', () => {
      exploreFilter = f;
      renderExplore();
    });
    filtersContainer.appendChild(chip);
  });

  filterExplore();
}

function filterExplore() {
  const keyword = document.getElementById('exploreSearch')?.value?.toLowerCase() || '';
  const list = document.getElementById('exploreList');
  list.innerHTML = '';

  let filtered = ACTIVITIES;

  if (exploreFilter !== 'Semua') {
    const cause = CAUSES.find(c => c.label === exploreFilter);
    if (cause) filtered = filtered.filter(a => a.causes.includes(cause.id));
  }

  if (keyword) {
    filtered = filtered.filter(a => a.title.toLowerCase().includes(keyword) || a.description.toLowerCase().includes(keyword));
  }

  filtered.sort((a, b) => calculateFit(b) - calculateFit(a));

  if (filtered.length === 0) {
    list.innerHTML = `<div class="empty-state"><div class="empty-icon">🔍</div><h4>Tidak ada kegiatan</h4><p>Coba filter atau kata kunci lain</p></div>`;
    return;
  }

  filtered.forEach(a => list.appendChild(createActivityCard(a, true)));
}

/* ============================================================
   DETAIL SCREEN
   ============================================================ */
function openDetail(activity) {
  currentActivity = activity;
  const community = getCommunity(activity.community);
  const fit = calculateFit(activity);
  const reasons = getMatchReasons(activity);
  const cause = CAUSES.find(c => c.id === activity.causes[0]);
  const loc = LOCATIONS.find(l => l.id === activity.location);

  document.getElementById('detailHero').style.background = `${cause?.color || '#16A34A'}12`;
  document.getElementById('detailHero').innerHTML = `<span style="font-size:5rem">${activity.image}</span>`;

  document.getElementById('detailTags').innerHTML = activity.causes.map(c => {
    const x = CAUSES.find(y => y.id === c);
    return `<span class="activity-tag" style="background:${x.color}12;color:${x.color}">${x.emoji} ${x.label}</span>`;
  }).join('') + activity.activityType.map(t => {
    const x = ACTIVITY_TYPES.find(y => y.id === t);
    return `<span class="activity-tag">${x.emoji} ${x.label}</span>`;
  }).join('');

  document.getElementById('detailTitle').textContent = activity.title;

  document.getElementById('detailCommunity').innerHTML = `
    ${community ? `<span>${community.emoji} ${community.name}</span>` : ''}
    ${community?.verified ? '<span class="verified-badge">✅ Verified Community</span>' : '<span class="activity-tag">⚠️ Belum Terverifikasi</span>'}`;

  document.getElementById('detailInfo').innerHTML = `
    <div class="detail-info-item"><div class="label">Tanggal</div><div class="value">${formatDate(activity.date)}</div></div>
    <div class="detail-info-item"><div class="label">Waktu</div><div class="value">🕐 ${activity.time}</div></div>
    <div class="detail-info-item"><div class="label">Lokasi</div><div class="value">📍 ${loc?.label || activity.location}</div></div>
    <div class="detail-info-item"><div class="label">Jenis</div><div class="value">${activity.activityType.map(t => ACTIVITY_TYPES.find(x => x.id === t)?.label).join(', ')}</div></div>`;

  document.getElementById('detailDesc').textContent = activity.description;

  const slotsPercent = (activity.slotsFilled / activity.slots) * 100;
  document.getElementById('detailSlots').innerHTML = `
    <div class="slots-bar"><div class="slots-fill" style="width:${slotsPercent}%"></div></div>
    <div class="slots-text">${activity.slotsFilled}/${activity.slots} volunteer</div>`;

  document.getElementById('detailImpact').innerHTML = activity.targetImpact.map(t =>
    `<div class="impact-target"><div class="num">${t.value}</div><div class="lbl">${t.label}</div></div>`
  ).join('');

  document.getElementById('detailSkills').textContent = activity.skillsNeeded;

  document.getElementById('detailMatch').innerHTML = `
    <h4>Kenapa kegiatan ini cocok untukmu?</h4>
    <div class="match-score">${fit}% Impact Fit</div>
    <div class="match-label">Skor kecocokan berdasarkan Impact DNA kamu</div>
    <ul class="match-reasons">
      ${reasons.map(r => `<li><span class="check">✓</span>${r}</li>`).join('')}
    </ul>`;

  if (community?.verified) {
    document.getElementById('detailVerificationSection').style.display = 'block';
    document.getElementById('detailVerification').innerHTML = `
      <div class="verification-header">
        <span class="verified-badge" style="font-size:0.82rem">✅ Verified Community</span>
        <h4>${community.name}</h4>
      </div>
      <div class="verification-list">
        <div class="verification-item"><span class="v-check">✓</span>Identitas jelas</div>
        <div class="verification-item"><span class="v-check">✓</span>Kegiatan nyata dan terverifikasi</div>
        <div class="verification-item"><span class="v-check">✓</span>Riwayat kegiatan tersedia</div>
        <div class="verification-item"><span class="v-check">✓</span>Review positif dari volunteer</div>
      </div>`;
  } else {
    document.getElementById('detailVerificationSection').style.display = 'none';
  }

  previousScreen = currentScreen;
  showScreen('detail');
}

/* ============================================================
   JOIN CONFIRMATION
   ============================================================ */
function updateConfirm() {
  const checks = document.querySelectorAll('.confirm-check input');
  const allChecked = Array.from(checks).every(c => c.checked);
  document.getElementById('confirmBtn').disabled = !allChecked;

  checks.forEach(c => {
    c.closest('.confirm-check').classList.toggle('checked', c.checked);
  });
}

function confirmJoin() {
  if (currentActivity && !joinedActivities.includes(currentActivity.id)) {
    joinedActivities.push(currentActivity.id);
  }

  if (currentActivity) {
    const completed = JSON.parse(localStorage.getItem('volink-completed') || '[]');
    completed.push({
      activityId: currentActivity.id,
      joinedAt: new Date().toISOString(),
      status: 'joined',
    });
    localStorage.setItem('volink-completed', JSON.stringify(completed));
  }

  showScreen('success');
}

/* ============================================================
   MY ACTIVITIES
   ============================================================ */
function renderActivities() {
  renderUpcoming();
  renderCompleted();
}

function switchActivityTab(tab, btn) {
  document.querySelectorAll('.activities-tabs .tab-pill').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  document.getElementById('activitiesUpcoming').style.display = tab === 'upcoming' ? 'block' : 'none';
  document.getElementById('activitiesCompleted').style.display = tab === 'completed' ? 'block' : 'none';
}

function renderUpcoming() {
  const container = document.getElementById('activitiesUpcoming');
  container.innerHTML = '';

  const upcomingIds = joinedActivities.length > 0
    ? joinedActivities
    : ['a1', 'a2'];

  upcomingIds.forEach(id => {
    const activity = getActivityById(id);
    if (!activity) return;
    const community = getCommunity(activity.community);
    const cause = CAUSES.find(c => c.id === activity.causes[0]);

    const item = document.createElement('div');
    item.className = 'activity-item';
    item.innerHTML = `
      <div class="activity-item-top">
        <div class="activity-item-icon" style="background:${cause?.color || '#16A34A'}18">${activity.image}</div>
        <div class="activity-item-info">
          <h4>${activity.title}</h4>
          <p>${community?.emoji} ${community?.name || ''}</p>
        </div>
        <span class="activity-status status-confirmed">Dikonfirmasi</span>
      </div>
      <div class="activity-item-meta">
        <span class="activity-meta-item">📅 ${formatDateShort(activity.date)}</span>
        <span class="activity-meta-item">🕐 ${activity.time}</span>
        <span class="activity-meta-item">📍 ${LOCATIONS.find(l => l.id === activity.location)?.label || ''}</span>
      </div>
      <div class="activity-item-actions">
        <button class="activity-action-btn" onclick="openDetail(getActivityById('${id}'))">Detail</button>
        <button class="activity-action-btn">📍 Arah</button>
        <button class="activity-action-btn">📞 Kontak</button>
        <button class="activity-action-btn primary" onclick="startCheckin('${id}')">Check-in</button>
      </div>`;
    container.appendChild(item);
  });

  if (container.children.length === 0) {
    container.innerHTML = `<div class="empty-state" style="margin:0 24px"><div class="empty-icon">📋</div><h4>Belum ada kegiatan</h4><p>Yuk mulai bergabung!</p></div>`;
  }
}

function renderCompleted() {
  const container = document.getElementById('activitiesCompleted');
  container.innerHTML = '';

  const completedData = JSON.parse(localStorage.getItem('volink-completed') || '[]');
  const pastActivities = MOCK_IMPACT_HISTORY.slice(0, 4);

  pastActivities.forEach(p => {
    const activity = getActivityById(p.activityId);
    if (!activity) return;
    const community = getCommunity(activity.community);
    const cause = CAUSES.find(c => c.id === activity.causes[0]);

    const item = document.createElement('div');
    item.className = 'activity-item';
    item.innerHTML = `
      <div class="activity-item-top">
        <div class="activity-item-icon" style="background:${cause?.color || '#16A34A'}18">${activity.image}</div>
        <div class="activity-item-info">
          <h4>${activity.title}</h4>
          <p>${community?.emoji} ${community?.name || ''}</p>
        </div>
        <span class="activity-status status-completed">Selesai</span>
      </div>
      <div class="activity-item-meta">
        <span class="activity-meta-item">📅 ${formatDate(p.date)}</span>
        <span class="activity-meta-item">⏱️ ${p.hours} jam</span>
      </div>
      <div class="activity-item-actions">
        <button class="activity-action-btn" onclick="showScreen('passport')">Lihat Dampak</button>
      </div>`;
    container.appendChild(item);
  });

  if (container.children.length === 0) {
    container.innerHTML = `<div class="empty-state" style="margin:0 24px"><div class="empty-icon">✅</div><h4>Belum ada riwayat</h4><p>Selesaikan kegiatan pertamamu!</p></div>`;
  }
}

/* ============================================================
   CHECK-IN
   ============================================================ */
function startCheckin(activityId) {
  const activity = getActivityById(activityId);
  if (activity) currentActivity = activity;
  showScreen('checkin');
}

function renderCheckin() {
  const grid = document.getElementById('qrGrid');
  grid.innerHTML = '';

  const pattern = [];
  for (let i = 0; i < 121; i++) {
    const cell = document.createElement('div');
    cell.className = 'qr-cell';
    const isEdge = (i % 11 < 3 && Math.floor(i / 11) < 3) ||
                   (i % 11 > 7 && Math.floor(i / 11) < 3) ||
                   (i % 11 < 3 && Math.floor(i / 11) > 7);
    const isRandom = Math.random() > 0.5;
    cell.classList.add(isEdge || isRandom ? 'dark' : 'light');
    grid.appendChild(cell);
  }

  if (currentActivity) {
    const loc = LOCATIONS.find(l => l.id === currentActivity.location);
    document.getElementById('checkinInfo').innerHTML = `
      <div class="checkin-info-item">📋 ${currentActivity.title}</div>
      <div class="checkin-info-item">📅 ${formatDateShort(currentActivity.date)} · ${currentActivity.time}</div>
      <div class="checkin-info-item">📍 ${loc?.label || currentActivity.location}</div>`;
  }

  document.getElementById('checkinStatus').className = 'checkin-status';
  document.getElementById('checkinStatus').innerHTML = '<span class="status-dot"></span>Menunggu check-in...';
  document.getElementById('checkinBtn').style.display = '';
}

function doCheckin() {
  document.getElementById('checkinStatus').className = 'checkin-status success';
  document.getElementById('checkinStatus').innerHTML = '✅ Berhasil Check-in!';
  document.getElementById('checkinBtn').style.display = 'none';

  setTimeout(() => {
    showScreen('completion');
    renderCompletion();
  }, 1500);
}

/* ============================================================
   COMPLETION
   ============================================================ */
function renderCompletion() {
  if (!currentActivity) currentActivity = getActivityById('a1') || ACTIVITIES[0];

  const stats = document.getElementById('completionStats');
  const completionData = [
    { num: '3 jam', lbl: 'Waktu terlibat' },
    { num: '12 kg', lbl: currentActivity.causes.includes('environment') ? 'Sampah terkumpul' : 'Kontribusi tercatat' },
    { num: '35 orang', lbl: 'Orang terbantu' },
  ];

  stats.innerHTML = completionData.map(s => `
    <div class="completion-stat">
      <div class="num">${s.num}</div>
      <div class="lbl">${s.lbl}</div>
    </div>`).join('');

  const messages = [
    'Setiap kontribusimu menciptakan dampak nyata. Terima kasih!',
    'Kamu telah membuat perbedaan hari ini. Terus berkontribusi!',
    'Dampakmu tercatat di Impact Passport. Lihat perjalanannya!',
  ];
  document.getElementById('completionMessage').textContent = messages[Math.floor(Math.random() * messages.length)];
}

/* ============================================================
   PASSPORT
   ============================================================ */
function renderPassport() {
  const name = userProfile.name || 'Raka';
  document.getElementById('passportName').textContent = `${name}'s Impact`;
  document.getElementById('passportDNA').textContent = userProfile.causeScores &&
    Object.keys(userProfile.causeScores).length > 0
    ? '🧬 ' + (document.getElementById('dnaName')?.textContent || 'Community Changemaker')
    : '🧬 Community Changemaker';

  const history = document.getElementById('passportHistory');
  history.innerHTML = '';

  MOCK_IMPACT_HISTORY.forEach(p => {
    const activity = getActivityById(p.activityId);
    if (!activity) return;
    const cause = CAUSES.find(c => c.id === activity.causes[0]);

    const item = document.createElement('div');
    item.className = 'passport-history-item';
    item.innerHTML = `
      <div class="passport-history-icon" style="background:${cause?.color || '#16A34A'}15">${activity.image}</div>
      <div class="passport-history-info">
        <h4>${activity.title}</h4>
        <p>${formatDate(p.date)} · ${p.hours} jam</p>
      </div>
      <div class="passport-history-stat">${p.metrics.map(m => m.value).join(' · ')}</div>`;
    history.appendChild(item);
  });
}

/* ============================================================
   IMPACT STATISTICS
   ============================================================ */
function renderImpact() {
  const totalHours = MOCK_IMPACT_HISTORY.reduce((s, h) => s + h.hours, 0);
  const totalPeople = MOCK_IMPACT_HISTORY.reduce((s, h) => {
    const p = h.metrics.find(m => m.label.includes('orang') || m.label.includes('anak') || m.label.includes('siswa') || m.label.includes('pemuda') || m.label.includes('korban') || m.label.includes('Teredukasi'));
    return s + (p ? parseInt(p.value) || 0 : 0);
  }, 0);

  document.getElementById('impactTotalHours').textContent = totalHours;
  document.getElementById('impactTotalPeople').textContent = totalPeople;
  document.getElementById('homeHours').textContent = totalHours;
  document.getElementById('homeActivities').textContent = MOCK_IMPACT_HISTORY.length + joinedActivities.length;
  document.getElementById('homePeople').textContent = totalPeople;
  document.getElementById('passportHours').textContent = totalHours;
  document.getElementById('passportActivities').textContent = MOCK_IMPACT_HISTORY.length + joinedActivities.length;
  document.getElementById('passportPeople').textContent = totalPeople;

  const categoryChart = document.getElementById('impactCategoryChart');
  categoryChart.innerHTML = '';
  const causeCounts = {};
  MOCK_IMPACT_HISTORY.forEach(h => {
    const a = getActivityById(h.activityId);
    if (a) a.causes.forEach(c => { causeCounts[c] = (causeCounts[c] || 0) + 1; });
  });

  const maxCount = Math.max(...Object.values(causeCounts), 1);
  Object.entries(causeCounts).sort((a, b) => b[1] - a[1]).forEach(([id, count]) => {
    const cause = CAUSES.find(c => c.id === id);
    const pct = Math.round((count / maxCount) * 100);
    categoryChart.innerHTML += `
      <div class="category-bar">
        <div class="category-bar-label">${cause.emoji} ${cause.label}</div>
        <div class="category-bar-track">
          <div class="category-bar-fill" style="width:${pct}%;background:${cause.color}"></div>
        </div>
        <div class="category-bar-value">${count}</div>
      </div>`;
  });

  const monthlyChart = document.getElementById('impactMonthlyChart');
  monthlyChart.innerHTML = '';
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const monthData = [0, 0, 0, 0, 0, 0, 3, 3, 1, 0, 0, 0];
  const maxMonth = Math.max(...monthData, 1);

  months.forEach((m, i) => {
    const h = Math.max((monthData[i] / maxMonth) * 120, 8);
    monthlyChart.innerHTML += `
      <div class="monthly-bar-wrap">
        <div class="monthly-bar" style="height:${h}px;opacity:${monthData[i] > 0 ? 1 : 0.3}"></div>
        <div class="monthly-label">${m}</div>
      </div>`;
  });

  const metrics = document.getElementById('impactMetrics');
  metrics.innerHTML = '';
  const allMetrics = [
    { icon: '🧹', label: 'Sampah terkumpul', value: '12 kg' },
    { icon: '📖', label: 'Anak diajar', value: '30 anak' },
    { icon: '📖', label: 'Buku didistribusikan', value: '500 buku' },
    { icon: '🌿', label: 'Mangrove ditanam', value: '200 bibit' },
    { icon: '🩸', label: 'Kantong darah', value: '50 kantong' },
    { icon: '💻', label: 'Workshop terselenggara', value: '1 event' },
  ];

  allMetrics.forEach(m => {
    metrics.innerHTML += `
      <div class="impact-metric-card">
        <div class="impact-metric-icon">${m.icon}</div>
        <div class="impact-metric-info">
          <h4>${m.value}</h4>
          <p>${m.label}</p>
        </div>
      </div>`;
  });
}

/* ============================================================
   NEXT RECOMMENDATION
   ============================================================ */
function renderNextRecommendation() {
  const container = document.getElementById('nextRecList');
  container.innerHTML = '';

  const unjoined = ACTIVITIES.filter(a => !joinedActivities.includes(a.id));
  unjoined.sort((a, b) => calculateFit(b) - calculateFit(a));

  unjoined.slice(0, 3).forEach((a, i) => {
    container.appendChild(createActivityCard(a));
  });
}

/* ============================================================
   PROFILE
   ============================================================ */
function renderProfile() {
  const name = userProfile.name || 'Raka';
  document.getElementById('profileName').textContent = name;

  const dnaName = document.getElementById('dnaName')?.textContent || 'Community Changemaker';
  document.getElementById('profileDNA').textContent = '🧬 ' + dnaName;

  const causesContainer = document.getElementById('profileCauses');
  causesContainer.innerHTML = '';
  if (userProfile.causes.length > 0) {
    userProfile.causes.forEach(cId => {
      const cause = CAUSES.find(c => c.id === cId);
      if (cause) {
        const tag = document.createElement('span');
        tag.className = 'profile-tag green';
        tag.textContent = cause.emoji + ' ' + cause.label;
        causesContainer.appendChild(tag);
      }
    });
  } else {
    causesContainer.innerHTML = '<span class="profile-tag">Belum diatur</span>';
  }

  const skillsContainer = document.getElementById('profileSkills');
  skillsContainer.innerHTML = '';
  if (userProfile.skills.length > 0) {
    userProfile.skills.forEach(sId => {
      const skill = SKILLS.find(s => s.id === sId);
      if (skill) {
        const tag = document.createElement('span');
        tag.className = 'profile-tag';
        tag.textContent = skill.emoji + ' ' + skill.label;
        skillsContainer.appendChild(tag);
      }
    });
  } else {
    skillsContainer.innerHTML = '<span class="profile-tag">Belum diatur</span>';
  }

  const availContainer = document.getElementById('profileAvailability');
  availContainer.innerHTML = '';
  if (userProfile.days.length > 0) {
    userProfile.days.forEach(d => {
      const el = document.createElement('span');
      el.className = 'profile-day';
      el.textContent = d;
      availContainer.appendChild(el);
    });
    const timeEl = document.createElement('span');
    timeEl.className = 'profile-day';
    timeEl.textContent = `${userProfile.startTime} - ${userProfile.endTime}`;
    availContainer.appendChild(timeEl);
  } else {
    availContainer.innerHTML = '<span class="profile-tag">Belum diatur</span>';
  }
}

/* ============================================================
   RESET
   ============================================================ */
function resetApp() {
  localStorage.removeItem('volink-profile');
  localStorage.removeItem('volink-completed');
  userProfile = {
    name: 'Raka', causes: [], skills: [], skillLevels: {},
    skillLevelSingle: '', activityTypes: [], days: [],
    startTime: '08:00', endTime: '17:00', location: '', distance: 10, causeScores: {},
  };
  joinedActivities = [];
  obStep = 0;
  showScreen('splash');
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('volink-profile');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      userProfile = { ...userProfile, ...parsed };
    } catch(e) {}
  }
});
