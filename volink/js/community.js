/* ============================================================
   VOLINK — Community / Organizer Side
   ============================================================ */

/* -----------------------------------------------------------
   STATE
   ----------------------------------------------------------- */
let currentRole = localStorage.getItem('volink-role') || '';
let communityProfile = JSON.parse(localStorage.getItem('volink-community-profile') || 'null');
let currentCreateStep = 0;
let createOppData = { title: '', category: '', description: '', date: '', startTime: '', endTime: '', location: '', address: '', slots: '', skills: [], activityTypes: [], communityNeed: '', targetImpact: [] };
let currentViewActivity = null;
let currentViewVolunteer = null;
let communityOppFilter = 'Semua';
let participantTab = 'Confirmed';
let verificationStep = 0;
let communityOpportunities = JSON.parse(localStorage.getItem('volink-community-opportunities') || '[]');

// Mock volunteers for matching
const MOCK_VOLUNTEERS = [
  { id: 'v1', name: 'Raka', avatar: '🧑', causes: ['environment'], skills: ['cleaning', 'photography'], days: ['Sabtu'], location: 'denpasar', fit: 96, rating: 4.8, hours: 24, activities: 6, skillLevel: 'menengah', verified: true },
  { id: 'v2', name: 'Sarah', avatar: '👩', causes: ['education'], skills: ['teaching', 'public-speaking'], days: ['Sabtu', 'Minggu'], location: 'badung', fit: 91, rating: 4.9, hours: 32, activities: 8, skillLevel: 'ahli', verified: true },
  { id: 'v3', name: 'Dika', avatar: '🧑', causes: ['environment', 'community'], skills: ['cleaning', 'event-mgmt'], days: ['Sabtu'], location: 'denpasar', fit: 87, rating: 4.5, hours: 16, activities: 4, skillLevel: 'pemula', verified: false },
  { id: 'v4', name: 'Ayunda', avatar: '👩', causes: ['health'], skills: ['first-aid', 'cooking'], days: ['Minggu'], location: 'gianyar', fit: 85, rating: 4.7, hours: 48, activities: 12, skillLevel: 'ahli', verified: true },
  { id: 'v5', name: 'Budi', avatar: '🧑', causes: ['community'], skills: ['event-mgmt', 'social-media'], days: ['Jumat', 'Sabtu'], location: 'denpasar', fit: 82, rating: 4.3, hours: 20, activities: 5, skillLevel: 'menengah', verified: true },
  { id: 'v6', name: 'Sari', avatar: '👩', causes: ['education', 'community'], skills: ['teaching', 'design'], days: ['Sabtu', 'Minggu'], location: 'tabanan', fit: 79, rating: 4.6, hours: 22, activities: 7, skillLevel: 'menengah', verified: false },
  { id: 'v7', name: 'Fajar', avatar: '🧑', causes: ['environment'], skills: ['cleaning'], days: ['Minggu'], location: 'badung', fit: 76, rating: 4.2, hours: 12, activities: 3, skillLevel: 'pemula', verified: true },
  { id: 'v8', name: 'Dewi', avatar: '👩', causes: ['humanity'], skills: ['cooking', 'first-aid'], days: ['Sabtu'], location: 'denpasar', fit: 73, rating: 4.4, hours: 18, activities: 5, skillLevel: 'menengah', verified: true },
];

// Mock community notifications
const COMMUNITY_NOTIFICATIONS = [
  { icon: '🙋', title: 'Volunteer Baru', desc: 'Raka mengajukan diri untuk Bersih Pantai Sanur', time: '1 jam lalu', unread: true },
  { icon: '📊', title: 'Impact Fit', desc: 'Raka memiliki 96% Impact Fit', time: '1 jam lalu', unread: true },
  { icon: '✅', title: 'Volunteer Bergabung', desc: '3 volunteer baru bergabung minggu ini', time: '3 jam lalu', unread: false },
  { icon: '⏰', title: 'Pengingat', desc: 'Kegiatan "Bersih Pantai Sanur" dimulai besok', time: '5 jam lalu', unread: false },
  { icon: '💚', title: 'Impact Verified', desc: 'Impact report untuk "Donor Darah Bersama" berhasil diverifikasi', time: '2 hari lalu', unread: false },
];

// Mock participants per activity
const MOCK_PARTICIPANTS = {
  'a1': [
    { name: 'Raka', avatar: '🧑', fit: 96, status: 'Confirmed', checkedIn: true },
    { name: 'Sarah', avatar: '👩', fit: 91, status: 'Confirmed', checkedIn: true },
    { name: 'Dika', avatar: '🧑', fit: 87, status: 'Confirmed', checkedIn: false },
    { name: 'Ayunda', avatar: '👩', fit: 85, status: 'Pending', checkedIn: false },
    { name: 'Budi', avatar: '🧑', fit: 82, status: 'Waitlist', checkedIn: false },
  ],
};

// Verification data
let communityVerification = JSON.parse(localStorage.getItem('volink-community-verification') || '{"status":"none","step":0}');

/* -----------------------------------------------------------
   ROLE SELECTION
   ----------------------------------------------------------- */
function selectRole(role) {
  currentRole = role;
  localStorage.setItem('volink-role', role);
  if (role === 'volunteer') {
    showToast('Masuk sebagai Volunteer', 'success');
    const saved = localStorage.getItem('volink-profile');
    if (saved) { showScreen('home'); } else { showScreen('login'); }
  } else if (role === 'community') {
    showToast('Masuk sebagai Community Organizer', 'success');
    if (communityProfile) {
      showScreen('community-home');
    } else {
      showScreen('community-signup');
    }
  } else if (role === 'admin') {
    showToast('Masuk sebagai Admin', 'success');
    if (isAdminLoggedIn) {
      showScreen('admin-home');
    } else {
      showScreen('admin-login');
    }
  }
}

/* -----------------------------------------------------------
   COMMUNITY SIGN UP
   ----------------------------------------------------------- */
