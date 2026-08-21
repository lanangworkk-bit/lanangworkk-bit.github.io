/* ============================================================
   VOLINK — Admin / Trust & Safety Layer
   ============================================================ */

/* -----------------------------------------------------------
   STATE
   ----------------------------------------------------------- */
let isAdminLoggedIn = JSON.parse(localStorage.getItem('volink-admin-logged') || 'false');
let adminFilterStatus = 'All';
let adminFilterType = 'All';
let adminFilterPriority = 'All';
let adminSearchQuery = '';
let currentAdminActivity = null;

/* -----------------------------------------------------------
   MOCK DATA
   ----------------------------------------------------------- */
const MOCK_VERIFICATIONS = [
  { id: 'vr1', name: 'Komunitas Peduli Sanur', emoji: '🏖️', category: 'Lingkungan', location: 'Denpasar', contactPerson: 'Wayan Suardana', email: 'wayan@sanurcare.org', phone: '+62 812 3456 7890', description: 'Komunitas peduli pantai Sanur yang fokus pada kebersihan pesisir dan edukasi lingkungan.', website: 'https://sanurcare.org', status: 'pending', date: '2026-08-18', priority: 'high', socialMedia: '@sanurcare', totalActivities: 12, members: 45, verified: false },
  { id: 'vr2', name: 'Yayasan Pendidikan Bali', emoji: '📚', category: 'Pendidikan', location: 'Gianyar', contactPerson: 'Made Wirawan', email: 'made@bali-edu.org', phone: '+62 813 4567 8901', description: 'Menyediakan pendidikan gratis bagi anak-anak di daerah terpencil Bali.', website: 'https://bali-edu.org', status: 'pending', date: '2026-08-17', priority: 'high', socialMedia: '@baliedu', totalActivities: 24, members: 67, verified: false },
  { id: 'vr3', name: 'Bali Animal Rescue', emoji: '🐾', category: 'Hewan', location: 'Badung', contactPerson: 'Ni Kadek Ayu', email: 'ayu@balianimal.org', phone: '+62 811 2345 6789', description: 'Rescue dan adopsi hewan terlantar di Bali.', website: 'https://balianimal.org', status: 'pending', date: '2026-08-16', priority: 'medium', socialMedia: '@balianimal', totalActivities: 18, members: 34, verified: false },
  { id: 'vr4', name: 'Gerakan Sehat Bersama', emoji: '🏥', category: 'Kesehatan', location: 'Denpasar', contactPerson: 'Dr. Putu Tantra', email: 'putu@sehatbersama.id', phone: '+62 812 8765 4321', description: 'Pengobatan gratis dan edukasi kesehatan di pedesaan.', website: 'https://sehatbersama.id', status: 'verified', date: '2026-08-10', priority: 'low', socialMedia: '@sehatbersama', totalActivities: 30, members: 89, verified: true },
  { id: 'vr5', name: 'Digital Youth Hub', emoji: '💻', category: 'Pendidikan', location: 'Denpasar', contactPerson: 'Ketut Budi', email: 'budi@digitalyouth.id', phone: '+62 813 9876 5432', description: 'Pelatihan digital dan literasi komputer bagi pemuda.', website: 'https://digitalyouth.id', status: 'needs-revision', date: '2026-08-14', priority: 'medium', socialMedia: '@digitalyouth', totalActivities: 15, members: 42, verified: false },
];

const MOCK_OPPORTUNITY_REVIEWS = [
  { id: 'or1', title: 'Bersih Pantai Sanur', community: 'Bali Eco Warriors', communityEmoji: '🌊', category: 'Lingkungan', date: '2026-08-29', slots: 20, targetImpact: '100 kg waste', status: 'pending', priority: 'high', description: 'Membersihkan pantai Sanur dari sampah plastik dan edukasi pengunjung.', location: 'Denpasar', skills: ['Cleaning', 'Photography'] },
  { id: 'or2', title: 'Donor Darah Massal', community: 'Gerakan Sehat Bersama', communityEmoji: '🏥', category: 'Kesehatan', date: '2026-09-01', slots: 30, targetImpact: '50 kantong darah', status: 'pending', priority: 'high', description: 'Acara donor darah massal di rumah sakit umum.', location: 'Denpasar', skills: ['First Aid'] },
  { id: 'or3', title: 'Workshop Coding Anak Jalanan', community: 'Digital Youth Hub', communityEmoji: '💻', category: 'Pendidikan', date: '2026-09-05', slots: 15, targetImpact: '20 pemuda terlatih', status: 'pending', priority: 'medium', description: 'Workshop coding gratis untuk anak jalanan.', location: 'Gianyar', skills: ['Programming', 'Teaching'] },
  { id: 'or4', title: 'Adopsi Hewan Shelter', community: 'Bali Animal Rescue', communityEmoji: '🐾', category: 'Hewan', date: '2026-09-10', slots: 10, targetImpact: '20 hewan diadopsi', status: 'approved', priority: 'low', description: 'Acara adopsi hewan dari shelter.', location: 'Badung', skills: ['Social Media', 'Photography'] },
];

