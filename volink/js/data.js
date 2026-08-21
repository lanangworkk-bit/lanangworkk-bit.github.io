/* ============================================================
   VOLINK — Shared Data Store + Mock Data
   All three roles (Volunteer, Community, Admin) read/write here
   ============================================================ */

/* -----------------------------------------------------------
   SHARED DATA STORE (in-memory)
   ----------------------------------------------------------- */
let _volinkStoreData = null;

const VolinkStore = {
  _default() {
    return {
      communities: [
        { id: 'c1', name: 'Bali Eco Warriors', emoji: '\u{1F30A}', category: 'Lingkungan', location: 'denpasar', contactPerson: 'Wayan Suardana', email: 'wayan@eco.id', phone: '+62 812 1111 1111', description: 'Komunitas peduli lingkungan pantai.', website: 'https://eco.id', socialMedia: '@ecowarriors', totalActivities: 48, members: 156, status: 'verified', date: '2026-07-01' },
        { id: 'c2', name: 'Yayasan Pendidikan Harapan', emoji: '\u{1F4DA}', category: 'Pendidikan', location: 'badung', contactPerson: 'Made Wirawan', email: 'made@harapan.id', phone: '+62 813 2222 2222', description: 'Pendidikan gratis anak pesisir.', website: 'https://harapan.id', socialMedia: '@pendidikanharapan', totalActivities: 36, members: 89, status: 'verified', date: '2026-07-05' },
        { id: 'c3', name: 'Gerakan Sehat Bersama', emoji: '\u{1F3E5}', category: 'Kesehatan', location: 'denpasar', contactPerson: 'Dr. Putu Tantra', email: 'putu@sehat.id', phone: '+62 811 3333 3333', description: 'Pengobatan gratis pedesaan.', website: 'https://sehat.id', socialMedia: '@sehatbersama', totalActivities: 24, members: 67, status: 'verified', date: '2026-07-10' },
        { id: 'c4', name: 'Paw Friends Bali', emoji: '\u{1F43E}', category: 'Hewan', location: 'gianyar', contactPerson: 'Ni Kadek Ayu', email: 'ayu@paw.id', phone: '+62 812 4444 4444', description: 'Adopsi hewan terlantar.', website: 'https://paw.id', socialMedia: '@pawfriends', totalActivities: 18, members: 42, status: 'verified', date: '2026-07-15' },
        { id: 'c5', name: 'Digital Learning Hub', emoji: '\u{1F4BB}', category: 'Pendidikan', location: 'gianyar', contactPerson: 'Ketut Budi', email: 'budi@digital.id', phone: '+62 813 5555 5555', description: 'Pelatihan digital pedesaan.', website: 'https://digital.id', socialMedia: '@digitalhub', totalActivities: 30, members: 73, status: 'verified', date: '2026-07-20' },
        { id: 'c6', name: 'Bali Mangrove Action', emoji: '\u{1F33F}', category: 'Lingkungan', location: 'badung', contactPerson: 'AA Gede Rai', email: 'rai@mangrove.id', phone: '+62 811 6666 6666', description: 'Restorasi mangrove Bali.', website: 'https://mangrove.id', socialMedia: '@balimangrove', totalActivities: 22, members: 94, status: 'verified', date: '2026-07-25' },
      ],
      opportunities: [
        { id: 'a1', title: 'Bersih Pantai Sanur', communityId: 'c1', communityEmoji: '\u{1F30A}', communityName: 'Bali Eco Warriors', category: 'Lingkungan', date: '2026-08-29', time: '08:00 - 11:00', location: 'denpasar', slots: 20, slotsFilled: 14, description: 'Membersihkan pantai Sanur dari sampah plastik.', skills: ['cleaning', 'photography'], skillLevel: 'pemula', activityTypes: ['onsite', 'outdoor'], communityNeed: 'Fotografer dokumentasi', targetImpact: '100 kg sampah terkumpul', status: 'published' },
        { id: 'a2', title: 'Mengajar Anak Pesisir', communityId: 'c2', communityEmoji: '\u{1F4DA}', communityName: 'Yayasan Pendidikan Harapan', category: 'Pendidikan', date: '2026-08-30', time: '13:00 - 16:00', location: 'badung', slots: 12, slotsFilled: 8, description: 'Mengajar mata pelajaran dasar anak pesisir.', skills: ['teaching', 'public-speaking'], skillLevel: 'menengah', activityTypes: ['onsite'], communityNeed: '', targetImpact: '30 anak diajar', status: 'published' },
        { id: 'a3', title: 'Donor Darah Bersama', communityId: 'c3', communityEmoji: '\u{1F3E5}', communityName: 'Gerakan Sehat Bersama', category: 'Kesehatan', date: '2026-09-01', time: '09:00 - 14:00', location: 'denpasar', slots: 30, slotsFilled: 22, description: 'Donor darah massal dan edukasi.', skills: ['first-aid', 'social-media'], skillLevel: 'pemula', activityTypes: ['onsite'], communityNeed: '', targetImpact: '50 kantong darah', status: 'published' },
        { id: 'a4', title: 'Web Dev Workshop', communityId: 'c5', communityEmoji: '\u{1F4BB}', communityName: 'Digital Learning Hub', category: 'Pendidikan', date: '2026-09-03', time: '10:00 - 15:00', location: 'gianyar', slots: 15, slotsFilled: 10, description: 'Workshop web development dasar.', skills: ['teaching', 'programming'], skillLevel: 'menengah', activityTypes: ['onsite', 'hybrid'], communityNeed: '', targetImpact: '25 pemuda terlatih', status: 'published' },
        { id: 'a5', title: 'Adopsi Hewan', communityId: 'c4', communityEmoji: '\u{1F43E}', communityName: 'Paw Friends Bali', category: 'Hewan', date: '2026-09-05', time: '08:00 - 12:00', location: 'denpasar', slots: 10, slotsFilled: 4, description: 'Adopsi hewan terlantar.', skills: ['social-media', 'photography'], skillLevel: 'pemula', activityTypes: ['onsite'], communityNeed: '', targetImpact: '20 hewan diadopsi', status: 'published' },
        { id: 'a6', title: 'Penanaman Mangrove', communityId: 'c6', communityEmoji: '\u{1F33F}', communityName: 'Bali Mangrove Action', category: 'Lingkungan', date: '2026-09-07', time: '06:00 - 11:00', location: 'badung', slots: 25, slotsFilled: 18, description: 'Restorasi mangrove pesisir.', skills: ['cleaning'], skillLevel: 'menengah', activityTypes: ['outdoor'], communityNeed: '', targetImpact: '200 bibit mangrove', status: 'published' },
        { id: 'a7', title: 'Donasi Buku untuk Desa', communityId: 'c2', communityEmoji: '\u{1F4DA}', communityName: 'Yayasan Pendidikan Harapan', category: 'Pendidikan', date: '2026-09-10', time: '09:00 - 13:00', location: 'tabanan', slots: 15, slotsFilled: 9, description: 'Mengumpulkan buku untuk perpustakaan desa.', skills: ['event-mgmt', 'social-media'], skillLevel: 'pemula', activityTypes: ['onsite', 'hybrid'], communityNeed: '', targetImpact: '500 buku terkumpul', status: 'published' },
        { id: 'a8', title: 'Kelas Literasi Anak', communityId: 'c2', communityEmoji: '\u{1F4DA}', communityName: 'Yayasan Pendidikan Harapan', category: 'Pendidikan', date: '2026-09-12', time: '09:00 - 12:00', location: 'denpasar', slots: 10, slotsFilled: 6, description: 'Mengajar literasi membaca dan menulis anak usia 5-8 tahun.', skills: ['teaching', 'language'], skillLevel: 'pemula', activityTypes: ['onsite'], communityNeed: '', targetImpact: '20 anak diajar', status: 'published' },
        { id: 'a9', title: 'Bank Sampah Komunitas', communityId: 'c1', communityEmoji: '\u{1F30A}', communityName: 'Bali Eco Warriors', category: 'Lingkungan', date: '2026-09-14', time: '07:00 - 11:00', location: 'denpasar', slots: 12, slotsFilled: 7, description: 'Mengelola bank sampah komunitas.', skills: ['admin', 'social-media'], skillLevel: 'pemula', activityTypes: ['onsite'], communityNeed: '', targetImpact: '200 kg sampah didaur ulang', status: 'published' },
        { id: 'a10', title: 'Posko Banjir Bandang', communityId: 'c3', communityEmoji: '\u{1F3E5}', communityName: 'Gerakan Sehat Bersama', category: 'Kemanusiaan', date: '2026-09-15', time: '07:00 - 17:00', location: 'karangasem', slots: 25, slotsFilled: 18, description: 'Bantuan darurat korban banjir bandang.', skills: ['first-aid', 'cooking', 'cleaning'], skillLevel: 'pemula', activityTypes: ['onsite'], communityNeed: '', targetImpact: '200 orang terbantu', status: 'published' },
        { id: 'a11', title: 'Konservasi Terumbu Karang', communityId: 'c1', communityEmoji: '\u{1F30A}', communityName: 'Bali Eco Warriors', category: 'Lingkungan', date: '2026-09-18', time: '06:00 - 12:00', location: 'karangasem', slots: 8, slotsFilled: 5, description: 'Penanaman dan pembersihan terumbu karang di Amed.', skills: ['cleaning'], skillLevel: 'menengah', activityTypes: ['outdoor'], communityNeed: '', targetImpact: '50 terumbu ditanam', status: 'published' },
        { id: 'a12', title: 'Workshop Fotografi Sosial', communityId: 'c5', communityEmoji: '\u{1F4BB}', communityName: 'Digital Learning Hub', category: 'Pendidikan', date: '2026-09-20', time: '14:00 - 18:00', location: 'gianyar', slots: 20, slotsFilled: 12, description: 'Workshop fotografi dokumenter komunitas lokal.', skills: ['photography', 'teaching'], skillLevel: 'menengah', activityTypes: ['onsite', 'hybrid'], communityNeed: '', targetImpact: '30 foto terkumpul', status: 'published' },
        { id: 'a13', title: 'Pasar Rakyat Sehat', communityId: 'c3', communityEmoji: '\u{1F3E5}', communityName: 'Gerakan Sehat Bersama', category: 'Kesehatan', date: '2026-09-22', time: '08:00 - 13:00', location: 'badung', slots: 18, slotsFilled: 10, description: 'Pemeriksaan kesehatan gratis di pasar rakyat.', skills: ['first-aid', 'social-media'], skillLevel: 'pemula', activityTypes: ['onsite'], communityNeed: '', targetImpact: '150 orang diperiksa', status: 'published' },
        { id: 'a14', title: 'Pelatihan Digital Pemuda', communityId: 'c5', communityEmoji: '\u{1F4BB}', communityName: 'Digital Learning Hub', category: 'Pendidikan', date: '2026-09-24', time: '10:00 - 15:00', location: 'denpasar', slots: 20, slotsFilled: 14, description: 'Pelatihan komputer dan internet bagi pemuda.', skills: ['teaching', 'programming'], skillLevel: 'pemula', activityTypes: ['onsite'], communityNeed: '', targetImpact: '25 pemuda terlatih', status: 'published' },
      ],
      impactReports: [],
      volunteerRegistrations: [
        { volunteerName: 'Raka', activityId: 'a1', status: 'confirmed', checkedIn: true },
        { volunteerName: 'Sarah', activityId: 'a1', status: 'confirmed', checkedIn: true },
        { volunteerName: 'Raka', activityId: 'a2', status: 'confirmed', checkedIn: false },
        { volunteerName: 'Dika', activityId: 'a3', status: 'pending', checkedIn: false },
      ],
      notifications: {
        volunteer: [
          { icon: '\u{1F4CB}', title: 'Kegiatan baru dekatmu', desc: 'Bersih Pantai Sanur butuh 6 volunteer lagi', time: '1 jam lalu', unread: true },
          { icon: '\u{1F3C6}', title: 'Badge baru!', desc: 'Kamu mendapatkan badge "Eco Warrior"', time: '3 jam lalu', unread: false },
        ],
        community: [
          { icon: '\u{1F64B}', title: 'Volunteer baru', desc: 'Raka mengajukan diri untuk Bersih Pantai Sanur', time: '1 jam lalu', unread: true },
          { icon: '\u{1F6E1}\uFE0F', title: 'Status verifikasi', desc: 'Komunitas kamu sudah terverifikasi oleh admin', time: '5 jam lalu', unread: false },
        ],
        admin: [
          { icon: '\u{1F4CB}', title: 'Komunitas menunggu verifikasi', desc: 'Ada komunitas baru yang perlu direview', time: '1 jam lalu', unread: true },
          { icon: '\u{1F4DD}', title: 'Kegiatan baru perlu review', desc: 'Kegiatan dari komunitas menunggu persetujuan', time: '3 jam lalu', unread: true },
        ],
      },
      nextId: 100,
    };
  },

  load() {
    if (!_volinkStoreData) _volinkStoreData = this._default();
    return _volinkStoreData;
  },

  save(data) {
    _volinkStoreData = data;
  },

  reset() {
    _volinkStoreData = this._default();
    return _volinkStoreData;
  },

  /* --- Communities --- */
  getCommunities() { return this.load().communities; },
  getCommunityById(id) { return this.load().communities.find(c => c.id === id); },
  getPendingCommunities() { return this.load().communities.filter(c => c.status === 'pending'); },
  getVerifiedCommunities() { return this.load().communities.filter(c => c.status === 'verified'); },

  addCommunity(data) {
    const store = this.load();
    const id = 'c_' + (store.nextId++);
    const community = Object.assign({}, data, {
      id: id, status: 'pending', totalActivities: 0, members: 1,
      date: new Date().toISOString().split('T')[0],
    });
    store.communities.push(community);
    store.notifications.admin.unshift({
      icon: '\u{1F4CB}', title: 'Komunitas baru mendaftar',
      desc: data.name + ' menunggu verifikasi', time: 'Baru saja', unread: true,
    });
    this.save(store);
    return community;
  },

  updateCommunityStatus(id, status) {
    const store = this.load();
    const c = store.communities.find(function(x) { return x.id === id; });
    if (!c) return null;
    c.status = status;
    var labels = { verified: 'Terverifikasi', rejected: 'Ditolak', 'needs-revision': 'Perlu Revisi' };
    store.notifications.community.unshift({
      icon: status === 'verified' ? '\u2705' : '\u274C',
      title: 'Status verifikasi diperbarui',
      desc: 'Komunitas kamu: ' + (labels[status] || status),
      time: 'Baru saja', unread: true,
    });
    this.save(store);
    return c;
  },

  /* --- Opportunities --- */
  getOpportunities() { return this.load().opportunities; },
  getOpportunityById(id) { return this.load().opportunities.find(function(o) { return o.id === id; }); },
  getPublishedOpportunities() { return this.load().opportunities.filter(function(o) { return o.status === 'published'; }); },
  getPendingOpportunities() { return this.load().opportunities.filter(function(o) { return o.status === 'pending'; }); },
  getCommunityOpportunities(communityId) {
    return this.load().opportunities.filter(function(o) { return o.communityId === communityId; });
  },

  addOpportunity(data) {
    const store = this.load();
    const id = 'a_' + (store.nextId++);
    const opp = Object.assign({}, data, {
      id: id, slotsFilled: 0, status: 'pending',
    });
    store.opportunities.push(opp);
    var comm = store.communities.find(function(c) { return c.id === data.communityId; });
    store.notifications.admin.unshift({
      icon: '\u{1F4DD}', title: 'Kegiatan baru perlu review',
      desc: (comm ? comm.name : 'Komunitas') + ' mengajukan "' + data.title + '"',
      time: 'Baru saja', unread: true,
    });
    this.save(store);
    return opp;
  },

  updateOpportunityStatus(id, status) {
    const store = this.load();
    const opp = store.opportunities.find(function(o) { return o.id === id; });
    if (!opp) return null;
    opp.status = status;
    var labels = { published: 'Disetujui & Dipublikasikan', rejected: 'Ditolak', 'needs-revision': 'Perlu Revisi' };
    store.notifications.community.unshift({
      icon: status === 'published' ? '\u{1F389}' : '\u274C',
      title: 'Status kegiatan diperbarui',
      desc: '"' + opp.title + '": ' + (labels[status] || status),
      time: 'Baru saja', unread: true,
    });
    if (status === 'published') {
      store.notifications.volunteer.unshift({
        icon: '\u{1F514}', title: 'Kegiatan baru tersedia!',
        desc: opp.title + ' - ' + opp.communityName,
        time: 'Baru saja', unread: true,
      });
    }
    this.save(store);
    return opp;
  },

  /* --- Volunteer Registrations --- */
  getRegistrations() { return this.load().volunteerRegistrations; },
  getRegistrationsForActivity(activityId) {
    return this.load().volunteerRegistrations.filter(function(r) { return r.activityId === activityId; });
  },
  addRegistration(data) {
    const store = this.load();
    store.volunteerRegistrations.push(Object.assign({}, data, { status: 'confirmed', checkedIn: false }));
    var opp = store.opportunities.find(function(o) { return o.id === data.activityId; });
    if (opp) {
      opp.slotsFilled = (opp.slotsFilled || 0) + 1;
      store.notifications.community.unshift({
        icon: '\u{1F64B}', title: 'Volunteer baru bergabung',
        desc: data.volunteerName + ' bergabung di "' + opp.title + '"',
        time: 'Baru saja', unread: true,
      });
    }
    this.save(store);
  },

  checkInVolunteer(activityId, volunteerName) {
    const store = this.load();
    var reg = store.volunteerRegistrations.find(function(r) {
      return r.activityId === activityId && r.volunteerName === volunteerName;
    });
    if (reg) {
      reg.checkedIn = true;
      reg.status = 'completed';
    }
    this.save(store);
  },

  /* --- Impact Reports --- */
  getImpactReports() { return this.load().impactReports; },
  getPendingImpactReports() { return this.load().impactReports.filter(function(r) { return r.status === 'pending'; }); },
  getCommunityImpactReports(communityId) {
    return this.load().impactReports.filter(function(r) { return r.communityId === communityId; });
  },

  addImpactReport(data) {
    const store = this.load();
    const id = 'ir_' + (store.nextId++);
    var report = Object.assign({}, data, { id: id, status: 'pending', date: new Date().toISOString().split('T')[0] });
    store.impactReports.push(report);
    store.notifications.admin.unshift({
      icon: '\u{1F4CA}', title: 'Impact report baru',
      desc: '"' + data.activity + '" mengirim laporan dampak', time: 'Baru saja', unread: true,
    });
    this.save(store);
    return report;
  },

  updateImpactReportStatus(id, status) {
    const store = this.load();
    var report = store.impactReports.find(function(r) { return r.id === id; });
    if (!report) return null;
    report.status = status;
    var labels = { verified: 'Terverifikasi', rejected: 'Ditolak', 'needs-revision': 'Perlu Bukti Tambahan' };
    store.notifications.community.unshift({
      icon: status === 'verified' ? '\u2705' : '\u274C',
      title: 'Impact report diperbarui',
      desc: '"' + report.activity + '": ' + (labels[status] || status),
      time: 'Baru saja', unread: true,
    });
    this.save(store);
    return report;
  },

  /* --- Notifications --- */
  getNotifications(role) { return this.load().notifications[role] || []; },
  addNotification(role, notif) {
    const store = this.load();
    store.notifications[role].unshift(Object.assign({ unread: true, time: 'Baru saja' }, notif));
    this.save(store);
  },
  clearNotifications(role) {
    const store = this.load();
    store.notifications[role] = [];
    this.save(store);
  },

  /* --- Stats --- */
  getStats() {
    const store = this.load();
    return {
      totalCommunities: store.communities.length,
      verifiedCommunities: store.communities.filter(function(c) { return c.status === 'verified'; }).length,
      pendingCommunities: store.communities.filter(function(c) { return c.status === 'pending'; }).length,
      totalOpportunities: store.opportunities.length,
      publishedOpportunities: store.opportunities.filter(function(o) { return o.status === 'published'; }).length,
      pendingOpportunities: store.opportunities.filter(function(o) { return o.status === 'pending'; }).length,
      totalVolunteers: store.volunteerRegistrations.length,
      totalImpactReports: store.impactReports.length,
      pendingImpactReports: store.impactReports.filter(function(r) { return r.status === 'pending'; }).length,
    };
  },
};

