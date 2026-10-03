import React, { useState, useMemo } from 'react';
import { Search, Eye, ShoppingBag, Check, Sparkles, Filter } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductModal } from './ProductModal';

interface ProductsProps {
  onAddToCart: (product: Product) => void;
  onInquireProduct: (product: Product) => void;
}

export const Products: React.FC<ProductsProps> = ({ onAddToCart, onInquireProduct }) => {
  const [selectedWeight, setSelectedWeight] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Tất cả sản phẩm', count: PRODUCTS.length },
    { id: '400g', label: 'Quy cách 400g', count: PRODUCTS.filter((p) => p.weightCategory === '400g').length },
    { id: '300g', label: 'Quy cách 300g', count: PRODUCTS.filter((p) => p.weightCategory === '300g').length },
    { id: '500g', label: 'Quy cách 500g', count: PRODUCTS.filter((p) => p.weightCategory === '500g' && !p.isSpecialty).length },
    { id: 'sap', label: 'Kẹo Dừa Sáp Đặc Sản', count: PRODUCTS.filter((p) => p.isSpecialty).length },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category match
      let matchesCat = true;
      if (selectedWeight === '400g') matchesCat = p.weightCategory === '400g';
      else if (selectedWeight === '300g') matchesCat = p.weightCategory === '300g';
      else if (selectedWeight === '500g') matchesCat = p.weightCategory === '500g' && !p.isSpecialty;
      else if (selectedWeight === 'sap') matchesCat = !!p.isSpecialty;

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.flavor.toLowerCase().includes(query) ||
        p.weight.toLowerCase().includes(query);

      return matchesCat && matchesSearch;
    });
  }, [selectedWeight, searchQuery]);

  const handleQuickAdd = (product: Product) => {
    onAddToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1500);
  };

  return (
    <section id="san-pham" className="py-16 lg:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 text-left">
          <div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#966838]">
              <span>Danh Mục Sản Phẩm</span>
              <span aria-hidden="true" className="text-[#D4A359]">·</span>
              <span>{PRODUCTS.length} Quy Cách & Hương Vị</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#332219] mt-2">
              Kẹo Dừa Ý Hương & Dừa Sáp Quốc Cường
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#685141] max-w-2xl">
              Tất cả sản phẩm đều được sản xuất theo quy trình khép kín, đóng gói tinh tế và giữ trọn vị thơm béo 
              tự nhiên của dừa tươi miền sông nước.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-[#8C7665] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo vị, khối lượng..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E0D5C3] rounded-xl text-sm text-[#3B2516] placeholder:text-[#A39080] focus:outline-hidden focus:border-[#B6833D] focus:ring-1 focus:ring-[#B6833D] transition-colors"
            />
          </div>
        </div>

        {/* Filter Tabs - Interactive Button Control */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedWeight === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedWeight(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#3B2516] text-[#FDF8EE] shadow-xs'
                    : 'bg-white text-[#5C4637] border border-[#E5DBCA] hover:bg-[#F2ECE1] hover:text-[#3B2516]'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[11px] px-1.5 py-0.2 rounded-full tabular-nums ${
                  isActive ? 'bg-[#5A3F2E] text-[#EED8B3]' : 'bg-[#EFE8DC] text-[#7A6454]'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white/70 rounded-2xl border border-[#EAE1D2] p-8">
            <Filter className="w-8 h-8 text-[#A89482] mx-auto mb-3" />
            <p className="text-base font-semibold text-[#3B2516]">Không tìm thấy sản phẩm phù hợp</p>
            <p className="text-xs text-[#7A6656] mt-1">Vui lòng thử tìm từ khóa khác hoặc chọn tất cả sản phẩm.</p>
            <button
              onClick={() => {
                setSelectedWeight('all');
                setSearchQuery('');
              }}
              type="button"
              className="mt-4 px-4 py-2 bg-[#3B2516] text-white text-xs font-medium rounded-lg cursor-pointer"
            >
              Xem tất cả sản phẩm
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const isJustAdded = addedProductId === product.id;
              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#E7DDCE] shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left"
                >
                  {/* Image container: shows full candy box without cropping */}
                  <div className="relative aspect-4/3 overflow-hidden bg-[#FBF9F5] p-3 sm:p-4 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain drop-shadow-xs group-hover:scale-105 transition-transform duration-300 ease-out"
                    />

                    {/* Gradient scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                    {/* Top Tag */}
                    {product.badge && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#3B2516]/90 backdrop-blur-xs text-[#EED8B3] text-[11px] font-semibold rounded-md shadow-xs">
                        {product.badge}
                      </div>
                    )}

                    {/* Quick view button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => setActiveProduct(product)}
                        className="px-4 py-2 bg-white/95 text-[#3B2516] text-xs font-semibold rounded-lg shadow-md hover:bg-white transition-all transform translate-y-2 group-hover:translate-y-0 flex items-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#B6833D]" />
                        <span>Xem nhanh</span>
                      </button>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Clean unboxed metadata */}
                      <div className="flex items-center gap-2 text-xs text-[#7A6454] font-medium">
                        <span>{product.flavor}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-semibold text-[#966838] tabular-nums">KLT: {product.weight}</span>
                      </div>

                      <h3 className="font-display text-lg font-bold text-[#3B2516] mt-1.5 line-clamp-1 group-hover:text-[#B6833D] transition-colors">
                        {product.name}
                      </h3>

                      <p className="mt-2 text-xs sm:text-sm text-[#665040] line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-[#EFE8DC] flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-[#966838]">
                          Giá sỉ & lẻ tận xưởng
                        </div>
                        <div className="text-[11px] text-[#8C7665]">Liên hệ nhận báo giá tốt nhất</div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveProduct(product)}
                          className="p-2 rounded-lg text-[#5A4537] hover:bg-[#F2ECE1] transition-colors cursor-pointer"
                          title="Xem chi tiết"
                          aria-label={`Xem chi tiết ${product.name}`}
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleQuickAdd(product)}
                          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                            isJustAdded
                              ? 'bg-[#3D6647] text-white'
                              : 'bg-[#D4A359] hover:bg-[#B6833D] text-[#3B2516]'
                          }`}
                          title="Thêm vào danh sách báo giá"
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Đã thêm</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Báo giá</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal for product details */}
        <ProductModal
          product={activeProduct}
          onClose={() => setActiveProduct(null)}
          onAddToCart={onAddToCart}
          onInquireProduct={onInquireProduct}
        />

      </div>
    </section>
  );
};