const MOCK_IMPACT_VERIFICATIONS = [
  { id: 'iv1', activity: 'Bersih Pantai Sanur', community: 'Bali Eco Warriors', communityEmoji: '🌊', date: '2026-08-15', status: 'pending', priority: 'high', reported: { waste: '120 kg', people: '85 orang', hours: '54 jam' }, target: { waste: '100 kg', people: '50 orang', hours: '60 jam' }, volunteers: 14 },
  { id: 'iv2', activity: 'Mengajar Anak Pesisir', community: 'Yayasan Pendidikan Harapan', communityEmoji: '📖', date: '2026-08-12', status: 'pending', priority: 'high', reported: { waste: '-', people: '30 anak', hours: '36 jam' }, target: { waste: '-', people: '25 anak', hours: '30 jam' }, volunteers: 8 },
  { id: 'iv3', activity: 'Donor Darah Bersama', community: 'Gerakan Sehat Bersama', communityEmoji: '🏥', date: '2026-08-10', status: 'verified', priority: 'low', reported: { waste: '-', people: '100 orang', hours: '45 jam' }, target: { waste: '-', people: '80 orang', hours: '40 jam' }, volunteers: 22 },
  { id: 'iv4', activity: 'Penanaman Mangrove', community: 'Bali Mangrove Action', communityEmoji: '🌿', date: '2026-08-08', status: 'pending', priority: 'medium', reported: { waste: '-', people: '15 orang', hours: '50 jam' }, target: { waste: '-', people: '20 orang', hours: '60 jam' }, volunteers: 18 },
];

const MOCK_REPORTS = [
  { id: 'rp1', type: 'Opportunity', target: 'Bantuan Sosial Banjir', reason: 'Informasi terlihat menyesatkan. Lokasi kegiatan tidak spesifik.', status: 'needs-review', priority: 'high', date: '2026-08-19', reporter: 'Raka' },
  { id: 'rp2', type: 'Community', target: 'Komunitas X', reason: 'Komunitas tidak merespons permohonan verifikasi.', status: 'needs-review', priority: 'medium', date: '2026-08-18', reporter: 'Sarah' },
  { id: 'rp3', type: 'User', target: 'User: Budi Santoso', reason: 'Akun terdeteksi menggunakan identitas palsu.', status: 'resolved', priority: 'low', date: '2026-08-15', reporter: 'Admin' },
  { id: 'rp4', type: 'Impact', target: 'Impact Report: Bank Sampah', reason: 'Data impact tidak konsisten dengan foto dokumentasi.', status: 'needs-review', priority: 'high', date: '2026-08-20', reporter: 'Ayunda' },
];

const MOCK_ADMIN_NOTIFICATIONS = [
  { icon: '📋', title: '12 komunitas menunggu verifikasi', desc: 'Ada 12 komunitas baru yang perlu direview', time: '1 jam lalu', unread: true },
  { icon: '📝', title: 'Kegiatan baru perlu review', desc: 'Bersih Pantai Sanur perlu persetujuan admin', time: '3 jam lalu', unread: true },
  { icon: '📊', title: 'Impact report dikirim', desc: 'Beach Cleanup August mengirim laporan dampak', time: '5 jam lalu', unread: false },
  { icon: '🚩', title: 'Laporan baru diterima', desc: 'User melaporkan aktivitas mencurigakan', time: '1 hari lalu', unread: false },
  { icon: '✅', title: 'Verifikasi selesai', desc: 'Gerakan Sehat Bersama berhasil diverifikasi', time: '2 hari lalu', unread: false },
];

/* -----------------------------------------------------------
   ADMIN LOGIN
   ----------------------------------------------------------- */
function renderAdminLogin() {
  const container = document.getElementById('adminLoginBody');
  if (!container) return;
  container.innerHTML = `
    <div class="form-group">
      <label class="form-label">Email Admin</label>
      <input type="email" class="form-input" id="adminEmail" placeholder="admin@volink.id" value="admin@volink.id">
    </div>
    <div class="form-group">
      <label class="form-label">Password</label>
      <input type="password" class="form-input" id="adminPass" placeholder="Masukkan password" value="admin123">
    </div>
    <button class="btn-primary-lg" onclick="doAdminLogin()">Sign In →</button>
    <p style="text-align:center;font-size:0.8rem;color:var(--gray-400);margin-top:16px">Demo: admin@volink.id / admin123</p>`;
}

function doAdminLogin() {
  const email = document.getElementById('adminEmail')?.value;
  const pass = document.getElementById('adminPass')?.value;
  if (email === 'admin@volink.id' && pass === 'admin123') {
    isAdminLoggedIn = true;
    localStorage.setItem('volink-admin-logged', 'true');
    showToast('Selamat datang, Admin! 👋', 'success');
    showScreen('admin-home');
  } else {
    showToast('Email atau password salah', 'error');
  }
}

