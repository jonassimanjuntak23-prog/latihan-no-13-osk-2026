import type { PhysicsProblem } from '../types/physics';

export const PROBLEMS_PART_2: PhysicsProblem[] = [
  {
    id: 9,
    code: 'SOAL 09',
    title: 'Dorongan Dua Perahu dengan Hambatan Gesekan Air Konstan',
    tier: 'Variasi Kondisi',
    subtopic: 'Impuls Gaya Netto dengan Gaya Eksternal (Gesekan)',
    stimulusType: 'constant-friction',
    stimulusCaption:
      'Perahu 1 (100 kg) dan Perahu 2 (200 kg) saling mendorong dengan gaya internal F = 70 N selama 2,0 s. Air memberikan gaya gesek kinetik konstan f = 15 N melawan gerak tiap perahu.',
    stimulusElements: [
      'Pada Perahu 1 (gerak ke kiri): gaya dorong F = 70 N ke kiri, gaya hambat air f = 15 N ke kanan.',
      'Pada Perahu 2 (gerak ke kanan): gaya dorong F = 70 N ke kanan, gaya hambat air f = 15 N ke kiri.',
      'Gaya netto pada masing-masing perahu adalah F − f = 55 N.',
    ],
    questionText:
      'Dua buah perahu bermassa m₁ = 100 kg dan m₂ = 200 kg mula-mula diam di atas air. Keduanya saling mendorong dengan gaya aksi–reaksi internal F = 70 N selama Δt = 2,0 detik. Berbeda dari kasus ideal, permukaan air memberikan gaya hambat gesekan konstan sebesar f = 15 N yang selalu berlawanan arah gerak masing-masing perahu selama bergerak. Berapakah besar momentum Perahu 1 tepat pada saat dorongan berakhir (t = 2,0 detik), dalam satuan Ns?',
    unit: 'Ns',
    exactValue: 110.0,
    formattedAnswer: '110,0',
    hint: 'Gaya gesekan air adalah gaya eksternal yang melawan gerak Perahu 1. Gambar FBD Perahu 1: ada F = 70 N ke kiri dan f = 15 N ke kanan, sehingga gaya netto pada Perahu 1 adalah F − f!',
    misconceptionWarning:
      'Jangan mengabaikan gaya gesek f = 15 N dengan alasan hukum kekekalan momentum. Impuls yang mengubah momentum perahu adalah impuls GAYA NETTO (F − f) × Δt!',
    fbdForces: [
      {
        id: 's9-b1-f',
        target: 'boat1',
        symbol: 'F₂₁',
        name: 'Gaya Dorong Reaksi',
        direction: 'left',
        magnitudeLabel: '70 N',
        color: '#8E1B37',
        explanation: 'Mendorong Perahu 1 ke kiri (−x).',
      },
      {
        id: 's9-b1-fric',
        target: 'boat1',
        symbol: 'f₁',
        name: 'Gaya Hambat Air pada Perahu 1',
        direction: 'right',
        magnitudeLabel: '15 N',
        color: '#D97706',
        explanation: 'Gaya eksternal melawan gerak Perahu 1 ke arah kanan (+x).',
      },
      {
        id: 's9-b1-w',
        target: 'boat1',
        symbol: 'W₁',
        name: 'Gaya Berat 1',
        direction: 'down',
        magnitudeLabel: '1000 N',
        color: '#475569',
        explanation: 'Seimbang dengan gaya apung.',
      },
      {
        id: 's9-b1-fa',
        target: 'boat1',
        symbol: 'F_A1',
        name: 'Gaya Apung 1',
        direction: 'up',
        magnitudeLabel: '1000 N',
        color: '#0284C7',
        explanation: 'Menyeimbangkan gaya berat.',
      },
      {
        id: 's9-b2-f',
        target: 'boat2',
        symbol: 'F₁₂',
        name: 'Gaya Dorong Aksi',
        direction: 'right',
        magnitudeLabel: '70 N',
        color: '#059669',
        explanation: 'Mendorong Perahu 2 ke kanan (+x).',
      },
      {
        id: 's9-b2-fric',
        target: 'boat2',
        symbol: 'f₂',
        name: 'Gaya Hambat Air pada Perahu 2',
        direction: 'left',
        magnitudeLabel: '15 N',
        color: '#D97706',
        explanation: 'Gaya eksternal melawan gerak Perahu 2 ke arah kiri (−x).',
      },
    ],
    fbdAxesNote: 'Setiap perahu mengalami gaya netto F_net = 70 − 15 = 55 N selama F > f.',
    fbdEquationsLatex: [
      'F_{\\text{net},1} = -F_{21} + f_1 = -70 + 15 = -55\\text{ N}',
      '|p_1| = |F_{\\text{net},1}|\\,\\Delta t = 55 \\times 2{,}0 = 110{,}0\\text{ Ns}',
    ],
    simulation: {
      mode: 'constant-friction',
      m1: 100,
      m2: 200,
      force: 70,
      friction: 15,
      duration: 2.0,
      totalTime: 8.0,
      stepDescriptions: [
        { t: 0, text: 't = 0,0 s: Gaya dorong 70 N > gaya hambat 15 N, keduanya mulai bergerak.' },
        { t: 2.0, text: 't = 2,0 s: Akhir dorongan; momentum Perahu 1 adalah 110,0 Ns (v₁ = −1,1 m/s).' },
        { t: 5.0, text: 't > 2,0 s: Tanpa gaya dorong, gesekan 15 N memperlambat kedua perahu hingga berhenti.' },
      ],
    },
    pembahasan: {
      bagian1Memahami: {
        fenomena: 'Interaksi dorong dua perahu dengan gaya hambat eksternal konstan dari air selama gerakan.',
        diketahui: [
          'm₁ = 100 kg, m₂ = 200 kg',
          'F = 70 N selama Δt = 2,0 s',
          'Gaya gesek kinetik air pada tiap perahu: f = 15 N',
        ],
        ditanyakan: 'Besar momentum Perahu 1 pada t = 2,0 s (Ns).',
        konsep: ['FBD & Hukum II Newton', 'Impuls Gaya Netto (I_net = Δp)'],
      },
      bagian2Visualisasi: {
        penjelasanProses: [
          'Selama 2,0 s pertama, gaya dorong 70 N mengalahkan gaya hambat 15 N, menghasilkan percepatan efektif ke kiri pada Perahu 1 sebesar 55/100 = 0,55 m/s².',
          'Setelah tangan lepas (t > 2,0 s), hanya gesekan 15 N yang bekerja sehingga kedua perahu melambat hingga berhenti.',
        ],
      },
      bagian3Analisis: {
        hukumFisika: 'Impuls gaya netto sama dengan perubahan momentum: ∫ ΣF dt = Δp.',
        sumbuKoordinat: 'Arah +x ke kanan; Perahu 1 bergerak ke kiri sehingga f₁ bekerja ke kanan (+15 N).',
        analisisHubungan: 'Besar momentum berkurang sebesar impuls gaya gesek f·Δt = 30 Ns dibandingkan kondisi tanpa gesekan (140 Ns).',
        fbdNote: 'Gaya gesek f bekerja pada masing-masing FBD berlawanan arah dengan vektor kecepatannya.',
      },
      bagian4Persamaan: {
        rumusUtamaLatex: '|p_1| = (F - f)\\,\\Delta t',
        maknaSimbol: [
          { symbol: 'F', meaning: 'Besar gaya dorong internal (70 N)' },
          { symbol: 'f', meaning: 'Gaya hambat air eksternal (15 N)' },
        ],
        alasanPemilihan: 'Karena gaya dorong dan gesekan sama-sama konstan selama 0–2,0 s, resultan gayanya konstan sebesar F − f.',
      },
      bagian5Penyelesaian: {
        langkah: [
          {
            label: '1. Hitung gaya netto pada Perahu 1',
            latex: '|F_{\\text{net},1}| = F - f = 70\\text{ N} - 15\\text{ N} = 55\\text{ N}',
            note: 'Karena F > f, perahu langsung mulai bergerak pada t = 0.',
          },
          {
            label: '2. Hitung momentum pada t = 2,0 s',
            latex: '|p_1| = 55\\text{ N} \\times 2{,}0\\text{ s} = 110{,}0\\text{ Ns}',
            note: 'Kecepatan Perahu 1 saat t = 2,0 s adalah v₁ = −1,1 m/s.',
          },
        ],
        pembulatan: 'Hasil eksak 110 Ns ditulis 110,0 Ns.',
      },
      bagian6Kesimpulan: {
        nilaiAkhir: '110,0',
        satuan: 'Ns',
        interpretasiFisis: 'Air menyerap impuls hambatan sebesar 30,0 Ns selama proses dorongan, menyisakan momentum 110,0 Ns pada Perahu 1.',
      },
      bagian7Strategi: {
        trikEfisien: 'Kurangkan gaya dorong dengan gaya hambat lebih dulu sebelum dikalikan Δt.',
        caraMengenali: 'Kata "gaya hambat" atau "gesekan air" menandakan adanya gaya eksternal pada FBD masing-masing perahu.',
        kesalahanDihindari: ['Lupa mengurangkan gaya gesek f.', 'Mengurangkan f pada satu perahu saja tetapi salah arah pada perahu lainnya.'],
      },
      bagian8Pendalaman: {
        konsepLanjutan: 'Bagaimana jika ada perpindahan massa antar perahu (penumpang melompat) di air tanpa gesekan?',
        variasiSoal: 'Soal 10 menguji pertukaran massa ketika seorang anak melompat dari Perahu 2 ke Perahu 1.',
        hubunganBerikutnya: 'Soal 10 melatih pemilihan batas sistem total untuk menyelesaikan proses dua tahap.',
      },
    },
    narrationPrompt:
      'Di soal sembilan, permukaan air tidak lagi licin melainkan memberi gaya gesek konstan lima belas Newton. Artinya, ada gaya luar yang melawan dorongan tujuh puluh Newton. Resultan gaya pada perahu satu adalah tujuh puluh dikurangi lima belas sama dengan lima puluh lima Newton. Selama dua detik, momentum akhirnya menjadi lima puluh lima dikali dua, yaitu seratus sepuluh koma nol Newton sekon.',
  },
  {
    id: 10,
    code: 'SOAL 10',
    title: 'Penumpang Melompat dari Perahu 2 Menuju Perahu 1',
    tier: 'Analisis Kompleks',
    subtopic: 'Kekekalan Momentum Total pada Pertukaran Massa',
    stimulusType: 'person-jump',
    stimulusCaption:
      'Setelah dorongan awal (F = 60 N, Δt = 1,0 s) memisahkan Perahu 1 (150 kg) dan Perahu 2 (250 kg), seorang anak bermassa 50 kg melompat dari Perahu 2 ke Perahu 1 sehingga Perahu 2 melaju +1,2 m/s.',
    stimulusElements: [
      'Tahap 1: Kedua perahu diam (total 150 + 250 = 400 kg), lalu saling dorong 60 N selama 1,0 s.',
      'Tahap 2: Anak 50 kg melompat ke kiri dari Perahu 2 (tersisa 200 kg dengan v₂′ = +1,2 m/s).',
      'Tahap 3: Anak mendarat di Perahu 1 sehingga massa gabungan menjadi 150 + 50 = 200 kg.',
    ],
    questionText:
      'Perahu 1 (massa 150 kg) dan Perahu 2 (massa total termasuk penumpang 250 kg) mula-mula diam berdekatan di air tenang tanpa gesekan. Keduanya saling mendorong dengan gaya F = 60 N selama Δt = 1,0 detik sehingga bergerak saling menjauh. Sesaat kemudian, seorang anak bermassa 50 kg yang berada di Perahu 2 melompat kuat ke arah Perahu 1 (ke kiri), sehingga Perahu 2 (sisa massa 200 kg) terlempar ke kanan dengan kecepatan 1,2 m/s. Setelah anak tersebut berhasil mendarat dan menempel di Perahu 1, berapakah kelajuan akhir Perahu 1 (dalam satuan m/s)?',
    unit: 'm/s',
    exactValue: 1.2,
    formattedAnswer: '1,2',
    hint: 'Pilih sistem TOTAL yang mencakup (Perahu 1 + Perahu 2 + Anak). Semua gaya (dorongan awal, tolakan lompatan, dan tumbukan saat mendarat) adalah gaya internal! Karena tidak ada gaya luar horizontal, momentum total sistem selalu bernilai nol!',
    misconceptionWarning:
      'Kamu TIDAK perlu menghitung kecepatan melompat anak di udara secara terpisah jika langsung menggunakan Kekekalan Momentum Sistem Total antara keadaan awal diam dan keadaan akhir!',
    fbdForces: [
      {
        id: 's10-b1-f',
        target: 'boat1',
        symbol: 'F_mendarat',
        name: 'Impuls Pendaratan Anak',
        direction: 'left',
        magnitudeLabel: 'Δp = −180 Ns',
        color: '#8E1B37',
        explanation: 'Saat anak mendarat, anak memberikan impuls tambahan ke kiri pada Perahu 1.',
      },
      {
        id: 's10-b2-f',
        target: 'boat2',
        symbol: 'F_tolak',
        name: 'Gaya Reaksi Lompatan Anak',
        direction: 'right',
        magnitudeLabel: 'Δp = +180 Ns',
        color: '#059669',
        explanation: 'Saat anak melompat ke kiri, kaki anak mendorong Perahu 2 ke kanan.',
      },
    ],
    fbdAxesNote: 'Untuk sistem gabungan (Perahu 1 + Perahu 2 + Anak), seluruh gaya interaksi antar bagian bersifat internal sehingga Σp_total = 0.',
    fbdEquationsLatex: [
      'p_{\\text{total,awal}} = 0 = (m_1 + m_{\\text{anak}})v_1\' + (m_2 - m_{\\text{anak}})v_2\'',
      '|v_1\'| = \\frac{(m_2 - m_{\\text{anak}})v_2\'}{m_1 + m_{\\text{anak}}}',
    ],
    simulation: {
      mode: 'person-jump',
      m1: 150,
      m2: 250,
      mExtra: 50,
      force: 60,
      duration: 1.0,
      totalTime: 4.5,
      stepDescriptions: [
        { t: 0, text: 't = 0,0–1,0 s: Dorongan awal 60 N membuat v₁ = −0,4 m/s dan v₂ = +0,24 m/s.' },
        { t: 1.8, text: 't = 1,8 s: Anak (50 kg) melompat ke kiri (−3,6 m/s); Perahu 2 terdorong jadi +1,2 m/s.' },
        { t: 2.6, text: 't = 2,6 s: Anak mendarat di Perahu 1; massa Perahu 1 menjadi 200 kg dan melaju 1,2 m/s ke kiri.' },
      ],
    },
    pembahasan: {
      bagian1Memahami: {
        fenomena: 'Proses multi-tahap: dorongan awal dua perahu diikuti perpindahan penumpang 50 kg dari Perahu 2 ke Perahu 1.',
        diketahui: [
          'm₁ = 150 kg, m₂ = 250 kg (m_anak = 50 kg)',
          'Dorongan awal: F = 60 N, Δt = 1,0 s → p_awal tiap perahu ±60 Ns',
          'Keadaan akhir Perahu 2: m₂′ = 200 kg, v₂′ = +1,2 m/s',
        ],
        ditanyakan: 'Kelajuan akhir (Perahu 1 + Anak) setelah pendaratan (m/s).',
        konsep: ['Kekekalan Momentum Sistem Terbuka/Tertutup', 'Pemilihan Batas Sistem'],
      },
      bagian2Visualisasi: {
        penjelasanProses: [
          'Tahap 1: Perahu 1 bergerak −0,4 m/s (p = −60 Ns) dan Perahu 2 bergerak +0,24 m/s (p = +60 Ns).',
          'Tahap 2: Anak melompat ke kiri dengan kecepatan −3,6 m/s (p_anak = −180 Ns) agar Perahu 2 (200 kg) melaju +1,2 m/s (p₂′ = +240 Ns). Cek: −180 + 240 = +60 Ns.',
          'Tahap 3: Anak (−180 Ns) mendarat di Perahu 1 (−60 Ns) sehingga momentum totalnya −240 Ns pada massa 200 kg → v₁′ = −1,2 m/s!',
        ],
      },
      bagian3Analisis: {
        hukumFisika: 'Kekekalan Momentum Linear pada sistem terisolasi (Perahu 1 + Perahu 2 + Anak).',
        sumbuKoordinat: 'Arah +x ke kanan (arah gerak Perahu 2).',
        analisisHubungan: 'Karena kondisi paling awal seluruh sistem diam (p_tot = 0) dan tak ada gaya luar horizontal, jumlah momentum akhir pasti tetap nol.',
        fbdNote: 'Jika meninjau per bagian, kita juga mendapat hasil persis sama (−240 Ns / 200 kg = −1,2 m/s).',
      },
      bagian4Persamaan: {
        rumusUtamaLatex: '0 = (m_1 + m_a)\\,v_1\' + (m_2 - m_a)\\,v_2\'',
        maknaSimbol: [
          { symbol: 'm₁ + m_a', meaning: 'Massa akhir Perahu 1 bersama anak (200 kg)' },
          { symbol: 'm₂ − m_a', meaning: 'Massa sisa Perahu 2 tanpa anak (200 kg)' },
        ],
        alasanPemilihan: 'Memilih sistem total mengeliminasi seluruh detail gaya lompatan dan tumbukan di tengah proses.',
      },
      bagian5Penyelesaian: {
        langkah: [
          {
            label: '1. Hitung momentum akhir Perahu 2',
            latex: 'p_2\' = (250 - 50) \\times 1{,}2 = 200 \\times 1{,}2 = +240{,}0\\text{ Ns}',
            note: 'Sisa massa Perahu 2 adalah 200 kg.',
          },
          {
            label: '2. Gunakan kekekalan momentum total (p_tot = 0)',
            latex: 'p_{1+a} = -p_2\' = -240{,}0\\text{ Ns}',
            note: 'Cek tahap demi tahap: v_anak = (60 − 240)/50 = −3,6 m/s (lebih cepat dari −0,4 m/s sehingga pasti terkejar!).',
          },
          {
            label: '3. Hitung kelajuan akhir Perahu 1 + Anak',
            latex: '|v_1\'| = \\frac{240{,}0}{150 + 50} = \\frac{240{,}0}{200} = 1{,}2\\text{ m/s}',
            note: 'Massa gabungan 200 kg kebetulan sama dengan sisa massa Perahu 2.',
          },
        ],
        pembulatan: 'Hasil eksak 1,2 m/s.',
      },
      bagian6Kesimpulan: {
        nilaiAkhir: '1,2',
        satuan: 'm/s',
        interpretasiFisis: 'Setelah anak mendarat, Perahu 1 bergerak ke kiri dengan kelajuan tepat 1,2 m/s.',
      },
      bagian7Strategi: {
        trikEfisien: 'Dalam soal perpindahan orang di atas perahu/kereta di permukaan licin, selalu tanyakan: "Apa yang terjadi pada momentum sistem TOTAL?" Jawabannya: tidak berubah!',
        caraMengenali: 'Ada beberapa tahap interaksi internal tanpa gaya eksternal horizontal.',
        kesalahanDihindari: ['Lupa memindahkan massa 50 kg dari m₂ ke m₁.', 'Mengira dorongan awal 60 N mengubah momentum total sistem.'],
      },
      bagian8Pendalaman: {
        konsepLanjutan: 'Bagaimana jika gaya dorong diganti oleh sebuah pegas terkompresi yang menyimpan energi potensial?',
        variasiSoal: 'Soal 11 mengganti dorongan tangan dengan pelepasan pegas ideal di antara kedua perahu.',
        hubunganBerikutnya: 'Soal 11 menggabungkan kekekalan momentum dengan kekekalan energi mekanik pegas.',
      },
    },
    narrationPrompt:
      'Soal sepuluh melatih kecerdikan memilih batas sistem! Mulanya semua diam, lalu saling dorong, lalu anak lima puluh kilogram melompat dari perahu dua ke perahu satu. Karena seluruh gaya merupakan gaya internal dan air licin, momentum total sistem tetap nol sepanjang waktu. Momentum akhir perahu dua yang tersisa dua ratus kilogram adalah dua ratus empat puluh Newton sekon ke kanan. Maka perahu satu bersama anak, yang massanya juga dua ratus kilogram, pasti memiliki momentum dua ratus empat puluh Newton sekon ke kiri, sehingga kelajuannya tepat satu koma dua meter per sekon.',
  },
  {
    id: 11,
    code: 'SOAL 11',
    title: 'Dorongan Pegas Terkompresi di Antara Dua Perahu',
    tier: 'Analisis Kompleks',
    subtopic: 'Kekekalan Energi Pegas & Kekekalan Momentum',
    stimulusType: 'compressed-spring',
    stimulusCaption:
      'Perahu 1 (120 kg) dan Perahu 2 (240 kg) dihubungkan pegas tak bermassa (k = 2000 N/m) yang tertekan Δx = 0,6 m dan diikat tali. Saat tali putus, pegas melepas keduanya hingga panjang alami.',
    stimulusElements: [
      'Keadaan awal: pegas terkompresi Δx = 0,6 m menyimpan energi potensial Ep = ½ k (Δx)² = 360 J.',
      'Saat pegas mendorong, gaya pegas F(x) = kx berubah terhadap posisi dan selalu berlawanan arah pada kedua perahu.',
      'Pada keadaan akhir, pegas lepas sempurna sehingga seluruh Ep berubah menjadi K₁ + K₂.',
    ],
    questionText:
      'Dua perahu bermassa m₁ = 120 kg dan m₂ = 240 kg awalnya diam berdekatan di atas air tenang tanpa gesekan. Di antara keduanya dipasang sebuah pegas ideal tanpa massa dengan konstanta pegas k = 2000 N/m yang ditekan sejauh Δx = 0,6 m lalu ditahan oleh seutas tali pengikat. Ketika tali diputus, pegas mendorong kedua perahu saling menjauh hingga pegas kembali ke panjang alaminya. Berapakah besar momentum masing-masing perahu tepat setelah pegas terlepas (dalam satuan Ns)?',
    unit: 'Ns',
    exactValue: 240.0,
    formattedAnswer: '240,0',
    hint: 'Gaya pegas TIDAK konstan (F = k·x), jadi jangan pakai F×Δt! Gunakan Kekekalan Momentum (p₁ = p₂ = p) bersama Kekekalan Energi Mekanik: ½ k (Δx)² = p²/(2m₁) + p²/(2m₂) = p²/(2μ).',
    misconceptionWarning:
      'Jangan mengira energi pegas terbagi dua sama rata (180 J dan 180 J)! Yang sama besar adalah MOMENTUM-nya, bukan energi kinetiknya.',
    fbdForces: [
      {
        id: 's11-b1-f',
        target: 'boat1',
        symbol: 'F_pegas,1',
        name: 'Gaya Pegas ke Kiri',
        direction: 'left',
        magnitudeLabel: 'k·x(t)',
        color: '#8E1B37',
        explanation: 'Berubah dari 1200 N menuju 0 N saat pegas memanjang kembali.',
      },
      {
        id: 's11-b2-f',
        target: 'boat2',
        symbol: 'F_pegas,2',
        name: 'Gaya Pegas ke Kanan',
        direction: 'right',
        magnitudeLabel: 'k·x(t)',
        color: '#059669',
        explanation: 'Besar gaya pegas pada Perahu 2 selalu tepat sama dengan pada Perahu 1.',
      },
    ],
    fbdAxesNote: 'Gaya pegas adalah gaya konservatif internal; energi mekanik total dan momentum total keduanya kekal.',
    fbdEquationsLatex: [
      '\\frac{1}{2}k(\\Delta x)^2 = \\frac{p^2}{2m_1} + \\frac{p^2}{2m_2} = \\frac{p^2}{2\\mu} \\implies p = \\sqrt{2\\mu \\cdot \\frac{1}{2}k(\\Delta x)^2}',
    ],
    simulation: {
      mode: 'compressed-spring',
      m1: 120,
      m2: 240,
      force: 0,
      duration: 1.0,
      totalTime: 3.5,
      springK: 2000,
      springDx: 0.6,
      stepDescriptions: [
        { t: 0, text: 't = 0,0 s: Tali putus! Energi potensial pegas 360 J mulai berubah menjadi energi kinetik.' },
        { t: 0.314, text: 't = 0,31 s: Pegas mencapai panjang alami dan lepas! Momentum tiap perahu 240,0 Ns.' },
        { t: 1.5, text: 't > 0,31 s: K₁ = 240 J (v₁ = −2,0 m/s) dan K₂ = 120 J (v₂ = +1,0 m/s); total 360 J.' },
      ],
    },
    pembahasan: {
      bagian1Memahami: {
        fenomena: 'Pelepasan pegas terkompresi di antara dua perahu yang bebas bergerak di air tanpa gesekan.',
        diketahui: [
          'm₁ = 120 kg, m₂ = 240 kg',
          'Konstanta pegas k = 2000 N/m',
          'Kompresi awal Δx = 0,6 m',
        ],
        ditanyakan: 'Besar momentum masing-masing perahu setelah pegas terlepas (Ns).',
        konsep: ['Kekekalan Momentum Linear', 'Kekekalan Energi Mekanik (Pegas)', 'Massa Tereduksi μ'],
      },
      bagian2Visualisasi: {
        penjelasanProses: [
          'Selama seperempat periode osilasi tereduksi (t = π/(2ω) ≈ 0,314 s), pegas mendorong kedua perahu saling menjauh.',
          'Saat pegas kembali ke panjang alami, gaya menjadi nol dan kedua perahu terpisah dengan kecepatan −2,0 m/s dan +1,0 m/s.',
        ],
      },
      bagian3Analisis: {
        hukumFisika: 'Dua hukum kekekalan berlaku sekaligus: p₁ + p₂ = 0 dan Ep_awal = K₁ + K₂.',
        sumbuKoordinat: 'Arah +x ke kanan.',
        analisisHubungan: 'Dengan menyatakan K dalam momentum (p²/2m), dua persamaan dengan dua variabel (v₁, v₂) langsung tereduksi menjadi satu persamaan untuk p.',
        fbdNote: 'Gaya pegas F_s(x) sama besar pada kedua ujung pegas tak bermassa.',
      },
      bagian4Persamaan: {
        rumusUtamaLatex: '\\frac{1}{2}k(\\Delta x)^2 = \\frac{p^2}{2}\\left(\\frac{1}{m_1} + \\frac{1}{m_2}\\right) = \\frac{p^2}{2\\mu}',
        maknaSimbol: [
          { symbol: 'k', meaning: 'Konstanta pegas (N/m)' },
          { symbol: 'Δx', meaning: 'Pemendekan awal pegas (m)' },
          { symbol: 'μ', meaning: 'Massa tereduksi (kg)' },
        ],
        alasanPemilihan: 'Mengeliminasi kecepatan lewat variabel momentum p membuat perhitungan sangat bersih.',
      },
      bagian5Penyelesaian: {
        langkah: [
          {
            label: '1. Hitung energi potensial pegas awal',
            latex: 'E_p = \\frac{1}{2}(2000)(0{,}6)^2 = 1000 \\times 0{,}36 = 360\\text{ J}',
            note: 'Seluruh 360 J berubah menjadi K₁ + K₂.',
          },
          {
            label: '2. Hitung massa tereduksi μ',
            latex: '\\mu = \\frac{120 \\times 240}{120 + 240} = \\frac{28800}{360} = 80\\text{ kg}',
            note: 'Atau langsung 1/120 + 1/240 = 3/240 = 1/80 kg⁻¹.',
          },
          {
            label: '3. Cari besar momentum p',
            latex: '360 = \\frac{p^2}{2 \\times 80} \\implies p^2 = 57600 \\implies p = 240{,}0\\text{ Ns}',
            note: 'Verifikasi: v₁ = −2,0 m/s (K₁ = 240 J), v₂ = +1,0 m/s (K₂ = 120 J), K_tot = 360 J.',
          },
        ],
        pembulatan: 'Akar dari 57600 tepat 240, ditulis 240,0 Ns.',
      },
      bagian6Kesimpulan: {
        nilaiAkhir: '240,0',
        satuan: 'Ns',
        interpretasiFisis: 'Pegas memberikan impuls tepat 240,0 Ns kepada tiap perahu dengan energi 240 J ke perahu ringan dan 120 J ke perahu berat.',
      },
      bagian7Strategi: {
        trikEfisien: 'Langsung tulis p = Δx √(k·μ) untuk setiap sistem dua massa yang dipisahkan pegas!',
        caraMengenali: 'Adanya pegas tanpa informasi waktu dorong Δt menandakan pendekatan Kekekalan Energi + Momentum.',
        kesalahanDihindari: ['Membagi energi pegas sama rata 180 J ke tiap perahu.', 'Memakai gaya maksimum k·Δx seolah-olah konstan.'],
      },
      bagian8Pendalaman: {
        konsepLanjutan: 'Bagaimana jika salah satu perahu menabrak dinding dermaga yang kokoh lalu memantul mengejar perahu lainnya?',
        variasiSoal: 'Soal 12 menggabungkan dorongan dua perahu, pantulan elastis di dermaga, dan tumbukan elastis beruntun.',
        hubunganBerikutnya: 'Soal 12 memadukan impuls awal dengan teori tumbukan elastis 1D.',
      },
    },
    narrationPrompt:
      'Pada soal sebelas, gaya dorong berasal dari pegas terkompresi dengan konstanta dua ribu Newton per meter. Karena gaya pegas berubah terhadap jarak, kita pakai kekekalan energi mekanik dan kekekalan momentum. Energi pegas awal adalah tiga ratus enam puluh Joule, sama dengan p kuadrat dibagi dua mu, dengan massa tereduksi mu delapan puluh kilogram. Maka p kuadrat sama dengan lima puluh tujuh ribu enam ratus, menghasilkan momentum tepat dua ratus empat puluh koma nol Newton sekon.',
  },
  {
    id: 12,
    code: 'SOAL 12',
    title: 'Pantulan Elastis di Dermaga dan Tumbukan Susulan',
    tier: 'Analisis Kompleks',
    subtopic: 'Impuls Awal + Pantulan Dinding + Tumbukan Elastis 1D',
    stimulusType: 'pier-elastic-bounce',
    stimulusCaption:
      'Setelah dorongan (F = 80 N, Δt = 1,5 s) memisahkan Perahu 1 (120 kg) dan Perahu 2 (240 kg), Perahu 1 memantul elastis di dinding dermaga lalu mengejar dan menumbuk elastis Perahu 2.',
    stimulusElements: [
      'Tahap 1: Dorongan memberi p = 120 Ns → v₁ = −1,0 m/s (kiri) dan v₂ = +0,5 m/s (kanan).',
      'Tahap 2: Perahu 1 memantul elastis (e = 1) dari dinding dermaga diam → berbalik menjadi v₁′ = +1,0 m/s.',
      'Tahap 3: Perahu 1 mengejar dan menumbuk Perahu 2 secara elastis sempurna.',
    ],
    questionText:
      'Dua perahu mula-mula diam berdekatan di air tenang tanpa gesekan, bermassa m₁ = 120 kg dan m₂ = 240 kg. Penumpang di Perahu 1 mendorong Perahu 2 ke kanan dengan gaya konstan F = 80 N selama Δt = 1,5 detik. Setelah dorongan berakhir, Perahu 1 bergerak ke kiri dan menumbuk dinding dermaga yang kokoh secara elastis sempurna (e = 1), lalu berbalik arah ke kanan mengejar Perahu 2 hingga terjadi tumbukan elastis sempurna antara kedua perahu. Berapakah kelajuan akhir Perahu 2 setelah tumbukan tersebut (dalam satuan m/s)?',
    unit: 'm/s',
    exactValue: 0.8333333333,
    formattedAnswer: '0,8',
    hint: 'Ikuti prosesnya dalam 3 langkah: (1) Hitung v₁ dan v₂ dari impuls FΔt = 120 Ns. (2) Setelah memantul elastis di dermaga diam, v₁′ berbalik tanda menjadi +1,0 m/s. (3) Terapkan rumus tumbukan elastis 1D antara Perahu 1 dan Perahu 2!',
    misconceptionWarning:
      'Saat menumbuk dinding dermaga, momentum sistem dua perahu TIDAK lagi nol karena dinding dermaga memberikan gaya impuls eksternal ke kanan pada Perahu 1!',
    fbdForces: [
      {
        id: 's12-b1-push',
        target: 'boat1',
        symbol: 'F_dermaga',
        name: 'Gaya Impuls Dinding Dermaga',
        direction: 'right',
        magnitudeLabel: 'Δp = +240 Ns',
        color: '#D97706',
        explanation: 'Saat memantul di dinding, dinding memberi impuls eksternal mengubah p₁ dari −120 Ns menjadi +120 Ns.',
      },
      {
        id: 's12-b2-col',
        target: 'boat2',
        symbol: 'F_tumbuk',
        name: 'Gaya Tumbukan Elastis dari Perahu 1',
        direction: 'right',
        magnitudeLabel: 'e = 1',
        color: '#059669',
        explanation: 'Menambah kecepatan Perahu 2 dari +0,5 m/s menjadi +0,833 m/s.',
      },
    ],
    fbdAxesNote: 'Saat tumbukan antar-perahu (Tahap 3), tidak ada gaya luar sehingga momentum (120×1,0 + 240×0,5 = 240 Ns) dan energi kinetik keduanya kekal.',
    fbdEquationsLatex: [
      'v_1\' = +\\frac{F\\Delta t}{m_1} = +1{,}0\\text{ m/s}, \\qquad v_2 = +\\frac{F\\Delta t}{m_2} = +0{,}5\\text{ m/s}',
      'v_2\'\' = \\frac{2m_1 v_1\' + (m_2 - m_1)v_2}{m_1 + m_2}',
    ],
    simulation: {
      mode: 'pier-bounce',
      m1: 120,
      m2: 240,
      force: 80,
      duration: 1.5,
      totalTime: 8.5,
      stepDescriptions: [
        { t: 0, text: 't = 0–1,5 s: Dorongan 80 N memisahkan keduanya (v₁ = −1,0 m/s, v₂ = +0,5 m/s).' },
        { t: 1.7, text: 't = 1,7 s: Perahu 1 memantul elastis dari dermaga kiri, berbalik jadi v₁′ = +1,0 m/s!' },
        { t: 6.95, text: 't ≈ 7,0 s: Perahu 1 mengejar dan menumbuk Perahu 2; v₂ naik menjadi 0,833 m/s (0,8 m/s).' },
      ],
    },
    pembahasan: {
      bagian1Memahami: {
        fenomena: 'Rangkaian tiga peristiwa: dorongan aksi–reaksi, pantulan elastis di dinding tetap, dan tumbukan elastis 1D.',
        diketahui: [
          'm₁ = 120 kg, m₂ = 240 kg',
          'F = 80 N, Δt = 1,5 s',
          'Pantulan elastis di dermaga (e = 1) & tumbukan elastis antar perahu (e = 1)',
        ],
        ditanyakan: 'Kelajuan akhir Perahu 2 setelah tertumbuk Perahu 1 (m/s).',
        konsep: ['Impuls–Momentum', 'Koefisien Restitusi (e = 1)', 'Tumbukan Elastis 1D'],
      },
      bagian2Visualisasi: {
        penjelasanProses: [
          'Setelah memantul dari dinding dermaga, Perahu 1 melaju ke kanan 1,0 m/s, lebih cepat dari Perahu 2 yang melaju 0,5 m/s, sehingga pasti tersusul.',
          'Saat tumbukan elastis, Perahu 1 memberi sebagian momentumnya ke Perahu 2 sehingga Perahu 2 makin cepat menjadi 5/6 m/s.',
        ],
      },
      bagian3Analisis: {
        hukumFisika: 'Kekekalan momentum hanya berlaku pada Tahap 1 dan Tahap 3. Pada Tahap 2 (dermaga), massa dermaga jauh lebih besar (M → ∞) sehingga kelajuan pantul sama dengan kelajuan datang.',
        sumbuKoordinat: 'Arah +x ke kanan (menjauhi dinding dermaga).',
        analisisHubungan: 'Dari e = 1: v₂″ − v₁″ = v₁′ − v₂ = 1,0 − 0,5 = 0,5 m/s.',
        fbdNote: 'Gaya dinding dermaga merupakan gaya eksternal bagi sistem dua perahu.',
      },
      bagian4Persamaan: {
        rumusUtamaLatex: 'v_2\'\' = \\frac{2m_1 v_1\' + (m_2 - m_1)v_2}{m_1 + m_2}',
        maknaSimbol: [
          { symbol: 'v₁′', meaning: 'Kecepatan Perahu 1 setelah memantul (+1,0 m/s)' },
          { symbol: 'v₂', meaning: 'Kecepatan Perahu 2 sebelum tumbukan (+0,5 m/s)' },
          { symbol: 'v₂″', meaning: 'Kecepatan akhir Perahu 2 (m/s)' },
        ],
        alasanPemilihan: 'Rumus standar tumbukan elastis 1D diperoleh dari gabungan kekekalan momentum dan e = 1.',
      },
      bagian5Penyelesaian: {
        langkah: [
          {
            label: '1. Kecepatan setelah dorongan awal (I = 80 × 1,5 = 120 Ns)',
            latex: 'v_1 = -\\frac{120}{120} = -1{,}0\\text{ m/s}, \\qquad v_2 = +\\frac{120}{240} = +0{,}5\\text{ m/s}',
            note: 'Setelah memantul di dinding dermaga diam: v₁′ = +1,0 m/s.',
          },
          {
            label: '2. Hitung kecepatan akhir Perahu 2 saat tumbukan elastis',
            latex: 'v_2\'\' = \\frac{2(120)(1{,}0) + (240 - 120)(0{,}5)}{120 + 240} = \\frac{240 + 60}{360} = \\frac{300}{360} = \\frac{5}{6} \\approx 0{,}833\\text{ m/s}',
            note: 'Cek: v₁″ = 5/6 − 0,5 = 1/3 m/s. Momentum: 120(1/3) + 240(5/6) = 40 + 200 = 240 Ns (kekal!).',
          },
        ],
        pembulatan: 'Angka 0,833 m/s dibulatkan menjadi 0,8 m/s.',
      },
      bagian6Kesimpulan: {
        nilaiAkhir: '0,8',
        satuan: 'm/s',
        interpretasiFisis: 'Setelah tumbukan elastis susulan, Perahu 2 melaju ke kanan sebesar 0,8 m/s.',
      },
      bagian7Strategi: {
        trikEfisien: 'Gunakan kecepatan pusat massa pada Tahap 3: v_pm = (120×1 + 240×0,5)/360 = 2/3 m/s. Pada tumbukan elastis, kecepatan terhadap pusat massa sekadar berbalik tanda: v₂″ = 2v_pm − v₂ = 4/3 − 1/2 = 5/6 m/s!',
        caraMengenali: 'Pantulan dinding diam diikuti tumbukan susulan hampir selalu dipecah per tahap peristiwa.',
        kesalahanDihindari: ['Mengira momentum total masih 0 setelah Perahu 1 memantul di dinding.', 'Mengira tumbukan membuat Perahu 1 berhenti total (itu hanya terjadi jika m₁ = m₂).'],
      },
      bagian8Pendalaman: {
        konsepLanjutan: 'Bagaimana jika gaya dorong berubah sebagai fungsi kuadratik F(t) dan kita diminta mencari jarak pisah lewat kalkulus?',
        variasiSoal: 'Soal 13 memasuki level Tantangan Olimpiade Kota dengan integrasi gaya kuadratik dua kali.',
        hubunganBerikutnya: 'Soal 13 menghubungkan F(t) → v(t) → x(t) via integral bertahap.',
      },
    },
    narrationPrompt:
      'Soal dua belas menggabungkan tiga tahap gerak. Pertama, dorongan delapan puluh Newton selama satu koma lima detik memberi perahu satu kecepatan minus satu meter per sekon dan perahu dua plus nol koma lima meter per sekon. Kedua, perahu satu memantul elastis di dinding dermaga sehingga berbalik arah menjadi plus satu meter per sekon. Ketiga, perahu satu mengejar dan menumbuk elastis perahu dua. Dengan rumus tumbukan elastis satu dimensi, kecepatan akhir perahu dua menjadi lima per enam, atau dibulatkan nol koma delapan meter per sekon.',
  },
  {
    id: 13,
    code: 'SOAL 13',
    title: 'Gaya Dorong Kuadratik F(t) dan Jarak Pisah via Kalkulus',
    tier: 'Tantangan Olimpiade Kota',
    subtopic: 'Integrasi Bertahap F(t) → v(t) → x(t) pada Dua Perahu',
    stimulusType: 'quadratic-force',
    stimulusCaption:
      'Dua perahu (m₁ = 100 kg, m₂ = 150 kg) awalnya berimpit diam, didorong galah elastis dengan gaya parabola F(t) = 150 t(2 − t) N selama 0 ≤ t ≤ 2,0 s.',
    stimulusElements: [
      'Kurva F(t) = 150 t(2 − t) simetris memuncak di t = 1,0 s dengan F_max = 150 N.',
      'Untuk memperoleh jarak tempuh tiap perahu pada t = 2,0 s, percepatan a(t) = F(t)/m harus diintegralkan dua kali.',
    ],
    questionText:
      'Dua perahu bermassa m₁ = 100 kg dan m₂ = 150 kg mula-mula diam dan berimpit di air tenang tanpa gesekan. Penumpang di Perahu 1 mendorong Perahu 2 menggunakan galah elastis sehingga gaya dorong saling menjauh berubah terhadap waktu mengikuti persamaan F(t) = 150 t(2 − t) Newton untuk selang waktu 0 ≤ t ≤ 2,0 detik, dan pada t = 2,0 s galah terlepas. Berapakah jarak pisah antara kedua perahu tepat pada t = 2,0 detik (dalam satuan meter)?',
    unit: 'm',
    exactValue: 3.3333333333,
    formattedAnswer: '3,3',
    hint: 'Karena F(t) = 150(2t − t²) berbentuk parabola (bukan konstan), kecepatan tidak linear. Integralkan a_rel(t) = F(t)/μ terhadap waktu untuk mendapat v_rel(t), lalu integralkan v_rel(t) dari t = 0 sampai t = 2,0 s!',
    misconceptionWarning:
      'Jangan mengalikan kecepatan akhir dengan ½ × 2,0 s seperti pada GLBB! Pada gaya kuadratik simetris, v(t) berbentuk fungsi pangkat tiga sehingga Δx tidak sama dengan ½ v_akhir t.',
    fbdForces: [
      {
        id: 's13-b1-f',
        target: 'boat1',
        symbol: 'F₂₁(t)',
        name: 'Gaya Galah pada Perahu 1',
        direction: 'left',
        magnitudeLabel: '150t(2−t) N',
        color: '#8E1B37',
        explanation: 'Menghasilkan percepatan a₁(t) = −1,5(2t − t²) ke kiri.',
      },
      {
        id: 's13-b2-f',
        target: 'boat2',
        symbol: 'F₁₂(t)',
        name: 'Gaya Galah pada Perahu 2',
        direction: 'right',
        magnitudeLabel: '150t(2−t) N',
        color: '#059669',
        explanation: 'Menghasilkan percepatan a₂(t) = +1,0(2t − t²) ke kanan.',
      },
    ],
    fbdAxesNote: 'Sumbu +x ke kanan; kedua perahu mulai dari titik asal yang berimpit.',
    fbdEquationsLatex: [
      'v_i(t) = \\frac{1}{m_i}\\int_0^t 150(2\\tau - \\tau^2)\\,d\\tau = \\frac{150}{m_i}\\left(t^2 - \\frac{t^3}{3}\\right)',
      'x_i(t) = \\int_0^t v_i(\\tau)\\,d\\tau = \\frac{150}{m_i}\\left(\\frac{t^3}{3} - \\frac{t^4}{12}\\right)',
    ],
    simulation: {
      mode: 'quadratic-push',
      m1: 100,
      m2: 150,
      force: 150,
      duration: 2.0,
      totalTime: 4.0,
      stepDescriptions: [
        { t: 0, text: 't = 0,0 s: Gaya mulai tumbuh dari 0 N.' },
        { t: 1.0, text: 't = 1,0 s: Puncak gaya 150 N tercapai; impuls 100 Ns, jarak pisah baru 1,04 m.' },
        { t: 2.0, text: 't = 2,0 s: Galah lepas! Impuls total 200 Ns, pertambahan jarak pisah tepat 10/3 ≈ 3,3 m.' },
      ],
    },
    pembahasan: {
      bagian1Memahami: {
        fenomena: 'Pemisahan dua perahu di bawah pengaruh gaya dorong kuadratik F(t) = 150 t(2 − t).',
        diketahui: [
          'm₁ = 100 kg, m₂ = 150 kg',
          'F(t) = 150(2t − t²) N pada 0 ≤ t ≤ 2,0 s',
          'Awalnya diam dan berimpit (v₀ = 0, Δd₀ = 0)',
        ],
        ditanyakan: 'Jarak pisah kedua perahu pada t = 2,0 s (m).',
        konsep: ['Kalkulus Kinematika (Integral Berulang)', 'Massa Tereduksi μ'],
      },
      bagian2Visualisasi: {
        penjelasanProses: [
          'Kurva gaya simetris terhadap t = 1,0 s. Kecepatan terus meningkat hingga t = 2,0 s (puncak kecepatan 2,0 m/s dan 4/3 m/s).',
          'Menariknya, karena kurva gaya simetris terhadap t = 1,0 s, kecepatan rata-ratanya tetap tepat setengah kecepatan akhir (jadi jaraknya sama dengan ½ v_akhir × 2,0 s)! Pembuktian integral memastikan hal ini secara eksak.',
        ],
      },
      bagian3Analisis: {
        hukumFisika: 'Hukum II Newton dalam bentuk diferensial m d²x/dt² = F(t).',
        sumbuKoordinat: 'Arah +x ke kanan.',
        analisisHubungan: 'Perbandingan perpindahan |x₁|/|x₂| = m₂/m₁ = 150/100 = 1,5.',
        fbdNote: 'Hanya gaya galah horizontal yang mempercepat tiap perahu.',
      },
      bagian4Persamaan: {
        rumusUtamaLatex: '\\Delta d(t) = \\left(\\frac{1}{m_1} + \\frac{1}{m_2}\\right)\\int_0^t \\left(\\int_0^{\\tau\'} F(\\tau)\\,d\\tau\\right)d\\tau\'',
        maknaSimbol: [
          { symbol: '1/m₁ + 1/m₂', meaning: 'Kebalikan massa tereduksi = 1/60 kg⁻¹' },
          { symbol: 'F(τ)', meaning: 'Fungsi gaya terhadap waktu (N)' },
        ],
        alasanPemilihan: 'Integrasi langsung terhadap waktu memberikan posisi eksak untuk gaya non-konstan.',
      },
      bagian5Penyelesaian: {
        langkah: [
          {
            label: '1. Cari fungsi kecepatan tiap perahu via integral pertama',
            latex: '\\int_0^t 150(2\\tau - \\tau^2)\\,d\\tau = 150\\left(t^2 - \\frac{t^3}{3}\\right)',
            note: 'Pada t = 2,0 s, impuls total I = 150(4 − 8/3) = 200 Ns.',
          },
          {
            label: '2. Cari jarak tempuh via integral kedua pada t = 2,0 s',
            latex: '\\int_0^2 150\\left(t^2 - \\frac{t^3}{3}\\right)\\,dt = 150\\left[\\frac{t^3}{3} - \\frac{t^4}{12}\\right]_0^2 = 150\\left(\\frac{8}{3} - \\frac{16}{12}\\right) = 150 \\times \\frac{4}{3} = 200\\text{ kg}\\cdot\\text{m}',
            note: 'Nilai 200 kg·m adalah momen impuls terhadap waktu.',
          },
          {
            label: '3. Bagi dengan massa masing-masing dan jumlahkan',
            latex: '|x_1| = \\frac{200}{100} = 2{,}0\\text{ m}, \\quad |x_2| = \\frac{200}{150} = \\frac{4}{3}\\text{ m} \\implies \\Delta d = 2{,}0 + \\frac{4}{3} = \\frac{10}{3} \\approx 3{,}333\\text{ m}',
            note: 'Cek pusat massa: 100(2,0) = 150(4/3) = 200.',
          },
        ],
        pembulatan: 'Angka 3,333 m dibulatkan ke satu angka di belakang koma menjadi 3,3 m.',
      },
      bagian6Kesimpulan: {
        nilaiAkhir: '3,3',
        satuan: 'm',
        interpretasiFisis: 'Pada saat galah terlepas di t = 2,0 s, Perahu 1 bergerak 2,0 m ke kiri dan Perahu 2 bergerak 1,33 m ke kanan, terpisah sejauh 3,3 m.',
      },
      bagian7Strategi: {
        trikEfisien: 'Sifat simetri olimpiade! Jika F(t) simetris terhadap t_tengah = T/2 dan mulai dari diam, maka Δx = v_akhir × (T/2)! Di sini v_rel,akhir = 200/60 = 10/3 m/s, jadi Δd = (10/3) × 1,0 = 3,33 m!',
        caraMengenali: 'Setiap kali melihat fungsi gaya berbentuk polynomial F(t), langsung susun integral ganda atau cek simetri pulsa gaya.',
        kesalahanDihindari: ['Salah menurunkan bukannya mengintegralkan F(t).', 'Lupa menghitung perpindahan KEDUA perahu dan hanya menjawab x₁ = 2,0 m.'],
      },
      bagian8Pendalaman: {
        konsepLanjutan: 'Bagaimana jika gaya dorong melibatkan tiga buah perahu dengan tumbukan tidak elastis?',
        variasiSoal: 'Soal 14 menganalisis energi kinetik yang hilang saat Perahu 2 menumbuk dan menempel pada Perahu 3.',
        hubunganBerikutnya: 'Soal 14 menguji pelestarian momentum dan disipasi energi mekanik.',
      },
    },
    narrationPrompt:
      'Memasuki tantangan olimpiade kota nomor tiga belas! Gaya dorong berbentuk parabola seratus lima puluh t dikali dua minus t selama dua detik. Dengan mengintegralkan gaya dua kali terhadap waktu dari nol hingga dua detik, kita peroleh pergeseran perahu satu dua koma nol meter ke kiri dan perahu dua empat per tiga meter ke kanan. Total jarak pisah keduanya menjadi sepuluh per tiga, atau dibulatkan tiga koma tiga meter.',
  },
  {
    id: 14,
    code: 'SOAL 14',
    title: 'Dorongan Awal Diikuti Tumbukan Tak Elastis Tiga Perahu',
    tier: 'Tantangan Olimpiade Kota',
    subtopic: 'Impuls Internal + Tumbukan Tak Elastis Sempurna + Disipasi Energi',
    stimulusType: 'three-boats-inelastic',
    stimulusCaption:
      'Tiga perahu berjajar diam (m₁ = 100 kg, m₂ = 200 kg, m₃ = 300 kg). Perahu 1 mendorong Perahu 2 ke kanan (F = 90 N, Δt = 2,0 s), lalu Perahu 2 menumbuk Perahu 3 secara tak elastis sempurna.',
    stimulusElements: [
      'Perahu 1 (100 kg) mendorong Perahu 2 (200 kg) ke kanan dengan gaya 90 N selama 2,0 s.',
      'Perahu 2 melaju dengan momentum 180 Ns menuju Perahu 3 (300 kg) yang diam di depan.',
      'Perahu 2 dan 3 menempel pasca-tumbukan dan bergerak bersama dengan momentum tetap 180 Ns.',
    ],
    questionText:
      'Tiga buah perahu berjajar di air tenang tanpa gesekan: Perahu 1 (m₁ = 100 kg), Perahu 2 (m₂ = 200 kg), dan Perahu 3 (m₃ = 300 kg), semuanya mula-mula diam. Seseorang di Perahu 1 mendorong Perahu 2 ke kanan dengan gaya konstan F = 90 N selama Δt = 2,0 detik. Setelah dorongan selesai, Perahu 2 meluncur ke kanan dan menumbuk Perahu 3 secara tidak elastis sama sekali (keduanya saling mengait dan bergerak bersama). Berapakah energi kinetik yang hilang akibat tumbukan antara Perahu 2 dan Perahu 3 (dalam satuan Joule)?',
    unit: 'J',
    exactValue: 48.6,
    formattedAnswer: '48,6',
    hint: 'Hitung momentum Perahu 2 setelah didorong: p₂ = F × Δt = 180 Ns. Saat tumbukan tak elastis sempurna dengan Perahu 3, momentum sistem (2+3) tetap 180 Ns, sedangkan massanya bertambah dari 200 kg menjadi 500 kg. Bandingkan p²/(2m) sebelum dan sesudah tumbukan!',
    misconceptionWarning:
      'Jangan masukkan Perahu 1 ke dalam tumbukan antara Perahu 2 dan 3! Perahu 1 sudah terpisah dan bergerak ke kiri sehingga hanya (2 + 3) yang bertumbukan.',
    fbdForces: [
      {
        id: 's14-b1-f',
        target: 'boat1',
        symbol: 'F₂₁',
        name: 'Reaksi Dorongan (Tahap 1)',
        direction: 'left',
        magnitudeLabel: '90 N',
        color: '#8E1B37',
        explanation: 'Menggerakkan Perahu 1 ke kiri (−1,8 m/s), tidak terlibat tumbukan dengan Perahu 3.',
      },
      {
        id: 's14-b2-f',
        target: 'boat2',
        symbol: 'F₁₂',
        name: 'Aksi Dorongan (Tahap 1)',
        direction: 'right',
        magnitudeLabel: '90 N',
        color: '#059669',
        explanation: 'Memberi momentum +180 Ns (v₂ = +0,9 m/s) sebelum menumbuk Perahu 3.',
      },
    ],
    fbdAxesNote: 'Saat tumbukan Perahu 2 dan 3, gaya tumbukan bersifat internal antara benda 2 dan 3 sehingga p₂₃ = p₂ = 180 Ns kekal.',
    fbdEquationsLatex: [
      'p_2 = F\\Delta t = 180\\text{ Ns}, \\qquad K_{\\text{sebelum}} = \\frac{p_2^2}{2m_2}',
      'K_{\\text{sesudah}} = \\frac{p_2^2}{2(m_2 + m_3)} \\implies \\Delta K_{\\text{hilang}} = K_{\\text{sebelum}} - K_{\\text{sesudah}}',
    ],
    simulation: {
      mode: 'three-boats-inelastic',
      m1: 100,
      m2: 200,
      m3: 300,
      force: 90,
      duration: 2.0,
      totalTime: 7.0,
      stepDescriptions: [
        { t: 0, text: 't = 0–2,0 s: Perahu 1 mendorong Perahu 2; Perahu 2 mendapat momentum 180 Ns (81,0 J).' },
        { t: 4.0, text: 't = 4,0 s: Tumbukan tak elastis! Perahu 2 & 3 bergabung (500 kg) melaju 0,36 m/s (32,4 J).' },
        { t: 6.0, text: 't > 4,0 s: Energi yang berubah menjadi panas/bunyi tumbukan tepat 48,6 J.' },
      ],
    },
    pembahasan: {
      bagian1Memahami: {
        fenomena: 'Dorongan dua perahu diikuti tumbukan tak elastis sempurna antara Perahu 2 dan Perahu 3.',
        diketahui: [
          'm₁ = 100 kg, m₂ = 200 kg, m₃ = 300 kg',
          'F = 90 N selama Δt = 2,0 s pada Perahu 1 & 2',
          'Tumbukan Perahu 2 & 3 bersifat tak elastis sempurna (menempel)',
        ],
        ditanyakan: 'Energi kinetik yang hilang saat tumbukan Perahu 2 dan 3 (J).',
        konsep: ['Impuls–Momentum', 'Tumbukan Tak Elastis Sempurna', 'Rumus Energi K = p²/(2m)'],
      },
      bagian2Visualisasi: {
        penjelasanProses: [
          'Tahap 1: Dorongan memberi Perahu 2 kecepatan 0,9 m/s ke kanan dan energi kinetik 81,0 J.',
          'Tahap 2: Setelah menumbuk Perahu 3 yang diam, gabungan keduanya (500 kg) bergerak dengan laju 180/500 = 0,36 m/s, membawa energi kinetik tersisa 32,4 J.',
        ],
      },
      bagian3Analisis: {
        hukumFisika: 'Momentum sistem (2 + 3) kekal saat tumbukan, sedangkan energi kinetik mengalami disipasi.',
        sumbuKoordinat: 'Arah +x ke kanan.',
        analisisHubungan: 'Fraksi energi kinetik yang hilang pada tumbukan tak elastis dengan target diam selalu sama dengan m₃/(m₂ + m₃) = 300/500 = 60%!',
        fbdNote: 'Gaya tumbukan antara Perahu 2 dan 3 saling meniadakan untuk sistem (2 + 3).',
      },
      bagian4Persamaan: {
        rumusUtamaLatex: '\\Delta K_{\\text{hilang}} = \\frac{p_2^2}{2m_2} - \\frac{p_2^2}{2(m_2 + m_3)} = \\frac{p_2^2}{2m_2}\\left(\\frac{m_3}{m_2 + m_3}\\right)',
        maknaSimbol: [
          { symbol: 'p₂', meaning: 'Momentum Perahu 2 sebelum tumbukan (180 Ns)' },
          { symbol: 'm₂, m₃', meaning: 'Massa Perahu 2 dan Perahu 3 (kg)' },
        ],
        alasanPemilihan: 'Memakai bentuk p²/(2m) langsung memperlihatkan bagaimana pertambahan massa dari m₂ menjadi m₂+m₃ menurunkan energi kinetik.',
      },
      bagian5Penyelesaian: {
        langkah: [
          {
            label: '1. Hitung momentum Perahu 2 dari dorongan awal',
            latex: 'p_2 = F\\Delta t = 90 \\times 2{,}0 = 180\\text{ Ns}',
            note: 'Kecepatan Perahu 2 sebelum tumbukan = 180/200 = 0,9 m/s.',
          },
          {
            label: '2. Hitung energi kinetik Perahu 2 sebelum tumbukan',
            latex: 'K_{\\text{sebelum}} = \\frac{180^2}{2 \\times 200} = \\frac{32400}{400} = 81{,}0\\text{ J}',
            note: 'Cek: ½(200)(0,9)² = 100 × 0,81 = 81,0 J.',
          },
          {
            label: '3. Hitung energi kinetik gabungan sesudah tumbukan dan selisihnya',
            latex: 'K_{\\text{sesudah}} = \\frac{180^2}{2 \\times 500} = 32{,}4\\text{ J} \\implies \\Delta K_{\\text{hilang}} = 81{,}0 - 32{,}4 = 48{,}6\\text{ J}',
            note: 'Atau langsung 60% × 81,0 J = 48,6 J.',
          },
        ],
        pembulatan: 'Hasil eksak 48,6 J sudah tepat satu angka di belakang koma.',
      },
      bagian6Kesimpulan: {
        nilaiAkhir: '48,6',
        satuan: 'J',
        interpretasiFisis: 'Sebanyak 60% dari energi kinetik Perahu 2 (48,6 J) hilang menjadi bunyi, deformasi, dan panas saat menempel pada Perahu 3.',
      },
      bagian7Strategi: {
        trikEfisien: 'Hafalkan identitas emas tumbukan tak elastis dengan target diam: fraksi energi yang hilang = m_target / (m_penumbuk + m_target)! Di sini 300/500 × 81,0 = 48,6 J dalam 10 detik!',
        caraMengenali: 'Jika benda bertumbukan menempel pada benda diam dan ditanya energi hilang, langsung kalikan K_awal dengan rasio massa target terhadap massa total.',
        kesalahanDihindari: ['Menghitung K_hilang = ½(m₂+m₃)v_akhir² bukannya K_sebelum − K_sesudah.', 'Memasukkan m₁ dalam momentum sistem tumbukan (2 + 3).'],
      },
      bagian8Pendalaman: {
        konsepLanjutan: 'Bagaimana jika kedua perahu meluncur di fluida dengan hambatan viskos yang sebanding dengan kecepatan (f = −bv)?',
        variasiSoal: 'Soal 15 menutup rangkaian latihan dengan tantangan elegan hambatan linear f = −bv.',
        hubunganBerikutnya: 'Soal 15 menguji integrasi hukum Newton II m dv = −b dx.',
      },
    },
    narrationPrompt:
      'Pada soal empat belas, dorongan sembilan puluh Newton selama dua detik memberi perahu dua momentum seratus delapan puluh Newton sekon, setara energi kinetik delapan puluh satu Joule. Ketika perahu dua menumbuk dan menempel pada perahu tiga yang bermassa tiga ratus kilogram, momentum seratus delapan puluh Newton sekon tetap kekal pada massa total lima ratus kilogram, sehingga energi kinetik sisanya turun menjadi tiga puluh dua koma empat Joule. Jadi energi kinetik yang hilang adalah empat puluh delapan koma enam Joule.',
  },
  {
    id: 15,
    code: 'SOAL 15',
    title: 'Jarak Pisah Maksimum di Fluida dengan Hambatan Linear f = −bv',
    tier: 'Tantangan Olimpiade Kota',
    subtopic: 'Integrasi Impuls–Perpindahan pada Hambatan Viskos Linear',
    stimulusType: 'viscous-linear-drag',
    stimulusCaption:
      'Dua perahu (m₁ = 100 kg, m₂ = 150 kg) terpisah oleh impuls sesaat I = 120 Ns pada t = 0. Air memberi gaya hambat linear f = −bv dengan b = 25 kg/s hingga keduanya berhenti.',
    stimulusElements: [
      'Pada t = 0: kedua perahu mendapat besar momentum awal p₀ = 120 Ns (v₁,₀ = −1,2 m/s, v₂,₀ = +0,8 m/s).',
      'Selama bergerak, gaya hambat sebanding kecepatan: f = −b·v = −b (dx/dt).',
      'Karena Δp = ∫ f dt = −b ∫ v dt = −b·Δx, kedua perahu menempuh jarak henti YANG SAMA PERSIS!',
    ],
    questionText:
      'Dua perahu bermassa m₁ = 100 kg dan m₂ = 150 kg mula-mula diam dan berimpit di atas permukaan danau. Seseorang di Perahu 1 memberikan dorongan sangat singkat (impulsif) kepada Perahu 2 sehingga masing-masing perahu memperoleh besar momentum awal p₀ = 120 Ns ke arah berlawanan pada t = 0. Selama bergerak di air, setiap perahu mengalami gaya hambat viskos linear yang bergantung pada kecepatannya menurut f = −b·v, dengan koefisien hambatan konstan yang sama untuk kedua perahu sebesar b = 25 kg/s. Berapakah jarak pisah maksimum antara kedua perahu setelah keduanya berhenti total (t → ∞), dalam satuan meter?',
    unit: 'm',
    exactValue: 9.6,
    formattedAnswer: '9,6',
    hint: 'Tulis Hukum II Newton: m (dv/dt) = −b (dx/dt). Kalikan kedua ruas dengan dt lalu integralkan dari awal (v = v₀, x = 0) sampai berhenti (v = 0, x = x_max)! Apakah massa m memengaruhi x_max?',
    misconceptionWarning:
      'Intuisi pemula sering mengira perahu ringan akan melaju lebih jauh! Itu hanya benar pada gesekan konstan f = μmg. Pada hambatan linear f = −bv, jarak henti bergantung HANYA pada momentum awal dan b: x_max = p₀ / b!',
    fbdForces: [
      {
        id: 's15-b1-drag',
        target: 'boat1',
        symbol: 'f₁ = −bv₁',
        name: 'Hambatan Viskos pada Perahu 1',
        direction: 'right',
        magnitudeLabel: '30 N → 0 N',
        color: '#D97706',
        explanation: 'Melawan kecepatan ke kiri; pada t = 0 besarnya 25×1,2 = 30 N lalu meluruh eksponensial.',
      },
      {
        id: 's15-b2-drag',
        target: 'boat2',
        symbol: 'f₂ = −bv₂',
        name: 'Hambatan Viskos pada Perahu 2',
        direction: 'left',
        magnitudeLabel: '20 N → 0 N',
        color: '#D97706',
        explanation: 'Melawan kecepatan ke kanan; pada t = 0 besarnya 25×0,8 = 20 N lalu meluruh eksponensial.',
      },
    ],
    fbdAxesNote: 'Setelah impuls sesaat pada t = 0, hanya gaya hambat f = −bv yang bekerja secara horizontal.',
    fbdEquationsLatex: [
      'm\\frac{dv}{dt} = -b\\frac{dx}{dt} \\implies \\int_{v_0}^0 m\\,dv = -b\\int_0^{x_{\\max}} dx \\implies x_{\\max} = \\frac{m v_0}{b} = \\frac{p_0}{b}',
    ],
    simulation: {
      mode: 'viscous-drag',
      m1: 100,
      m2: 150,
      force: 0,
      duration: 0.15,
      totalTime: 24.0,
      dragB: 25,
      impulse: 120,
      stepDescriptions: [
        { t: 0, text: 't = 0,0 s: Impuls 120 Ns memberi v₁,₀ = −1,2 m/s (perahu ringan) dan v₂,₀ = +0,8 m/s.' },
        { t: 4.0, text: 't = 4,0 s: Perahu 1 melambat lebih cepat (τ₁ = 4 s) dibanding Perahu 2 (τ₂ = 6 s).' },
        { t: 18.0, text: 't → ∞: Keduanya berhenti di posisi tepat ±4,8 m, sehingga jarak pisah maksimum 9,6 m!' },
      ],
    },
    pembahasan: {
      bagian1Memahami: {
        fenomena: 'Dua perahu dilepas dengan momentum awal sama besar dan berlawanan, lalu dihentikan oleh gaya hambat viskos linear f = −bv.',
        diketahui: [
          'm₁ = 100 kg, m₂ = 150 kg',
          'Besar momentum awal tiap perahu: p₀ = 120 Ns',
          'Gaya hambat air: f = −b·v dengan b = 25 kg/s',
        ],
        ditanyakan: 'Jarak pisah maksimum kedua perahu saat t → ∞ (m).',
        konsep: ['Hukum II Newton Diferensial', 'Hubungan Impuls Hambatan Linear dengan Perpindahan', 'Peluruhan Eksponensial'],
      },
      bagian2Visualisasi: {
        penjelasanProses: [
          'Perahu 1 memulai dengan laju awal lebih besar (1,2 m/s), namun waktu karakteristik peluruhannya lebih singkat (τ₁ = m₁/b = 4 s).',
          'Perahu 2 memulai lebih lambat (0,8 m/s), namun meluncur lebih lama (τ₂ = m₂/b = 6 s). Akibatnya, luas di bawah kurva v(t) kedua perahu tepat sama: 4,8 m!',
        ],
      },
      bagian3Analisis: {
        hukumFisika: 'Integrasi persamaan gerak m(dv/dt) = −b(dx/dt).',
        sumbuKoordinat: 'Titik awal kedua perahu di x = 0.',
        analisisHubungan: 'Impuls gaya hambat total dari awal hingga berhenti sama dengan −b·Δx_max. Menurut teorema impuls-momentum, impuls tersebut sama dengan −p₀!',
        fbdNote: 'Selama gerak meluncur, hanya gaya hambat f = −bv yang bekerja di sumbu-x.',
      },
      bagian4Persamaan: {
        rumusUtamaLatex: 'x_{\\max} = \\frac{p_0}{b}, \\qquad \\Delta x_{\\max} = x_{1,\\max} + x_{2,\\max} = \\frac{2p_0}{b}',
        maknaSimbol: [
          { symbol: 'p₀', meaning: 'Besar momentum awal masing-masing perahu (120 Ns)' },
          { symbol: 'b', meaning: 'Koefisien hambatan linear (25 kg/s)' },
          { symbol: 'x_max', meaning: 'Jarak henti tiap perahu (m)' },
        ],
        alasanPemilihan: 'Menghubungkan dv dan dx langsung lewat dv/dx atau ∫ f dt = −b ∫ dx menghindari ketergantungan eksplisit pada fungsi eksponensial e^(−bt/m).',
      },
      bagian5Penyelesaian: {
        langkah: [
          {
            label: '1. Hitung jarak henti masing-masing perahu',
            latex: 'x_{1,\\max} = \\frac{120}{25} = 4{,}8\\text{ m}, \\qquad x_{2,\\max} = \\frac{120}{25} = 4{,}8\\text{ m}',
            note: 'Verifikasi via eksponensial: ∫₀^∞ 1,2 e^(−0,25t) dt = 1,2 / 0,25 = 4,8 m; ∫₀^∞ 0,8 e^(−t/6) dt = 0,8 × 6 = 4,8 m.',
          },
          {
            label: '2. Jumlahkan jarak kedua perahu ke arah berlawanan',
            latex: '\\Delta x_{\\max} = 4{,}8\\text{ m} + 4{,}8\\text{ m} = 9{,}6\\text{ m}',
            note: 'Total jarak pisah = 2 p₀ / b = 240 / 25 = 9,6 m.',
          },
        ],
        pembulatan: 'Hasil eksak 9,6 m sudah tepat satu angka di belakang koma.',
      },
      bagian6Kesimpulan: {
        nilaiAkhir: '9,6',
        satuan: 'm',
        interpretasiFisis: 'Meskipun massanya berbeda, kedua perahu menempuh jarak tepat 4,8 m ke arah berlawanan sehingga berhenti terpisah sejauh 9,6 m.',
      },
      bagian7Strategi: {
        trikEfisien: 'Setiap kali melihat gaya hambat linear f = −bv, langsung ingat bahwa impuls gaya hambat adalah −b·Δx! Maka perubahan momentum Δp = −b·Δx memberi x_henti = p₀/b dalam satu baris.',
        caraMengenali: 'Hambatan proporsional kecepatan (f = −bv) dan pertanyaan jarak henti saat t → ∞.',
        kesalahanDihindari: ['Menggunakan rumus GLBB v² = v₀² − 2ax (tidak berlaku karena percepatan tidak konstan!).', 'Mengira perahu lebih ringan menempuh jarak lebih jauh.'],
      },
      bagian8Pendalaman: {
        konsepLanjutan: 'Pusat massa sistem tetap pada posisi awal di t → ∞ karena m₁(−4,8) + m₂(+4,8) ≠ 0? Tunggu: karena ada gaya luar −b(v₁ + v₂) ≠ 0 (saat v₁ ≠ −v₂, yaitu karena massa beda maka v₁ + v₂ ≠ 0!), pusat massa sistem BERGESER sedikit menuju perahu yang lebih berat, sementara jarak tempuh relatif masing-masing terhadap titik awal tetap sama 4,8 m!',
        variasiSoal: 'Kamu baru saja menuntaskan seluruh 15 soal pengembangan OSK 2026 Nomor 13. Cek Progres Belajarmu dan coba bereksperimen bebas di Laboratorium Animasi!',
        hubunganBerikutnya: 'Kembali ke Pusat Pengetahuan atau Laboratorium Animasi untuk membandingkan kurva v(t) kedua perahu secara visual.',
      },
    },
    narrationPrompt:
      'Selamat datang di tantangan puncak, soal lima belas! Ketika kedua perahu melaju dengan hambatan viskos linear f sama dengan minus b kali v, tuliskan m dv per dt sama dengan minus b dx per dt. Mengintegralkan kedua ruas langsung menghasilkan jarak henti sama dengan momentum awal dibagi b. Hebatnya, jarak henti ini tidak bergantung pada massa! Jadi perahu satu dan perahu dua sama-sama berhenti setelah menempuh seratus dua puluh dibagi dua puluh lima, yaitu empat koma delapan meter. Total jarak pisahnya tepat sembilan koma enam meter!',
  },
];
