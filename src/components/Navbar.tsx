import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import type { MenuId } from '../types/physics';

interface NavbarProps {
  activeMenu: MenuId;
  onSelectMenu: (menu: MenuId) => void;
  solvedCount: number;
}

const NAV_ITEMS: { id: MenuId; label: string }[] = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'analisis', label: 'Analisis Soal 13' },
  { id: 'pengetahuan', label: 'Pusat Pengetahuan' },
  { id: 'soal', label: 'Bank 15 Soal' },
  { id: 'laboratorium', label: 'Lab Animasi' },
  { id: 'rumus', label: 'Rangkuman Rumus' },
  { id: 'progres', label: 'Progres Belajar' },
];

export function Navbar({
  activeMenu,
  onSelectMenu,
  solvedCount,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (id: MenuId) => {
    onSelectMenu(id);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[#E8DADF] bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line wordmark */}
        <button
          type="button"
          onClick={() => handleNav('beranda')}
          className="font-display text-lg font-bold tracking-tight text-[#5A0B1E] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B0F24]"
        >
          OSK Fisika 2026
        </button>

        {/* Zone 2: Clean single-line navigation links */}
        <nav
          aria-label="Navigasi utama"
          className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`relative py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'font-semibold text-[#6B0F24]'
                    : 'text-slate-600 hover:text-[#6B0F24]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-[#6B0F24] rounded-full"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single primary CTA + mobile toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleNav('soal')}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#6B0F24] px-4 py-2 text-xs font-semibold text-white hover:bg-[#5A0B1E] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Latihan ({solvedCount}/15)
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            aria-expanded={mobileOpen}
            className="inline-flex lg:hidden items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Navigasi seluler"
          className="lg:hidden border-t border-[#E8DADF] bg-white px-4 py-3 space-y-1"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`block w-full text-left rounded-lg px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#FDF5F7] text-[#6B0F24] font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
}