function doAdminLogout() {
  isAdminLoggedIn = false;
  localStorage.removeItem('volink-admin-logged');
  showToast('Berhasil logout', 'info');
  showScreen('admin-login');
}

/* -----------------------------------------------------------
   ADMIN OVERVIEW
   ----------------------------------------------------------- */
function renderAdminOverview() {
  const pendingVerif = MOCK_VERIFICATIONS.filter(v => v.status === 'pending').length;
  const verifiedComm = MOCK_VERIFICATIONS.filter(v => v.status === 'verified').length;
  const pendingOpp = MOCK_OPPORTUNITY_REVIEWS.filter(o => o.status === 'pending').length;
  const pendingImpact = MOCK_IMPACT_VERIFICATIONS.filter(i => i.status === 'pending').length;
  const flaggedReports = MOCK_REPORTS.filter(r => r.status === 'needs-review').length;
  const activeComm = MOCK_VERIFICATIONS.filter(v => v.status === 'verified').length + 5;

  document.getElementById('adminDashGreeting').textContent = getAdminGreeting();

  document.getElementById('adminDashStats').innerHTML = `
    <div class="admin-stats-grid">
      <div class="admin-stat-mini admin-stat-pending"><div class="admin-stat-num">${pendingVerif}</div><div class="admin-stat-label">Pending Verifikasi</div></div>
      <div class="admin-stat-mini admin-stat-verified"><div class="admin-stat-num">${verifiedComm}</div><div class="admin-stat-label">Terverifikasi</div></div>
      <div class="admin-stat-mini admin-stat-pending"><div class="admin-stat-num">${pendingOpp}</div><div class="admin-stat-label">Pending Kegiatan</div></div>
      <div class="admin-stat-mini admin-stat-pending"><div class="admin-stat-num">${pendingImpact}</div><div class="admin-stat-label">Laporan Impact</div></div>
      <div class="admin-stat-mini admin-stat-flagged"><div class="admin-stat-num">${flaggedReports}</div><div class="admin-stat-label">Laporan Terbanyak</div></div>
      <div class="admin-stat-mini admin-stat-verified"><div class="admin-stat-num">${activeComm}</div><div class="admin-stat-label">Komunitas Aktif</div></div>
    </div>`;

  const attention = [];
  MOCK_VERIFICATIONS.filter(v => v.status === 'pending').forEach(v => attention.push({ icon: v.emoji, title: v.name, subtitle: 'Community Verification', status: 'Pending', statusType: 'pending', date: v.date, priority: v.priority, cta: 'Review', action: `reviewCommunity('${v.id}')` }));
  MOCK_OPPORTUNITY_REVIEWS.filter(o => o.status === 'pending').forEach(o => attention.push({ icon: o.communityEmoji, title: o.title, subtitle: 'Opportunity Review', status: 'Pending Review', statusType: 'pending', date: o.date, priority: o.priority, cta: 'Review', action: `reviewOpportunity('${o.id}')` }));
  MOCK_IMPACT_VERIFICATIONS.filter(i => i.status === 'pending').forEach(i => attention.push({ icon: i.communityEmoji, title: i.activity, subtitle: 'Impact Verification', status: 'Pending Verification', statusType: 'pending', date: i.date, priority: i.priority, cta: 'Review', action: `reviewImpact('${i.id}')` }));
  MOCK_REPORTS.filter(r => r.status === 'needs-review').forEach(r => attention.push({ icon: '🚩', title: r.target, subtitle: r.type + ' Report', status: 'Needs Review', statusType: 'needs-revision', date: r.date, priority: r.priority, cta: 'Review', action: `reviewReport('${r.id}')` }));

  attention.sort((a, b) => { const p = { high: 0, medium: 1, low: 2 }; return (p[a.priority] || 2) - (p[b.priority] || 2); });

  const container = document.getElementById('adminAttentionList');
  if (attention.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">✅</div><h4>Semua sudah ditinjau</h4><p>Tidak ada yang perlu perhatian saat ini</p></div>`;
  } else {
    container.innerHTML = attention.slice(0, 8).map(a => `
      <div class="admin-attention-card" onclick="${a.action}">
        <div class="admin-attention-left">
          <span class="admin-attention-icon">${a.icon}</span>
          <div>
            <div class="admin-attention-title">${a.title}</div>
            <div class="admin-attention-sub">${a.subtitle}</div>
          </div>
        </div>
        <div class="admin-attention-right">
          <span class="admin-attention-priority priority-${a.priority}">${a.priority}</span>
          <button class="btn-ghost-sm" onclick="event.stopPropagation();${a.action}">${a.cta}</button>
        </div>
      </div>`).join('');
  }
}

function getAdminGreeting() {
  const h = new Date().getHours();
  if (h < 11) return 'Selamat pagi, Admin 👋';
  if (h < 15) return 'Selamat siang, Admin 👋';
  if (h < 18) return 'Selamat sore, Admin 👋';
  return 'Selamat malam, Admin 👋';
}

