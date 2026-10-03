import React from 'react';
import { Phone, MapPin, Mail, Clock, Heart } from 'lucide-react';
import { COMPANY_INFO } from '../data/products';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2E1E14] text-[#E0D3C5] pt-14 pb-20 md:pb-12 border-t border-[#4A3528]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 text-left">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div>
              <span className="font-display text-2xl font-bold tracking-tight text-[#FDF8EE]">
                {COMPANY_INFO.name}
              </span>
              <span className="block text-xs uppercase tracking-widest text-[#D4A359] mt-0.5 font-medium">
                Cơ Sở Sản Xuất & Phân Phối Kẹo Dừa Ý Hương
              </span>
            </div>
            
            <p className="text-sm text-[#C4B3A3] leading-relaxed max-w-sm">
              Tự hào mang đến đặc sản kẹo dừa Bến Tre truyền thống chuẩn vị, dẻo thơm béo bùi từ 100% 
              nước cốt dừa tươi và dừa sáp hảo hạng.
            </p>

            <div className="pt-2 text-xs text-[#A89482]">
              Giấy phép VSATTP · Phân phối sỉ lẻ giao hàng toàn quốc
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#FDF8EE]">
              Mục Chính
            </h4>
            <ul className="space-y-2 text-sm text-[#C4B3A3]">
              <li>
                <a href="#trang-chu" className="hover:text-[#FDF8EE] transition-colors">
                  Trang Chủ
                </a>
              </li>
              <li>
                <a href="#gioi-thieu" className="hover:text-[#FDF8EE] transition-colors">
                  Giới Thiệu Cơ Sở
                </a>
              </li>
              <li>
                <a href="#san-pham" className="hover:text-[#FDF8EE] transition-colors">
                  Sản Phẩm Kẹo Dừa
                </a>
              </li>
              <li>
                <a href="#lien-he" className="hover:text-[#FDF8EE] transition-colors">
                  Liên Hệ & Báo Giá
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-3 text-sm">
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#FDF8EE]">
              Thông Tin Liên Hệ
            </h4>
            
            <div className="space-y-2.5 text-[#C4B3A3]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4A359] shrink-0 mt-1" />
                <span className="leading-snug">{COMPANY_INFO.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4A359] shrink-0" />
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="font-bold text-[#FDF8EE] hover:text-[#D4A359] transition-colors tabular-nums"
                >
                  {COMPANY_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#D4A359] shrink-0" />
                <span>{COMPANY_INFO.workingHours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#422F22] flex flex-col sm:flex-row items-center justify-between text-xs text-[#9E8B7B] gap-3">
          <p>© {new Date().getFullYear()} {COMPANY_INFO.name}. Tất cả quyền được bảo lưu.</p>
          <p className="flex items-center gap-1">
            <span>Đặc sản ngọt lành từ tình quê sông nước miền Tây</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
