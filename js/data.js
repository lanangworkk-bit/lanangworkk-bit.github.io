/**
 * ============================================================
 *  FILE KONFIGURASI WEBSITE - ISI SESUAI DATA KAMU
 * ============================================================
 *  Ganti semua teks di dalam tanda kutip ("...") dengan
 *  informasi kamu sendiri. Simpan file ini setelah selesai.
 *
 *  Catatan emoji: kamu bisa pakai emoji seperti 💻 📁 👨‍💻
 * ============================================================
 */

const SITE_CONFIG = {
  /* ---------- IDENTITAS ---------- */
  name: "I Ketut Lanang Subakti",
  logo: "Lannzw", // nama singkat untuk logo di navbar
  tagline: [
    "Mahasiswa Informatika",
    "Web Developer",
    "Blogger",
    "Tech Enthusiast",
  ],
  // Deskripsi singkat di halaman depan
  description:
    "Mahasiswa Informatika Universitas Udayana yang tertarik pada pengembangan web, teknologi, dan berbagi ilmu. Selamat datang di portofolio dan blog pribadi saya.",

  /* ---------- TENTANG ---------- */
  about: {
    // Foto: isi "image" dengan path file foto (misal "foto.jpg").
    // Jika dikosongkan (""), maka akan pakai emoji di bawahnya.
    image: "foto.jpg",
    emoji: "👨‍💻",
    text: "Saya adalah mahasiswa Program Studi Informatika, FMIPA, Universitas Udayana. Saya tertarik menciptakan pengalaman digital yang bersih dan mudah digunakan, serta suka berbagi ilmu melalui tulisan-tulisan di blog ini.",
    skills: ["HTML", "CSS", "JavaScript", "UI/UX", "React", "Node.js"],
  },

  /* ---------- STATISTIK (menggunakan angka) ---------- */
  stats: [
    { value: 15, suffix: "+", label: "Proyek Selesai" },
    { value: 3, suffix: "+", label: "Tahun Pengalaman" },
    { value: 40, suffix: "+", label: "Artikel Blog" },
    { value: 500, suffix: "+", label: "Klien Senang" },
  ],

  /* ---------- PORTOFOLIO ---------- */
  portfolio: [
    {
      emoji: "💻",
      title: "Website Toko Online",
      description: "Website e-commerce dengan keranjang belanja dan pembayaran sederhana.",
      tech: "HTML · CSS · JS",
    },
    {
      emoji: "📝",
      title: "Aplikasi Catatan",
      description: "Catatan digital dengan fitur pencarian dan penyimpanan lokal browser.",
      tech: "JavaScript · LocalStorage",
    },
    {
      emoji: "📊",
      title: "Dashboard Admin",
      description: "Dashboard dengan grafik data dan tampilan yang responsif di semua perangkat.",
      tech: "React · Chart.js",
    },
  ],

  /* ---------- BLOG / ARTIKEL ----------
     content: isi paragraf artikel (bisa lebih dari satu). */
  articles: [
    {
      date: "12 Agustus 2026",
      title: "Memulai Perjalanan sebagai Web Developer",
      excerpt: "Bagaimana saya mulai belajar HTML, CSS, dan JavaScript dari nol hingga mampu membuat website sendiri.",
      category: "Karier",
      content: [
        "Semua orang bisa belajar membuat website. Yang dibutuhkan hanyalah konsistensi dan rasa ingin tahu. Saya sendiri memulai dari nol, bahkan tidak tahu apa itu tag HTML.",
        "Langkah pertama adalah memahami struktur HTML, lalu menghiasnya dengan CSS, dan akhirnya menghidupkannya dengan JavaScript. Jangan terburu-buru, pelajari satu per satu.",
        "Yang paling penting: buat proyek nyata. Teori tanpa praktik hanya akan membuat kamu lupa. Mulailah dari hal kecil dan terus tingkatkan.",
      ],
    },
    {
      date: "28 Juli 2026",
      title: "Tips Mengatur Layout CSS yang Rapi",
      excerpt: "Panduan sederhana menggunakan Flexbox dan Grid untuk membuat tata letak yang bersih dan responsif.",
      category: "Tutorial",
      content: [
        "Flexbox sangat cocok untuk menyusun elemen dalam satu baris atau kolom, sedangkan Grid lebih kuat untuk membuat layout dua dimensi.",
        "Gunakan Flexbox untuk komponen kecil seperti tombol, navbar, dan kartu. Gunakan Grid untuk keseluruhan halaman atau bagian yang kompleks.",
        "Jangan lupa selalu tes di berbagai ukuran layar agar tampilan tetap rapi di HP maupun desktop.",
      ],
    },
    {
      date: "10 Juli 2026",
      title: "Kenapa Saya Suka Menulis di Blog",
      excerpt: "Menulis membantu saya memahami hal lebih dalam dan berbagi ilmu dengan orang lain.",
      category: "Refleksi",
      content: [
        "Menulis memaksa saya untuk memahami topik dengan benar sebelum membagikannya. Ketika saya tidak bisa menjelaskan dengan sederhana, artinya saya belum menguasainya.",
        "Blog juga menjadi catatan perjalanan. Setahun lagi, saya bisa melihat kembali tulisan lama dan mengukur seberapa jauh saya berkembang.",
        "Jika kamu ragu untuk mulai menulis, mulailah saja. Tidak perlu sempurna, yang penting terekam dan bermanfaat.",
      ],
    },
    {
      date: "22 Juni 2026",
      title: "JavaScript Dasar yang Harus Dikuasai",
      excerpt: "Variabel, fungsi, array, dan objek — fondasi yang wajib dikuasai setiap pemula JavaScript.",
      category: "Tutorial",
      content: [
        "Sebelum masuk ke framework, kuasai dulu fondasinya. Variabel untuk menyimpan data, fungsi untuk membuat kode yang bisa dipakai ulang.",
        "Array dan objek adalah struktur data yang paling sering digunakan. Pahami cara mengakses, menambah, dan mengubah isinya.",
        "Dengan fondasi yang kuat, belajar React atau Vue nantinya akan jauh lebih mudah.",
      ],
    },
    {
      date: "5 Juni 2026",
      title: "Merancang Warna dengan Harmoni",
      excerpt: "Cara memilih kombinasi warna yang nyaman dilihat, mulai dari teori roda warna hingga kontras.",
      category: "Desain",
      content: [
        "Warna menentukan kesan pertama. Website dengan kombinasi warna yang buruk bisa membuat pengunjung langsung pergi.",
        "Gunakan roda warna untuk mencari kombinasi yang harmonis: komplementer, analog, atau triadic. Pastikan juga kontras teks dan latar cukup jelas.",
        "Mulailah dari satu warna utama dan satu warna aksen. Sedikit warna justru membuat desain terlihat lebih profesional.",
      ],
    },
    {
      date: "18 Mei 2026",
      title: "5 Kesalahan Umum Pemula Web Dev",
      excerpt: "Kesalahan-kesalahan yang sering terjadi saat belajar dan bagaimana cara menghindarinya.",
      category: "Karier",
      content: [
        "Kesalahan pertama: terlalu cepat pindah ke framework sebelum memahami dasar. Kedua: menghafal kode tanpa memahami konsep.",
        "Ketiga: malas membaca dokumentasi. Keempat: tidak pernah membuat proyek nyata. Kelima: mudah menyerah saat menemukan error.",
        "Semua ini wajar terjadi. Yang penting adalah terus belajar dan memperbaiki diri sedikit demi sedikit.",
      ],
    },
  ],

  /* ---------- DOWNLOAD CV ----------
     Simpan file CV kamu (misal CV.pdf) di folder proyek,
     lalu tulis nama filenya di bawah. */
  cvFile: "CV.pdf",

  /* ---------- KONTAK ---------- */
  contact: {
    email: "lanangworkk@gmail.com",
    phone: "0878 1772 7908",
  },

  /* ---------- SOSIAL MEDIA ----------
     Isi URL akun kamu. Jika belum ada, biarkan "#". */
  socials: [
    { name: "GitHub", url: "https://github.com/lanangworkk-bit" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/i-ketut-lanang-subakti-560461420" },
    { name: "Instagram", url: "https://www.instagram.com/lannggzw_" },
    { name: "Email", url: "mailto:lanangworkk@gmail.com" },
  ],
};