/* -----------------------------------------------------------
   COMMUNITY VERIFICATION LIST
   ----------------------------------------------------------- */
function renderAdminVerification() {
  const container = document.getElementById('adminVerifList');
  if (!container) return;

  renderAdminFilters('adminVerifFilters', 'verification');

  let filtered = [...MOCK_VERIFICATIONS];
  if (adminFilterStatus !== 'All') filtered = filtered.filter(v => v.status === adminFilterStatus.toLowerCase().replace(' ', '-'));
  if (adminSearchQuery) filtered = filtered.filter(v => v.name.toLowerCase().includes(adminSearchQuery.toLowerCase()));

  if (filtered.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">✅</div><h4>Tidak ada verifikasi</h4><p>Semua komunitas sudah ditinjau</p></div>`;
    return;
  }

  container.innerHTML = filtered.map(v => `
    <div class="admin-list-card" onclick="reviewCommunity('${v.id}')">
      <div class="admin-list-left">
        <span class="admin-list-icon">${v.emoji}</span>
        <div>
          <div class="admin-list-title">${v.name}</div>
          <div class="admin-list-sub">${v.category} · ${getLocationLabel(v.location)}</div>
        </div>
      </div>
      <div class="admin-list-right">
        <span class="comm-status-badge ${v.status}">${getStatusLabel(v.status)}</span>
        <span class="admin-list-date">${formatDateShort(v.date)}</span>
      </div>
    </div>`).join('');
}

/* -----------------------------------------------------------
   COMMUNITY VERIFICATION DETAIL
   ----------------------------------------------------------- */
function reviewCommunity(id) {
  const community = MOCK_VERIFICATIONS.find(v => v.id === id);
  if (!community) return;
  currentAdminActivity = community;

  const container = document.getElementById('adminVerifDetailBody');
  if (!container) { showScreen('admin-verif-detail'); return; }

  container.innerHTML = `
    <div class="admin-detail-header">
      <span class="admin-detail-emoji">${community.emoji}</span>
      <h2>${community.name}</h2>
      <span class="comm-status-badge ${community.status}">${getStatusLabel(community.status)}</span>
    </div>

    <div class="admin-detail-section">
      <h3>Identitas Komunitas</h3>
      <div class="admin-detail-grid">
        <div class="admin-detail-item"><span class="label">Nama</span><span class="value">${community.name}</span></div>
        <div class="admin-detail-item"><span class="label">Contact Person</span><span class="value">${community.contactPerson}</span></div>
        <div class="admin-detail-item"><span class="label">Email</span><span class="value">${community.email}</span></div>
        <div class="admin-detail-item"><span class="label">Telepon</span><span class="value">${community.phone}</span></div>
      </div>
    </div>

    <div class="admin-detail-section">
      <h3>Informasi Organisasi</h3>
      <div class="admin-detail-grid">
        <div class="admin-detail-item"><span class="label">Kategori</span><span class="value">${community.category}</span></div>
        <div class="admin-detail-item"><span class="label">Lokasi</span><span class="value">${getLocationLabel(community.location)}</span></div>
        <div class="admin-detail-item"><span class="label">Website</span><span class="value">${community.website || '-'}</span></div>
        <div class="admin-detail-item"><span class="label">Social Media</span><span class="value">${community.socialMedia || '-'}</span></div>
      </div>
      <p class="admin-detail-desc">${community.description}</p>
    </div>

    <div class="admin-detail-section">
      <h3>Bukti Kegiatan</h3>
      <div class="admin-evidence-grid">
        <div class="admin-evidence-item"><span class="admin-evidence-icon">📷</span><span>Dokumentasi Foto</span><span class="admin-evidence-status">✓ Tersedia</span></div>
        <div class="admin-evidence-item"><span class="admin-evidence-icon">📋</span><span>Riwayat Kegiatan</span><span class="admin-evidence-status">✓ ${community.totalActivities} kegiatan</span></div>
        <div class="admin-evidence-item"><span class="admin-evidence-icon">👥</span><span>Anggota Komunitas</span><span class="admin-evidence-status">✓ ${community.members} orang</span></div>
      </div>
    </div>

    <div class="admin-detail-section">
      <h3>Checklist Verifikasi</h3>
      <div class="admin-checklist">
        <label class="admin-check"><input type="checkbox" checked><span class="checkmark">✓</span> Informasi identitas</label>
        <label class="admin-check"><input type="checkbox" checked><span class="checkmark">✓</span> Informasi organisasi</label>
        <label class="admin-check"><input type="checkbox" checked><span class="checkmark">✓</span> Informasi kontak</label>
        <label class="admin-check"><input type="checkbox"><span class="checkmark">✓</span> Bukti kegiatan</label>
      </div>
    </div>

    <div class="admin-actions">
      <button class="btn-primary-lg" onclick="adminApproveCommunity('${community.id}')">✅ Approve</button>
      <button class="btn-ghost" onclick="adminRevisionCommunity('${community.id}')" style="color:#D97706;border-color:#FEF3C7">🟠 Request Revision</button>
      <button class="btn-ghost" onclick="adminRejectCommunity('${community.id}')" style="color:#EF4444;border-color:#FEE2E2">🔴 Reject</button>
    </div>`;

  showScreen('admin-verif-detail');
}

