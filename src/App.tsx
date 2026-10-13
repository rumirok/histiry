/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

// Pre-generated high-fidelity food imagery
import heroImg from './assets/images/hero_pizza_grill_1791441477169.jpg';
import pizzaImg from './assets/images/pizza_tango_special_1791441496563.jpg';
import grillImg from './assets/images/grill_seekh_malai_boti_1791441510551.jpg';
import burgerImg from './assets/images/zinger_burger_crispy_1791441522516.jpg';
import friesImg from './assets/images/loaded_fries_wings_1791441538954.jpg';

// Menu item interface
interface MenuItem {
  id: string;
  name: string;
  category: 'pizza' | 'grill' | 'burgers' | 'sides' | 'drinks';
  description: string;
  price: number;
  popular?: boolean;
  image: string;
  badge?: string;
}

// Cart item interface
interface CartItem {
  item: MenuItem;
  quantity: number;
}

// Review interface
interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  date: string;
  text: string;
  favoriteItem: string;
}

export default function App() {
  // Mobile drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Active menu tab
  const [activeTab, setActiveTab] = useState<'pizza' | 'grill' | 'burgers' | 'sides' | 'drinks'>('pizza');

  // Shopping cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderType, setOrderType] = useState<'delivery' | 'takeout'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Gallery modal
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);

  // Reviews carousel index
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize AOS scroll animations
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).AOS) {
      (window as any).AOS.init({
        duration: 700,
        once: true,
        offset: 80,
        easing: 'ease-out-cubic'
      });
    }
  }, []);

  // Show toast notification
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Menu items list
  const menuItems: MenuItem[] = [
    // Pizzas
    {
      id: 'p1',
      name: 'Tango Special Pizza',
      category: 'pizza',
      description: 'Our crown jewel: Tikka chicken chunks, smoked sausages, black olives, sweet corn, mushrooms, and molten double mozzarella.',
      price: 1450,
      popular: true,
      image: pizzaImg,
      badge: "Chef's Special"
    },
    {
      id: 'p2',
      name: 'Chicken Tikka Pizza',
      category: 'pizza',
      description: 'Authentic spiced chicken tikka morsels, crisp purple onions, capsicum, and spiced tomato marinara on a golden hand-tossed crust.',
      price: 1350,
      popular: true,
      image: pizzaImg,
      badge: 'Local Favorite'
    },
    {
      id: 'p3',
      name: 'Fajita Sicilian',
      category: 'pizza',
      description: 'Zesty Mexican-spiced fajita chicken, spicy jalapeños, bell peppers, fresh oregano, and rich cheese pull.',
      price: 1390,
      image: pizzaImg
    },
    {
      id: 'p4',
      name: 'Cheesy Supreme',
      category: 'pizza',
      description: 'Loaded with a four-cheese blend of mozzarella, mild cheddar, gouda, and herb cream cheese with garlic butter crust.',
      price: 1250,
      image: pizzaImg
    },

    // Grill
    {
      id: 'g1',
      name: 'Chicken Seekh Kabab (4 Pcs)',
      category: 'grill',
      description: 'Skewered minced chicken infused with mint, crushed coriander, ginger, and green chilies, flame-charred over real coal.',
      price: 620,
      popular: true,
      image: grillImg,
      badge: 'Charcoal Smoked'
    },
    {
      id: 'g2',
      name: 'Malai Boti Skewers',
      category: 'grill',
      description: 'Melt-in-mouth boneless chicken cubes marinated in heavy cream, yogurt, white pepper, and roasted garlic.',
      price: 790,
      popular: true,
      image: grillImg,
      badge: 'Ultra Tender'
    },
    {
      id: 'g3',
      name: 'Tandoori Leg Piece',
      category: 'grill',
      description: 'Full chicken leg marinated 12 hours in traditional Lahori tandoori spices, slow-grilled to smoky perfection.',
      price: 380,
      image: grillImg
    },
    {
      id: 'g4',
      name: 'Tango BBQ Mix Platter',
      category: 'grill',
      description: 'The ultimate feast: 2 Seekh Kababs, 6 Malai Boti cubes, 1 Tandoori Quarter, charred tomatoes, and mint chutney raita.',
      price: 1650,
      image: grillImg,
      badge: 'Family Sharing'
    },

    // Burgers
    {
      id: 'b1',
      name: 'Crispy Zinger Burger',
      category: 'burgers',
      description: 'Golden crunchy double-breaded chicken breast fillet, shredded iceberg lettuce, melted cheese, and signature garlic mayo.',
      price: 520,
      popular: true,
      image: burgerImg,
      badge: 'Bestseller'
    },
    {
      id: 'b2',
      name: 'Double Decker Zinger',
      category: 'burgers',
      description: 'Two massive crispy chicken fillets layered with double cheddar slices, pickled jalapeños, and spicy chipotle sauce.',
      price: 780,
      popular: true,
      image: burgerImg,
      badge: 'Huge Appetite'
    },
    {
      id: 'b3',
      name: 'Beef Smash Burger',
      category: 'burgers',
      description: '100% pure seasoned beef patty seared on high heat, grilled onions, tangy dill relish, and melted American cheese slice.',
      price: 680,
      image: burgerImg
    },
    {
      id: 'b4',
      name: 'Classic Chicken Patty Burger',
      category: 'burgers',
      description: 'Juicy spiced minced chicken patty, fresh cucumber slices, ripe tomatoes, and thick creamy mayo in a toasted sesame bun.',
      price: 360,
      image: burgerImg
    },

    // Sides
    {
      id: 's1',
      name: 'Loaded Cheesy Fries',
      category: 'sides',
      description: 'Crisp French fries drenched in rich cheddar cheese sauce, topped with spicy chicken chunks, jalapeños, and garlic drizzle.',
      price: 590,
      popular: true,
      image: friesImg,
      badge: 'Crowd Pleaser'
    },
    {
      id: 's2',
      name: 'Garlic Mayo Paratha Roll',
      category: 'sides',
      description: 'Golden crispy lachha paratha rolled with tender chicken boti, sliced red onions, and thick savory garlic mayonnaise.',
      price: 340,
      image: friesImg
    },
    {
      id: 's3',
      name: 'Hot Crispy Wings (6 Pcs)',
      category: 'sides',
      description: 'Fiery crispy battered chicken wings served piping hot with tangy chili dipping sauce.',
      price: 450,
      image: friesImg
    },
    {
      id: 's4',
      name: 'Peri Peri Crinkle Fries',
      category: 'sides',
      description: 'Extra crispy crinkle fries dusted with zesty African bird’s eye chili seasoning and served with garlic mayo dip.',
      price: 280,
      image: friesImg
    },

    // Drinks
    {
      id: 'd1',
      name: 'Signature Mint Margarita',
      category: 'drinks',
      description: 'Refreshing blended ice drink with crushed organic mint leaves, lime juice, black salt, and sparkling fizzy soda.',
      price: 260,
      popular: true,
      image: heroImg,
      badge: 'Summer Hit'
    },
    {
      id: 'd2',
      name: 'Fresh Lime Soda',
      category: 'drinks',
      description: 'Chilled bubbly soda with hand-squeezed sour lime, Himalayan rock salt, and ice cubes.',
      price: 180,
      image: heroImg
    },
    {
      id: 'd3',
      name: 'Chilled Soft Drink (500ml)',
      category: 'drinks',
      description: 'Ice-cold Coca-Cola, Sprite, Fanta, or Mountain Dew.',
      price: 120,
      image: heroImg
    },
    {
      id: 'd4',
      name: 'Chilled Soft Drink (1.5L Family)',
      category: 'drinks',
      description: 'Full 1.5 Liter bottle for family dining and takeaway combos.',
      price: 240,
      image: heroImg
    }
  ];

  // Testimonials
  const reviews: Review[] = [
    {
      id: 1,
      name: 'Ahmed',
      location: 'Nowshera Virkan',
      rating: 5,
      date: '2 days ago',
      text: 'Hands down the crispiest Zinger Burger and cheesiest Tikka Pizza in Nowshera Virkan! The delivery was blazing hot within 25 minutes. Family absolutely loved the taste and fresh dough!',
      favoriteItem: 'Tango Special Pizza & Zinger'
    },
    {
      id: 2,
      name: 'Usman Tariq',
      location: 'Karyal Road',
      rating: 5,
      date: '1 week ago',
      text: 'The Malai Boti and Chicken Seekh Kababs have that authentic charcoal smoky aroma you rarely find around here. Ibrahim Heights location is super clean, cozy, and family-friendly.',
      favoriteItem: 'Malai Boti & Seekh Kabab'
    },
    {
      id: 3,
      name: 'Zainab Bibi',
      location: 'Nowshera Virkan City',
      rating: 5,
      date: '2 weeks ago',
      text: 'We ordered the Tango Special Pizza and Loaded Fries for our weekend family gathering. The crust was soft yet crisp, and cheese pull was unreal. 10/10 recommended to everyone!',
      favoriteItem: 'Loaded Cheesy Fries'
    },
    {
      id: 4,
      name: 'Hamza Malik',
      location: 'Near Main Bazar',
      rating: 5,
      date: '3 weeks ago',
      text: 'Best fast-food joint in town! Extremely courteous staff, fast service, and pocket-friendly rates compared to Gujranwala or Lahore brands. Their mint margarita is refreshing!',
      favoriteItem: 'Double Decker Zinger & Margarita'
    }
  ];

  // Gallery items
  const galleryItems = [
    {
      title: 'Wood-Fired Tango Special Pizza',
      subtitle: 'Freshly baked with gooey mozzarella',
      image: pizzaImg,
      tag: 'Pizza'
    },
    {
      title: 'Charcoal Grilled Malai Boti',
      subtitle: 'Smoky, creamy and tender',
      image: grillImg,
      tag: 'Grill'
    },
    {
      title: 'Crispy Double Zinger Burger',
      subtitle: 'Golden crunch with garlic mayo',
      image: burgerImg,
      tag: 'Burgers'
    },
    {
      title: 'Loaded Cheesy Fries & Wings',
      subtitle: 'Smothered in melted cheddar',
      image: friesImg,
      tag: 'Sides'
    },
    {
      title: 'The Sizzling Grill Masterpiece',
      subtitle: 'Charcoal roasted skewers',
      image: heroImg,
      tag: 'Grill'
    },
    {
      title: 'Oven-Hot Cheesy Supreme',
      subtitle: 'Deep pan cheese pull perfection',
      image: pizzaImg,
      tag: 'Pizza'
    }
  ];

  // Add to cart
  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.item.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
    triggerToast(`Added ${item.name} to cart!`);
  };

  // Modify cart quantity
  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.item.id === itemId) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Calculate cart total
  const cartSubtotal = cart.reduce(
    (sum, cur) => sum + cur.item.price * cur.quantity,
    0
  );
  const deliveryFee = orderType === 'delivery' && cartSubtotal > 0 ? 100 : 0;
  const grandTotal = cartSubtotal + deliveryFee;
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Send WhatsApp Order
  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) {
      triggerToast('Please add items to your cart first!');
      return;
    }

    const itemsSummary = cart
      .map(
        (ci) =>
          `• ${ci.quantity}x ${ci.item.name} (PKR ${(ci.item.price * ci.quantity).toLocaleString()})`
      )
      .join('\n');

    const message = `*🍕 Tango Pizza & Grill - Order Request*\n\n` +
      `*Order Type:* ${orderType === 'delivery' ? 'Home Delivery' : 'Takeout / Pickup'}\n` +
      `*Customer Name:* ${customerName || 'Customer'}\n` +
      `*Phone:* ${customerPhone || '0311 1666149'}\n` +
      (orderType === 'delivery' ? `*Delivery Address:* ${customerAddress || 'Nowshera Virkan'}\n` : '') +
      `\n*Order Items:*\n${itemsSummary}\n\n` +
      `*Subtotal:* PKR ${cartSubtotal.toLocaleString()}\n` +
      (deliveryFee > 0 ? `*Delivery Fee:* PKR ${deliveryFee}\n` : '') +
      `*Grand Total:* PKR ${grandTotal.toLocaleString()}\n\n` +
      `Please confirm my order and let me know the preparation time. Thank you!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/923111666149?text=${encoded}`, '_blank');
    setOrderSuccess(true);
  };

  const filteredItems = menuItems.filter((i) => i.category === activeTab);

  return (
    <div className="min-h-screen bg-[#121212] text-[#f3f4f6] font-body selection:bg-[#e63946] selection:text-white relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1e1e1e] border border-[#e63946]/40 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <i className="fa-solid fa-circle-check text-[#e63946] text-lg"></i>
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* 1. STICKY NAVBAR                                         */}
      {/* ======================================================== */}
      <header className="sticky top-0 z-40 w-full glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#e63946] to-[#f4a261] flex items-center justify-center text-white text-xl shadow-lg shadow-[#e63946]/30 group-hover:scale-105 transition-transform duration-200">
              <i className="fa-solid fa-pizza-slice"></i>
            </div>
            <div>
              <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-white block leading-none">
                TANGO <span className="text-[#e63946]">PIZZA</span>
              </span>
              <span className="text-[11px] font-medium tracking-widest text-[#f4a261] uppercase block">
                & Grill · Nowshera Virkan
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="#home" className="hover:text-[#f4a261] transition-colors">
              Home
            </a>
            <a href="#menu" className="hover:text-[#f4a261] transition-colors">
              Menu
            </a>
            <a href="#why-us" className="hover:text-[#f4a261] transition-colors">
              Why Us
            </a>
            <a href="#gallery" className="hover:text-[#f4a261] transition-colors">
              Gallery
            </a>
            <a href="#reviews" className="hover:text-[#f4a261] transition-colors">
              Reviews
            </a>
            <a href="#contact" className="hover:text-[#f4a261] transition-colors">
              Contact
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            
            {/* Cart Trigger */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 rounded-full bg-[#222222] hover:bg-[#2c2c2c] text-white border border-white/10 transition-colors"
              title="View Cart"
              aria-label="View shopping cart"
            >
              <i className="fa-solid fa-bag-shopping text-base text-[#f4a261]"></i>
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#e63946] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Glowing CTA Button */}
            <a
              href="tel:03111666149"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#e63946] hover:bg-[#d62839] text-white text-xs sm:text-sm font-semibold tracking-wide glow-red transition-all duration-300"
            >
              <i className="fa-solid fa-phone text-xs animate-bounce"></i>
              <span>Call: 0311 1666149</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2.5 rounded-xl bg-[#222222] text-gray-200 border border-white/10 hover:text-white"
              aria-label="Open mobile menu"
            >
              <i className="fa-solid fa-bars text-lg"></i>
            </button>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* MOBILE SIDE DRAWER                                      */}
      {/* ======================================================== */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          <div className="relative w-72 max-w-full bg-[#181818] h-full shadow-2xl p-6 flex flex-col justify-between border-l border-white/10 z-10 animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#e63946] flex items-center justify-center text-white text-sm">
                    <i className="fa-solid fa-pizza-slice"></i>
                  </div>
                  <span className="font-heading font-bold text-white text-lg">
                    Tango Pizza
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#262626] text-gray-400 hover:text-white flex items-center justify-center"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-4 text-base font-medium">
                <a
                  href="#home"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-[#f4a261] py-2 flex items-center justify-between"
                >
                  <span>Home</span>
                  <i className="fa-solid fa-chevron-right text-xs text-gray-600"></i>
                </a>
                <a
                  href="#menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-[#f4a261] py-2 flex items-center justify-between"
                >
                  <span>Full Menu</span>
                  <i className="fa-solid fa-chevron-right text-xs text-gray-600"></i>
                </a>
                <a
                  href="#why-us"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-[#f4a261] py-2 flex items-center justify-between"
                >
                  <span>Why Choose Us</span>
                  <i className="fa-solid fa-chevron-right text-xs text-gray-600"></i>
                </a>
                <a
                  href="#gallery"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-[#f4a261] py-2 flex items-center justify-between"
                >
                  <span>Food Gallery</span>
                  <i className="fa-solid fa-chevron-right text-xs text-gray-600"></i>
                </a>
                <a
                  href="#reviews"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-[#f4a261] py-2 flex items-center justify-between"
                >
                  <span>Customer Reviews</span>
                  <i className="fa-solid fa-chevron-right text-xs text-gray-600"></i>
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-[#f4a261] py-2 flex items-center justify-between"
                >
                  <span>Location & Contact</span>
                  <i className="fa-solid fa-chevron-right text-xs text-gray-600"></i>
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3">
              <a
                href="tel:03111666149"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#e63946] text-white font-semibold text-sm shadow-lg shadow-[#e63946]/30"
              >
                <i className="fa-solid fa-phone"></i>
                <span>Call: 0311 1666149</span>
              </a>
              <a
                href="https://wa.me/923111666149"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25d366]/20 border border-[#25d366]/40 text-[#25d366] font-semibold text-sm"
              >
                <i className="fa-brands fa-whatsapp"></i>
                <span>Order on WhatsApp</span>
              </a>
              <p className="text-[11px] text-center text-gray-500">
                Ibrahim Heights, Karyal Road, Nowshera Virkan
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. HERO SECTION                                          */}
      {/* ======================================================== */}
      <section
        id="home"
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImg})`
        }}
      >
        {/* Dark overlay with appetizing warm vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/80 to-[#121212]/50 z-0"></div>
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#121212]/60 to-[#121212] z-0"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          
          {/* Subtle Tagline kicker */}
          <div
            data-aos="fade-down"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs sm:text-sm font-medium text-[#f4a261] mb-6 shadow-sm"
          >
            <i className="fa-solid fa-fire-flame-curved text-[#e63946]"></i>
            <span>Hot & Fresh Pizza, Grilled to Perfection</span>
          </div>

          {/* Main Headline */}
          <h1
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tight text-white leading-[1.1] mb-6"
          >
            Nowshera Virkan's Favorite Spot for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f4a261] via-[#e63946] to-[#f4a261]">
              Pizza & Grill
            </span>
          </h1>

          {/* Sub-headline */}
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-300 font-normal leading-relaxed mb-10"
          >
            Experience the taste of fresh ingredients, smoky charcoal grills, and gooey cheesy delights. Perfect for family dinners, late-night cravings, and quick takeout.
          </p>

          {/* CTA Buttons */}
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
          >
            <a
              href="#menu"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#e63946] hover:bg-[#d62839] text-white font-heading font-bold text-base shadow-xl shadow-[#e63946]/40 glow-red transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-3"
            >
              <i className="fa-solid fa-utensils"></i>
              <span>View Full Menu</span>
            </a>

            <a
              href="tel:03111666149"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#1e1e1e]/90 hover:bg-[#282828] text-white font-heading font-bold text-base border border-white/20 hover:border-[#f4a261]/50 backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-3"
            >
              <i className="fa-solid fa-phone text-[#f4a261]"></i>
              <span>Order on Call: 0311 1666149</span>
            </a>
          </div>

          {/* Floating Trust Badge */}
          <div
            data-aos="zoom-in"
            data-aos-delay="400"
            className="mt-12 inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-[#1e1e1e]/80 border border-white/10 backdrop-blur-md shadow-2xl"
          >
            <div className="flex -space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <i
                  key={star}
                  className="fa-solid fa-star text-[#f4a261] text-sm"
                ></i>
              ))}
            </div>
            <div className="h-4 w-px bg-white/20"></div>
            <div className="text-left">
              <p className="text-xs font-bold text-white leading-tight">
                403+ Happy Customer Reviews
              </p>
              <p className="text-[11px] text-gray-400">
                Top Rated Fast Food in Nowshera Virkan
              </p>
            </div>
          </div>

        </div>

        {/* Bottom subtle gradient fade to next section */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#121212] to-transparent"></div>
      </section>

      {/* ======================================================== */}
      {/* 3. WHY CHOOSE US (USP SECTION)                          */}
      {/* ======================================================== */}
      <section id="why-us" className="py-24 bg-[#141414] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
            <span className="text-xs font-bold tracking-widest text-[#f4a261] uppercase block mb-2">
              Our Taste Promise
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight">
              Why Food Lovers Choose{' '}
              <span className="text-[#e63946]">Tango</span>
            </h2>
            <p className="mt-4 text-base text-gray-400">
              We never compromise on freshness, authentic Pakistani spices, or the joy of a perfect cheese pull.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            
            {/* Card 1: Fire */}
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="p-8 rounded-2xl glass-card hover:border-[#e63946]/40 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#e63946]/20 to-[#e63946]/10 border border-[#e63946]/30 flex items-center justify-center text-[#e63946] text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className="fa-solid fa-fire-flame-curved"></i>
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-3">
                Charcoal Grill Mastery
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Authentic open-coal grilling creates deeply smoky, tender seekh kababs and luscious cream-infused malai boti.
              </p>
            </div>

            {/* Card 2: Fresh Leaf */}
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="p-8 rounded-2xl glass-card hover:border-[#f4a261]/40 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#f4a261]/20 to-[#f4a261]/10 border border-[#f4a261]/30 flex items-center justify-center text-[#f4a261] text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className="fa-solid fa-leaf"></i>
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-3">
                100% Fresh & Halal
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Dough kneaded fresh daily in-house, premium 100% mozzarella cheese, and strictly certified fresh halal chicken.
              </p>
            </div>

            {/* Card 3: Clock Fast Takeout */}
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="p-8 rounded-2xl glass-card hover:border-[#e63946]/40 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#e63946]/20 to-[#e63946]/10 border border-[#e63946]/30 flex items-center justify-center text-[#e63946] text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className="fa-solid fa-clock"></i>
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-3">
                Fast & Hot Delivery
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Speedy preparation and insulated thermal bag deliveries keep your pizza sizzling hot from our oven to your plate.
              </p>
            </div>

            {/* Card 4: Family Dining */}
            <div
              data-aos="fade-up"
              data-aos-delay="400"
              className="p-8 rounded-2xl glass-card hover:border-[#f4a261]/40 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#f4a261]/20 to-[#f4a261]/10 border border-[#f4a261]/30 flex items-center justify-center text-[#f4a261] text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className="fa-solid fa-users"></i>
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-3">
                Family-Friendly Vibe
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Located conveniently at Ibrahim Heights, Karyal Road with pleasant, clean, air-conditioned family dining booths.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. INTERACTIVE MENU SECTION (CRUCIAL)                   */}
      {/* ======================================================== */}
      <section id="menu" className="py-24 bg-[#121212] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12" data-aos="fade-up">
            <span className="text-xs font-bold tracking-widest text-[#e63946] uppercase block mb-2">
              Savor The Flavors
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight">
              Explore Our Delicious Menu
            </h2>
            <p className="mt-4 text-base text-gray-400">
              Handcrafted pizzas, charcoal-grilled skewers, crispy zinger burgers, and icy refreshments made to order.
            </p>
          </div>

          {/* Interactive Category Tabs */}
          <div
            data-aos="fade-up"
            className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-12"
          >
            {[
              { id: 'pizza', label: 'Pizzas', icon: 'fa-pizza-slice' },
              { id: 'grill', label: 'Grill & BBQ', icon: 'fa-fire-flame-curved' },
              { id: 'burgers', label: 'Burgers', icon: 'fa-burger' },
              { id: 'sides', label: 'Sides & Rolls', icon: 'fa-drumstick-bite' },
              { id: 'drinks', label: 'Beverages', icon: 'fa-glass-water' }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-5 py-3 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#e63946] text-white shadow-lg shadow-[#e63946]/30 scale-105'
                      : 'bg-[#1e1e1e] text-gray-300 hover:text-white hover:bg-[#282828] border border-white/5'
                  }`}
                >
                  <i className={`fa-solid ${tab.icon} ${isActive ? 'text-white' : 'text-[#f4a261]'}`}></i>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* 3-Column Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                data-aos="fade-up"
                className="rounded-2xl overflow-hidden bg-[#1a1a1a] border border-white/5 hover:border-[#e63946]/30 transition-all duration-300 flex flex-col group hover:-translate-y-1 shadow-lg"
              >
                {/* Image Container with tag */}
                <div className="relative h-56 w-full overflow-hidden bg-[#242424]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent"></div>
                  
                  {item.badge && (
                    <span className="absolute top-3 left-3 bg-[#e63946] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                      {item.badge}
                    </span>
                  )}

                  {/* Price Tag Overlay */}
                  <span className="absolute bottom-3 right-3 bg-[#121212]/90 border border-white/10 backdrop-blur-md text-[#f4a261] font-heading font-extrabold text-sm px-3.5 py-1.5 rounded-full shadow">
                    PKR {item.price.toLocaleString()}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-heading font-bold text-white mb-2 group-hover:text-[#f4a261] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-6 line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Order Button / Add to Cart */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                    <span className="text-xs text-gray-500 font-medium">
                      Freshly Prepared
                    </span>
                    <button
                      onClick={() => addToCart(item)}
                      className="px-4 py-2.5 rounded-xl bg-[#e63946] hover:bg-[#d62839] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-md hover:shadow-[#e63946]/30 transition-all duration-200 active:scale-95"
                    >
                      <i className="fa-solid fa-plus text-xs"></i>
                      <span>Order Now</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Call Reassurance Banner */}
          <div
            data-aos="fade-up"
            className="mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#1c1c1c] via-[#222222] to-[#1c1c1c] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-full bg-[#f4a261]/20 text-[#f4a261] flex items-center justify-center text-xl shrink-0">
                <i className="fa-solid fa-headset"></i>
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-heading font-bold text-white">
                  Custom order or craving a special pizza topping?
                </h4>
                <p className="text-xs sm:text-sm text-gray-400">
                  Call our live kitchen team directly and customize your crust, spice level, or combo meal.
                </p>
              </div>
            </div>
            <a
              href="tel:03111666149"
              className="px-6 py-3 rounded-full bg-[#e63946] hover:bg-[#d62839] text-white text-sm font-bold flex items-center gap-2 whitespace-nowrap glow-red transition-all"
            >
              <i className="fa-solid fa-phone"></i>
              <span>Call: 0311 1666149</span>
            </a>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. GALLERY SECTION                                       */}
      {/* ======================================================== */}
      <section id="gallery" className="py-24 bg-[#141414] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
            <span className="text-xs font-bold tracking-widest text-[#f4a261] uppercase block mb-2">
              Visual Feast
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight">
              From Our Kitchen to Your Table
            </h2>
            <p className="mt-4 text-base text-gray-400">
              Catch a glimpse of the sizzling charcoal flames, molten mozzarella cheese, and golden fast-food favorites.
            </p>
          </div>

          {/* Masonry / Grid of 6 images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <div
                key={index}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                onClick={() => setActiveGalleryIndex(index)}
                className="relative h-72 rounded-2xl overflow-hidden cursor-pointer group shadow-xl bg-[#222]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#f4a261] mb-1">
                    {item.tag}
                  </span>
                  <h4 className="text-lg font-heading font-bold text-white mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-300">
                    {item.subtitle}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-[#e63946] font-semibold">
                    <span>View full photo</span>
                    <i className="fa-solid fa-arrow-right text-[10px]"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Gallery Lightbox Modal */}
      {activeGalleryIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setActiveGalleryIndex(null)}
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xl transition-colors z-20"
            aria-label="Close image modal"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          <div className="max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <img
              src={galleryItems[activeGalleryIndex].image}
              alt={galleryItems[activeGalleryIndex].title}
              className="max-h-[75vh] w-auto max-w-full rounded-2xl shadow-2xl object-contain border border-white/10"
            />
            <div className="mt-4 text-center">
              <span className="text-xs text-[#f4a261] uppercase tracking-wider font-bold">
                {galleryItems[activeGalleryIndex].tag}
              </span>
              <h3 className="text-xl font-heading font-bold text-white mt-1">
                {galleryItems[activeGalleryIndex].title}
              </h3>
              <p className="text-sm text-gray-400">
                {galleryItems[activeGalleryIndex].subtitle}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 6. TESTIMONIALS SECTION                                  */}
      {/* ======================================================== */}
      <section id="reviews" className="py-24 bg-[#121212] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
            <span className="text-xs font-bold tracking-widest text-[#e63946] uppercase block mb-2">
              Verified Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight">
              What Nowshera Virkan Says
            </h2>
            <p className="mt-4 text-base text-gray-400">
              Honest words from our daily patrons who count on Tango for hot pizza, smoky grills, and memorable dinners.
            </p>
          </div>

          {/* Testimonials Carousel Container */}
          <div className="max-w-4xl mx-auto" data-aos="fade-up">
            <div className="relative glass-card rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl">
              
              {/* Giant quote mark decoration */}
              <div className="absolute top-6 right-8 text-6xl text-white/5 font-serif pointer-events-none">
                “
              </div>

              {/* Active review content */}
              <div className="min-h-[160px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(reviews[currentReviewIndex].rating)].map((_, i) => (
                      <i key={i} className="fa-solid fa-star text-[#f4a261] text-base"></i>
                    ))}
                  </div>

                  <p className="text-lg sm:text-xl text-gray-200 leading-relaxed italic mb-8">
                    "{reviews[currentReviewIndex].text}"
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
                  <div>
                    <h4 className="font-heading font-bold text-white text-lg">
                      {reviews[currentReviewIndex].name}
                    </h4>
                    <p className="text-xs text-[#f4a261] font-medium">
                      {reviews[currentReviewIndex].location} · {reviews[currentReviewIndex].date}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Ordered: <span className="text-gray-300 font-medium">{reviews[currentReviewIndex].favoriteItem}</span>
                    </p>
                  </div>

                  {/* Slider controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        setCurrentReviewIndex((prev) =>
                          prev === 0 ? reviews.length - 1 : prev - 1
                        )
                      }
                      className="w-10 h-10 rounded-full bg-[#262626] hover:bg-[#333] text-white flex items-center justify-center transition-colors border border-white/5"
                      aria-label="Previous review"
                    >
                      <i className="fa-solid fa-chevron-left text-xs"></i>
                    </button>

                    <button
                      onClick={() =>
                        setCurrentReviewIndex((prev) =>
                          prev === reviews.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="w-10 h-10 rounded-full bg-[#262626] hover:bg-[#333] text-white flex items-center justify-center transition-colors border border-white/5"
                      aria-label="Next review"
                    >
                      <i className="fa-solid fa-chevron-right text-xs"></i>
                    </button>
                  </div>
                </div>

              </div>

              {/* Dots indicator */}
              <div className="flex justify-center gap-2 mt-8">
                {reviews.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentReviewIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentReviewIndex === idx
                        ? 'w-8 bg-[#e63946]'
                        : 'w-2 bg-gray-600 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. LOCATION & CONTACT SECTION                            */}
      {/* ======================================================== */}
      <section id="contact" className="py-24 bg-[#141414] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
            <span className="text-xs font-bold tracking-widest text-[#f4a261] uppercase block mb-2">
              Visit or Call
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight">
              Find Us in Nowshera Virkan
            </h2>
            <p className="mt-4 text-base text-gray-400">
              Conveniently located at Ibrahim Heights on Karyal Road. Drop by for dining or call for rapid doorstep delivery.
            </p>
          </div>

          {/* Split into Two Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            
            {/* Left Column: Details */}
            <div
              data-aos="fade-right"
              className="glass-card rounded-3xl p-8 sm:p-10 border border-white/10 flex flex-col justify-between shadow-xl"
            >
              <div>
                <h3 className="text-2xl font-heading font-bold text-white mb-6 flex items-center gap-3">
                  <i className="fa-solid fa-store text-[#e63946]"></i>
                  <span>Restaurant Details</span>
                </h3>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#e63946]/10 border border-[#e63946]/30 text-[#e63946] flex items-center justify-center text-lg shrink-0 mt-0.5">
                      <i className="fa-solid fa-location-dot"></i>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                        Address
                      </h4>
                      <p className="text-base sm:text-lg font-bold text-white mt-1">
                        Ibrahim Heights, Karyal Road, Nowshera Virkan
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        District Gujranwala, Punjab, Pakistan
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#f4a261]/10 border border-[#f4a261]/30 text-[#f4a261] flex items-center justify-center text-lg shrink-0 mt-0.5">
                      <i className="fa-solid fa-phone"></i>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                        Phone & Hotline
                      </h4>
                      <a
                        href="tel:03111666149"
                        className="text-lg sm:text-xl font-heading font-extrabold text-[#e63946] hover:underline block mt-1"
                      >
                        0311 1666149
                      </a>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Instant phone order & home delivery booking
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 text-white flex items-center justify-center text-lg shrink-0 mt-0.5">
                      <i className="fa-solid fa-clock"></i>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                        Opening Hours
                      </h4>
                      <p className="text-base sm:text-lg font-bold text-white mt-1">
                        12:00 PM – 12:00 AM (Midnight)
                      </p>
                      <p className="text-xs text-[#25d366] font-semibold mt-0.5 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#25d366] inline-block animate-ping"></span>
                        Open Every Day (Monday – Sunday)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4 mt-8">
                <a
                  href="tel:03111666149"
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-[#e63946] hover:bg-[#d62839] text-white font-heading font-bold text-sm flex items-center justify-center gap-2 glow-red transition-all"
                >
                  <i className="fa-solid fa-phone"></i>
                  <span>Call 0311 1666149</span>
                </a>
                <a
                  href="https://wa.me/923111666149"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-[#25d366] hover:bg-[#20ba59] text-white font-heading font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#25d366]/20"
                >
                  <i className="fa-brands fa-whatsapp text-base"></i>
                  <span>WhatsApp Chat</span>
                </a>
              </div>

            </div>

            {/* Right Column: Google Maps placeholder + Directions */}
            <div
              data-aos="fade-left"
              className="glass-card rounded-3xl overflow-hidden border border-white/10 flex flex-col shadow-xl"
            >
              <div className="relative w-full h-80 sm:h-96 bg-[#1a1a1a]">
                <iframe
                  title="Tango Pizza & Grill Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13548.887216654898!2d73.97825!3d31.96825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3918ddf088390d45%3A0x6b4ef8005b637be0!2sNowshera%20Virkan%2C%20Gujranwala%2C%20Punjab!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                  className="w-full h-full border-0 filter invert contrast-125 opacity-90"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

                <div className="absolute top-4 left-4 bg-[#121212]/90 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-xs text-white font-medium flex items-center gap-2 shadow-lg">
                  <i className="fa-solid fa-map-pin text-[#e63946]"></i>
                  <span>Ibrahim Heights, Karyal Road</span>
                </div>
              </div>

              <div className="p-6 bg-[#181818] flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h4 className="font-heading font-bold text-white text-base">
                    Need driving directions?
                  </h4>
                  <p className="text-xs text-gray-400">
                    Easily accessible from Main Karyal Road with ample vehicle parking.
                  </p>
                </div>
                <a
                  href="https://maps.google.com/?q=Ibrahim+Heights+Karyal+Road+Nowshera+Virkan"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-white text-gray-900 font-heading font-bold text-xs hover:bg-gray-200 transition-colors flex items-center gap-2 shadow"
                >
                  <i className="fa-solid fa-diamond-turn-right text-[#e63946]"></i>
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. FOOTER                                                */}
      {/* ======================================================== */}
      <footer className="bg-[#0c0c0c] border-t border-white/10 pt-16 pb-12 text-gray-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            
            {/* Col 1: Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e63946] to-[#f4a261] flex items-center justify-center text-white text-lg">
                  <i className="fa-solid fa-pizza-slice"></i>
                </div>
                <span className="font-heading font-extrabold text-xl text-white">
                  Tango Pizza & Grill
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                Nowshera Virkan's favorite spot for hot, fresh, cheesy pizzas, authentic charcoal BBQ skewers, crispy zinger burgers, and delicious takeout.
              </p>
              {/* Social links */}
              <div className="flex items-center gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-[#1c1c1c] hover:bg-[#e63946] hover:text-white flex items-center justify-center transition-colors text-gray-300"
                >
                  <i className="fa-brands fa-facebook-f text-xs"></i>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-[#1c1c1c] hover:bg-[#e63946] hover:text-white flex items-center justify-center transition-colors text-gray-300"
                >
                  <i className="fa-brands fa-instagram text-xs"></i>
                </a>
                <a
                  href="https://wa.me/923111666149"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="w-9 h-9 rounded-full bg-[#1c1c1c] hover:bg-[#25d366] hover:text-white flex items-center justify-center transition-colors text-gray-300"
                >
                  <i className="fa-brands fa-whatsapp text-xs"></i>
                </a>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 className="font-heading font-bold text-white text-base mb-4">
                Quick Navigation
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <a href="#home" className="hover:text-[#f4a261] transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#menu" className="hover:text-[#f4a261] transition-colors">
                    Our Menu & Pricing
                  </a>
                </li>
                <li>
                  <a href="#why-us" className="hover:text-[#f4a261] transition-colors">
                    Why Choose Us
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="hover:text-[#f4a261] transition-colors">
                    Food & Dining Gallery
                  </a>
                </li>
                <li>
                  <a href="#reviews" className="hover:text-[#f4a261] transition-colors">
                    Customer Reviews
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-[#f4a261] transition-colors">
                    Store Location & Directions
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Menu Categories */}
            <div>
              <h4 className="font-heading font-bold text-white text-base mb-4">
                Popular Categories
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <button onClick={() => { setActiveTab('pizza'); window.location.href='#menu'; }} className="hover:text-[#f4a261] text-left transition-colors">
                    Tango Special & Tikka Pizzas
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveTab('grill'); window.location.href='#menu'; }} className="hover:text-[#f4a261] text-left transition-colors">
                    Chicken Seekh Kabab & Malai Boti
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveTab('burgers'); window.location.href='#menu'; }} className="hover:text-[#f4a261] text-left transition-colors">
                    Crispy Fried Zinger Burgers
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveTab('sides'); window.location.href='#menu'; }} className="hover:text-[#f4a261] text-left transition-colors">
                    Loaded Cheesy Fries & Hot Wings
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveTab('drinks'); window.location.href='#menu'; }} className="hover:text-[#f4a261] text-left transition-colors">
                    Mint Margarita & Chilled Soft Drinks
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Timings & Hotline */}
            <div>
              <h4 className="font-heading font-bold text-white text-base mb-4">
                Store Hours & Hotline
              </h4>
              <div className="space-y-3 text-xs">
                <p>
                  <span className="text-gray-500 block">Dine-in & Takeaway:</span>
                  <span className="text-white font-medium">12:00 PM – 12:00 AM (Midnight)</span>
                </p>
                <p>
                  <span className="text-gray-500 block">Delivery Coverage:</span>
                  <span className="text-white font-medium">Nowshera Virkan & Surrounding Areas</span>
                </p>
                <p className="pt-2">
                  <span className="text-gray-500 block">Direct Hotline:</span>
                  <a href="tel:03111666149" className="text-[#e63946] font-bold text-sm hover:underline">
                    0311 1666149
                  </a>
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
            <p>
              © {new Date().getFullYear()} Tango Pizza & Grill. All rights reserved.
            </p>
            <p className="flex items-center gap-1">
              <span>Hot & Fresh Pizza, Grilled to Perfection</span>
              <span className="text-[#e63946]">❤</span>
              <span>Nowshera Virkan</span>
            </p>
          </div>

        </div>
      </footer>

      {/* ======================================================== */}
      {/* SLIDE-OVER SHOPPING CART & ORDER DRAWER                  */}
      {/* ======================================================== */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setCartOpen(false)}
          ></div>

          <div className="relative w-full max-w-md bg-[#181818] h-full shadow-2xl flex flex-col justify-between border-l border-white/10 z-10 animate-in slide-in-from-right duration-300">
            
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#1f1f1f]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#e63946]/20 text-[#e63946] flex items-center justify-center">
                  <i className="fa-solid fa-bag-shopping"></i>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white text-lg">
                    Your Order
                  </h3>
                  <p className="text-xs text-gray-400">
                    {cart.length} item{cart.length !== 1 ? 's' : ''} in cart
                  </p>
                </div>
              </div>

              <button
                onClick={() => setCartOpen(false)}
                className="w-9 h-9 rounded-full bg-[#2a2a2a] text-gray-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* Cart Items List */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              {cart.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#262626] text-gray-500 flex items-center justify-center text-2xl mx-auto mb-4">
                    <i className="fa-solid fa-pizza-slice"></i>
                  </div>
                  <h4 className="font-heading font-bold text-white text-base">
                    Your cart is empty
                  </h4>
                  <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
                    Browse our delicious menu and add hot pizzas, smoky kababs, or crispy zinger burgers.
                  </p>
                  <button
                    onClick={() => {
                      setCartOpen(false);
                      window.location.href = '#menu';
                    }}
                    className="mt-6 px-5 py-2.5 rounded-full bg-[#e63946] text-white text-xs font-semibold"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <>
                  {cart.map((ci) => (
                    <div
                      key={ci.item.id}
                      className="p-3.5 rounded-xl bg-[#222222] border border-white/5 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={ci.item.image}
                          alt={ci.item.name}
                          className="w-14 h-14 rounded-lg object-cover bg-black"
                        />
                        <div>
                          <h4 className="text-sm font-semibold text-white">
                            {ci.item.name}
                          </h4>
                          <span className="text-xs text-[#f4a261] font-bold">
                            PKR {(ci.item.price * ci.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 bg-[#181818] px-2 py-1 rounded-lg border border-white/5">
                        <button
                          onClick={() => updateQuantity(ci.item.id, -1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:text-white text-xs"
                          title="Decrease"
                        >
                          <i className="fa-solid fa-minus"></i>
                        </button>
                        <span className="text-xs font-bold text-white min-w-[16px] text-center">
                          {ci.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(ci.item.id, 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:text-white text-xs"
                          title="Increase"
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Order Options */}
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <label className="text-xs font-semibold text-gray-300 block">
                      Order Method
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setOrderType('delivery')}
                        className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border ${
                          orderType === 'delivery'
                            ? 'bg-[#e63946] text-white border-[#e63946]'
                            : 'bg-[#222] text-gray-400 border-white/10 hover:text-white'
                        }`}
                      >
                        <i className="fa-solid fa-motorcycle"></i>
                        <span>Home Delivery</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderType('takeout')}
                        className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border ${
                          orderType === 'takeout'
                            ? 'bg-[#e63946] text-white border-[#e63946]'
                            : 'bg-[#222] text-gray-400 border-white/10 hover:text-white'
                        }`}
                      >
                        <i className="fa-solid fa-person-walking-luggage"></i>
                        <span>Pickup / Takeout</span>
                      </button>
                    </div>

                    {/* Customer Info Form */}
                    <div className="space-y-2 pt-2">
                      <input
                        type="text"
                        placeholder="Your Name (e.g. Ahmed)"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-[#222] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#e63946]"
                      />
                      <input
                        type="tel"
                        placeholder="Your Phone Number (e.g. 0300...)"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full bg-[#222] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#e63946]"
                      />
                      {orderType === 'delivery' && (
                        <input
                          type="text"
                          placeholder="Delivery Address / Landmark in Nowshera Virkan"
                          value={customerAddress}
                          onChange={(e) => setCustomerAddress(e.target.value)}
                          className="w-full bg-[#222] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#e63946]"
                        />
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="p-6 bg-[#1f1f1f] border-t border-white/10 space-y-3">
                <div className="space-y-1.5 text-xs text-gray-400">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="text-white font-medium">PKR {cartSubtotal.toLocaleString()}</span>
                  </div>
                  {orderType === 'delivery' && (
                    <div className="flex justify-between">
                      <span>Delivery Fee:</span>
                      <span className="text-white font-medium">PKR {deliveryFee}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                    <span>Total Amount:</span>
                    <span className="text-[#f4a261]">PKR {grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={handleWhatsAppCheckout}
                    className="w-full py-3 rounded-xl bg-[#25d366] hover:bg-[#20ba59] text-white font-heading font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#25d366]/20 transition-all"
                  >
                    <i className="fa-brands fa-whatsapp text-base"></i>
                    <span>Send Order via WhatsApp</span>
                  </button>

                  <a
                    href="tel:03111666149"
                    className="w-full py-3 rounded-xl bg-[#e63946] hover:bg-[#d62839] text-white font-heading font-bold text-xs sm:text-sm flex items-center justify-center gap-2 glow-red transition-all"
                  >
                    <i className="fa-solid fa-phone"></i>
                    <span>Call to Confirm: 0311 1666149</span>
                  </a>
                </div>

                {orderSuccess && (
                  <p className="text-[11px] text-center text-[#25d366] font-medium animate-pulse">
                    Order initiated! Please send the message on WhatsApp to confirm with the kitchen.
                  </p>
                )}
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