/* -----------------------------------------------------------
   CONSTANTS
   ----------------------------------------------------------- */
const CAUSES = [
  { id: 'environment', label: 'Lingkungan', emoji: '\u{1F33F}', color: '#16A34A' },
  { id: 'education', label: 'Pendidikan', emoji: '\u{1F4DA}', color: '#0F766E' },
  { id: 'humanity', label: 'Kemanusiaan', emoji: '\u{1F91D}', color: '#FBBF24' },
  { id: 'health', label: 'Kesehatan', emoji: '\u{1F3E5}', color: '#EF4444' },
  { id: 'disability', label: 'Disabilitas', emoji: '\u267F', color: '#8B5CF6' },
  { id: 'animals', label: 'Hewan', emoji: '\u{1F43E}', color: '#EC4899' },
  { id: 'community', label: 'Komunitas', emoji: '\u{1F3D8}\uFE0F', color: '#0B2D3A' },
  { id: 'culture', label: 'Budaya & Seni', emoji: '\u{1F3AD}', color: '#D97706' },
];

const SKILLS = [
  { id: 'teaching', label: 'Mengajar', emoji: '\u{1F4D6}', category: 'communication' },
  { id: 'design', label: 'Desain Grafis', emoji: '\u{1F3A8}', category: 'creative' },
  { id: 'photography', label: 'Fotografi', emoji: '\u{1F4F8}', category: 'creative' },
  { id: 'public-speaking', label: 'Public Speaking', emoji: '\u{1F3A4}', category: 'communication' },
  { id: 'social-media', label: 'Social Media', emoji: '\u{1F4F1}', category: 'creative' },
  { id: 'event-mgmt', label: 'Event Organizer', emoji: '\u{1F4CB}', category: 'management' },
  { id: 'programming', label: 'IT / Coding', emoji: '\u{1F4BB}', category: 'technical' },
  { id: 'language', label: 'Bahasa', emoji: '\u{1F310}', category: 'communication' },
  { id: 'admin', label: 'Administrasi', emoji: '\u{1F4DD}', category: 'management' },
  { id: 'cleaning', label: 'Kebersihan', emoji: '\u{1F9F9}', category: 'physical' },
  { id: 'first-aid', label: 'Pertolongan Pertama', emoji: '\u{1FA79}', category: 'health' },
  { id: 'cooking', label: 'Memasak', emoji: '\u{1F373}', category: 'physical' },
];

