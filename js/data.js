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
    "Fotografer",
    "Videografer",
    "Editor Video",
  ],
  // Deskripsi singkat di halaman depan
  description:
    "Mahasiswa Informatika Universitas Udayana dengan minat besar di bidang seni visual. Aktif sebagai fotografer, videografer, dan editor video di Lebulens Studio. Selamat datang di portofolio dan blog pribadi saya.",

  /* ---------- TENTANG ---------- */
  about: {
    // Foto: isi "image" dengan path file foto (misal "foto.jpg").
    // Jika dikosongkan (""), maka akan pakai emoji di bawahnya.
    image: "foto.jpg",
    emoji: "👨‍💻",
    text: "Saya adalah mahasiswa Program Studi Informatika, FMIPA, Universitas Udayana yang memiliki minat besar di bidang seni visual, khususnya fotografi dan editing foto. Saya terbiasa menggunakan Adobe Photoshop dan Adobe Lightroom untuk mengolah foto agar menghasilkan karya yang menarik dan berkualitas. Saya senang belajar hal baru, kreatif, bertanggung jawab, dan mampu bekerja secara individu maupun dalam tim.",
    skills: ["Fotografi", "Videografi", "Photoshop", "Lightroom", "Video Editing", "HTML", "CSS", "JavaScript"],
  },

  /* ---------- STATISTIK (menggunakan angka) ---------- */
  stats: [
    { value: 3, suffix: "+", label: "Bidang Kreatif" },
    { value: 2, suffix: "+", label: "Tahun Belajar" },
    { value: 2, suffix: "+", label: "Software Editing" },
    { value: 3, suffix: "+", label: "Kegiatan Kampus" },
  ],

  /* ---------- PORTOFOLIO ---------- */
  portfolio: [
    {
      emoji: "📸",
      title: "Fotografer",
      description: "Mengambil foto untuk kebutuhan dokumentasi dan konten, dengan hasil yang menarik dan berkualitas.",
      tech: "Kamera DSLR · Dokumentasi",
      link: "https://www.instagram.com/lebulens.studio",
    },
    {
      emoji: "🎥",
      title: "Videografer",
      description: "Merekam video untuk kebutuhan dokumentasi dan konten dengan komposisi yang rapi dan sinematik.",
      tech: "Videografi · Dokumentasi",
      link: "https://www.instagram.com/lebulens.studio",
    },
    {
      emoji: "🎨",
      title: "Editor Video & Foto",
      description: "Mengedit foto dan video menggunakan Adobe Photoshop, Lightroom, dengan retouching dan color correction.",
      tech: "Photoshop · Lightroom",
      link: "https://www.instagram.com/lebulens.studio",
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
    { name: "Lebulens Studio", url: "https://www.instagram.com/lebulens.studio" },
    { name: "Email", url: "mailto:lanangworkk@gmail.com" },
  ],
};
