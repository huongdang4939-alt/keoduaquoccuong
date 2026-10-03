import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ShoppingBag } from 'lucide-react';
import { COMPANY_INFO } from '../data/products';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Trang Chủ', href: '#trang-chu', id: 'trang-chu' },
    { label: 'Giới Thiệu', href: '#gioi-thieu', id: 'gioi-thieu' },
    { label: 'Sản Phẩm', href: '#san-pham', id: 'san-pham' },
    { label: 'Liên Hệ', href: '#lien-he', id: 'lien-he' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-xs border-b border-[#E6DDCE]'
          : 'bg-[#FAF7F2] border-b border-[#EFE8DC]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Single text wordmark */}
          <a
            href="#trang-chu"
            className="group flex flex-col items-start leading-tight"
            aria-label="Kẹo Dừa Quốc Cường"
          >
            <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#3B2516] group-hover:text-[#B6833D] transition-colors">
              QUỐC CƯỜNG
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#7C6656]">
              Kẹo Dừa Ý Hương
            </span>
          </a>

          {/* Zone 2: 4 nav links - Clean typography */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-[#5A4537]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative py-1 transition-colors hover:text-[#3B2516] ${
                    isActive ? 'text-[#3B2516] font-semibold' : ''
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4A359] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Quick Quote / Cart indicator button */}
            <button
              onClick={onOpenCart}
              type="button"
              className="relative p-2.5 rounded-lg text-[#3B2516] hover:bg-[#F0E8DC] transition-colors cursor-pointer"
              title="Danh sách đặt hàng / báo giá"
              aria-label="Xem giỏ yêu cầu báo giá"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#B6833D] text-white text-xs font-semibold rounded-full flex items-center justify-center tabular-nums shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Desktop Hotline CTA */}
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 bg-[#3B2516] hover:bg-[#2C1B10] text-[#FDF8EE] text-sm font-semibold rounded-lg shadow-xs transition-colors whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-[#D4A359]" />
              <span className="tabular-nums">{COMPANY_INFO.phone}</span>
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden p-2 rounded-lg text-[#3B2516] hover:bg-[#F0E8DC] transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E6DDCE] bg-[#FAF7F2] px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-base font-medium text-[#4A3528] hover:bg-[#F0E8DC] hover:text-[#2C1B10] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-[#E6DDCE]">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#3B2516] text-[#FDF8EE] font-semibold rounded-lg text-sm"
            >
              <Phone className="w-4 h-4 text-[#D4A359]" />
              <span>Gọi hotline: {COMPANY_INFO.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