function renderCommunitySignup() {
  const container = document.getElementById('communitySignupBody');
  if (!container) return;
  container.innerHTML = `
    <div class="form-group">
      <label class="form-label">Nama Komunitas / Organisasi *</label>
      <input type="text" class="form-input" id="csName" placeholder="Contoh: Bali Eco Warriors">
    </div>
    <div class="form-group">
      <label class="form-label">Email *</label>
      <input type="email" class="form-input" id="csEmail" placeholder="komunitas@email.com">
    </div>
    <div class="form-group">
      <label class="form-label">Nomor Telepon *</label>
      <input type="tel" class="form-input" id="csPhone" placeholder="+62 812 3456 7890">
    </div>
    <div class="form-group">
      <label class="form-label">Lokasi *</label>
      <select class="form-input" id="csLocation">
        <option value="">Pilih lokasi</option>
        ${LOCATIONS.map(l => `<option value="${l.id}">${l.label}</option>`).join('')}
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Kategori Komunitas *</label>
      <div class="edit-tags" id="csCategory"></div>
    </div>
    <div class="form-group">
      <label class="form-label">Deskripsi Singkat</label>
      <textarea class="form-input" id="csDesc" rows="3" placeholder="Ceritakan tentang komunitas kamu..."></textarea>
    </div>
    <div class="form-group">
      <label class="form-label">Website / Social Media</label>
      <input type="url" class="form-input" id="csWebsite" placeholder="https://...">
    </div>
    <div class="form-group">
      <label class="form-label">Nama Contact Person *</label>
      <input type="text" class="form-input" id="csContact" placeholder="Nama lengkap">
    </div>
    <button class="btn-primary-lg" onclick="submitCommunitySignup()">Daftar sebagai Community →</button>`;
  
  const catContainer = document.getElementById('csCategory');
  const categories = ['Lingkungan', 'Pendidikan', 'Kemanusiaan', 'Kesehatan', 'Disabilitas', 'Hewan', 'Komunitas', 'Budaya & Seni', 'Lainnya'];
  let selectedCat = '';
  categories.forEach(cat => {
    const tag = document.createElement('span');
    tag.className = 'edit-tag';
    tag.textContent = cat;
    tag.addEventListener('click', () => {
      catContainer.querySelectorAll('.edit-tag').forEach(t => t.classList.remove('selected'));
      tag.classList.add('selected');
      selectedCat = cat;
      catContainer.dataset.selected = cat;
    });
    catContainer.appendChild(tag);
  });
}

function submitCommunitySignup() {
  const name = document.getElementById('csName').value.trim();
  const email = document.getElementById('csEmail').value.trim();
  const phone = document.getElementById('csPhone').value.trim();
  const location = document.getElementById('csLocation').value;
  const category = document.getElementById('csCategory').dataset.selected || '';
  const desc = document.getElementById('csDesc').value.trim();
  const website = document.getElementById('csWebsite').value.trim();
  const contact = document.getElementById('csContact').value.trim();

  if (!name || !email || !phone || !location || !category || !contact) {
    showToast('Mohon lengkapi semua field yang diperlukan', 'warning');
    return;
  }

  communityProfile = { name, email, phone, location, category, description: desc, website, contactPerson: contact, emoji: '\u{1F33F}', verified: false, totalActivities: 0, rating: 0, members: 0 };
  localStorage.setItem('volink-community-profile', JSON.stringify(communityProfile));

  // Register in shared store as pending (needs admin approval)
  VolinkStore.addCommunity({
    name: name, emoji: '\u{1F33F}', category: category, location: location,
    contactPerson: contact, email: email, phone: phone, description: desc,
    website: website, socialMedia: '',
  });

  showToast('Registrasi berhasil! Menunggu verifikasi admin...', 'success');
  showScreen('community-home');
}

/* -----------------------------------------------------------
   COMMUNITY DASHBOARD
   ----------------------------------------------------------- */
function renderCommunityDashboard() {
  if (!communityProfile) { showScreen('community-signup'); return; }
  
  // Check verification status from shared store
  var myCommunities = VolinkStore.getCommunities();
  var myComm = myCommunities.find(function(c) { return c.name === communityProfile.name; });
  var verificationStatus = myComm ? myComm.status : 'unknown';
  var isVerified = verificationStatus === 'verified';

  var myOpps = communityOpportunities;
  var activeOpps = myOpps.filter(o => o.status === 'published' || o.status === 'pending').length;
  var confirmed = myOpps.reduce((s, o) => s + (o.confirmed || 0), 0);
  var needed = myOpps.reduce((s, o) => s + Math.max(0, (o.slots || 0) - (o.confirmed || 0)), 0);

  document.getElementById('commDashGreeting').textContent = 'Selamat datang, ' + communityProfile.name + ' \u{1F44B}';

  document.getElementById('commDashStats').innerHTML = `
    <div class="comm-stat-card" style="grid-column:1/-1;background:${isVerified ? 'linear-gradient(135deg,#DCFCE7,#BBF7D0)' : 'linear-gradient(135deg,#FEF3C7,#FDE68A)'};border-color:${isVerified ? '#16A34A' : '#F59E0B'}">
      <div class="comm-stat-num" style="font-size:0.9rem;color:${isVerified ? '#16A34A' : '#D97706'}">${isVerified ? '\u2705 Terverifikasi Admin' : '\u23F3 Menunggu Verifikasi Admin'}</div>
      <div class="comm-stat-label">${isVerified ? 'Komunitas kamu sudah diverifikasi' : 'Status: ' + verificationStatus}</div>
    </div>
    <div class="comm-stat-card"><div class="comm-stat-num">${activeOpps}</div><div class="comm-stat-label">Kegiatan</div></div>
    <div class="comm-stat-card"><div class="comm-stat-num">${confirmed}</div><div class="comm-stat-label">Volunteer</div></div>
    <div class="comm-stat-card"><div class="comm-stat-num">${needed}</div><div class="comm-stat-label">Dibutuhkan</div></div>
    <div class="comm-stat-card"><div class="comm-stat-num">126</div><div class="comm-stat-label">Jam Volunteer</div></div>`;

  document.getElementById('commDashActions').innerHTML = `
    <div class="quick-actions">
      <button class="quick-action-btn" onclick="showScreen('community-create-opportunity')"><div class="qa-icon" style="background:rgba(22,163,74,0.1)">➕</div><span>Buat Kegiatan</span></button>
      <button class="quick-action-btn" onclick="showScreen('community-find-volunteers')"><div class="qa-icon" style="background:rgba(15,118,110,0.1)">🔍</div><span>Cari Volunteer</span></button>
      <button class="quick-action-btn" onclick="showScreen('community-participants')"><div class="qa-icon" style="background:rgba(251,191,36,0.15)">👥</div><span>Kelola Peserta</span></button>
      <button class="quick-action-btn" onclick="showScreen('community-impact-stats')"><div class="qa-icon" style="background:rgba(139,92,246,0.1)">📊</div><span>Lihat Impact</span></button>
    </div>`;

  const oppContainer = document.getElementById('commDashOpps');
  if (communityOpportunities.length === 0) {
    oppContainer.innerHTML = `<div class="empty-state"><div class="empty-icon">📋</div><h4>Belum ada kegiatan</h4><p>Mulai buat kegiatan pertamamu</p><button class="btn-primary-lg" onclick="showScreen('community-create-opportunity')" style="margin-top:12px">Buat Kegiatan →</button></div>`;
  } else {
    oppContainer.innerHTML = communityOpportunities.slice(0, 3).map(o => `
      <div class="comm-opp-card" onclick="showScreen('community-activity-live');renderActivityManagement('${o.id}')">
        <div class="comm-opp-top">
          <span class="comm-opp-title">${o.title}</span>
          <span class="comm-status-badge ${o.status}">${getStatusLabel(o.status)}</span>
        </div>
        <div class="comm-opp-meta">📅 ${formatDateShort(o.date)} · 📍 ${getLocationLabel(o.location)}</div>
        <div class="comm-opp-volunteers">👥 ${o.confirmed || 0}/${o.slots} volunteer</div>
        ${o.communityNeed ? `<div class="comm-opp-need"><img src="volink_logo.jpg" alt="VOLINK" style="width:14px;height:14px;border-radius:4px;object-fit:cover;vertical-align:middle"> ${o.communityNeed}</div>` : ''}
      </div>`).join('');
  }
}

