import React, { useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';

function formatINR(n) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

const demoProducts = [
  {
    id: 'canvas-1',
    title: 'Earthbound Serenity',
    price: 18999,
    category: 'Canvas Paintings',
    image: 'https://images.unsplash.com/photo-1652932445028-3d46b633c28e?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxFYXJ0aGJvdW5kJTIwU2VyZW5pdHl8ZW58MHwwfHx8MTc2MjQ0OTc4MHww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    surface: 'easel',
    color: 'Earthy',
    size: 'Large',
    theme: 'Nature'
  },
  {
    id: 'abstract-1',
    title: 'Amber Drift',
    price: 14999,
    category: 'Abstract Art',
    image: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop',
    surface: 'framed',
    color: 'Amber',
    size: 'Medium',
    theme: 'Minimal'
  },
  {
    id: 'mural-1',
    title: 'Terracotta Wall Mural',
    price: 44999,
    category: 'Wall Mural',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
    surface: 'wall',
    color: 'Terracotta',
    size: 'XL',
    theme: 'Botanical'
  },
  {
    id: 'crockery-1',
    title: 'Lotus Crockery Set',
    price: 7999,
    category: 'Crockery Art',
    image: 'https://images.unsplash.com/photo-1519003300449-424ad0405076?q=80&w=1200&auto=format&fit=crop',
    surface: 'table',
    color: 'Ivory',
    size: 'Small',
    theme: 'Floral'
  }
];

function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl sm:text-3xl font-semibold text-stone-900">{title}</h2>
      {subtitle && <p className="text-stone-600 mt-1">{subtitle}</p>}
    </div>
  );
}

