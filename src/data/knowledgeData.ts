export interface SourceAnalysisPoint {
  number: number;
  title: string;
  summary: string;
  details: string[];
  latex?: string;
}

export interface KnowledgeModule {
  id: number;
  title: string;
  subtitle: string;
  prose: string[];
  keyTakeaway: string;
  equations?: { label: string; latex: string; meaning: string }[];
  bullets?: string[];
  image?: { src: string; alt: string; caption: string };
  narrationScript: string;
}

export interface FormulaSummaryItem {
  id: string;
  name: string;
  latex: string;
  symbols: { symbol: string; meaning: string; unit: string }[];
  conditions: string;
  relations: string;
  category: 'Dasar' | 'Sistem Dua Benda' | 'Energi & Kerja' | 'Kasus Lanjutan';
}

export const ORIGINAL_SOAL_13 = {
  documentName: 'Soal OSK Fisika SMA 2026 — Halaman 4 (Momentum Linear)',
  number: '13',
  text: 'Seseorang di perahu 1 mendorong seseorang di perahu 2 dengan gaya F = 46 N untuk menjauhkan kedua perahu. Massa perahu 1 adalah 130 kg dan perahu kedua adalah 250 kg. Momentum dari setiap perahu setelah diberikan dorongan selama Δt = 1,2 detik adalah ... Ns.',
  officialParameters: [
    'Gaya dorong aksi-reaksi: F = 46 N',
    'Massa perahu 1 (m₁): 130 kg',
    'Massa perahu 2 (m₂): 250 kg',
    'Selang waktu dorongan (Δt): 1,2 s',
    'Kondisi awal: kedua perahu diam di atas air tanpa gesekan',
  ],
  exactResult: '55,2 Ns',
};

export const ANALYSIS_12_POINTS: SourceAnalysisPoint[] = [
  {
    number: 1,
    title: 'Materi Utama yang Diujikan',
    summary: 'Momentum Linear dan Impuls pada Sistem Dua Benda.',
    details: [
      'Soal nomor 13 berada langsung di bawah bagian Momentum Linear pada naskah resmi OSK Fisika SMA 2026.',
      'Fokus utamanya adalah bagaimana gaya interaksi internal antara dua benda menghasilkan perubahan momentum yang sama besar namun berlawanan arah.',
    ],
  },
  {
    number: 2,
    title: 'Submateri yang Berkaitan',
    summary: 'Teorema Impuls–Momentum, Hukum III Newton, dan Kekekalan Momentum.',
    details: [
      'Hubungan impuls gaya konstan dengan perubahan momentum.',
      'Pasangan gaya aksi–reaksi yang bekerja pada dua benda berbeda.',
      'Sistem terisolasi secara horizontal (tanpa gaya hambat air).',
    ],
  },
  {
    number: 3,
    title: 'Konsep dan Prinsip Fisika yang Digunakan',
    summary: 'Impuls sebagai luas di bawah kurva F(t) sekaligus pengubah momentum benda.',
    details: [
      'Momentum merupakan besaran vektor yang arahnya searah kecepatan benda.',
      'Meskipun massa kedua perahu sangat berbeda (130 kg vs 250 kg), besar gaya dan durasi kontak keduanya identik.',
      'Massa pada soal asli berfungsi menguji ketajaman konsep: siswa sering terjebak mencoba menghitung kecepatan dulu secara tidak perlu.',
    ],
  },
  {
    number: 4,
    title: 'Hukum-Hukum Fisika yang Mendasari Soal',
    summary: 'Hukum II Newton bentuk momentum, Hukum III Newton, dan Hukum Kekekalan Momentum Linear.',
    details: [
      'Hukum II Newton: gaya resultan sama dengan laju perubahan momentum.',
      'Hukum III Newton: gaya pada perahu 2 oleh perahu 1 sama besar dan berlawanan arah dengan gaya pada perahu 1 oleh perahu 2.',
      'Hukum Kekekalan Momentum: karena resultan gaya eksternal horizontal nol, jumlah vektor momentum sistem tetap nol.',
    ],
    latex: '\\vec{F}_{12} = -\\vec{F}_{21}, \\qquad \\vec{I} = \\Delta\\vec{p} = \\vec{F}\\Delta t',
  },
  {
    number: 5,
    title: 'Besaran Fisis dan Satuannya (SI)',
    summary: 'Konsistensi satuan Newton, detik, kilogram, dan Newton-sekon.',
    details: [
      'Gaya (F): Newton (N = kg·m/s²)',
      'Selang waktu (Δt): sekon (s)',
      'Massa (m₁, m₂): kilogram (kg)',
      'Impuls (I) dan Momentum (p): Newton·sekon (Ns = kg·m/s)',
    ],
  },
  {
    number: 6,
    title: 'Persamaan Matematis yang Relevan',
    summary: 'Teorema impuls-momentum satu dimensi sepanjang sumbu-x.',
    details: [
      'Untuk gaya konstan selama selang waktu Δt yang dimulai dari keadaan diam:',
    ],
    latex: 'I = F\\,\\Delta t = \\Delta p = p_{\\text{akhir}} - p_{\\text{awal}} = p_{\\text{akhir}} - 0 = 46 \\times 1{,}2 = 55{,}2\\text{ Ns}',
  },
  {
    number: 7,
    title: 'Variabel Diketahui dan Ditanyakan',
    summary: 'Identifikasi besaran inti versus data pengecoh konseptual.',
    details: [
      'Diketahui: F = 46 N, Δt = 1,2 s, m₁ = 130 kg, m₂ = 250 kg, v₁,₀ = v₂,₀ = 0.',
      'Ditanyakan: Besar momentum setiap perahu setelah dorongan (Ns).',
    ],
  },
  {
    number: 8,
    title: 'Hubungan Antarbesaran',
    summary: 'Momentum sama besar, sedangkan kecepatan berbanding terbalik dengan massa.',
    details: [
      'Karena |p₁| = |p₂| = F·Δt, maka m₁·v₁ = m₂·v₂.',
      'Perahu bermassa lebih kecil (130 kg) memperoleh kelajuan lebih besar dibandingkan perahu bermassa lebih besar (250 kg).',
      'Energi kinetik masing-masing juga berbanding terbalik dengan massa: K = p²/(2m).',
    ],
    latex: '\\frac{v_1}{v_2} = \\frac{m_2}{m_1}, \\qquad \\frac{K_1}{K_2} = \\frac{m_2}{m_1}',
  },
  {
    number: 9,
    title: 'Model Matematis dan Model Fisis Fenomena',
    summary: 'Sistem dua partikel terisolasi pada lintasan licin satu dimensi.',
    details: [
      'Sumbu-x mendatar dipilih sepanjang garis hubung kedua perahu dengan titik asal 0 di antara keduanya.',
      'Gaya berat dan gaya apung Archimedes saling meniadakan pada arah vertikal (ΣFy = 0).',
      'Gaya hambat air diabaikan selama interaksi singkat sehingga momentum total sistem terkonservasi.',
    ],
  },
  {
    number: 10,
    title: 'Tingkat Kesulitan dan Karakteristik Penalaran',
    summary: 'Level Dasar–Menengah OSK dengan jebakan konseptual (conceptual trap).',
    details: [
      'Secara hitung sangat ringkas, tetapi menuntut pemahaman tajam tentang sifat vektor aksi–reaksi dan independensi impuls terhadap massa.',
      'Siswa yang hanya menghafal p = m·v sering bingung karena kecepatan tidak diberikan.',
    ],
  },
  {
    number: 11,
    title: 'Konsep Pendukung yang Harus Dikuasai',
    summary: 'Prasyarat kinematika, vektor 1D, dan diagram benda bebas (FBD).',
    details: [
      'Membedakan gaya internal sistem vs gaya eksternal.',
      'Memahami bahwa pasangan aksi-reaksi bekerja pada dua benda berbeda sehingga TIDAK saling meniadakan pada satu FBD.',
      'Menghitung luas daerah di bawah grafik F–t dan integral sederhana.',
    ],
  },
  {
    number: 12,
    title: 'Variasi Pengembangan Soal Tingkat Olimpiade',
    summary: 'Peta jalan pengembangan 15 soal dalam aplikasi ini.',
    details: [
      'Kecepatan relatif dan perbandingan energi kinetik dua perahu.',
      'Gaya dorong berubah terhadap waktu F(t) (trapesium & fungsi kuadratik).',
      'Kondisi awal bergerak (v₀ ≠ 0), gaya miring bersudut θ, serta hambatan air konstan dan linear (f = -bv).',
      'Pertukaran massa (orang melompat antar perahu), pegas terkompresi, pantulan dinding dermaga, hingga tumbukan berantai tiga perahu.',
    ],
  },
];