function getStatusLabel(status) {
  const labels = { published: 'Published', draft: 'Draft', completed: 'Completed', live: 'LIVE', pending: 'Pending', verified: 'Verified', rejected: 'Rejected', 'need-revision': 'Need Revision' };
  return labels[status] || status;
}

function getLocationLabel(id) {
  const loc = LOCATIONS.find(l => l.id === id);
  return loc ? loc.label : id;
}

/* -----------------------------------------------------------
   CREATE OPPORTUNITY (Multi-step)
   ----------------------------------------------------------- */
function renderCreateOpportunity() {
  currentCreateStep = 0;
  renderCreateStep();
}

function renderCreateStep() {
  const container = document.getElementById('createOppBody');
  const progress = document.getElementById('createOppProgress');
  if (!container) return;
  progress.style.width = ((currentCreateStep + 1) / 4 * 100) + '%';

  const steps = ['Informasi Dasar', 'Tanggal & Waktu', 'Lokasi & Kebutuhan', 'Target Dampak'];
  document.getElementById('createOppStepLabel').textContent = `Langkah ${currentCreateStep + 1} dari 4: ${steps[currentCreateStep]}`;

  if (currentCreateStep === 0) {
    container.innerHTML = `
      <div class="form-group"><label class="form-label">Judul Kegiatan *</label><input type="text" class="form-input" id="coTitle" value="${createOppData.title}" placeholder="Contoh: Bersih Pantai Sanur"></div>
      <div class="form-group"><label class="form-label">Kategori *</label>
        <select class="form-input" id="coCategory">
          <option value="">Pilih kategori</option>
          ${CAUSES.map(c => `<option value="${c.id}" ${createOppData.category === c.id ? 'selected' : ''}>${c.emoji} ${c.label}</option>`).join('')}
        </select></div>
      <div class="form-group"><label class="form-label">Deskripsi *</label><textarea class="form-input" id="coDesc" rows="4" placeholder="Jelaskan detail kegiatan...">${createOppData.description}</textarea></div>`;
  } else if (currentCreateStep === 1) {
    container.innerHTML = `
      <div class="form-group"><label class="form-label">Tanggal *</label><input type="date" class="form-input" id="coDate" value="${createOppData.date}"></div>
      <div class="form-group"><label class="form-label">Jam Mulai *</label><input type="time" class="form-input" id="coStartTime" value="${createOppData.startTime}"></div>
      <div class="form-group"><label class="form-label">Jam Selesai *</label><input type="time" class="form-input" id="coEndTime" value="${createOppData.endTime}"></div>`;
  } else if (currentCreateStep === 2) {
    container.innerHTML = `
      <div class="form-group"><label class="form-label">Lokasi *</label>
        <select class="form-input" id="coLocation">
          <option value="">Pilih lokasi</option>
          ${LOCATIONS.map(l => `<option value="${l.id}" ${createOppData.location === l.id ? 'selected' : ''}>${l.label}</option>`).join('')}
        </select></div>
      <div class="form-group"><label class="form-label">Alamat Lengkap</label><input type="text" class="form-input" id="coAddress" value="${createOppData.address}" placeholder="Detail lokasi"></div>
      <div class="form-group"><label class="form-label">Jumlah Volunteer *</label><input type="number" class="form-input" id="coSlots" value="${createOppData.slots}" placeholder="Contoh: 20" min="1"></div>
      <div class="form-group"><label class="form-label">Skill yang Dibutuhkan</label><div class="edit-tags" id="coSkills"></div></div>
      <div class="form-group"><label class="form-label">Jenis Aktivitas</label><div class="edit-tags" id="coActivityTypes"></div></div>`;
    const skillsContainer = document.getElementById('coSkills');
    SKILLS.forEach(s => {
      const tag = document.createElement('span');
      tag.className = 'edit-tag' + (createOppData.skills.includes(s.id) ? ' selected' : '');
      tag.textContent = s.emoji + ' ' + s.label;
      tag.addEventListener('click', () => {
        const idx = createOppData.skills.indexOf(s.id);
        if (idx >= 0) createOppData.skills.splice(idx, 1); else createOppData.skills.push(s.id);
        tag.classList.toggle('selected');
      });
      skillsContainer.appendChild(tag);
    });
    const typesContainer = document.getElementById('coActivityTypes');
    ACTIVITY_TYPES.forEach(t => {
      const tag = document.createElement('span');
      tag.className = 'edit-tag' + (createOppData.activityTypes.includes(t.id) ? ' selected' : '');
      tag.textContent = t.emoji + ' ' + t.label;
      tag.addEventListener('click', () => {
        const idx = createOppData.activityTypes.indexOf(t.id);
        if (idx >= 0) createOppData.activityTypes.splice(idx, 1); else createOppData.activityTypes.push(t.id);
        tag.classList.toggle('selected');
      });
      typesContainer.appendChild(tag);
    });
  } else if (currentCreateStep === 3) {
    container.innerHTML = `
      <div class="form-group"><label class="form-label">Kebutuhan Komunitas</label><textarea class="form-input" id="coNeed" rows="2" placeholder="Contoh: 8 volunteer tambahan dibutuhkan untuk membersihkan area pesisir.">${createOppData.communityNeed}</textarea></div>
      <div class="form-group"><label class="form-label">Target Dampak</label><div id="coImpactRows"></div>
        <button class="btn-ghost" onclick="addImpactRow()" style="margin-top:8px">+ Tambah Target</button></div>`;
    const impactRows = document.getElementById('coImpactRows');
    if (createOppData.targetImpact.length === 0) createOppData.targetImpact = [{ value: '', label: '' }];
    createOppData.targetImpact.forEach((imp, i) => {
      const row = document.createElement('div');
      row.className = 'impact-input-row';
      row.innerHTML = `<input type="text" class="form-input" placeholder="Nilai (contoh: 100 kg)" value="${imp.value}" onchange="createOppData.targetImpact[${i}].value=this.value">
        <input type="text" class="form-input" placeholder="Label (contoh: Sampah terkumpul)" value="${imp.label}" onchange="createOppData.targetImpact[${i}].label=this.value">`;
      impactRows.appendChild(row);
    });
  }
}