const SKILL_LEVELS = [
  { id: 'pemula', label: 'Pemula', description: 'Baru belajar' },
  { id: 'menengah', label: 'Menengah', description: 'Punya pengalaman' },
  { id: 'ahli', label: 'Ahli', description: 'Sangat mahir' },
];

const ACTIVITY_TYPES = [
  { id: 'onsite', label: 'On-site', emoji: '\u{1F4CD}' },
  { id: 'remote', label: 'Remote', emoji: '\u{1F3E0}' },
  { id: 'hybrid', label: 'Hybrid', emoji: '\u{1F504}' },
  { id: 'outdoor', label: 'Outdoor', emoji: '\u{1F333}' },
];

const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

const LOCATIONS = [
  { id: 'denpasar', label: 'Denpasar', lat: -8.6500, lng: 115.2167 },
  { id: 'badung', label: 'Badung', lat: -8.5819, lng: 115.1772 },
  { id: 'gianyar', label: 'Gianyar', lat: -8.5356, lng: 115.3301 },
  { id: 'tabanan', label: 'Tabanan', lat: -8.5413, lng: 115.1258 },
  { id: 'karangasem', label: 'Karangasem', lat: -8.4487, lng: 115.6063 },
  { id: 'buleleng', label: 'Buleleng', lat: -8.1121, lng: 115.0883 },
  { id: 'bangli', label: 'Bangli', lat: -8.4549, lng: 115.3467 },
  { id: 'klungkung', label: 'Klungkung', lat: -8.5374, lng: 115.4049 },
  { id: 'jembrana', label: 'Jembrana', lat: -8.3598, lng: 114.6325 },
];

