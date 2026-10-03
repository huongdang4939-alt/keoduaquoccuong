import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Products } from './components/Products';
import { OrderQuoteDrawer } from './components/OrderQuoteDrawer';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingMobileBar } from './components/FloatingMobileBar';
import { Product, OrderItem } from './types';

export default function App() {
  const [cartItems, setCartItems] = useState<OrderItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [prefilledMessage, setPrefilledMessage] = useState('');
  const [activeSection, setActiveSection] = useState('trang-chu');

  // Track active section for nav highlight
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['trang-chu', 'gioi-thieu', 'san-pham', 'lien-he'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleInquireProduct = (product: Product) => {
    setPrefilledMessage(
      `Chào Kẹo Dừa Quốc Cường, tôi quan tâm đến sản phẩm "${product.name} (${product.weight})". Vui lòng tư vấn giá sỉ / số lượng lớn và chính sách giao hàng.`
    );
    const contactSection = document.getElementById('lien-he');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProceedToForm = (notes: string) => {
    setPrefilledMessage(notes);
    const contactSection = document.getElementById('lien-he');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] font-body text-[#3B2516]">
      {/* Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsDrawerOpen(true)}
        activeSection={activeSection}
      />

      <main className="flex-1">
        {/* Trang Chủ / Hero */}
        <Hero
          onExploreProducts={() => {
            const el = document.getElementById('san-pham');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onContactClick={() => {
            const el = document.getElementById('lien-he');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Giới Thiệu / About */}
        <About />

        {/* Sản Phẩm / Products */}
        <Products
          onAddToCart={handleAddToCart}
          onInquireProduct={handleInquireProduct}
        />

        {/* Liên Hệ / Contact */}
        <Contact prefilledMessage={prefilledMessage} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Hotline / Mobile Quick Bar */}
      <FloatingMobileBar
        onOpenCart={() => setIsDrawerOpen(true)}
        cartCount={totalCartCount}
      />

      {/* Slide-over Quote / Order Drawer */}
      <OrderQuoteDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToForm={handleProceedToForm}
      />
    </div>
  );
}