function addImpactRow() {
  createOppData.targetImpact.push({ value: '', label: '' });
  renderCreateStep();
}

function createOppNext() {
  saveCreateStepData();
  if (currentCreateStep < 3) { currentCreateStep++; renderCreateStep(); }
}

function createOppBack() {
  saveCreateStepData();
  if (currentCreateStep > 0) { currentCreateStep--; renderCreateStep(); }
}

function saveCreateStepData() {
  if (currentCreateStep === 0) {
    createOppData.title = document.getElementById('coTitle')?.value || '';
    createOppData.category = document.getElementById('coCategory')?.value || '';
    createOppData.description = document.getElementById('coDesc')?.value || '';
  } else if (currentCreateStep === 1) {
    createOppData.date = document.getElementById('coDate')?.value || '';
    createOppData.startTime = document.getElementById('coStartTime')?.value || '';
    createOppData.endTime = document.getElementById('coEndTime')?.value || '';
  } else if (currentCreateStep === 2) {
    createOppData.location = document.getElementById('coLocation')?.value || '';
    createOppData.address = document.getElementById('coAddress')?.value || '';
    createOppData.slots = document.getElementById('coSlots')?.value || '';
  } else if (currentCreateStep === 3) {
    createOppData.communityNeed = document.getElementById('coNeed')?.value || '';
    document.querySelectorAll('#coImpactRows .impact-input-row').forEach((row, i) => {
      const inputs = row.querySelectorAll('input');
      if (createOppData.targetImpact[i]) {
        createOppData.targetImpact[i].value = inputs[0]?.value || '';
        createOppData.targetImpact[i].label = inputs[1]?.value || '';
      }
    });
  }
}

function publishOpportunity() {
  saveCreateStepData();
  if (!createOppData.title || !createOppData.date || !createOppData.location) {
    showToast('Mohon lengkapi semua field yang diperlukan', 'warning');
    return;
  }
  const causeObj = CAUSES.find(c => c.id === createOppData.category);

  // Add to shared store as pending (needs admin approval)
  VolinkStore.addOpportunity({
    title: createOppData.title,
    communityId: communityProfile._id || 'c_100',
    communityEmoji: '\u{1F33F}',
    communityName: communityProfile.name || 'My Community',
    category: causeObj ? causeObj.label : 'Lainnya',
    date: createOppData.date,
    time: (createOppData.startTime || '08:00') + ' - ' + (createOppData.endTime || '12:00'),
    location: createOppData.location,
    slots: parseInt(createOppData.slots) || 10,
    description: createOppData.description,
    skills: createOppData.skills,
    skillLevel: 'pemula',
    activityTypes: createOppData.activityTypes,
    communityNeed: createOppData.communityNeed,
    targetImpact: createOppData.targetImpact.filter(t => t.value || t.label).map(function(t) { return t.value + ' ' + t.label; }).join(', '),
  });

  // Also add to local community list
  const newOpp = {
    id: 'co-' + Date.now(),
    title: createOppData.title,
    community: communityProfile?.name || 'My Community',
    causes: createOppData.category ? [createOppData.category] : [],
    skills: createOppData.skills,
    skillLevel: 'pemula',
    activityType: createOppData.activityTypes,
    location: createOppData.location,
    date: createOppData.date,
    time: (createOppData.startTime || '08:00') + ' - ' + (createOppData.endTime || '12:00'),
    slots: parseInt(createOppData.slots) || 10,
    slotsFilled: 0,
    description: createOppData.description,
    targetImpact: createOppData.targetImpact.filter(t => t.value || t.label),
    skillsNeeded: createOppData.skills.map(s => SKILLS.find(sk => sk.id === s)?.label).filter(Boolean).join(', ') || 'Terbuka untuk semua',
    image: causeObj?.emoji || '\u{1F4CB}',
    communityNeed: createOppData.communityNeed,
    status: 'pending',
    confirmed: 0,
  };
  
  communityOpportunities.unshift(newOpp);
  localStorage.setItem('volink-community-opportunities', JSON.stringify(communityOpportunities));
  
  createOppData = { title: '', category: '', description: '', date: '', startTime: '', endTime: '', location: '', address: '', slots: '', skills: [], activityTypes: [], communityNeed: '', targetImpact: [] };
  showToast('Kegiatan dikirim untuk review admin! 📝', 'success');
  showScreen('community-opportunities');
}

/* -----------------------------------------------------------
   COMMUNITY OPPORTUNITIES LIST
   ----------------------------------------------------------- */
