import React from 'react';
import { ShoppingCart, ChevronRight } from 'lucide-react';

const NavButton = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base transition-colors ${
      active ? 'bg-stone-900 text-white' : 'hover:bg-stone-100 text-stone-700'
    }`}
  >
    {children}
  </button>
);

export default function Navbar({ current, setPage, cartCount, openCart }) {
  const items = [
    'Home',
    'Shop',
    'Canvas Paintings',
    'Abstract Art',
    'Wall Mural',
    'Crockery Art',
    'Custom Art',
    'About',
    'Gallery',
    'Contact',
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-200/70 border border-amber-300 flex items-center justify-center shadow-sm">
              <span className="text-stone-800 font-semibold">A</span>
            </div>
            <div className="font-semibold tracking-wide text-stone-900">ARTO</div>
          </div>

          <nav className="hidden lg:flex items-center gap-2">
            {items.map((label) => (
              <NavButton
                key={label}
                active={current === label}
                onClick={() => setPage(label)}
              >
                {label}
              </NavButton>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={openCart}
              className="relative p-2 rounded-full hover:bg-stone-100 transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-6 h-6 text-stone-800" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs px-1.5 py-0.5 rounded-full shadow">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setPage('Shop')}
              className="hidden sm:inline-flex items-center gap-2 bg-stone-900 text-white px-4 py-2 rounded-full shadow-sm hover:shadow md:transition-all"
            >
              Shop Art <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="lg:hidden py-3 flex flex-wrap gap-2">
          {items.map((label) => (
            <NavButton
              key={label}
              active={current === label}
              onClick={() => setPage(label)}
            >
              {label}
            </NavButton>
          ))}
        </div>
      </div>
    </header>
  );
}