function Filters({ value, onChange }) {
  const { category, color, size, theme } = value;
  const set = (k, v) => onChange({ ...value, [k]: v });
  const Chip = ({ selected, children, onClick }) => (
    <button onClick={onClick} className={`px-3 py-1.5 rounded-full border text-sm transition ${selected ? 'bg-stone-900 text-white border-stone-900' : 'border-stone-300 text-stone-700 hover:bg-stone-50'}`}>{children}</button>
  );
  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-4 flex flex-wrap gap-3">
      <div className="flex items-center gap-2">
        <span className="text-stone-500 text-sm">Category</span>
        {['All','Canvas Paintings','Abstract Art','Wall Mural','Crockery Art'].map(c => (
          <Chip key={c} selected={(category||'All')===c} onClick={() => set('category', c==='All'?undefined:c)}>{c}</Chip>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-stone-500 text-sm">Color</span>
        {['Earthy','Amber','Terracotta','Ivory'].map(c => (
          <Chip key={c} selected={color===c} onClick={() => set('color', color===c?undefined:c)}>{c}</Chip>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-stone-500 text-sm">Size</span>
        {['Small','Medium','Large','XL'].map(s => (
          <Chip key={s} selected={size===s} onClick={() => set('size', size===s?undefined:s)}>{s}</Chip>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-stone-500 text-sm">Theme</span>
        {['Nature','Minimal','Botanical','Floral'].map(t => (
          <Chip key={t} selected={theme===t} onClick={() => set('theme', theme===t?undefined:t)}>{t}</Chip>
        ))}
      </div>
    </div>
  );
}

function CartDrawer({ open, onClose, items, onQty, onRemove }) {
  const total = items.reduce((s, it) => s + it.price * it.qty, 0);
  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-stone-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-stone-900">Your Cart</h3>
            <button onClick={onClose} className="px-3 py-1.5 rounded-full border border-stone-300 text-stone-700">Close</button>
          </div>
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {items.length === 0 && <p className="text-stone-600">Your cart is empty.</p>}
            {items.map(item => (
              <div key={item.id} className="flex gap-3 border border-stone-200 rounded-xl p-3">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium text-stone-900">{item.title}</div>
                      <div className="text-sm text-stone-600">{item.category}</div>
                    </div>
                    <button onClick={() => onRemove(item.id)} className="text-sm text-stone-500 hover:text-stone-800">Remove</button>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button onClick={() => onQty(item.id, Math.max(1, item.qty - 1))} className="px-2 py-1 rounded-full border">-</button>
                      <span className="w-6 text-center">{item.qty}</span>
                      <button onClick={() => onQty(item.id, item.qty + 1)} className="px-2 py-1 rounded-full border">+</button>
                    </div>
                    <div className="font-semibold">{formatINR(item.price * item.qty)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-stone-200 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-stone-600">Subtotal</span>
              <span className="font-semibold text-stone-900">{formatINR(total)}</span>
            </div>
            <details className="bg-stone-50 rounded-xl p-3">
              <summary className="cursor-pointer text-stone-800 font-medium">Checkout</summary>
              <form className="mt-3 space-y-3">
                <input placeholder="Full name" className="w-full border border-stone-300 rounded-lg px-3 py-2" />
                <input placeholder="Email" className="w-full border border-stone-300 rounded-lg px-3 py-2" />
                <input placeholder="Address" className="w-full border border-stone-300 rounded-lg px-3 py-2" />
                <button type="button" className="w-full bg-stone-900 text-white rounded-lg px-4 py-2">Place Order</button>
              </form>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductDetails({ product, onBack, onAdd }) {
  if (!product) return null;
  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={onBack} className="mb-6 text-stone-700 hover:text-stone-900">← Back to Shop</button>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="rounded-2xl overflow-hidden shadow-sm">
            <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-stone-900">{product.title}</h1>
            <p className="mt-2 text-stone-700">High-texture original {product.category.toLowerCase()} created with archival pigments and mindful, earthy palettes.</p>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-2xl font-semibold text-stone-900">{formatINR(product.price)}</span>
              <span className="text-stone-500">Incl. taxes</span>
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex gap-2">
                {['Earthy','Amber','Terracotta','Ivory'].map(c => (
                  <span key={c} className="px-3 py-1.5 rounded-full bg-stone-100 text-stone-700 text-sm">{c}</span>
                ))}
              </div>
              <button onClick={() => onAdd(product)} className="bg-stone-900 text-white px-5 py-3 rounded-full shadow-sm hover:shadow-md transition">Add to cart</button>
            </div>
            <div className="mt-8 border-t border-stone-200 pt-6">
              <h4 className="font-medium text-stone-900">Details</h4>
              <ul className="mt-2 text-stone-700 list-disc list-inside space-y-1">
                <li>Textured strokes with palette knives for tactile depth</li>
                <li>Premium cotton canvas / fine art paper with museum-grade varnish</li>
                <li>Signed by the artist • Certificate of Authenticity included</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [page, setPage] = useState('Home');
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filters, setFilters] = useState({});

  const filtered = useMemo(() => {
    return demoProducts.filter(p => (
      (!filters.category || p.category === filters.category) &&
      (!filters.color || p.color === filters.color) &&
      (!filters.size || p.size === filters.size) &&
      (!filters.theme || p.theme === filters.theme)
    ));
  }, [filters]);

  const addToCart = (product) => {
    setCart((c) => {
      const ex = c.find(i => i.id === product.id);
      if (ex) return c.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...c, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const openProduct = (p) => {
    setSelected(p);
    setPage('Product Details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const Pages = {
    Home: (
      <>
        <Hero onShop={() => setPage('Shop')} />
        <CategoryGrid goTo={(label) => setPage(label)} />
        <ProductGrid onAdd={addToCart} onView={(label, p) => (p ? openProduct(p) : setPage(label))} />
        <section id="story" className="py-10 sm:py-14 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle title="Artist Story" subtitle="Rooted in Indian craft, refined for modern spaces." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="rounded-2xl overflow-hidden shadow-sm">
                <img src="https://images.unsplash.com/photo-1559451772-70ee8dac7507?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxBcnRpc3QlMjBhdCUyMHdvcmt8ZW58MHwwfHx8MTc2MjQ0OTc4Mnww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" alt="Artist at work" className="w-full h-full object-cover" />
              </div>
              <p className="text-stone-700 leading-relaxed">
                Each ARTO piece is a slow dialogue between pigment and texture. Inspired by terracotta courtyards, monsoon patinas and woven textiles, the work celebrates imperfection as beauty. Built layer by layer, every stroke invites touch and quiet contemplation.
              </p>
            </div>
          </div>
        </section>
        <section className="py-10 sm:py-14 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle title="Kind Words" subtitle="Collectors around the world on living with ARTO." />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                'The textures glow differently through the day — it feels alive.',
                'Minimal yet soulful. The mural transformed our living room.',
                'Impeccable finish. Truly museum-worthy craftsmanship.'
              ].map((t, i) => (
                <div key={i} className="rounded-2xl bg-white p-6 shadow-sm">
                  <p className="text-stone-800">“{t}”</p>
                  <div className="mt-4 text-sm text-stone-500">— Collector, India</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    ),
    Shop: (
      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <SectionTitle title="Shop" subtitle="Canvas on easel, abstracts framed, murals on walls, crockery on table." />
          <Filters value={filters} onChange={setFilters} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <div key={p.id} className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-stone-900">{p.title}</h3>
                    <span className="text-stone-700">{formatINR(p.price)}</span>
                  </div>
                  <p className="mt-1 text-sm text-stone-600">{p.category}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <button onClick={() => openProduct(p)} className="px-3 py-2 rounded-full border border-stone-300 text-stone-800 hover:bg-stone-50 text-sm">View</button>
                    <button onClick={() => addToCart(p)} className="px-3 py-2 rounded-full bg-stone-900 text-white text-sm">Add</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    ),
    'Product Details': (
      <ProductDetails product={selected} onBack={() => setPage('Shop')} onAdd={addToCart} />
    ),
    'Canvas Paintings': <ProductGrid filterCategory="Canvas Paintings" onAdd={addToCart} onView={(label, p) => openProduct(p)} />,
    'Abstract Art': <ProductGrid filterCategory="Abstract Art" onAdd={addToCart} onView={(label, p) => openProduct(p)} />,
    'Wall Mural': <ProductGrid filterCategory="Wall Mural" onAdd={addToCart} onView={(label, p) => openProduct(p)} />,
    'Crockery Art': <ProductGrid filterCategory="Crockery Art" onAdd={addToCart} onView={(label, p) => openProduct(p)} />,
    'Custom Art': (
      <section className="py-10 sm:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Custom Art" subtitle="Commission a bespoke canvas, mural or crockery design." />
          <form className="space-y-4 bg-white p-6 rounded-2xl shadow-sm">
            <input required placeholder="Your name" className="w-full border border-stone-300 rounded-lg px-3 py-2" />
            <input required placeholder="Email" className="w-full border border-stone-300 rounded-lg px-3 py-2" />
            <select className="w-full border border-stone-300 rounded-lg px-3 py-2">
              <option>Canvas Painting</option>
              <option>Abstract Art</option>
              <option>Wall Mural</option>
              <option>Crockery Art</option>
            </select>
            <textarea rows="4" placeholder="Describe your idea, size, palette and theme" className="w-full border border-stone-300 rounded-lg px-3 py-2" />
            <button type="button" className="bg-stone-900 text-white px-5 py-3 rounded-full">Request Quote</button>
          </form>
        </div>
      </section>
    ),
    About: (
      <section className="py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="About ARTO" subtitle="A premium, modern Indian art studio." />
          <p className="text-stone-700 leading-relaxed">
            ARTO blends Indian craft heritage with minimalist design. Works embrace negative space, soft shadows and tactile textures for a calm, premium aesthetic.
          </p>
        </div>
      </section>
    ),
    Gallery: (
      <section className="py-10 sm:py-14 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Gallery" subtitle="Details and textures up close." />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1553531384-397c80973a05?q=80&w=1200&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1582582494700-66d1df0f2f66?q=80&w=1200&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?q=80&w=1200&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1530033782745-00c398b2f0f4?q=80&w=1200&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80&w=1200&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1515863149841-1a1c3b66f9b1?q=80&w=1200&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1519003300449-424ad0405076?q=80&w=1200&auto=format&fit=crop'
            ].map((src, i) => (
              <img key={i} src={src} alt="Artwork texture" className="w-full h-40 md:h-56 object-cover rounded-xl shadow-sm" />
            ))}
          </div>
        </div>
      </section>
    ),
    Contact: (
      <section className="py-10 sm:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Contact" subtitle="Commissions, collaborations and inquiries." />
          <form className="space-y-4 bg-white p-6 rounded-2xl shadow-sm">
            <input placeholder="Name" className="w-full border border-stone-300 rounded-lg px-3 py-2" />
            <input placeholder="Email" className="w-full border border-stone-300 rounded-lg px-3 py-2" />
            <textarea rows="4" placeholder="Message" className="w-full border border-stone-300 rounded-lg px-3 py-2" />
            <button type="button" className="bg-stone-900 text-white px-5 py-3 rounded-full">Send</button>
          </form>
        </div>
      </section>
    ),
  };

  return (
    <div className="min-h-screen bg-white text-stone-900">
      <Navbar current={page} setPage={(p) => { setPage(p); setSelected(null); }} cartCount={cart.reduce((s,i)=>s+i.qty,0)} openCart={() => setCartOpen(true)} />
      {Pages[page]}
      <Footer />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onQty={(id, qty) => setCart(c => c.map(i => i.id===id?{...i, qty}:i))}
        onRemove={(id) => setCart(c => c.filter(i => i.id!==id))}
      />
    </div>
  );
}