function renderCommunityOpportunities() {
  const container = document.getElementById('commOppList');
  if (!container) return;
  
  const tabs = document.getElementById('commOppTabs');
  tabs.innerHTML = '';
  ['Semua', 'Published', 'Draft', 'Selesai'].forEach(t => {
    const btn = document.createElement('button');
    btn.className = 'tab-pill' + (communityOppFilter === t ? ' active' : '');
    btn.textContent = t;
    btn.addEventListener('click', () => { communityOppFilter = t; renderCommunityOpportunities(); });
    tabs.appendChild(btn);
  });

  let filtered = [...communityOpportunities];
  if (communityOppFilter !== 'Semua') {
    const statusMap = { 'Published': 'published', 'Draft': 'draft', 'Selesai': 'completed' };
    filtered = filtered.filter(o => o.status === statusMap[communityOppFilter]);
  }

  if (filtered.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">📋</div><h4>Belum ada kegiatan</h4><p>Buat kegiatan pertamamu untuk menarik volunteer</p><button class="btn-primary-lg" onclick="showScreen('community-create-opportunity')" style="margin-top:12px">Buat Kegiatan →</button></div>`;
    return;
  }

  container.innerHTML = filtered.map(o => `
    <div class="comm-opp-card" onclick="showScreen('community-activity-live');renderActivityManagement('${o.id}')">
      <div class="comm-opp-top">
        <span class="comm-opp-title">${o.title}</span>
        <span class="comm-status-badge ${o.status}">${getStatusLabel(o.status)}</span>
      </div>
      <div class="comm-opp-meta">📅 ${formatDateShort(o.date)} · 📍 ${getLocationLabel(o.location)} · ⏰ ${o.time}</div>
      <div class="comm-opp-slots">
        <div class="slots-bar"><div class="slots-fill" style="width:${((o.confirmed || 0) / (o.slots || 1)) * 100}%"></div></div>
        <span>${o.confirmed || 0}/${o.slots} volunteer</span>
      </div>
      ${o.communityNeed ? `<div class="comm-opp-need">💚 ${o.communityNeed}</div>` : ''}
      <div class="comm-opp-actions">
        <button class="btn-ghost-sm" onclick="event.stopPropagation();currentViewActivity=getActivityById('${o.id}')||communityOpportunities.find(x=>x.id==='${o.id}');showScreen('community-find-volunteers')">🔍 Cari Volunteer</button>
        <button class="btn-ghost-sm" onclick="event.stopPropagation();currentViewActivity=getActivityById('${o.id}')||communityOpportunities.find(x=>x.id==='${o.id}');showScreen('community-participants')">👥 Peserta</button>
      </div>
    </div>`).join('');
}

/* -----------------------------------------------------------
   FIND BEST-FIT VOLUNTEERS
   ----------------------------------------------------------- */
function renderFindVolunteers() {
  const container = document.getElementById('findVolList');
  if (!container) return;
  
  const sorted = [...MOCK_VOLUNTEERS].sort((a, b) => b.fit - a.fit);
  container.innerHTML = sorted.map((v, i) => `
    <div class="comm-vol-card" onclick="openVolunteerDetail('${v.id}')">
      <div class="comm-vol-left">
        <div class="comm-vol-avatar">${v.avatar}</div>
        <div class="comm-vol-info">
          <h4>${v.name} ${v.verified ? '<span class="verified-badge">✅</span>' : ''}</h4>
          <div class="comm-vol-skills">${v.skills.map(s => SKILLS.find(sk => sk.id === s)?.label).filter(Boolean).map(l => `<span class="activity-tag">${l}</span>`).join('')}</div>
          <div class="comm-vol-meta">📍 ${getLocationLabel(v.location)} · ⭐ ${v.rating} · ${v.hours} jam</div>
        </div>
      </div>
      <div class="comm-vol-fit"><div class="fit-num">${v.fit}%</div><div class="fit-label">Impact Fit</div></div>
    </div>`).join('');
}

/* -----------------------------------------------------------
   VOLUNTEER DETAIL (Community Side)
   ----------------------------------------------------------- */
function openVolunteerDetail(volunteerId) {
  const volunteer = MOCK_VOLUNTEERS.find(v => v.id === volunteerId);
  if (!volunteer) return;
  currentViewVolunteer = volunteer;

  const reasons = getVolunteerMatchReasons(volunteer);
  const container = document.getElementById('volunteerProfileBody');
  if (!container) { showScreen('community-volunteer-detail'); return; }

  container.innerHTML = `
    <div class="vol-profile-header">
      <div class="vol-profile-avatar">${volunteer.avatar}</div>
      <h2>${volunteer.name} ${volunteer.verified ? '<span class="verified-badge">✅ Verified</span>' : ''}</h2>
      <div class="vol-profile-dna">🧬 Impact DNA</div>
      <div class="vol-profile-fit">🎯 ${volunteer.fit}% Impact Fit</div>
    </div>
    <div class="vol-section">
      <h3>Kenapa ${volunteer.name} cocok?</h3>
      <ul class="vol-reasons">${reasons.map(r => `<li><span class="check">✓</span> ${r}</li>`).join('')}</ul>
    </div>
    <div class="vol-section">
      <h3>Keahlian</h3>
      <div class="vol-skills">${volunteer.skills.map(s => { const sk = SKILLS.find(x => x.id === s); return sk ? `<span class="activity-tag">${sk.emoji} ${sk.label}</span>` : ''; }).join('')}</div>
    </div>
    <div class="vol-section">
      <h3>Minat</h3>
      <div class="vol-skills">${volunteer.causes.map(c => { const ca = CAUSES.find(x => x.id === c); return ca ? `<span class="activity-tag">${ca.emoji} ${ca.label}</span>` : ''; }).join('')}</div>
    </div>
    <div class="vol-section">
      <h3>Ketersediaan</h3>
      <div class="vol-avail">${volunteer.days.map(d => `<span class="day-pill selected">${d}</span>`).join('')}</div>
    </div>
    <div class="vol-section">
      <h3>Riwayat</h3>
      <div class="vol-history-stats">
        <div class="comm-stat-card"><div class="comm-stat-num">${volunteer.hours}</div><div class="comm-stat-label">Jam Volunteer</div></div>
        <div class="comm-stat-card"><div class="comm-stat-num">${volunteer.activities}</div><div class="comm-stat-label">Kegiatan</div></div>
        <div class="comm-stat-card"><div class="comm-stat-num">⭐ ${volunteer.rating}</div><div class="comm-stat-label">Rating</div></div>
      </div>
    </div>
    <div class="vol-section">
      <h3>Impact Passport</h3>
      <div class="vol-passport">${volunteer.activities} kegiatan selesai · ${volunteer.hours} jam kontribusi · ${volunteer.rating} rating</div>
    </div>
    <div class="vol-actions">
      <button class="btn-primary-lg" onclick="approveVolunteer('${volunteer.id}')">✅ Approve</button>
      <button class="btn-ghost" onclick="showToast('Volunteer ditolak','info');goBack()" style="color:#EF4444;border-color:#FEE2E2">Tolak</button>
      <button class="btn-ghost" onclick="showToast('Fitur pesan segera hadir','info')">💬 Kirim Pesan</button>
    </div>`;

  showScreen('community-volunteer-detail');
}

function approveVolunteer(volunteerId) {
  showToast('Volunteer berhasil diapprove! ✅', 'success');
  goBack();
}

/* -----------------------------------------------------------
   WHY THIS VOLUNTEER (Reverse Matching)
   ----------------------------------------------------------- */
