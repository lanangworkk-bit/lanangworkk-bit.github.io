/* ============================================================
   VOLINK — Complete Mock Data
   ============================================================ */

const CAUSES = [
  { id: 'environment', label: 'Lingkungan', emoji: '🌿', color: '#16A34A' },
  { id: 'education', label: 'Pendidikan', emoji: '📚', color: '#0F766E' },
  { id: 'humanity', label: 'Kemanusiaan', emoji: '🤝', color: '#FBBF24' },
  { id: 'health', label: 'Kesehatan', emoji: '🏥', color: '#EF4444' },
  { id: 'disability', label: 'Disabilitas', emoji: '♿', color: '#8B5CF6' },
  { id: 'animals', label: 'Hewan', emoji: '🐾', color: '#EC4899' },
  { id: 'community', label: 'Komunitas', emoji: '🏘️', color: '#0B2D3A' },
  { id: 'culture', label: 'Budaya & Seni', emoji: '🎭', color: '#D97706' },
];

const SKILLS = [
  { id: 'teaching', label: 'Mengajar', emoji: '📖', category: 'communication' },
  { id: 'design', label: 'Desain Grafis', emoji: '🎨', category: 'creative' },
  { id: 'photography', label: 'Fotografi', emoji: '📸', category: 'creative' },
  { id: 'public-speaking', label: 'Public Speaking', emoji: '🎤', category: 'communication' },
  { id: 'social-media', label: 'Social Media', emoji: '📱', category: 'creative' },
  { id: 'event-mgmt', label: 'Event Organizer', emoji: '📋', category: 'management' },
  { id: 'programming', label: 'IT / Coding', emoji: '💻', category: 'technical' },
  { id: 'language', label: 'Bahasa', emoji: '🌐', category: 'communication' },
  { id: 'admin', label: 'Administrasi', emoji: '📝', category: 'management' },
  { id: 'cleaning', label: 'Kebersihan', emoji: '🧹', category: 'physical' },
  { id: 'first-aid', label: 'Pertolongan Pertama', emoji: '🩹', category: 'health' },
  { id: 'cooking', label: 'Memasak', emoji: '🍳', category: 'physical' },
];

const SKILL_LEVELS = [
  { id: 'pemula', label: 'Pemula', description: 'Baru belajar' },
  { id: 'menengah', label: 'Menengah', description: 'Punya pengalaman' },
  { id: 'ahli', label: 'Ahli', description: 'Sangat mahir' },
];