export const KNOWLEDGE_MODULES: KnowledgeModule[] = [
  {
    id: 1,
    title: '01. Pengenalan Fenomena Fisika: Dua Perahu yang Saling Mendorong',
    subtitle: 'Mengapa mendorong perahu lain justru membuat perahu kita sendiri bergerak mundur?',
    prose: [
      'Bayangkan kamu berdiri di atas Perahu 1 yang diam tenang di tengah danau, lalu kamu mendorong Perahu 2 ke arah kanan. Seketika itu juga, bukan hanya Perahu 2 yang meluncur ke kanan—perahumu sendiri ikut terdorong ke kiri!',
      'Fenomena ini terjadi karena interaksi antara dua benda selalu bersifat dua arah. Tanganmu tidak mungkin mendorong Perahu 2 tanpa Perahu 2 mendorong balik tanganmu dengan kekuatan yang sama persis pada saat yang sama.',
    ],
    keyTakeaway:
      'Dalam setiap dorongan antara dua benda bebas di permukaan licin, tidak pernah ada satu benda yang bergerak sendirian—keduanya selalu bertukar momentum dengan besar sama dan arah berlawanan.',
    image: {
      src: '/src/assets/images/hero_boats_momentum_1795269556727.jpg',
      alt: 'Dua siswa di atas dua perahu saling mendorong di atas permukaan air yang tenang',
      caption:
        'Ilustrasi realistis fenomena Soal 13 OSK 2026: gaya dorong antar-penumpang memisahkan kedua perahu ke arah berlawanan.',
    },
    narrationScript:
      'Halo juara olimpiade, bersama Mister Jo di sini! Mari kita mulai dari fenomena nyata di balik Soal Nomor 13 OSK Fisika 2026. Saat kamu berada di perahu satu dan mendorong perahu dua, kamu melihat kedua perahu bergerak saling menjauh. Mengapa perahumu ikut mundur? Karena interaksi gaya di alam selalu berpasangan. Kamu mendorong perahu dua ke kanan, dan pada detik yang sama perahu dua mendorongmu ke kiri dengan besar gaya yang persis sama!',
  },
  {
    id: 2,
    title: '02. Penjelasan Konsep Dasar: Momentum Linear & Impuls',
    subtitle: 'Memahami "ukuran gerak" suatu benda dan bagaimana gaya mengubahnya selama selang waktu.',
    prose: [
      'Momentum linear adalah ukuran seberapa sulit suatu benda dihentikan atau diubah geraknya. Secara fisis, sebuah truk yang berjalan lambat dan sebuah sepeda motor yang melaju kencang dapat memiliki momentum yang sama karena momentum bergantung pada hasil kali massa dan kecepatan.',
      'Sementara itu, impuls adalah dorongan gaya yang bekerja selama selang waktu tertentu. Semakin besar gaya atau semakin lama waktu sentuhnya, semakin besar impuls yang diterima benda.',
    ],
    equations: [
      {
        label: 'Definisi Momentum Linear',
        latex: '\\vec{p} = m\\vec{v}',
        meaning:
          'Momentum adalah vektor yang searah dengan kecepatan benda. Satuan SI-nya adalah kg·m/s atau Ns.',
      },
      {
        label: 'Definisi Impuls Gaya Konstan',
        latex: '\\vec{I} = \\vec{F}_{\\text{rata-rata}}\\,\\Delta t',
        meaning:
          'Untuk gaya berubah terhadap waktu, impuls adalah integral gaya terhadap waktu: I = ∫ F(t) dt.',
      },
    ],
    keyTakeaway:
      'Momentum adalah keadaan gerak sesaat (bergantung pada v), sedangkan impuls adalah proses pemberian dorongan selama Δt.',
    narrationScript:
      'Konsep kedua adalah membedakan momentum dan impuls. Momentum p sama dengan massa dikalikan kecepatan, merupakan besaran vektor. Sedangkan impuls I sama dengan gaya rata-rata dikalikan selang waktu delta t. Ingat ya, impuls bekerja selama selang waktu kontak, lalu hasilnya tersimpan sebagai perubahan momentum benda.',
  },
  {
    id: 3,
    title: '03. Besaran dan Satuan Standar Internasional (SI)',
    subtitle: 'Menjaga konsistensi dimensi agar perhitungan olimpiade bebas dari kesalahan konversi.',
    prose: [
      'Salah satu ciri soal OSK Fisika adalah ketelitian satuan. Sebelum memasukkan angka ke dalam persamaan, pastikan semua besaran sudah berada dalam sistem SI murni (kilogram, meter, sekon, Newton).',
    ],
    bullets: [
      'Massa (m): kilogram (kg). Hati-hati jika soal memberi satuan ton (1 ton = 1000 kg) atau gram.',
      'Kecepatan (v): meter per sekon (m/s). Besaran vektor: gunakan tanda (+) ke kanan dan (−) ke kiri.',
      'Gaya (F): Newton (N), dengan 1 N = 1 kg·m/s².',
      'Selang waktu (Δt): sekon atau detik (s).',
      'Momentum (p) & Impuls (I): Newton·sekon (Ns), yang secara dimensi identik dengan kg·m/s.',
      'Energi Kinetik (K) & Usaha (W): Joule (J = N·m = kg·m²/s²).',
    ],
    keyTakeaway:
      'Selalu periksa dimensi! 1 Ns = 1 (kg·m/s²)·s = 1 kg·m/s, sehingga impuls dan momentum dapat dijumlahkan secara langsung.',
    narrationScript:
      'Sebelum menghitung, pastikan seluruh satuan sudah dalam SI. Massa dalam kilogram, waktu dalam detik, gaya dalam Newton, dan kecepatan dalam meter per sekon. Satuan momentum dan impuls identik, yaitu Newton sekon atau kilogram meter per sekon.',
  },
  {
    id: 4,
    title: '04. Hukum Fisika yang Berlaku: Newton II & Newton III',
    subtitle: 'Mengapa perubahan momentum kedua perahu pasti sama besar meskipun massanya berbeda?',
    prose: [
      'Sebenarnya, Isaac Newton pertama kali merumuskan Hukum II Newton bukan sebagai F = m·a, melainkan sebagai laju perubahan momentum: gaya resultan sama dengan turunan momentum terhadap waktu.',
      'Ketika digabungkan dengan Hukum III Newton (gaya aksi sama besar dan berlawanan arah dengan gaya reaksi), lahirlah konsekuensi paling kuat dalam mekanika: selama selang waktu kontak yang sama Δt, impuls yang diterima Perahu 1 dan Perahu 2 selalu tepat sama besar dan berlawanan arah.',
    ],
    equations: [
      {
        label: 'Hukum II Newton (Bentuk Umum)',
        latex: '\\Sigma \\vec{F}_{\\text{eks}} = \\frac{d\\vec{p}}{dt}',
        meaning:
          'Berlaku bahkan ketika massa benda berubah (seperti perahu saat penumpang melompat atau roket).',
      },
      {
        label: 'Hukum III Newton (Aksi–Reaksi)',
        latex: '\\vec{F}_{12} = -\\vec{F}_{21} \\implies \\vec{F}_{12}\\Delta t = -\\vec{F}_{21}\\Delta t',
        meaning:
          'Kedua gaya bekerja pada benda yang BERBEDA selama selang waktu Δt yang sama persis.',
      },
    ],
    image: {
      src: '/src/assets/images/realworld_action_reaction_1795269556889.jpg',
      alt: 'Pendayung kayak mendorong dermaga kayu menunjukkan pasangan gaya aksi dan reaksi',
      caption:
        'Pasangan aksi–reaksi bekerja pada dua objek berbeda: gaya pada dermaga (kanan) dan gaya reaksi pada kayak (kiri).',
    },
    keyTakeaway:
      'Gaya aksi dan reaksi tidak pernah meniadakan satu sama lain karena masing-masing bekerja pada diagram benda bebas (FBD) objek yang berbeda!',
    narrationScript:
      'Inilah inti fisika di balik soal perahu! Menurut Hukum Tiga Newton, gaya yang diberikan perahu satu pada perahu dua sama besar dan berlawanan arah dengan gaya yang diterima perahu satu. Karena selang waktu dorongannya sama persis, maka impuls dan perubahan momentum kedua perahu pasti sama besar, tidak peduli seberapa jauh perbedaan massa keduanya.',
  },
  {
    id: 5,
    title: '05. Persamaan Matematis Utama',
    subtitle: 'Kumpulan persamaan inti dari hukum dasar hingga analisis energi sistem.',
    prose: [
      'Dari gabungan Hukum II dan III Newton pada sistem dua benda tanpa gaya luar mendatar, kita memperoleh rangkaian persamaan matematis yang menjadi tulang punggung seluruh 15 soal latihan.',
    ],
    equations: [
      {
        label: 'Teorema Impuls–Momentum',
        latex: '\\vec{I} = \\int_{t_1}^{t_2} \\vec{F}(t)\\,dt = \\Delta\\vec{p} = m\\vec{v}_2 - m\\vec{v}_1',
        meaning: 'Menghubungkan integral gaya-waktu dengan perubahan momentum.',
      },
      {
        label: 'Kekekalan Momentum Total Sistem',
        latex: 'm_1\\vec{v}_{1,0} + m_2\\vec{v}_{2,0} = m_1\\vec{v}_1 + m_2\\vec{v}_2',
        meaning: 'Berlaku bila resultan gaya eksternal pada arah gerak sama dengan nol (ΣFx,eks = 0).',
      },
      {
        label: 'Energi Kinetik dalam Bentuk Momentum',
        latex: 'K = \\frac{1}{2}mv^2 = \\frac{p^2}{2m}',
        meaning:
          'Bentuk p² dibagi 2m sangat efisien di olimpiade saat dua benda memiliki besar momentum yang sama.',
      },
    ],
    keyTakeaway:
      'Mengubah ½mv² menjadi p²/(2m) sering memangkas waktu perhitungan soal OSK hingga separuhnya!',
    narrationScript:
      'Catat persamaan emas olimpiade ini: energi kinetik K sama dengan p kuadrat dibagi dua m. Jika dua perahu mula-mula diam lalu saling dorong, momentum keduanya sama besar, sehingga energi kinetiknya langsung berbanding terbalik dengan massanya.',
  },
  {
    id: 6,
    title: '06. Penurunan Rumus Secara Bertahap',
    subtitle: 'Membuktikan Teorema Impuls–Momentum dan Kekekalan Momentum dari prinsip pertama.',
    prose: [
      'Dalam fisika olimpiade, kita tidak pernah menerima rumus begitu saja. Mari kita turunkan langsung dari Hukum II Newton.',
    ],
    equations: [
      {
        label: 'Langkah 1 — Integralkan Hukum II Newton terhadap waktu',
        latex: '\\vec{F}(t) = \\frac{d\\vec{p}}{dt} \\implies \\int_{t_0}^{t_0+\\Delta t} \\vec{F}(t)\\,dt = \\int_{\\vec{p}_0}^{\\vec{p}_f} d\\vec{p} = \\vec{p}_f - \\vec{p}_0',
        meaning: 'Inilah bukti bahwa luas di bawah kurva F(t) selalu sama dengan perubahan momentum Δp.',
      },
      {
        label: 'Langkah 2 — Jumlahkan persamaan gerak Perahu 1 dan Perahu 2',
        latex: '\\frac{d\\vec{p}_1}{dt} = \\vec{F}_{21} + \\vec{F}_{1,\\text{eks}}, \\qquad \\frac{d\\vec{p}_2}{dt} = \\vec{F}_{12} + \\vec{F}_{2,\\text{eks}}',
        meaning: 'F₂₁ adalah gaya pada perahu 1 oleh perahu 2; F₁₂ adalah gaya pada perahu 2 oleh perahu 1.',
      },
      {
        label: 'Langkah 3 — Eliminasi gaya internal dengan Hukum III Newton (F₂₁ + F₁₂ = 0)',
        latex: '\\frac{d}{dt}(\\vec{p}_1 + \\vec{p}_2) = \\vec{F}_{1,\\text{eks}} + \\vec{F}_{2,\\text{eks}} = \\Sigma\\vec{F}_{\\text{eks}}',
        meaning:
          'Jika air licin tanpa hambatan (ΣF_eks = 0), maka d(p₁ + p₂)/dt = 0, sehingga p₁ + p₂ konstan!',
      },
    ],
    keyTakeaway:
      'Jika ada gaya luar seperti gesekan air f, kekekalan momentum TIDAK lagi berlaku, tetapi F_net = dp/dt dan I_net = Δp masih tetap berlaku!',
    narrationScript:
      'Mari kita lihat mengapa rumus ini berlaku. Jika kita jumlahkan laju perubahan momentum perahu satu dan perahu dua, gaya dorong internal antara keduanya saling meniadakan berdasarkan Hukum Tiga Newton. Yang tersisa hanyalah jumlah gaya eksternal. Jadi selama tidak ada gaya luar mendatar, momentum total sistem pasti kekal.',
  },
  {
    id: 7,
    title: '07. Interpretasi Fisis Setiap Variabel',
    subtitle: 'Memahami apa yang sebenarnya diwakili setiap huruf dalam persamaan.',
    prose: [
      'Kesalahan paling sering muncul ketika siswa tertukar antara gaya internal dan eksternal, atau keliru menafsirkan tanda negatif.',
    ],
    bullets: [
      'F (Gaya dorong): Menunjukkan seberapa kuat kedua perahu berinteraksi pada satu saat. Bisa konstan (46 N) maupun berubah-ubah F(t).',
      'Δt (Durasi kontak): Lamanya tangan atau pegas benar-benar mendorong. Setelah tangan lepas, F = 0 dan momentum perahu berhenti berubah.',
      'm₁ dan m₂ (Inersia): Ukuran kemalasan benda berubah kecepatan. Massa besar menerima impuls yang sama, tetapi kecepatannya kecil.',
      'Tanda (−) pada v₁ atau p₁: Menyatakan arah berlawanan terhadap sumbu-+x, bukan berarti energi bernilai negatif.',
      'x_pm (Posisi Pusat Massa): Jika awalnya diam dan tanpa gaya luar, pusat massa kedua perahu tetap diam di titik awal meski kedua perahu menjauh!',
    ],
    keyTakeaway:
      'Pusat massa sistem terisolasi yang awalnya diam tidak pernah berpindah tempat: m₁·Δx₁ + m₂·Δx₂ = 0.',
    narrationScript:
      'Setiap huruf punya arti fisis yang jelas. Tanda negatif pada kecepatan berarti arah gerak ke kiri atau berlawanan sumbu x positif. Dan ingat fakta menarik: walaupun kedua perahu saling menjauh, titik pusat massa sistem tetap diam di posisi awalnya!',
  },
  {
    id: 8,
    title: '08. Hubungan Antarbesaran & Perbandingan Cepat',
    subtitle: 'Pola rasio yang selalu muncul dalam soal interaksi dua benda dari keadaan diam.',
    prose: [
      'Saat dua perahu mula-mula diam lalu saling dorong di air tanpa gesekan, kita bisa langsung melihat hubungan rasio antarbesaran berikut:',
    ],
    equations: [
      {
        label: 'Rasio Momentum, Kecepatan, Perpindahan, dan Energi Kinetik',
        latex: '\\frac{|p_1|}{|p_2|} = 1, \\qquad \\frac{|v_1|}{|v_2|} = \\frac{|\\Delta x_1|}{|\\Delta x_2|} = \\frac{K_1}{K_2} = \\frac{m_2}{m_1}',
        meaning:
          'Perahu yang lebih ringan selalu mendapat kecepatan lebih besar, menempuh jarak lebih jauh selama dorongan, dan membawa porsi energi kinetik lebih besar!',
      },
      {
        label: 'Energi Kinetik Total via Massa Tereduksi (μ)',
        latex: 'K_{\\text{total}} = \\frac{p^2}{2m_1} + \\frac{p^2}{2m_2} = \\frac{p^2}{2\\mu}, \\quad \\text{dengan } \\mu = \\frac{m_1 m_2}{m_1 + m_2}',
        meaning: 'Massa tereduksi μ mempermudah perhitungan energi sistem dua benda.',
      },
    ],
    keyTakeaway:
      'Perahu ringan mendapat bagian energi kinetik yang lebih besar, meskipun besar momentumnya tepat sama dengan perahu berat.',
    narrationScript:
      'Perhatikan perbandingan cepat ini: rasio kecepatan, rasio perpindahan selama dorongan, dan rasio energi kinetik keduanya sama dengan kebalikan rasio massanya. Perahu yang lebih ringan selalu memperoleh bagian energi kinetik lebih besar!',
  },
  {
    id: 9,
    title: '09. Penerapan Nyata dalam Kehidupan & Sains',
    subtitle: 'Dari perahu di danau hingga propulsi roket dan pegas laboratorium.',
    prose: [
      'Prinsip aksi–reaksi dan kekekalan momentum pada dua perahu merupakan model sederhana dari berbagai fenomena nyata di sains dan teknik:',
    ],
    bullets: [
      'Pendayung & Perahu: Ketika dayung mendorong air ke belakang, air memberikan impuls ke depan pada perahu.',
      'Peluncuran Roket & Jet: Roket mendorong gas panas ke belakang dengan kecepatan tinggi; gas memberikan gaya dorong ke depan pada badan roket.',
      'Senapan & Peluru (Recoil): Peluru dan senapan menerima impuls yang sama besar (p_peluru = p_senapan), tetapi karena massa peluru jauh lebih kecil, hampir seluruh energi ledakan masuk ke peluru.',
      'Percobaan Pegas Terkompresi di Rel Udara: Model standar laboratorium untuk membuktikan konversi energi potensial pegas menjadi energi kinetik dua massa dengan rasio m₂/m₁.',
    ],
    image: {
      src: '/src/assets/images/lab_spring_boats_1795269557155.jpg',
      alt: 'Dua model perahu laboratorium dihubungkan pegas terkompresi di dalam tangki air transparan',
      caption:
        'Aparatus laboratorium dua perahu dengan pegas terkompresi: pembuktian eksperimental kekekalan momentum dan konversi energi.',
    },
    keyTakeaway:
      'Semua sistem propulsi dan tolak-menolak—dari perahu hingga roket luar angkasa—mengikuti hukum fisika yang persis sama dengan Soal 13 OSK 2026.',
    narrationScript:
      'Konsep ini bukan hanya soal dua perahu di danau. Prinsip yang persis sama menjelaskan mengapa senapan menghentak ke belakang saat peluru ditembakkan, bagaimana roket meluncur di ruang hampa, dan eksperimen pegas di laboratorium fisika.',
  },
  {
    id: 10,
    title: '10. Contoh Penyelesaian Matematis Lengkap (Naskah Asli OSK No. 13)',
    subtitle: 'Langkah sistematis membaca, menganalisis, dan menghitung soal sumber OSK 2026.',
    prose: [
      'Mari kita selesaikan soal asli OSK Fisika 2026 Nomor 13 menggunakan metode analisis bertahap agar kamu memahami struktur penyelesaian yang benar.',
    ],
    equations: [
      {
        label: '1. Identifikasi Data & Hukum',
        latex: 'F = 46\\text{ N}, \\quad \\Delta t = 1{,}2\\text{ s}, \\quad m_1 = 130\\text{ kg}, \\quad m_2 = 250\\text{ kg}',
        meaning: 'Kedua perahu mula-mula diam (v₁,₀ = v₂,₀ = 0) dan gaya horizontal saling berlawanan.',
      },
      {
        label: '2. Hitung Impuls pada Masing-masing Perahu',
        latex: '|I_1| = |I_2| = F\\,\\Delta t = 46\\text{ N} \\times 1{,}2\\text{ s} = 55{,}2\\text{ Ns}',
        meaning: 'Karena p_awal = 0, maka |p₁| = |p₂| = 55,2 Ns.',
      },
      {
        label: '3. Cek Kecepatan (Sebagai Verifikasi Tambahan)',
        latex: 'v_1 = -\\frac{55{,}2}{130} \\approx -0{,}425\\text{ m/s}, \\quad v_2 = +\\frac{55{,}2}{250} = +0{,}221\\text{ m/s}',
        meaning: 'Verifikasi momentum total: 130(−0,4246...) + 250(0,2208) = −55,2 + 55,2 = 0 Ns.',
      },
    ],
    keyTakeaway:
      'Jawaban akhir soal sumber OSK 2026 Nomor 13 adalah 55,2 Ns untuk setiap perahu!',
    narrationScript:
      'Sekarang mari kita hitung soal asli OSK 2026 Nomor 13. Diketahui gaya F sama dengan 46 Newton, bekerja selama delta t 1,2 detik. Karena awalnya diam, momentum setiap perahu langsung sama dengan impulsnya: 46 dikali 1,2 sama dengan 55,2 Newton sekon. Massa 130 dan 250 kilogram tidak mengubah besar momentum masing-masing perahu!',
  },
  {
    id: 11,
    title: '11. Kesalahan Umum yang Sering Dilakukan Siswa',
    subtitle: 'Lima jebakan klasik yang membuat peserta kehilangan poin di OSK.',
    prose: [
      'Dari pengalaman membimbing siswa Olimpiade, berikut lima kekeliruan paling sering muncul pada topik ini:',
    ],
    bullets: [
      '1. Mengira gaya aksi dan reaksi saling meniadakan sehingga menyimpulkan perahu tidak bergerak. Ingat: gaya aksi bekerja pada Perahu 2, reaksi bekerja pada Perahu 1.',
      '2. Mengira perahu bermassa lebih besar memiliki momentum lebih besar. Yang lebih kecil adalah kecepatannya, bukan momentumnya.',
      '3. Membagi gaya F dengan massa total (m₁ + m₂) untuk mencari percepatan salah satu perahu. Percepatan Perahu 1 hanya ditentukan oleh gaya pada Perahu 1 dibagi m₁!',
      '4. Melupakan tanda vektor ketika kecepatan awal tidak nol atau ketika benda berbalik arah setelah memantul.',
      '5. Menggunakan Kekekalan Momentum padahal ada gaya eksternal netto (seperti gesekan air f atau komponen dinding dermaga) yang tidak nol.',
    ],
    keyTakeaway:
      'Selalu gambar Diagram Benda Bebas (FBD) untuk masing-masing perahu secara terpisah sebelum menulis persamaan Newton atau momentum!',
    narrationScript:
      'Hati-hati dengan lima kesalahan klasik ini! Jangan pernah membagi gaya dorong dengan massa total untuk mencari percepatan satu perahu, jangan tertukar arah vektor, dan jangan paksakan kekekalan momentum kalau ada gesekan luar atau tumbukan dengan dermaga yang diam.',
  },
  {
    id: 12,
    title: '12. Strategi Cepat Menyelesaikan Soal Olimpiade',
    subtitle: 'Pola pikir tingkat lanjut untuk menembus soal OSK hingga OSP.',
    prose: [
      'Ketika menghadapi variasi kompleks di tingkat Olimpiade Kota, gunakan empat jurus strategis berikut:',
    ],
    bullets: [
      'Pilih Batas Sistem dengan Cerdas: Jika ada gaya internal rumit (misalnya anak melompat antar perahu), masukkan semua benda ke dalam SATU sistem agar gaya internal hilang dari persamaan kekekalan momentum.',
      'Gunakan Kerangka Pusat Massa (CM): Pada sistem tanpa gaya luar, posisi dan kecepatan pusat massa konstan. Ini sangat ampuh untuk soal jarak pisah dan energi minimum.',
      'Manfaatkan Bentuk p²/(2m): Saat gaya pegas atau ledakan memisahkan dua benda dari keadaan diam, langsung nyatakan energi kinetik sebagai p² dibagi 2μ.',
      'Integrasi Impuls pada Gaya Hambat Linear (f = -bv): Ingat identitas Δp = -b·Δx! Kamu bisa langsung menemukan jarak henti tanpa perlu menyelesaikan persamaan diferensial eksponensial secara penuh.',
    ],
    keyTakeaway:
      'Menguasai pemilihan sistem, kekekalan momentum, dan bentuk energi p²/(2m) mengubah soal 15 menit menjadi perhitungan 2 menit yang elegan.',
    narrationScript:
      'Terakhir, kuasai empat strategi olimpiade dari Mister Jo: pertama, definisikan batas sistem dengan cerdas; kedua, manfaatkan sifat pusat massa; ketiga, gunakan rumus energi kinetik p kuadrat dibagi dua mu; dan keempat, kenali hubungan impuls gaya hambat linear dengan perpindahan total. Sekarang kamu siap menaklukkan 15 soal latihan bertahap!',
  },
];