function adminApproveCommunity(id) {
  const v = MOCK_VERIFICATIONS.find(x => x.id === id);
  if (v) { v.status = 'verified'; v.verified = true; }
  showToast('Community berhasil diverifikasi! ✅', 'success');
  goBack();
}

function adminRevisionCommunity(id) {
  const v = MOCK_VERIFICATIONS.find(x => x.id === id);
  if (v) v.status = 'needs-revision';
  showToast('Revision request sent to community 🟠', 'info');
  goBack();
}

function adminRejectCommunity(id) {
  const v = MOCK_VERIFICATIONS.find(x => x.id === id);
  if (v) v.status = 'rejected';
  showToast('Community ditolak 🔴', 'info');
  goBack();
}

/* -----------------------------------------------------------
   OPPORTUNITY MODERATION LIST
   ----------------------------------------------------------- */
function renderAdminOpportunities() {
  const container = document.getElementById('adminOppList');
  if (!container) return;

  renderAdminFilters('adminOppFilters', 'opportunity');

  let filtered = [...MOCK_OPPORTUNITY_REVIEWS];
  if (adminFilterStatus !== 'All') filtered = filtered.filter(o => o.status === adminFilterStatus.toLowerCase().replace(' ', '-'));
  if (adminSearchQuery) filtered = filtered.filter(o => o.title.toLowerCase().includes(adminSearchQuery.toLowerCase()));

  if (filtered.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">✅</div><h4>Tidak ada kegiatan</h4><p>Semua kegiatan sudah ditinjau</p></div>`;
    return;
  }

  container.innerHTML = filtered.map(o => `
    <div class="admin-list-card" onclick="reviewOpportunity('${o.id}')">
      <div class="admin-list-left">
        <span class="admin-list-icon">${o.communityEmoji}</span>
        <div>
          <div class="admin-list-title">${o.title}</div>
          <div class="admin-list-sub">${o.community} · ${o.category}</div>
        </div>
      </div>
      <div class="admin-list-right">
        <span class="comm-status-badge ${o.status}">${getStatusLabel(o.status)}</span>
        <span class="admin-list-date">${formatDateShort(o.date)}</span>
      </div>
    </div>`).join('');
}

/* -----------------------------------------------------------
   OPPORTUNITY REVIEW DETAIL
   ----------------------------------------------------------- */
function reviewOpportunity(id) {
  const opp = MOCK_OPPORTUNITY_REVIEWS.find(o => o.id === id);
  if (!opp) return;
  currentAdminActivity = opp;

  const container = document.getElementById('adminOppDetailBody');
  if (!container) { showScreen('admin-opp-detail'); return; }

  container.innerHTML = `
    <div class="admin-detail-header">
      <span class="admin-detail-emoji">${opp.communityEmoji}</span>
      <h2>${opp.title}</h2>
      <span class="comm-status-badge ${opp.status}">${getStatusLabel(opp.status)}</span>
    </div>

    <div class="admin-detail-section">
      <h3>Informasi Kegiatan</h3>
      <div class="admin-detail-grid">
        <div class="admin-detail-item"><span class="label">Komunitas</span><span class="value">${opp.community}</span></div>
        <div class="admin-detail-item"><span class="label">Kategori</span><span class="value">${opp.category}</span></div>
        <div class="admin-detail-item"><span class="label">Tanggal</span><span class="value">${formatDate(opp.date)}</span></div>
        <div class="admin-detail-item"><span class="label">Lokasi</span><span class="value">${getLocationLabel(opp.location)}</span></div>
        <div class="admin-detail-item"><span class="label">Volunteer</span><span class="value">${opp.slots} orang</span></div>
        <div class="admin-detail-item"><span class="label">Target Dampak</span><span class="value">${opp.targetImpact}</span></div>
      </div>
      <p class="admin-detail-desc">${opp.description}</p>
    </div>

    <div class="admin-detail-section">
      <h3>Skill yang Dibutuhkan</h3>
      <div class="admin-detail-tags">${opp.skills.map(s => `<span class="activity-tag">${s}</span>`).join('')}</div>
    </div>

    <div class="admin-detail-section">
      <h3>Checklist Review</h3>
      <div class="admin-checklist">
        <label class="admin-check"><input type="checkbox" checked><span class="checkmark">✓</span> Komunitas terverifikasi</label>
        <label class="admin-check"><input type="checkbox" checked><span class="checkmark">✓</span> Informasi lengkap</label>
        <label class="admin-check"><input type="checkbox"><span class="checkmark">✓</span> Lokasi valid</label>
        <label class="admin-check"><input type="checkbox"><span class="checkmark">✓</span> Kebutuhan volunteer wajar</label>
        <label class="admin-check"><input type="checkbox"><span class="checkmark">✓</span> Konten appropriate</label>
        <label class="admin-check"><input type="checkbox"><span class="checkmark">✓</span> Target dampak wajar</label>
      </div>
    </div>

    <div class="admin-actions">
      <button class="btn-primary-lg" onclick="adminApproveOpp('${opp.id}')">✅ Approve</button>
      <button class="btn-ghost" onclick="adminRevisionOpp('${opp.id}')" style="color:#D97706;border-color:#FEF3C7">🟠 Request Revision</button>
      <button class="btn-ghost" onclick="adminRejectOpp('${opp.id}')" style="color:#EF4444;border-color:#FEE2E2">🔴 Reject</button>
    </div>`;

  showScreen('admin-opp-detail');
}

