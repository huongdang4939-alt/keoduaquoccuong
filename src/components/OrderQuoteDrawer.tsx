import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Send, Phone, CheckCircle, MessageSquare } from 'lucide-react';
import { OrderItem } from '../types';
import { COMPANY_INFO } from '../data/products';

interface OrderQuoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onProceedToForm: (notes: string) => void;
}

export const OrderQuoteDrawer: React.FC<OrderQuoteDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToForm,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerType, setCustomerType] = useState<'wholesale' | 'retail'>('wholesale');
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  if (!isOpen) return null;

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerPhone) {
      alert('Vui lòng nhập số điện thoại để chúng tôi liên hệ báo giá');
      return;
    }
    setOrderSubmitted(true);
  };

  const handleFillContact = () => {
    const summary = items
      .map((item) => `- ${item.product.name} (${item.product.weight}): ${item.quantity} gói`)
      .join('\n');
    onProceedToForm(`Danh sách sản phẩm yêu cầu báo giá (${totalQuantity} gói):\n${summary}\nXin vui lòng gửi bảng giá sỉ & lẻ tốt nhất.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="relative w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between overflow-y-auto text-left border-l border-[#E8DFC0]">
        
        {/* Header */}
        <div className="p-5 border-b border-[#E8DFC0] flex items-center justify-between bg-white sticky top-0 z-10">
          <div>
            <h2 className="font-display text-lg font-bold text-[#3B2516]">
              Danh Sách Yêu Cầu Báo Giá
            </h2>
            <p className="text-xs text-[#7A6454]">
              {items.length === 0 ? 'Chưa có sản phẩm nào' : `${totalQuantity} sản phẩm đã chọn`}
            </p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 rounded-lg text-[#5A4537] hover:bg-[#F2ECE1] transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 overflow-y-auto">
          {orderSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 bg-[#EBF3ED] text-[#2D5A3A] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#3B2516]">Đã Gửi Yêu Cầu Thành Công!</h3>
              <p className="text-sm text-[#5E4839] max-w-xs mx-auto">
                Cơ sở Kẹo Dừa Quốc Cường sẽ gọi điện lại cho quý khách theo số điện thoại{' '}
                <strong className="text-[#3B2516]">{customerPhone}</strong> trong vòng 15-30 phút.
              </p>
              <div className="pt-4 flex flex-col gap-2">
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="w-full py-3 bg-[#3B2516] text-[#FDF8EE] font-semibold text-sm rounded-xl text-center"
                >
                  Gọi trực tiếp ngay: {COMPANY_INFO.phone}
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setOrderSubmitted(false);
                    onClearCart();
                    onClose();
                  }}
                  className="w-full py-2.5 bg-white border border-[#E8DFC0] text-[#5A4537] text-xs font-semibold rounded-xl"
                >
                  Đóng cửa sổ
                </button>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center text-[#7A6454] space-y-3">
              <p className="text-sm">Bạn chưa chọn sản phẩm nào để yêu cầu báo giá.</p>
              <p className="text-xs text-[#9E8B7C]">
                Hãy nhấn nút "Báo giá" tại từng sản phẩm trong mục Sản Phẩm.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 px-4 py-2 bg-[#3B2516] text-white text-xs font-semibold rounded-xl cursor-pointer"
              >
                Khám phá sản phẩm
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="p-3.5 bg-white rounded-xl border border-[#EBE3D5] flex gap-3 items-center justify-between"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover bg-[#FAF7F2] shrink-0 border border-[#EFE8DC]"
                  />
                  <div className="flex-1 min-w-0 pr-2">
                    <h4 className="text-xs sm:text-sm font-semibold text-[#3B2516] truncate">
                      {product.name}
                    </h4>
                    <div className="text-[11px] text-[#7A6454]">
                      {product.weight} · {product.flavor}
                    </div>
                    <div className="text-xs font-medium text-[#966838] mt-1">
                      Số lượng yêu cầu: <span className="font-bold tabular-nums text-[#3B2516]">{quantity}</span> gói
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(product.id, Math.max(1, quantity - 1))}
                      className="w-6 h-6 rounded bg-[#F2ECE1] hover:bg-[#E8DFC0] flex items-center justify-center text-[#3B2516] cursor-pointer"
                      title="Giảm"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-[#3B2516] tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                      className="w-6 h-6 rounded bg-[#F2ECE1] hover:bg-[#E8DFC0] flex items-center justify-center text-[#3B2516] cursor-pointer"
                      title="Tăng"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(product.id)}
                      className="ml-2 text-[#A89482] hover:text-[#93342E] transition-colors cursor-pointer"
                      title="Xóa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Summary */}
              <div className="pt-3 border-t border-[#E8DFC0] space-y-1.5 text-xs text-[#5E4839]">
                <div className="flex justify-between text-sm font-bold text-[#3B2516]">
                  <span>Tổng số lượng kẹo yêu cầu:</span>
                  <span className="text-[#966838] tabular-nums">{totalQuantity} gói</span>
                </div>
                <p className="text-[11px] text-[#8C7665]">
                  * Bảng báo giá sỉ & lẻ chính xác kèm mức chiết khấu theo số lượng sẽ được cơ sở Quốc Cường gửi trực tiếp qua số điện thoại/Zalo.
                </p>
              </div>

              {/* Quick Contact Form */}
              <form onSubmit={handleQuickSubmit} className="pt-3 border-t border-[#E8DFC0] space-y-3">
                <input
                  type="text"
                  placeholder="Họ và tên của bạn"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E0D5C3] rounded-xl text-xs text-[#3B2516] placeholder:text-[#A39080]"
                />

                <input
                  type="tel"
                  required
                  placeholder="Số điện thoại nhận báo giá *"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E0D5C3] rounded-xl text-xs text-[#3B2516] placeholder:text-[#A39080]"
                />

                <button
                  type="submit"
                  className="w-full py-3 bg-[#D4A359] hover:bg-[#B6833D] text-[#3B2516] font-semibold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Gửi yêu cầu báo giá ngay</span>
                </button>

                <button
                  type="button"
                  onClick={handleFillContact}
                  className="w-full py-2 bg-transparent text-[#7C6656] hover:text-[#3B2516] text-xs font-medium text-center cursor-pointer"
                >
                  Chuyển danh sách sang mẫu liên hệ chi tiết →
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Footer info in drawer */}
        <div className="p-4 bg-[#F2EDE4] border-t border-[#E8DFC0] text-center text-xs text-[#7A6454]">
          <span>Hotline hỗ trợ nhanh: </span>
          <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="font-bold text-[#3B2516]">
            {COMPANY_INFO.phone}
          </a>
        </div>

      </div>
    </div>
  );
};