export const FORMULA_SUMMARY_LIST: FormulaSummaryItem[] = [
  {
    id: 'f1',
    name: 'Definisi Momentum Linear',
    latex: '\\vec{p} = m\\vec{v}',
    symbols: [
      { symbol: '\\vec{p}', meaning: 'Momentum linear', unit: 'Ns atau kg·m/s' },
      { symbol: 'm', meaning: 'Massa benda', unit: 'kg' },
      { symbol: '\\vec{v}', meaning: 'Vektor kecepatan', unit: 'm/s' },
    ],
    conditions: 'Berlaku untuk benda bermassa m yang bergerak dengan kecepatan v (non-relativistik).',
    relations: 'Untuk momentum tetap, kelajuan berbanding terbalik dengan massa (v ∝ 1/m).',
    category: 'Dasar',
  },
  {
    id: 'f2',
    name: 'Teorema Impuls – Momentum (Gaya Konstan & Berubah)',
    latex: '\\vec{I} = \\int_{t_1}^{t_2} \\vec{F}_{\\text{net}}(t)\\,dt = \\vec{F}_{\\text{rata}}\\Delta t = \\Delta\\vec{p}',
    symbols: [
      { symbol: '\\vec{I}', meaning: 'Impuls gaya netto', unit: 'Ns' },
      { symbol: '\\vec{F}_{\\text{net}}', meaning: 'Gaya resultan bekerja pada benda', unit: 'N' },
      { symbol: '\\Delta t', meaning: 'Selang waktu interaksi', unit: 's' },
      { symbol: '\\Delta\\vec{p}', meaning: 'Perubahan momentum (p_akhir − p_awal)', unit: 'Ns' },
    ],
    conditions: 'Selalu berlaku pada kerangka inersial, baik ada maupun tidak ada gaya gesek eksternal (gunakan gaya netto pada benda).',
    relations: 'Luas di bawah grafik F(t) terhadap t sama dengan perubahan momentum benda.',
    category: 'Dasar',
  },
  {
    id: 'f3',
    name: 'Hukum III Newton & Kesamaan Impuls Aksi–Reaksi',
    latex: '\\vec{F}_{12} = -\\vec{F}_{21} \\implies \\vec{I}_{12} = -\\vec{I}_{21}',
    symbols: [
      { symbol: '\\vec{F}_{12}', meaning: 'Gaya pada benda 2 oleh benda 1', unit: 'N' },
      { symbol: '\\vec{F}_{21}', meaning: 'Gaya pada benda 1 oleh benda 2', unit: 'N' },
    ],
    conditions: 'Berlaku untuk segala jenis interaksi internal (dorongan tangan, pegas, tumbukan, lompatan).',
    relations: 'Dua benda berinteraksi selalu menerima besar impuls internal yang sama, terlepas dari perbedaan massanya.',
    category: 'Sistem Dua Benda',
  },
  {
    id: 'f4',
    name: 'Hukum Kekekalan Momentum Linear Sistem',
    latex: 'm_1\\vec{v}_{1,0} + m_2\\vec{v}_{2,0} = m_1\\vec{v}_1 + m_2\\vec{v}_2',
    symbols: [
      { symbol: 'm_1, m_2', meaning: 'Massa benda 1 dan benda 2', unit: 'kg' },
      { symbol: '\\vec{v}_{1,0}, \\vec{v}_{2,0}', meaning: 'Kecepatan awal sebelum interaksi', unit: 'm/s' },
      { symbol: '\\vec{v}_1, \\vec{v}_2', meaning: 'Kecepatan akhir sesudah interaksi', unit: 'm/s' },
    ],
    conditions: 'Hanya berlaku pada arah sumbu di mana resultan gaya eksternal sama dengan nol (ΣF_eks,x = 0).',
    relations: 'Jika awalnya diam, p₁ = −p₂ sehingga perbandingan kelajuan v₁/v₂ = m₂/m₁.',
    category: 'Sistem Dua Benda',
  },
  {
    id: 'f5',
    name: 'Posisi & Kecepatan Pusat Massa Sistem',
    latex: 'x_{\\text{pm}} = \\frac{m_1 x_1 + m_2 x_2}{m_1 + m_2}, \\qquad v_{\\text{pm}} = \\frac{p_1 + p_2}{m_1 + m_2}',
    symbols: [
      { symbol: 'x_{\\text{pm}}', meaning: 'Posisi pusat massa sistem', unit: 'm' },
      { symbol: 'v_{\\text{pm}}', meaning: 'Kecepatan pusat massa sistem', unit: 'm/s' },
    ],
    conditions: 'Jika ΣF_eks = 0, maka v_pm konstan; bila awalnya diam, m₁Δx₁ + m₂Δx₂ = 0.',
    relations: 'Perpindahan masing-masing perahu selama dan sesudah dorongan selalu berbanding terbalik dengan massanya.',
    category: 'Sistem Dua Benda',
  },
  {
    id: 'f6',
    name: 'Energi Kinetik Total dari Dorongan Internal (Massa Tereduksi)',
    latex: 'K_{\\text{tot}} = \\frac{p^2}{2m_1} + \\frac{p^2}{2m_2} = \\frac{p^2}{2\\mu}, \\quad \\mu = \\frac{m_1 m_2}{m_1 + m_2}',
    symbols: [
      { symbol: 'K_{\\text{tot}}', meaning: 'Energi kinetik total kedua benda', unit: 'J' },
      { symbol: 'p', meaning: 'Besar momentum masing-masing benda (dari diam)', unit: 'Ns' },
      { symbol: '\\mu', meaning: 'Massa tereduksi sistem dua benda', unit: 'kg' },
    ],
    conditions: 'Berlaku ketika sistem awalnya diam (atau energi kinetik relatif di kerangka pusat massa) dan p₁ = −p₂.',
    relations: 'Usaha internal yang dilakukan otot atau pegas (W_int) seluruhnya berubah menjadi K_tot (tanpa disipasi).',
    category: 'Energi & Kerja',
  },
  {
    id: 'f7',
    name: 'Energi Potensial Pegas & Energi Hilang Tumbukan Tak Elastis',
    latex: 'E_p = \\frac{1}{2}k(\\Delta x)^2, \\qquad \\Delta K_{\\text{hilang}} = \\frac{1}{2}\\mu (v_1 - v_2)^2',
    symbols: [
      { symbol: 'k', meaning: 'Konstanta pegas', unit: 'N/m' },
      { symbol: '\\Delta x', meaning: 'Besar kompresi atau regangan pegas', unit: 'm' },
      { symbol: '\\Delta K_{\\text{hilang}}', meaning: 'Energi kinetik terdisipasi saat menempel (e = 0)', unit: 'J' },
    ],
    conditions: 'Ep berlaku untuk pegas ideal Hooke; ΔK_hilang berlaku pada tumbukan tak elastis sempurna.',
    relations: 'Pada pelepasan pegas di air licin, seluruh Ep berubah menjadi K_tot = p²/(2μ).',
    category: 'Energi & Kerja',
  },
  {
    id: 'f8',
    name: 'Komponen Gaya Miring & Jarak Henti Hambatan Viskos Linear',
    latex: 'F_x = F\\cos\\theta, \\qquad \\Delta x_{\\text{henti}} = \\frac{p_0}{b} \\quad (\\text{untuk } f = -bv)',
    symbols: [
      { symbol: '\\theta', meaning: 'Sudut gaya terhadap arah gerak horizontal', unit: 'derajat' },
      { symbol: 'b', meaning: 'Koefisien hambatan viskos linear', unit: 'kg/s' },
      { symbol: 'p_0', meaning: 'Momentum awal setelah impuls sesaat', unit: 'Ns' },
    ],
    conditions: 'F_x berlaku bila komponen vertikal diimbangi oleh gaya apung/normal. Rumus p₀/b berlaku tepat saat gaya hambat linear f = −bv tanpa gaya lain.',
    relations: 'Pada hambatan linear f = −bv, dua benda bermomentum awal sama menempuh jarak henti identik meski massanya berbeda.',
    category: 'Kasus Lanjutan',
  },
];