function adminApproveOpp(id) {
  const o = MOCK_OPPORTUNITY_REVIEWS.find(x => x.id === id);
  if (o) o.status = 'approved';
  showToast('Kegiatan berhasil dipublikasikan! 🎉', 'success');
  goBack();
}

function adminRevisionOpp(id) {
  const o = MOCK_OPPORTUNITY_REVIEWS.find(x => x.id === id);
  if (o) o.status = 'needs-revision';
  showToast('Revision request sent 🟠', 'info');
  goBack();
}

function adminRejectOpp(id) {
  const o = MOCK_OPPORTUNITY_REVIEWS.find(x => x.id === id);
  if (o) o.status = 'rejected';
  showToast('Kegiatan ditolak 🔴', 'info');
  goBack();
}

/* -----------------------------------------------------------
   IMPACT VERIFICATION
   ----------------------------------------------------------- */
function renderAdminImpact() {
  const container = document.getElementById('adminImpactList');
  if (!container) return;

  renderAdminFilters('adminImpactFilters', 'impact');

  let filtered = [...MOCK_IMPACT_VERIFICATIONS];
  if (adminFilterStatus !== 'All') filtered = filtered.filter(i => i.status === adminFilterStatus.toLowerCase().replace(' ', '-'));
  if (adminSearchQuery) filtered = filtered.filter(i => i.activity.toLowerCase().includes(adminSearchQuery.toLowerCase()));

  if (filtered.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">✅</div><h4>Tidak ada impact report</h4><p>Semua laporan sudah ditinjau</p></div>`;
    return;
  }

  container.innerHTML = filtered.map(i => `
    <div class="admin-list-card" onclick="reviewImpact('${i.id}')">
      <div class="admin-list-left">
        <span class="admin-list-icon">${i.communityEmoji}</span>
        <div>
          <div class="admin-list-title">${i.activity}</div>
          <div class="admin-list-sub">${i.community} · ${i.volunteers} volunteer</div>
        </div>
      </div>
      <div class="admin-list-right">
        <span class="comm-status-badge ${i.status}">${getStatusLabel(i.status)}</span>
        <span class="admin-list-date">${formatDateShort(i.date)}</span>
      </div>
    </div>`).join('');
}

function reviewImpact(id) {
  const impact = MOCK_IMPACT_VERIFICATIONS.find(i => i.id === id);
  if (!impact) return;
  currentAdminActivity = impact;

  const container = document.getElementById('adminImpactDetailBody');
  if (!container) { showScreen('admin-impact-detail'); return; }

  const targetItems = Object.entries(impact.target).filter(([k, v]) => v !== '-');
  const reportedItems = Object.entries(impact.reported).filter(([k, v]) => v !== '-');
  const labels = { waste: 'Sampah terkumpul', people: 'Orang terdampak', hours: 'Jam Volunteer' };

  container.innerHTML = `
    <div class="admin-detail-header">
      <span class="admin-detail-emoji">${impact.communityEmoji}</span>
      <h2>${impact.activity}</h2>
      <span class="comm-status-badge ${impact.status}">${getStatusLabel(impact.status)}</span>
    </div>

    <div class="admin-detail-section">
      <h3>Target vs Aktual</h3>
      <div class="admin-comparison">
        ${targetItems.map(([key, target]) => {
          const actual = impact.reported[key] || '-';
          return `<div class="admin-comparison-row">
            <div class="admin-comparison-label">${labels[key] || key}</div>
            <div class="admin-comparison-target"><span class="label">Target:</span> <strong>${target}</strong></div>
            <div class="admin-comparison-actual"><span class="label">Aktual:</span> <strong class="text-green">${actual}</strong></div>
          </div>`;
        }).join('')}
      </div>
    </div>

    <div class="admin-detail-section">
      <h3>Bukti</h3>
      <div class="admin-evidence-grid">
        <div class="admin-evidence-item"><span class="admin-evidence-icon">📷</span><span>Foto Dokumentasi</span><span class="admin-evidence-status">✓ Tersedia</span></div>
        <div class="admin-evidence-item"><span class="admin-evidence-icon">📋</span><span>Daftar Hadir</span><span class="admin-evidence-status">✓ ${impact.volunteers} orang</span></div>
        <div class="admin-evidence-item"><span class="admin-evidence-icon">📝</span><span>Dokumentasi Kegiatan</span><span class="admin-evidence-status">✓ Tersedia</span></div>
      </div>
    </div>

    <div class="admin-detail-section">
      <h3>Detail Volunteer</h3>
      <p style="font-size:0.85rem;color:var(--gray-600)">${impact.volunteers} volunteer berkontribusi selama ${impact.reported.hours || '-'}.</p>
    </div>

    <div class="admin-actions">
      <button class="btn-primary-lg" onclick="adminVerifyImpact('${impact.id}')">✅ Verify Impact</button>
      <button class="btn-ghost" onclick="adminRequestEvidence('${impact.id}')" style="color:#D97706;border-color:#FEF3C7">🟠 Request Evidence</button>
      <button class="btn-ghost" onclick="adminRejectImpact('${impact.id}')" style="color:#EF4444;border-color:#FEE2E2">🔴 Reject Report</button>
    </div>`;

  showScreen('admin-impact-detail');
}

