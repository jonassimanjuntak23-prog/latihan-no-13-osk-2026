import { ArrowRight, BookOpen, Compass, PlayCircle, Target } from 'lucide-react';
import type { MenuId } from '../types/physics';
import { NarratorInlineButton } from './NarratorControls';

interface HomeViewProps {
  solvedCount: number;
  attemptedCount: number;
  onNavigate: (menu: MenuId) => void;
  onNarrate: (title: string, script: string) => void;
}

export function HomeView({
  solvedCount,
  attemptedCount,
  onNavigate,
  onNarrate,
}: HomeViewProps) {
  const welcomeSpeech =
    'Selamat datang di aplikasi pembelajaran dan latihan Olimpiade Sains Fisika Tingkat Kota tahun 2026, bersama saya Mister Jo, guru pembimbing fisika olimpiademu. Di platform ini kita membedah tuntas Soal Nomor Tiga Belas tentang Momentum Linear, Impuls, dan Hukum Tiga Newton. Kita tidak sekadar menghafal rumus, melainkan memahami fenomena fisikanya, menggambar diagram gaya secara ilmiah, membuktikan lewat animasi, lalu menaklukkan lima belas soal latihan bertahap hingga tingkat olimpiade kota!';

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <p className="text-xs font-semibold text-[#8E1B37] tracking-wide">
              Olimpiade Sains Nasional Tingkat Kota · Fisika SMA 2026 · Fokus Soal No. 13
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.12] [text-wrap:balance]">
              Kuasai Penalaran <span className="text-[#6B0F24]">Momentum Linear</span> &amp; Impuls Tingkat Olimpiade
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-slate-600 max-w-2xl">
              Sistem pembelajaran fisika bertahap berbasis naskah resmi{' '}
              <strong className="text-slate-900">Soal OSK Fisika 2026 Nomor 13</strong>.
              Pelajari teori dari nol, buktikan fenomena melalui simulasi interaktif &amp;
              Free Body Diagram, lalu taklukkan 15 soal HOTS terverifikasi bersama{' '}
              <strong className="text-[#6B0F24]">Mister Jo</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('pengetahuan')}
              className="inline-flex items-center gap-2 rounded-xl bg-[#6B0F24] px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#5A0B1E] transition-colors cursor-pointer"
            >
              <span>Mulai Belajar dari Konsep</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('soal')}
              className="inline-flex items-center gap-2 rounded-xl border border-[#D8BCC4] bg-white px-5 py-3.5 text-sm font-semibold text-[#6B0F24] hover:bg-[#FDF5F7] transition-colors cursor-pointer"
            >
              <Target className="h-4 w-4" aria-hidden="true" />
              <span>Langsung ke 15 Soal ({solvedCount}/15)</span>
            </button>
            <NarratorInlineButton
              label="Sambutan Mister Jo"
              onSpeak={() => onNarrate('Sambutan Awal Mister Jo', welcomeSpeech)}
            />
          </div>

          {/* Mentor Card */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl border border-[#E8DADF] bg-[#FDF9FA] p-4">
            <img
              src="/src/assets/images/mister_jo_mentor_1795269557007.jpg"
              alt="Mister Jo — Guru Pembimbing OSK Fisika 2026"
              referrerPolicy="no-referrer"
              className="h-16 w-16 rounded-xl object-cover border border-[#C99A3B] shrink-0"
            />
            <div className="space-y-1">
              <p className="text-xs font-semibold text-[#8E1B37]">
                Guru Pembimbing Olimpiade
              </p>
              <h2 className="font-display text-lg font-bold text-slate-900">
                MISTER JO
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Membimbing langkah demi langkah mulai dari membaca fenomena, menurunkan
                persamaan fisika, menggambar FBD yang tepat, hingga trik cepat olimpiade.
              </p>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="relative flex-1 overflow-hidden rounded-2xl border border-[#E8DADF] bg-slate-100 min-h-[280px]">
            <img
              src="/src/assets/images/hero_boats_momentum_1795269556727.jpg"
              alt="Ilustrasi fenomena dua perahu saling mendorong pada Soal 13 OSK Fisika 2026"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent p-5 text-white">
              <p className="text-xs font-semibold text-[#F4D58D]">
                Sumber Utama · OSK Fisika SMA 2026 No. 13
              </p>
              <p className="mt-1 text-sm font-medium leading-snug">
                Dua perahu bermassa 130 kg &amp; 250 kg saling dorong dengan gaya 46 N
                selama 1,2 detik di permukaan air tenang.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Column Learning Path Strip */}
      <section aria-labelledby="tujuan-heading" className="space-y-6 border-t border-slate-200 pt-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2
              id="tujuan-heading"
              className="font-display text-2xl font-bold text-slate-900"
            >
              Alur Transformasi Belajar Bertahap
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Dirancang agar siswa pemula mampu membangun model fisika hingga level Olimpiade Kota.
            </p>
          </div>
          <p className="text-xs font-medium text-slate-500 font-mono-tabular">
            Progres saat ini: {attemptedCount} dicoba · {solvedCount} benar dari 15 soal
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <button
            type="button"
            onClick={() => onNavigate('analisis')}
            className="text-left rounded-2xl border border-slate-200 bg-white p-5 hover:border-[#8E1B37] transition-colors cursor-pointer space-y-2.5"
          >
            <Compass className="h-5 w-5 text-[#6B0F24]" aria-hidden="true" />
            <h3 className="font-display text-base font-bold text-slate-900">
              01. Bedah Soal No. 13
            </h3>
            <p className="text-xs leading-relaxed text-slate-600">
              Identifikasi 12 aspek penting naskah asli OSK 2026: hukum dasar, besaran, jebakan konsep, dan peta variasi.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('pengetahuan')}
            className="text-left rounded-2xl border border-slate-200 bg-white p-5 hover:border-[#8E1B37] transition-colors cursor-pointer space-y-2.5"
          >
            <BookOpen className="h-5 w-5 text-[#6B0F24]" aria-hidden="true" />
            <h3 className="font-display text-base font-bold text-slate-900">
              02. Pusat Pengetahuan
            </h3>
            <p className="text-xs leading-relaxed text-slate-600">
              12 modul buku teks fisika lengkap: penurunan rumus LaTeX, kesalahan umum, dan narasi suara Mister Jo.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('soal')}
            className="text-left rounded-2xl border border-slate-200 bg-white p-5 hover:border-[#8E1B37] transition-colors cursor-pointer space-y-2.5"
          >
            <Target className="h-5 w-5 text-[#6B0F24]" aria-hidden="true" />
            <h3 className="font-display text-base font-bold text-slate-900">
              03. Bank 15 Soal HOTS
            </h3>
            <p className="text-xs leading-relaxed text-slate-600">
              Isian singkat numerik 1 desimal koma dengan pemeriksaan otomatis, FBD interaktif, dan pembahasan 8 bagian.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('laboratorium')}
            className="text-left rounded-2xl border border-slate-200 bg-white p-5 hover:border-[#8E1B37] transition-colors cursor-pointer space-y-2.5"
          >
            <PlayCircle className="h-5 w-5 text-[#6B0F24]" aria-hidden="true" />
            <h3 className="font-display text-base font-bold text-slate-900">
              04. Lab Animasi Fisika
            </h3>
            <p className="text-xs leading-relaxed text-slate-600">
              Ubah massa, gaya, durasi, pegas, dan hambatan air secara bebas untuk melihat pembuktian hukum momentum.
            </p>
          </button>
        </div>
      </section>
    </div>
  );
}