/* -----------------------------------------------------------
   LEGACY COMMUNITIES (for volunteer explore matching)
   ----------------------------------------------------------- */
const COMMUNITIES = [
  { id: 'c1', name: 'Bali Eco Warriors', verified: true, description: 'Komunitas peduli lingkungan.', totalActivities: 48, rating: 4.8, members: 156, emoji: '\u{1F30A}' },
  { id: 'c2', name: 'Yayasan Pendidikan Harapan', verified: true, description: 'Pendidikan gratis anak pesisir.', totalActivities: 36, rating: 4.9, members: 89, emoji: '\u{1F4DA}' },
  { id: 'c3', name: 'Gerakan Sehat Bersama', verified: true, description: 'Pengobatan gratis pedesaan.', totalActivities: 24, rating: 4.7, members: 67, emoji: '\u{1F3E5}' },
  { id: 'c4', name: 'Paw Friends Bali', verified: false, description: 'Adopsi hewan terlantar.', totalActivities: 18, rating: 4.5, members: 42, emoji: '\u{1F43E}' },
  { id: 'c5', name: 'Digital Learning Hub', verified: true, description: 'Pelatihan digital pedesaan.', totalActivities: 30, rating: 4.6, members: 73, emoji: '\u{1F4BB}' },
  { id: 'c6', name: 'Bali Mangrove Action', verified: true, description: 'Restorasi mangrove Bali.', totalActivities: 22, rating: 4.8, members: 94, emoji: '\u{1F33F}' },
];