function adminVerifyImpact(id) {
  const i = MOCK_IMPACT_VERIFICATIONS.find(x => x.id === id);
  if (i) i.status = 'verified';
  showToast('Impact berhasil diverifikasi! ✅', 'success');
  goBack();
}

function adminRequestEvidence(id) {
  const i = MOCK_IMPACT_VERIFICATIONS.find(x => x.id === id);
  if (i) i.status = 'needs-revision';
  showToast('Evidence request sent 🟠', 'info');
  goBack();
}

function adminRejectImpact(id) {
  const i = MOCK_IMPACT_VERIFICATIONS.find(x => x.id === id);
  if (i) i.status = 'rejected';
  showToast('Impact report ditolak 🔴', 'info');
  goBack();
}

/* -----------------------------------------------------------
   REPORTS & MODERATION
   ----------------------------------------------------------- */
function renderAdminReports() {
  const container = document.getElementById('adminReportList');
  if (!container) return;

  renderAdminFilters('adminReportFilters', 'report');

  let filtered = [...MOCK_REPORTS];
  if (adminFilterStatus !== 'All') filtered = filtered.filter(r => r.status === adminFilterStatus.toLowerCase().replace(' ', '-'));
  if (adminFilterType !== 'All') filtered = filtered.filter(r => r.type === adminFilterType);
  if (adminSearchQuery) filtered = filtered.filter(r => r.target.toLowerCase().includes(adminSearchQuery.toLowerCase()));

  if (filtered.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">✅</div><h4>Tidak ada laporan</h4><p>Semua laporan sudah ditangani</p></div>`;
    return;
  }

  container.innerHTML = filtered.map(r => `
    <div class="admin-list-card" onclick="reviewReport('${r.id}')">
      <div class="admin-list-left">
        <span class="admin-list-icon">🚩</span>
        <div>
          <div class="admin-list-title">${r.target}</div>
          <div class="admin-list-sub">${r.type} Report · ${r.reason.substring(0, 50)}...</div>
        </div>
      </div>
      <div class="admin-list-right">
        <span class="comm-status-badge ${r.status}">${getStatusLabel(r.status)}</span>
        <span class="admin-attention-priority priority-${r.priority}">${r.priority}</span>
      </div>
    </div>`).join('');
}

function reviewReport(id) {
  const report = MOCK_REPORTS.find(r => r.id === id);
  if (!report) return;
  currentAdminActivity = report;

  const container = document.getElementById('adminReportDetailBody');
  if (!container) { showScreen('admin-report-detail'); return; }

  container.innerHTML = `
    <div class="admin-detail-header">
      <span class="admin-detail-emoji">🚩</span>
      <h2>${report.target}</h2>
      <span class="comm-status-badge ${report.status}">${getStatusLabel(report.status)}</span>
    </div>

    <div class="admin-detail-section">
      <h3>Detail Laporan</h3>
      <div class="admin-detail-grid">
        <div class="admin-detail-item"><span class="label">Tipe</span><span class="value">${report.type}</span></div>
        <div class="admin-detail-item"><span class="label">Reporter</span><span class="value">${report.reporter}</span></div>
        <div class="admin-detail-item"><span class="label">Tanggal</span><span class="value">${formatDate(report.date)}</span></div>
        <div class="admin-detail-item"><span class="label">Prioritas</span><span class="value"><span class="admin-attention-priority priority-${report.priority}">${report.priority}</span></span></div>
      </div>
    </div>

    <div class="admin-detail-section">
      <h3>Alasan Laporan</h3>
      <p class="admin-detail-desc">${report.reason}</p>
    </div>

    <div class="admin-actions">
      <button class="btn-primary-lg" onclick="adminResolveReport('${report.id}')">✅ Resolve</button>
      <button class="btn-ghost" onclick="adminDismissReport('${report.id}')" style="color:var(--gray-500);border-color:var(--gray-200)">⚪ Dismiss</button>
      <button class="btn-ghost" onclick="adminEscalateReport('${report.id}')" style="color:#EF4444;border-color:#FEE2E2">🔴 Escalate</button>
    </div>`;

  showScreen('admin-report-detail');
}