const ACTIVITY_TYPES = [
  { id: 'onsite', label: 'On-site', emoji: '📍' },
  { id: 'remote', label: 'Remote', emoji: '🏠' },
  { id: 'hybrid', label: 'Hybrid', emoji: '🔄' },
  { id: 'outdoor', label: 'Outdoor', emoji: '🌳' },
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

const COMMUNITIES = [
  {
    id: 'c1', name: 'Bali Eco Warriors', verified: true,
    description: 'Komunitas peduli lingkungan yang berfokus pada kebersihan pantai dan konservasi laut di Bali.',
    totalActivities: 48, rating: 4.8, members: 156, emoji: '🌊',
    verification: { identity: true, realActivities: true, history: true, reviews: true },
  },
  {
    id: 'c2', name: 'Yayasan Pendidikan Harapan', verified: true,
    description: 'Organisasi yang menyediakan pendidikan gratis bagi anak-anak kurang mampu di area pesisir.',
    totalActivities: 36, rating: 4.9, members: 89, emoji: '📖',
    verification: { identity: true, realActivities: true, history: true, reviews: true },
  },
  {
    id: 'c3', name: 'Gerakan Sehat Bersama', verified: true,
    description: 'Komunitas kesehatan yang mengadakan pengobatan gratis dan edukasi kesehatan di pedesaan.',
    totalActivities: 24, rating: 4.7, members: 67, emoji: '🏥',
    verification: { identity: true, realActivities: true, history: true, reviews: true },
  },
  {
    id: 'c4', name: 'Paw Friends Bali', verified: false,
    description: 'Komunitas pecinta hewan yang fokus pada adopsi dan perawatan hewan terlantar.',
    totalActivities: 18, rating: 4.5, members: 42, emoji: '🐾',
    verification: { identity: true, realActivities: true, history: false, reviews: true },
  },
  {
    id: 'c5', name: 'Digital Learning Hub', verified: true,
    description: 'Memberikan pelatihan digital dan literasi komputer bagi masyarakat rural.',
    totalActivities: 30, rating: 4.6, members: 73, emoji: '💻',
    verification: { identity: true, realActivities: true, history: true, reviews: true },
  },
  {
    id: 'c6', name: 'Bali Mangrove Action', verified: true,
    description: 'Restorasi ekosistem mangrove di pesisir Bali untuk mitigasi perubahan iklim.',
    totalActivities: 22, rating: 4.8, members: 94, emoji: '🌿',
    verification: { identity: true, realActivities: true, history: true, reviews: true },
  },
];

const ACTIVITIES = [
  {
    id: 'a1', title: 'Bersih Pantai Sanur', community: 'c1',
    causes: ['environment'], skills: ['cleaning', 'photography'],
    skillLevel: 'pemula', activityType: ['onsite', 'outdoor'],
    location: 'denpasar', date: '2026-08-29', time: '08:00 - 11:00',
    slots: 20, slotsFilled: 14,
    description: 'Membersihkan pantai Sanur dari sampah plastik dan edukasi pengunjung tentang pentingnya menjaga kebersihan laut. Kegiatan ini merupakan bagian dari program rutin Bali Eco Warriors untuk menjaga kelestarian pesisir.',
    targetImpact: [
      { value: '100 kg', label: 'Sampah terkumpul' },
      { value: '50 orang', label: 'Pengunjung diedukasi' },
    ],
    skillsNeeded: 'Terbuka untuk semua, fotografi lebih diutamakan',
    image: '🏖️',
  },
  {
    id: 'a2', title: 'Mengajar Anak Pesisir', community: 'c2',
    causes: ['education', 'community'], skills: ['teaching', 'public-speaking'],
    skillLevel: 'menengah', activityType: ['onsite'],
    location: 'badung', date: '2026-08-30', time: '13:00 - 16:00',
    slots: 12, slotsFilled: 8,
    description: 'Mengajar mata pelajaran dasar (matematika, bahasa Inggris, dan sains) bagi anak-anak di sekolah pesisir. Sesi belajar interaktif dengan metode game-based learning.',
    targetImpact: [
      { value: '30 anak', label: 'Siswa diajar' },
      { value: '3 mapel', label: 'Mata pelajaran' },
    ],
    skillsNeeded: 'Mengajar, komunikasi dengan anak, kesabaran',
    image: '📚',
  },
  {
    id: 'a3', title: 'Donor Darah Bersama', community: 'c3',
    causes: ['health', 'humanity'], skills: ['first-aid', 'social-media'],
    skillLevel: 'pemula', activityType: ['onsite'],
    location: 'denpasar', date: '2026-09-01', time: '09:00 - 14:00',
    slots: 30, slotsFilled: 22,
    description: 'Mengadakan acara donor darah massal dan edukasi tentang pentingnya donor darah sukarela di masyarakat.',
    targetImpact: [
      { value: '50 kantong', label: 'Darah terkumpul' },
      { value: '100 orang', label: 'Masyarakat teredukasi' },
    ],
    skillsNeeded: 'Terbuka untuk semua',
    image: '🩸',
  },
  {
    id: 'a4', title: 'Web Development Workshop', community: 'c5',
    causes: ['education', 'community'], skills: ['teaching', 'programming'],
    skillLevel: 'menengah', activityType: ['onsite', 'hybrid'],
    location: 'gianyar', date: '2026-09-03', time: '10:00 - 15:00',
    slots: 15, slotsFilled: 10,
    description: 'Workshop pembuatan website dasar untuk pemuda desa guna meningkatkan keterampilan digital. Peserta akan belajar HTML, CSS, dan JavaScript.',
    targetImpact: [
      { value: '25 pemuda', label: 'Peserta workshop' },
      { value: '10 website', label: 'Website dibuat' },
    ],
    skillsNeeded: 'HTML, CSS, JavaScript dasar, kemampuan mengajar',
    image: '💻',
  },
  {
    id: 'a5', title: 'Adopsi Hewan Peliharaan', community: 'c4',
    causes: ['animals'], skills: ['social-media', 'photography', 'design'],
    skillLevel: 'pemula', activityType: ['onsite'],
    location: 'denpasar', date: '2026-09-05', time: '08:00 - 12:00',
    slots: 10, slotsFilled: 4,
    description: 'Acara adopsi hewan peliharaan dengan dokumentasi foto dan promosi media sosial untuk menemukan rumah baru bagi hewan terlantar.',
    targetImpact: [
      { value: '20 hewan', label: 'Hewan diadopsi' },
      { value: '500 orang', label: 'Jangkauan sosmed' },
    ],
    skillsNeeded: 'Fotografi, desain, social media',
    image: '🐕',
  },
  {
    id: 'a6', title: 'Penanaman Mangrove', community: 'c6',
    causes: ['environment'], skills: ['cleaning'],
    skillLevel: 'menengah', activityType: ['outdoor'],
    location: 'badung', date: '2026-09-07', time: '06:00 - 11:00',
    slots: 25, slotsFilled: 18,
    description: 'Menanam bibit mangrove di area pesisir Badung untuk restorasi ekosistem dan mitigasi abrasi pantai.',
    targetImpact: [
      { value: '200 bibit', label: 'Mangrove ditanam' },
      { value: '1 hektar', label: 'Area direstorasi' },
    ],
    skillsNeeded: 'Outdoor activity, fisik sehat',
    image: '🌿',
  },
  {
    id: 'a7', title: 'Donasi Buku untuk Desa', community: 'c2',
    causes: ['education', 'community'], skills: ['event-mgmt', 'social-media'],
    skillLevel: 'pemula', activityType: ['onsite', 'hybrid'],
    location: 'tabanan', date: '2026-09-10', time: '09:00 - 13:00',
    slots: 15, slotsFilled: 9,
    description: 'Mengumpulkan dan mendistribusikan buku bacaan ke perpustakaan desa di daerah terpencil. Mari wujudkan mimpi anak-anak desa untuk membaca.',
    targetImpact: [
      { value: '500 buku', label: 'Buku terkumpul' },
      { value: '5 desa', label: 'Desa terjangkau' },
    ],
    skillsNeeded: 'Terbuka untuk semua',
    image: '📖',
  },
  {
    id: 'a8', title: 'Kelas Literasi Anak', community: 'c2',
    causes: ['education'], skills: ['teaching', 'language'],
    skillLevel: 'pemula', activityType: ['onsite'],
    location: 'denpasar', date: '2026-09-12', time: '09:00 - 12:00',
    slots: 10, slotsFilled: 6,
    description: 'Mengajar literasi dasar membaca dan menulis bagi anak-anak usia 5-8 tahun di area komunitas.',
    targetImpact: [
      { value: '20 anak', label: 'Anak diajar' },
      { value: '3 bulan', label: 'Program berkelanjutan' },
    ],
    skillsNeeded: 'Mengajar, sabar dengan anak kecil',
    image: '✏️',
  },
  {
    id: 'a9', title: 'Bank Sampah Komunitas', community: 'c1',
    causes: ['environment', 'community'], skills: ['admin', 'social-media'],
    skillLevel: 'pemula', activityType: ['onsite'],
    location: 'denpasar', date: '2026-09-14', time: '07:00 - 11:00',
    slots: 12, slotsFilled: 7,
    description: 'Mengelola bank sampah komunitas dengan memilah, mengolah, dan mendaur ulang sampah menjadi produk bernilai.',
    targetImpact: [
      { value: '200 kg', label: 'Sampah didaur ulang' },
      { value: '50 keluarga', label: 'Partisipan aktif' },
    ],
    skillsNeeded: 'Administrasi dasar, komunikasi',
    image: '♻️',
  },
  {
    id: 'a10', title: 'Posko Banjir Bandang', community: 'c3',
    causes: ['humanity', 'health'], skills: ['first-aid', 'cooking', 'cleaning'],
    skillLevel: 'pemula', activityType: ['onsite'],
    location: 'karangasem', date: '2026-09-15', time: '07:00 - 17:00',
    slots: 25, slotsFilled: 18,
    description: 'Membuka posko bantuan darurat dan memasak makanan bagi korban banjir bandang di Karangasem.',
    targetImpact: [
      { value: '200 orang', label: 'Korban terbantu' },
      { value: '300 porsi', label: 'Makanan disiapkan' },
    ],
    skillsNeeded: 'Gotong royong, memasak, pertolongan pertama',
    image: '🆘',
  },
  {
    id: 'a11', title: 'Konservasi Terumbu Karang', community: 'c1',
    causes: ['environment'], skills: ['cleaning'],
    skillLevel: 'menengah', activityType: ['outdoor'],
    location: 'karangasem', date: '2026-09-18', time: '06:00 - 12:00',
    slots: 8, slotsFilled: 5,
    description: 'Bersama menjaga kelestarian terumbu karang melalui penanaman dan pembersihan area terumbu di Amed.',
    targetImpact: [
      { value: '50 terumbu', label: 'Terumbu ditanam' },
      { value: '2 hektar', label: 'Area dibersihkan' },
    ],
    skillsNeeded: 'Mampu berenang, outdoor activity',
    image: '🪸',
  },
  {
    id: 'a12', title: 'Workshop Fotografi Sosial', community: 'c5',
    causes: ['education', 'community'], skills: ['photography', 'teaching'],
    skillLevel: 'menengah', activityType: ['onsite', 'hybrid'],
    location: 'gianyar', date: '2026-09-20', time: '14:00 - 18:00',
    slots: 20, slotsFilled: 12,
    description: 'Workshop fotografi untuk mengabadikan cerita-cerita inspiratif komunitas lokal. Peserta akan belajar teknik foto dokumenter.',
    targetImpact: [
      { value: '30 foto', label: 'Karya terkumpul' },
      { value: '15 peserta', label: 'Fotografer terlatih' },
    ],
    skillsNeeded: 'Fotografi dasar, kamera/HP',
    image: '📸',
  },
];

/* ---------- Impact History ---------- */
const MOCK_IMPACT_HISTORY = [
  { activityId: 'a1', date: '2026-07-15', hours: 4, metrics: [{ value: '12 kg', label: 'Sampah terkumpul' }, { value: '35 orang', label: 'Orang terbantu' }] },
  { activityId: 'a2', date: '2026-07-22', hours: 3, metrics: [{ value: '30 anak', label: 'Siswa diajar' }, { value: '3 mapel', label: 'Mata pelajaran' }] },
  { activityId: 'a7', date: '2026-08-01', hours: 4, metrics: [{ value: '500 buku', label: 'Buku didistribusikan' }, { value: '5 desa', label: 'Desa terjangkau' }] },
  { activityId: 'a6', date: '2026-08-08', hours: 5, metrics: [{ value: '200 bibit', label: 'Mangrove ditanam' }] },
  { activityId: 'a3', date: '2026-08-12', hours: 5, metrics: [{ value: '50 kantong', label: 'Darah terkumpul' }, { value: '100 orang', label: 'Teredukasi' }] },
  { activityId: 'a4', date: '2026-08-15', hours: 5, metrics: [{ value: '25 pemuda', label: 'Peserta workshop' }] },
];

/* ---------- Helper ---------- */
function getCommunity(id) { return COMMUNITIES.find(c => c.id === id); }
function getActivityById(id) { return ACTIVITIES.find(a => a.id === id); }
function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}
function formatDateShort(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
}
