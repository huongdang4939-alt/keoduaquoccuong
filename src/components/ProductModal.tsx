import React from 'react';
import { X, Check, Phone, ShoppingBag, MessageCircle, Sparkles, Box, Calendar, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { COMPANY_INFO } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onInquireProduct: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onInquireProduct,
}) => {
  if (!product) return null;

  const highlights = product.highlights && product.highlights.length > 0 ? product.highlights : product.features;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#FAF7F2] rounded-2xl max-w-4xl lg:max-w-5xl w-full overflow-hidden shadow-2xl border border-[#E8DFC0] text-left"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/95 text-[#3B2516] hover:bg-white hover:text-black transition-all shadow-md cursor-pointer border border-[#E8DFC0]"
          aria-label="Đóng chi tiết sản phẩm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Horizontal Split Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 max-h-[90vh] overflow-y-auto md:overflow-hidden">
          
          {/* Left Column: Product Visual & Packaging Specs */}
          <div className="md:col-span-5 bg-[#F6F1E7] border-b md:border-b-0 md:border-r border-[#E6DCBF] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Product Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#966838] bg-[#EFE4D2] px-2.5 py-1 rounded-md">
                  Ý Hương Bến Tre
                </span>
                {product.badge && (
                  <span className="text-[11px] font-bold text-[#FDF8EE] bg-[#3B2516] px-2.5 py-1 rounded-md shadow-xs">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Product Image Frame: Full Box Display */}
              <div className="relative aspect-4/3 sm:aspect-square bg-white rounded-xl p-4 sm:p-6 flex items-center justify-center border border-[#EBE1CF] shadow-xs">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain drop-shadow-sm transition-transform duration-300 hover:scale-104"
                />
              </div>

              <div className="mt-3 text-center">
                <span className="inline-block text-xs font-semibold text-[#7A6454] bg-[#EFE8DC] px-3 py-1 rounded-full">
                  Khối lượng tịnh: <strong className="text-[#3B2516]">{product.weight}</strong>
                </span>
              </div>
            </div>

            {/* Packaging & Storage Meta */}
            <div className="mt-6 pt-5 border-t border-[#E6DCBF] space-y-2.5 text-xs text-[#6B5545]">
              {product.packaging && (
                <div className="flex items-start gap-2">
                  <Box className="w-4 h-4 text-[#966838] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#3B2516]">Quy cách:</strong> {product.packaging}
                  </span>
                </div>
              )}

              {product.shelfLife && (
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-[#966838] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#3B2516]">Hạn dùng:</strong> {product.shelfLife}
                  </span>
                </div>
              )}

              {product.storage && (
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#3D6647] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#3B2516]">Bảo quản:</strong> {product.storage}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Detailed Product Profile & Action Area */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between md:max-h-[90vh] md:overflow-y-auto">
            <div className="space-y-5">
              
              {/* Header Info */}
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#966838]">
                  <span>{product.flavor}</span>
                  <span aria-hidden="true">·</span>
                  <span>Đặc Sản Quốc Cường</span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#332219] mt-1.5 leading-snug">
                  {product.name}
                </h2>
              </div>

              {/* Taste Profile Highlight Box */}
              {product.tasteProfile && (
                <div className="p-3.5 bg-[#FAF1E4] rounded-xl border border-[#EADBCE] flex items-start gap-3">
                  <div className="p-1.5 bg-[#F0E1CC] text-[#966838] rounded-lg shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-[#5A4537]">
                      Hương vị đặc trưng:
                    </span>
                    <p className="text-xs sm:text-sm text-[#4E392B] font-medium mt-0.5">
                      {product.tasteProfile}
                    </p>
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#3B2516] mb-1.5">
                  Mô tả sản phẩm:
                </h4>
                <p className="text-sm text-[#5E4839] leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Ingredients & Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#E8DFC0]">
                {/* Ingredients */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#3B2516] mb-2">
                    Thành phần nguyên liệu:
                  </h4>
                  <ul className="space-y-1.5">
                    {product.ingredients.map((ing, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-[#5E4839]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B6833D] shrink-0" />
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Highlights */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#3B2516] mb-2">
                    Đặc điểm nổi bật:
                  </h4>
                  <ul className="space-y-1.5">
                    {highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#4E392B]">
                        <Check className="w-3.5 h-3.5 text-[#3D6647] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-8 pt-5 border-t border-[#E8DFC0] space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="flex-1 py-3 px-4 bg-[#D4A359] hover:bg-[#B6833D] text-[#3B2516] font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Thêm vào danh sách báo giá</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onInquireProduct(product);
                    onClose();
                  }}
                  className="py-3 px-5 bg-[#3B2516] hover:bg-[#25150C] text-[#FDF8EE] font-semibold text-sm rounded-xl transition-colors text-center cursor-pointer"
                >
                  Gửi yêu cầu báo giá
                </button>
              </div>

              {/* Quick Contacts */}
              <div className="flex items-center justify-between text-xs text-[#7A6454] px-1">
                <span>Hotline: <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="font-bold text-[#3B2516] hover:underline tabular-nums">{COMPANY_INFO.phone}</a></span>
                <a
                  href={COMPANY_INFO.zaloUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#0068FF] font-semibold hover:underline flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat Zalo đặt sỉ</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