/* -----------------------------------------------------------
   ACTIVITIES (static fallback for volunteer explore)
   ----------------------------------------------------------- */
const ACTIVITIES = [
  { id: 'a1', title: 'Bersih Pantai Sanur', community: 'c1', causes: ['environment'], skills: ['cleaning', 'photography'], skillLevel: 'pemula', activityType: ['onsite', 'outdoor'], location: 'denpasar', date: '2026-08-29', time: '08:00 - 11:00', slots: 20, slotsFilled: 14, description: 'Membersihkan pantai Sanur dari sampah plastik.', targetImpact: [{ value: '100 kg', label: 'Sampah terkumpul' }], skillsNeeded: 'Terbuka untuk semua', image: '\u{1F3D6}\uFE0F' },
  { id: 'a2', title: 'Mengajar Anak Pesisir', community: 'c2', causes: ['education', 'community'], skills: ['teaching', 'public-speaking'], skillLevel: 'menengah', activityType: ['onsite'], location: 'badung', date: '2026-08-30', time: '13:00 - 16:00', slots: 12, slotsFilled: 8, description: 'Mengajar mata pelajaran dasar.', targetImpact: [{ value: '30 anak', label: 'Siswa diajar' }], skillsNeeded: 'Mengajar, sabar', image: '\u{1F4DA}' },
  { id: 'a3', title: 'Donor Darah Bersama', community: 'c3', causes: ['health', 'humanity'], skills: ['first-aid', 'social-media'], skillLevel: 'pemula', activityType: ['onsite'], location: 'denpasar', date: '2026-09-01', time: '09:00 - 14:00', slots: 30, slotsFilled: 22, description: 'Donor darah massal.', targetImpact: [{ value: '50 kantong', label: 'Darah terkumpul' }], skillsNeeded: 'Terbuka untuk semua', image: '\u{1FA78}' },
  { id: 'a4', title: 'Web Dev Workshop', community: 'c5', causes: ['education', 'community'], skills: ['teaching', 'programming'], skillLevel: 'menengah', activityType: ['onsite', 'hybrid'], location: 'gianyar', date: '2026-09-03', time: '10:00 - 15:00', slots: 15, slotsFilled: 10, description: 'Workshop web development.', targetImpact: [{ value: '25 pemuda', label: 'Peserta' }], skillsNeeded: 'HTML, CSS, JS dasar', image: '\u{1F4BB}' },
  { id: 'a5', title: 'Adopsi Hewan', community: 'c4', causes: ['animals'], skills: ['social-media', 'photography'], skillLevel: 'pemula', activityType: ['onsite'], location: 'denpasar', date: '2026-09-05', time: '08:00 - 12:00', slots: 10, slotsFilled: 4, description: 'Adopsi hewan terlantar.', targetImpact: [{ value: '20 hewan', label: 'Diadopsi' }], skillsNeeded: 'Fotografi, social media', image: '\u{1F415}' },
  { id: 'a6', title: 'Penanaman Mangrove', community: 'c6', causes: ['environment'], skills: ['cleaning'], skillLevel: 'menengah', activityType: ['outdoor'], location: 'badung', date: '2026-09-07', time: '06:00 - 11:00', slots: 25, slotsFilled: 18, description: 'Restorasi mangrove.', targetImpact: [{ value: '200 bibit', label: 'Mangrove' }], skillsNeeded: 'Outdoor activity', image: '\u{1F33F}' },
];