function getVolunteerMatchReasons(volunteer) {
  const reasons = [];
  const activity = currentViewActivity;
  if (activity) {
    if (volunteer.causes.some(c => (activity.causes || []).includes(c))) {
      const cause = CAUSES.find(c => volunteer.causes.includes(c.id) && (activity.causes || []).includes(c.id));
      if (cause) reasons.push(`Minat ${cause.label} sesuai`);
    }
    if (volunteer.skills.some(s => (activity.skills || []).includes(s))) {
      const skill = SKILLS.find(sk => volunteer.skills.includes(sk.id) && (activity.skills || []).includes(sk.id));
      if (skill) reasons.push(`Skill ${skill.label} sesuai`);
    }
    if (volunteer.location === activity.location) {
      reasons.push('Lokasi dekat');
    }
    if (volunteer.days.length > 0) {
      const activityDay = new Date(activity.date + 'T00:00:00').toLocaleDateString('id-ID', { weekday: 'long' });
      if (volunteer.days.includes(activityDay)) reasons.push('Hari sesuai jadwal');
    }
  }
  if (volunteer.fit >= 90) reasons.push('Impact Fit sangat tinggi');
  if (volunteer.verified) reasons.push('Terverifikasi');
  if (volunteer.rating >= 4.5) reasons.push('Rating tinggi');
  if (reasons.length === 0) reasons.push('Cocok secara umum');
  return reasons;
}

/* -----------------------------------------------------------
   PARTICIPANT MANAGEMENT
   ----------------------------------------------------------- */
function renderParticipants() {
  const container = document.getElementById('participantList');
  if (!container) return;
  const tabs = document.getElementById('participantTabs');
  tabs.innerHTML = '';
  ['Confirmed', 'Pending', 'Waitlist', 'Completed'].forEach(t => {
    const btn = document.createElement('button');
    btn.className = 'tab-pill' + (participantTab === t ? ' active' : '');
    btn.textContent = t;
    btn.addEventListener('click', () => { participantTab = t; renderParticipants(); });
    tabs.appendChild(btn);
  });

  const actId = currentViewActivity?.id || 'a1';
  const participants = MOCK_PARTICIPANTS[actId] || MOCK_PARTICIPANTS['a1'];
  const filtered = participants.filter(p => p.status === participantTab);

  if (filtered.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">👥</div><h4>Belum ada peserta</h4><p>Volunteer ${participantTab.toLowerCase()} akan muncul di sini</p></div>`;
    return;
  }

  container.innerHTML = filtered.map(p => `
    <div class="comm-participant-card">
      <div class="comm-participant-left">
        <span class="comm-participant-avatar">${p.avatar}</span>
        <div>
          <div class="comm-participant-name">${p.name}</div>
          <div class="comm-participant-meta">${p.fit}% Impact Fit · ${p.status}</div>
        </div>
      </div>
      <div class="comm-participant-status">
        ${p.checkedIn ? '<span class="checkin-badge checked">✓ Checked-in</span>' : '<span class="checkin-badge pending">Belum check-in</span>'}
      </div>
    </div>`).join('');
}

/* -----------------------------------------------------------
   ACTIVITY MANAGEMENT (Live)
   ----------------------------------------------------------- */
function renderActivityManagement(activityId) {
  const activity = communityOpportunities.find(o => o.id === activityId) || getActivityById(activityId);
  if (!activity) return;
  currentViewActivity = activity;

  const participants = MOCK_PARTICIPANTS[activityId] || MOCK_PARTICIPANTS['a1'];
  const checkedIn = participants.filter(p => p.checkedIn).length;
  const total = participants.length;

  document.getElementById('liveActTitle').textContent = activity.title;
  document.getElementById('liveActProgress').style.width = (total > 0 ? (checkedIn / total * 100) : 0) + '%';
  document.getElementById('liveActCount').textContent = `${checkedIn} / ${total} volunteer checked-in`;
  document.getElementById('liveActMeta').innerHTML = `📅 ${formatDateShort(activity.date)} · 📍 ${getLocationLabel(activity.location)} · ⏰ ${activity.time}`;

  document.getElementById('liveActActions').innerHTML = `
    <button class="btn-ghost" onclick="showScreen('community-participants')">👥 Lihat Peserta</button>
    <button class="btn-ghost" onclick="showToast('Pengumuman terkirim! 📢','success')">📢 Kirim Pengumuman</button>
    <button class="btn-ghost" onclick="showScreen('community-impact-report')">📊 Impact Report</button>
    <button class="btn-ghost" onclick="showToast('Kegiatan ditutup','info');">🔒 Tutup Kegiatan</button>`;
}

/* -----------------------------------------------------------
   COMMUNITY ATTENDANCE
   ----------------------------------------------------------- */
function renderAttendance() {
  const container = document.getElementById('attendanceList');
  if (!container) return;
  const actId = currentViewActivity?.id || 'a1';
  const participants = MOCK_PARTICIPANTS[actId] || MOCK_PARTICIPANTS['a1'];
  const checkedIn = participants.filter(p => p.checkedIn).length;
  const pending = participants.filter(p => !p.checkedIn && p.status === 'Confirmed').length;
  const absent = participants.filter(p => !p.checkedIn && p.status !== 'Confirmed').length;

  document.getElementById('attendanceSummary').innerHTML = `
    <div class="comm-stat-card"><div class="comm-stat-num">${checkedIn}</div><div class="comm-stat-label">Checked-in</div></div>
    <div class="comm-stat-card"><div class="comm-stat-num">${pending}</div><div class="comm-stat-label">Pending</div></div>
    <div class="comm-stat-card"><div class="comm-stat-num">${absent}</div><div class="comm-stat-label">Absent</div></div>
    <div class="comm-stat-card"><div class="comm-stat-num">${participants.length}</div><div class="comm-stat-label">Total Confirmed</div></div>`;

  container.innerHTML = participants.map(p => `
    <div class="comm-participant-card">
      <div class="comm-participant-left">
        <span class="comm-participant-avatar">${p.avatar}</span>
        <div>
          <div class="comm-participant-name">${p.name}</div>
          <div class="comm-participant-meta">${p.fit}% Fit</div>
        </div>
      </div>
      <div class="comm-participant-status">
        ${p.checkedIn ? '<span class="checkin-badge checked">✓ Checked-in</span>' : '<span class="checkin-badge pending">Not checked-in</span>'}
      </div>
    </div>`).join('');
}

/* -----------------------------------------------------------
   COMMUNITY IMPACT REPORT
   ----------------------------------------------------------- */