function adminResolveReport(id) {
  const r = MOCK_REPORTS.find(x => x.id === id);
  if (r) r.status = 'resolved';
  showToast('Laporan berhasil ditangani ✅', 'success');
  goBack();
}

function adminDismissReport(id) {
  const r = MOCK_REPORTS.find(x => x.id === id);
  if (r) r.status = 'dismissed';
  showToast('Laporan ditolak ⚪', 'info');
  goBack();
}

function adminEscalateReport(id) {
  showToast('Laporan di-escalate ke tim keamanan 🔴', 'info');
}

/* -----------------------------------------------------------
   ADMIN NOTIFICATIONS
   ----------------------------------------------------------- */
function renderAdminNotifications() {
  const container = document.getElementById('adminNotifList');
  if (!container) return;
  container.innerHTML = MOCK_ADMIN_NOTIFICATIONS.map(n => `
    <div class="notif-item ${n.unread ? 'notif-unread' : ''}" onclick="this.classList.remove('notif-unread')">
      <div class="notif-icon">${n.icon}</div>
      <div class="notif-info"><h4>${n.title}</h4><p>${n.desc}</p></div>
      <span class="notif-time">${n.time}</span>
    </div>`).join('');
}

/* -----------------------------------------------------------
   ADMIN PROFILE
   ----------------------------------------------------------- */
function renderAdminProfile() {
  const container = document.getElementById('adminProfileBody');
  if (!container) return;
  container.innerHTML = `
    <div class="admin-profile-card">
      <div class="admin-profile-avatar">🛡️</div>
      <h2>Admin VOLINK</h2>
      <div class="admin-profile-role">VOLINK Administrator</div>
      <div class="admin-profile-email">admin@volink.id</div>
    </div>
    <div class="admin-profile-section">
      <h3>Permissions</h3>
      <div class="admin-permissions">
        <span class="admin-perm">✅ Verification</span>
        <span class="admin-perm">✅ Moderation</span>
        <span class="admin-perm">✅ Impact Validation</span>
      </div>
    </div>
    <div class="admin-profile-section">
      <h3>Akun</h3>
      <div class="profile-settings">
        <div class="settings-item" style="cursor:pointer" onclick="showToast('Settings (demo)','info')"><span>⚙️ Account Settings</span><span class="settings-value">→</span></div>
        <div class="settings-item" style="cursor:pointer" onclick="showScreen('admin-notifications')"><span>🔔 Notifikasi</span><span class="settings-value">→</span></div>
      </div>
    </div>
    <button class="btn-ghost" onclick="doAdminLogout()" style="width:100%;color:#EF4444;border-color:#FEE2E2">Keluar</button>`;
}

/* -----------------------------------------------------------
   ADMIN FILTERS (reusable)
   ----------------------------------------------------------- */
function renderAdminFilters(containerId, type) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const statuses = ['All', 'Pending', 'Verified', 'Needs Revision', 'Rejected', 'Approved', 'Resolved'];
  let html = `<div class="admin-filter-row">
    <input type="text" class="form-input admin-search" placeholder="🔍 Search..." value="${adminSearchQuery}" oninput="adminSearchQuery=this.value;renderAdmin${type.charAt(0).toUpperCase() + type.slice(1)}()">
    <div class="admin-status-filters">`;
  statuses.forEach(s => {
    html += `<button class="filter-chip${adminFilterStatus === s ? ' active' : ''}" onclick="adminFilterStatus='${s}';renderAdmin${type.charAt(0).toUpperCase() + type.slice(1)}()">${s}</button>`;
  });
  html += `</div></div>`;
  container.innerHTML = html;
}

/* -----------------------------------------------------------
   HELPER: getStatusLabel (shared with community.js)
   ----------------------------------------------------------- */
if (typeof getStatusLabel === 'undefined') {
  function getStatusLabel(status) {
    const labels = { published: 'Published', draft: 'Draft', completed: 'Completed', live: 'LIVE', pending: 'Pending', verified: 'Verified', rejected: 'Rejected', 'need-revision': 'Needs Revision', 'needs-revision': 'Needs Revision', approved: 'Approved', 'pending-review': 'Pending Review', 'needs-review': 'Needs Review', resolved: 'Resolved', dismissed: 'Dismissed' };
    return labels[status] || status;
  }
}

if (typeof getLocationLabel === 'undefined') {
  function getLocationLabel(id) {
    const loc = LOCATIONS.find(l => l.id === id);
    return loc ? loc.label : id;
  }
}