/* ---------- Impact History ---------- */
const MOCK_IMPACT_HISTORY = [
  { activityId: 'a1', date: '2026-07-15', hours: 4, metrics: [{ value: '12 kg', label: 'Sampah terkumpul' }] },
  { activityId: 'a2', date: '2026-07-22', hours: 3, metrics: [{ value: '30 anak', label: 'Siswa diajar' }] },
  { activityId: 'a3', date: '2026-08-12', hours: 5, metrics: [{ value: '50 kantong', label: 'Darah terkumpul' }] },
];

/* ---------- Helpers ---------- */
function getCommunity(id) { return COMMUNITIES.find(function(c) { return c.id === id; }); }
function getActivityById(id) { return ACTIVITIES.find(function(a) { return a.id === id; }); }
function formatDate(dateStr) {
  var d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}
function formatDateShort(dateStr) {
  var d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
}

/* Helper to merge shared store data into ACTIVITIES for volunteer explore */
function getAllActivities() {
  var shared = VolinkStore.getPublishedOpportunities();
  var legacy = ACTIVITIES.slice();
  var sharedIds = shared.map(function(o) { return o.id; });
  var merged = legacy.filter(function(a) { return sharedIds.indexOf(a.id) === -1; });

  // Map category labels to cause IDs
  var catMap = {};
  CAUSES.forEach(function(c) { catMap[c.label.toLowerCase()] = c.id; });

  shared.forEach(function(o) {
    var causeId = catMap[(o.category || '').toLowerCase()] || 'community';
    merged.push({
      id: o.id, title: o.title, community: o.communityId,
      causes: [causeId], skills: o.skills || [],
      skillLevel: o.skillLevel || 'pemula', activityType: o.activityTypes || ['onsite'],
      location: o.location, date: o.date, time: o.time,
      slots: o.slots, slotsFilled: o.slotsFilled || 0,
      description: o.description,
      targetImpact: [{ value: o.targetImpact || '-', label: 'Target' }],
      skillsNeeded: (o.skills || []).join(', ') || 'Terbuka untuk semua',
      image: o.communityEmoji || '\u{1F3D8}\uFE0F',
      communityName: o.communityName,
    });
  });
  return merged;
}