function renderImpactReport() {
  const activity = currentViewActivity;
  const container = document.getElementById('impactReportBody');
  if (!container) return;

  const targets = activity?.targetImpact || [{ value: '100 kg', label: 'Sampah terkumpul' }, { value: '50 orang', label: 'Pengunjung diedukasi' }];

  container.innerHTML = `
    <h3 style="font-size:1rem;font-weight:700;margin-bottom:12px">Target vs Aktual</h3>
    ${targets.map((t, i) => `
      <div class="impact-report-row">
        <div class="impact-report-target"><strong>Target:</strong> ${t.value} ${t.label}</div>
        <div class="impact-report-actual">
          <label>Aktual:</label>
          <input type="text" class="form-input" value="${t.value}" id="actualVal${i}" placeholder="Masukkan hasil aktual">
        </div>
      </div>`).join('')}
    <div class="impact-report-row">
      <div class="impact-report-target"><strong>Target:</strong> Total Jam Volunteer</div>
      <div class="impact-report-actual">
        <label>Aktual:</label>
        <input type="number" class="form-input" value="54" id="actualHours" placeholder="Jam">
      </div>
    </div>
    <div class="form-group" style="margin-top:16px">
      <label class="form-label">Ringkasan Dampak</label>
      <textarea class="form-input" id="impactSummary" rows="3" placeholder="Tulis ringkasan dampak kegiatan...">${activity?.title || ''}</textarea>
    </div>
    <div class="form-group">
      <label class="form-label">Upload Foto</label>
      <button class="btn-ghost" onclick="showToast('Upload foto (demo)','info')" style="width:100%">📷 Pilih Foto</button>
    </div>
    <button class="btn-primary-lg" onclick="submitImpactReport()" style="margin-top:12px">📤 Submit Impact Report</button>`;
}

function submitImpactReport() {
  // Add to shared store for admin review
  VolinkStore.addImpactReport({
    activity: currentViewActivity ? currentViewActivity.title : 'Kegiatan',
    communityId: communityProfile._id || 'c_100',
    communityName: communityProfile.name || 'My Community',
    communityEmoji: '\u{1F33F}',
    volunteers: MOCK_PARTICIPANTS['a1'] ? MOCK_PARTICIPANTS['a1'].length : 5,
    reported: { waste: '120 kg', people: '85 orang', hours: '54 jam' },
    target: { waste: '100 kg', people: '50 orang', hours: '60 jam' },
  });
  showToast('Impact report berhasil dikirim! Menunggu verifikasi admin...', 'success');
  goBack();
}

/* -----------------------------------------------------------
   IMPACT VERIFICATION
   ----------------------------------------------------------- */
let verifiedVolunteers = {};

function renderImpactVerification() {
  const container = document.getElementById('impactVerifyList');
  if (!container) return;
  const actId = currentViewActivity?.id || 'a1';
  const participants = MOCK_PARTICIPANTS[actId] || MOCK_PARTICIPANTS['a1'];

  container.innerHTML = participants.map((p, i) => `
    <div class="comm-participant-card">
      <div class="comm-participant-left">
        <span class="comm-participant-avatar">${p.avatar}</span>
        <div>
          <div class="comm-participant-name">${p.name}</div>
          <div class="comm-participant-meta">3 jam · 12 kg sampah terkumpul</div>
        </div>
      </div>
      <div class="comm-participant-status">
        ${verifiedVolunteers[actId + '-' + i] ? '<span class="checkin-badge checked">✓ Verified</span>' : `<button class="btn-ghost-sm" onclick="verifyVolunteerContribution('${actId}',${i})">Verifikasi</button>`}
      </div>
    </div>`).join('');
}

function verifyVolunteerContribution(actId, index) {
  verifiedVolunteers[actId + '-' + index] = true;
  renderImpactVerification();
  showToast('Kontribusi volunteer terverifikasi! ✅', 'success');
}

/* -----------------------------------------------------------
   COMMUNITY IMPACT STATISTICS
   ----------------------------------------------------------- */
function renderCommunityImpactStats() {
  const container = document.getElementById('commImpactStatsBody');
  if (!container) return;

  container.innerHTML = `
    <div class="comm-stat-grid">
      <div class="comm-stat-card"><div class="comm-stat-num">${communityOpportunities.length || 48}</div><div class="comm-stat-label">Total Kegiatan</div></div>
      <div class="comm-stat-card"><div class="comm-stat-num">126</div><div class="comm-stat-label">Jam Volunteer</div></div>
      <div class="comm-stat-card"><div class="comm-stat-num">1.2K</div><div class="comm-stat-label">People Reached</div></div>
      <div class="comm-stat-card"><div class="comm-stat-num">95%</div><div class="comm-stat-label">Impact Achieved</div></div>
    </div>
    <div class="comm-section">
      <h3>Dampak per Kategori</h3>
      <div class="comm-category-bars">
        <div class="comm-cat-bar"><span>🌿 Lingkungan</span><div class="slots-bar"><div class="slots-fill" style="width:68%"></div></div><span>68%</span></div>
        <div class="comm-cat-bar"><span>📚 Pendidikan</span><div class="slots-bar"><div class="slots-fill" style="width:20%"></div></div><span>20%</span></div>
        <div class="comm-cat-bar"><span>🏘️ Komunitas</span><div class="slots-bar"><div class="slots-fill" style="width:12%"></div></div><span>12%</span></div>
      </div>
    </div>
    <div class="comm-section">
      <h3>Aktivitas Bulanan</h3>
      <div class="comm-monthly-chart">
        <div class="comm-bar" style="height:40%"><span class="bar-label">Jul</span><span class="bar-value">6</span></div>
        <div class="comm-bar" style="height:65%"><span class="bar-label">Agu</span><span class="bar-value">10</span></div>
        <div class="comm-bar" style="height:80%"><span class="bar-label">Sep</span><span class="bar-value">12</span></div>
        <div class="comm-bar" style="height:50%"><span class="bar-label">Okt</span><span class="bar-value">8</span></div>
        <div class="comm-bar" style="height:90%"><span class="bar-label">Nov</span><span class="bar-value">14</span></div>
        <div class="comm-bar" style="height:60%"><span class="bar-label">Des</span><span class="bar-value">9</span></div>
      </div>
    </div>`;
}

/* -----------------------------------------------------------
   COMMUNITY NOTIFICATIONS
   ----------------------------------------------------------- */
function renderCommunityNotifications() {
  const container = document.getElementById('commNotifList');
  if (!container) return;
  var notifs = VolinkStore.getNotifications('community');
  // Merge with legacy notifications
  var allNotifs = notifs.concat(COMMUNITY_NOTIFICATIONS);
  container.innerHTML = allNotifs.map(function(n) {
    return '<div class="notif-item ' + (n.unread ? 'notif-unread' : '') + '" onclick="this.classList.remove(\'notif-unread\')">' +
      '<div class="notif-icon">' + n.icon + '</div>' +
      '<div class="notif-info"><h4>' + n.title + '</h4><p>' + n.desc + '</p></div>' +
      '<span class="notif-time">' + n.time + '</span></div>';
  }).join('');
}

