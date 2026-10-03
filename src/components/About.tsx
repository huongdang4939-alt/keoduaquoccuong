import React from 'react';
import { CheckCircle2, ShieldCheck, HeartHandshake, Leaf, MapPin } from 'lucide-react';
import { COMPANY_INFO } from '../data/products';
import storyImg from '../assets/images/keo_dua_cubes_artisan_1791001238454.jpg';

export const About: React.FC = () => {
  return (
    <section id="gioi-thieu" className="py-16 lg:py-24 bg-[#F5EFE6]/70 border-t border-[#E8DFC0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#966838]">
            <span>Về Chúng Tôi</span>
            <span aria-hidden="true" className="text-[#D4A359]">·</span>
            <span>Cơ Sở Kẹo Dừa Quốc Cường</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#332219] mt-2 [text-wrap:balance]">
            Gìn Giữ Tinh Hoa Hương Vị Kẹo Dừa Xứ Miền Tây
          </h2>
          <p className="mt-3 text-base text-[#685141] leading-relaxed">
            Khởi nguồn từ niềm đam mê lưu giữ vị ngọt bùi truyền thống quê hương, Kẹo Dừa Quốc Cường chuyên 
            sản xuất và phân phối dòng kẹo dừa Ý Hương, phục vụ khách hàng lẻ, và các đại lý phân phối.
          </p>
        </div>

        {/* Content Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Documentary Craftsmanship Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#E6DDCE] bg-white">
              <img
                src={storyImg}
                alt="Nghệ nhân sên kẹo dừa thủ công bằng chảo đồng truyền thống"
                referrerPolicy="no-referrer"
                className="w-full h-[360px] sm:h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white text-left">
                <span className="text-xs uppercase tracking-widest text-[#EED8B3] font-medium">Bí quyết gia truyền</span>
                <p className="text-sm sm:text-base font-semibold mt-1">
                  Nấu từ nước cốt dừa tươi nguyên chất, canh lửa đều trên chảo lớn để tạo độ dẻo mềm hoàn hảo
                </p>
              </div>
            </div>

            {/* Address location note badge */}
            <div className="mt-4 flex items-start gap-2.5 p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E8DFC0] text-left">
              <MapPin className="w-5 h-5 text-[#B6833D] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-semibold text-[#3B2516] uppercase tracking-wide">Cơ sở sản xuất & phân phối:</span>
                <p className="text-xs sm:text-sm text-[#5E4839] mt-0.5">
                  {COMPANY_INFO.address}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Key Pillars & Craft Standards */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="space-y-4">
              
              {/* Feature 1 */}
              <div className="p-4 sm:p-5 bg-white/90 rounded-xl border border-[#EADFCB] shadow-2xs">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-[#FAF0DC] text-[#966838] shrink-0">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-[#3B2516]">
                      01. Nguyên Liệu Tuyển Chọn Từ Trái Dừa Bến Tre
                    </h3>
                    <p className="text-sm text-[#665040] mt-1 leading-relaxed">
                      Sử dụng dừa khô bánh tẻ có cơm dày, béo ngậy để ép nước cốt nguyên chất. 
                      Hòa quyện mạch nha nếp thơm ngọt dịu cùng cơm dừa sáp trứ danh, hoàn toàn không chất bảo quản công nghiệp.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="p-4 sm:p-5 bg-white/90 rounded-xl border border-[#EADFCB] shadow-2xs">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-[#EBF3ED] text-[#2D5A3A] shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-[#3B2516]">
                      02. Vệ Sinh An Toàn Thực Phẩm Chuẩn Chỉ
                    </h3>
                    <p className="text-sm text-[#665040] mt-1 leading-relaxed">
                      Quy trình chế biến và đóng gói màng seal hiện đại đảm bảo tiêu chuẩn ATVSTP,
                      giữ viên kẹo dẻo mềm, thơm lâu và không bị chảy dầu theo thời gian.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="p-4 sm:p-5 bg-white/90 rounded-xl border border-[#EADFCB] shadow-2xs">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-[#F4E9DF] text-[#7C4A28] shrink-0">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-[#3B2516]">
                      03. Cung Ứng Sỉ & Lẻ Toàn Quốc Với Giá Tốt Nhất
                    </h3>
                    <p className="text-sm text-[#665040] mt-1 leading-relaxed">
                      Chính sách giá gốc tận xưởng cho các đối tác cửa hàng đặc sản, nhà phân phối bánh kẹo, 
                      trạm dừng chân và doanh nghiệp đặt quà biếu số lượng lớn dịp lễ Tết.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Adjacency proof note */}
            <div className="pt-2 text-xs sm:text-sm text-[#7A6454] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#3D6647] shrink-0" />
              <span>Được tin chọn bởi hàng ngàn khách sỉ & đoàn khách du lịch phương xa.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
