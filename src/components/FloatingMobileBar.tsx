import React from 'react';
import { Phone, MessageCircle, ShoppingBag } from 'lucide-react';
import { COMPANY_INFO } from '../data/products';

interface FloatingMobileBarProps {
  onOpenCart: () => void;
  cartCount: number;
}

export const FloatingMobileBar: React.FC<FloatingMobileBarProps> = ({
  onOpenCart,
  cartCount,
}) => {
  return (
    <>
      {/* Mobile Sticky Bottom Action Bar (< md) - height ~56px (well below 15% of mobile viewport) */}
      <aside
        aria-label="Thanh liên hệ nhanh"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#E0D5C3] px-3 py-2 shadow-lg"
      >
        <div className="grid grid-cols-12 gap-2 items-center max-w-md mx-auto">
          {/* Main Hotline Call Button */}
          <a
            href={`tel:${COMPANY_INFO.phoneRaw}`}
            className="col-span-7 flex items-center justify-center gap-2 py-2.5 px-3 bg-[#3B2516] text-[#FDF8EE] rounded-xl font-bold text-xs sm:text-sm shadow-xs active:scale-98 transition-transform"
          >
            <div className="w-5 h-5 rounded-full bg-[#D4A359] text-[#3B2516] flex items-center justify-center animate-pulse">
              <Phone className="w-3 h-3" />
            </div>
            <span className="tabular-nums">Gọi {COMPANY_INFO.phone}</span>
          </a>

          {/* Chat Zalo Button */}
          <a
            href={COMPANY_INFO.zaloUrl}
            target="_blank"
            rel="noreferrer"
            className="col-span-3 flex items-center justify-center gap-1.5 py-2.5 px-2 bg-[#0068FF] text-white rounded-xl font-semibold text-xs active:scale-98 transition-transform"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Zalo</span>
          </a>

          {/* Order / Quote Bag Button */}
          <button
            type="button"
            onClick={onOpenCart}
            className="col-span-2 relative flex items-center justify-center py-2.5 px-2 bg-[#F0E8DC] text-[#3B2516] rounded-xl font-semibold text-xs active:scale-98 transition-transform cursor-pointer"
            aria-label="Xem báo giá"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#B6833D] text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* Desktop / Tablet Floating Quick Action Button (>= md) at bottom-right */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3 pointer-events-auto">
        <a
          href={`tel:${COMPANY_INFO.phoneRaw}`}
          className="group flex items-center gap-3 bg-[#3B2516] text-[#FDF8EE] px-4 py-3 rounded-full shadow-xl hover:bg-[#25150C] transition-all hover:scale-103"
          title="Gọi Hotline tư vấn nhanh"
        >
          <div className="w-7 h-7 rounded-full bg-[#D4A359] text-[#3B2516] flex items-center justify-center animate-bounce">
            <Phone className="w-4 h-4" />
          </div>
          <div className="text-left pr-1">
            <div className="text-[10px] uppercase font-semibold text-[#D4A359] leading-tight">Hotline tư vấn</div>
            <div className="text-sm font-bold tabular-nums text-white">{COMPANY_INFO.phone}</div>
          </div>
        </a>
      </div>
    </>
  );
};