/* -----------------------------------------------------------
   COMMUNITY PROFILE SETTINGS
   ----------------------------------------------------------- */
function renderCommunityProfileSettings() {
  if (!communityProfile) return;
  const container = document.getElementById('commProfileBody');
  if (!container) return;
  container.innerHTML = `
    <div class="comm-profile-header-card">
      <div class="comm-profile-avatar">${communityProfile.emoji || '🌿'}</div>
      <h2>${communityProfile.name}</h2>
      <span class="comm-status-badge ${communityProfile.verified ? 'verified' : 'pending'}">${communityProfile.verified ? '✅ Verified Community' : '⏳ Verification Pending'}</span>
    </div>
    <div class="form-group"><label class="form-label">Nama Komunitas</label><input type="text" class="form-input" id="cpName" value="${communityProfile.name}"></div>
    <div class="form-group"><label class="form-label">Email</label><input type="email" class="form-input" id="cpEmail" value="${communityProfile.email}"></div>
    <div class="form-group"><label class="form-label">Telepon</label><input type="tel" class="form-input" id="cpPhone" value="${communityProfile.phone}"></div>
    <div class="form-group"><label class="form-label">Deskripsi</label><textarea class="form-input" id="cpDesc" rows="3">${communityProfile.description || ''}</textarea></div>
    <div class="form-group"><label class="form-label">Website / Social Media</label><input type="url" class="form-input" id="cpWebsite" value="${communityProfile.website || ''}"></div>
    <button class="btn-primary-lg" onclick="saveCommunityProfile()">Simpan Perubahan</button>
    <button class="btn-ghost" onclick="showScreen('community-verification')" style="width:100%;margin-top:12px">📋 Verifikasi Komunitas</button>
    <button class="btn-ghost" onclick="doLogout()" style="width:100%;margin-top:12px;color:#EF4444;border-color:#FEE2E2">Keluar</button>`;
}

function saveCommunityProfile() {
  communityProfile.name = document.getElementById('cpName')?.value || communityProfile.name;
  communityProfile.email = document.getElementById('cpEmail')?.value || communityProfile.email;
  communityProfile.phone = document.getElementById('cpPhone')?.value || communityProfile.phone;
  communityProfile.description = document.getElementById('cpDesc')?.value || '';
  communityProfile.website = document.getElementById('cpWebsite')?.value || '';
  localStorage.setItem('volink-community-profile', JSON.stringify(communityProfile));
  showToast('Profil berhasil diperbarui!', 'success');
}

/* -----------------------------------------------------------
   COMMUNITY VERIFICATION FLOW
   ----------------------------------------------------------- */
const VERIFICATION_STEPS = [
  { title: 'Informasi Identitas', fields: ['Nama Lengkap PIC', 'NIK / Nomor Identitas', 'Jabatan'] },
  { title: 'Informasi Organisasi', fields: ['Nama Organisasi', 'Akta Pendirian', 'NPWP', 'Tanggal Berdiri'] },
  { title: 'Bukti Kegiatan', fields: ['Link Galeri Kegiatan', 'Dokumentasi Foto', 'Riwayat Kegiatan'] },
  { title: 'Informasi Kontak', fields: ['Alamat Kantor', 'Telepon Kantor', 'Email Resmi'] },
  { title: 'Submit Verification', fields: [] },
];

function renderCommunityVerification() {
  verificationStep = communityVerification.step || 0;
  renderVerificationStep();
}

function renderVerificationStep() {
  const container = document.getElementById('commVerifyBody');
  if (!container) return;
  const step = VERIFICATION_STEPS[verificationStep];
  document.getElementById('commVerifyProgress').style.width = ((verificationStep + 1) / VERIFICATION_STEPS.length * 100) + '%';
  document.getElementById('commVerifyLabel').textContent = `Langkah ${verificationStep + 1} dari ${VERIFICATION_STEPS.length}: ${step.title}`;

  if (verificationStep < VERIFICATION_STEPS.length - 1) {
    container.innerHTML = `
      ${step.fields.map(f => `<div class="form-group"><label class="form-label">${f} *</label><input type="text" class="form-input" placeholder="Masukkan ${f.toLowerCase()}"></div>`).join('')}
      <button class="btn-primary-lg" onclick="verificationNext()">Lanjut →</button>`;
  } else {
    container.innerHTML = `
      <div class="comm-verify-summary">
        <div class="comm-verify-icon">📋</div>
        <h3>Verifikasi Komunitas</h3>
        <p>Kirim permohonan verifikasi untuk mendapatkan badge "Verified Community".</p>
        <div class="verification-list">
          <div class="verification-item"><span class="v-check">✓</span>Informasi identitas</div>
          <div class="verification-item"><span class="v-check">✓</span>Informasi organisasi</div>
          <div class="verification-item"><span class="v-check">✓</span>Bukti kegiatan</div>
          <div class="verification-item"><span class="v-check">✓</span>Informasi kontak</div>
        </div>
      </div>
      <button class="btn-primary-lg" onclick="submitVerification()">📤 Submit Verifikasi</button>`;
  }
}

function verificationNext() {
  if (verificationStep < VERIFICATION_STEPS.length - 1) {
    verificationStep++;
    communityVerification.step = verificationStep;
    localStorage.setItem('volink-community-verification', JSON.stringify(communityVerification));
    renderVerificationStep();
  }
}

function submitVerification() {
  communityVerification.status = 'pending';
  localStorage.setItem('volink-community-verification', JSON.stringify(communityVerification));
  showToast('Verifikasi berhasil dikirim! Status: Pending 📋', 'success');
  goBack();
}

/* -----------------------------------------------------------
   COMMUNITY NAV
   ----------------------------------------------------------- */
const COMMUNITY_SCREENS = ['community-home', 'community-opportunities', 'community-volunteers-tab', 'community-impact-stats', 'community-profile'];

function showCommunityNav() {
  const nav = document.getElementById('communityNav');
  if (nav) nav.style.display = 'flex';
}

function hideCommunityNav() {
  const nav = document.getElementById('communityNav');
  if (nav) nav.style.display = 'none';
}

function communityTabTo(screen) {
  showScreen(screen);
}

/* -----------------------------------------------------------
   ADMIN TAB NAV
   ----------------------------------------------------------- */
function adminTabTo(screen) {
  showScreen(screen);
}
