import React from 'react';
import { Star } from 'lucide-react';

const demoProducts = [
  {
    id: 'canvas-1',
    title: 'Earthbound Serenity',
    price: 18999,
    category: 'Canvas Paintings',
    image: 'https://images.unsplash.com/photo-1652932445028-3d46b633c28e?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxFYXJ0aGJvdW5kJTIwU2VyZW5pdHl8ZW58MHwwfHx8MTc2MjQ0OTc4MHww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    surface: 'easel'
  },
  {
    id: 'abstract-1',
    title: 'Amber Drift',
    price: 14999,
    category: 'Abstract Art',
    image: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop',
    surface: 'framed'
  },
  {
    id: 'mural-1',
    title: 'Terracotta Wall Mural',
    price: 44999,
    category: 'Wall Mural',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
    surface: 'wall'
  },
  {
    id: 'crockery-1',
    title: 'Lotus Crockery Set',
    price: 7999,
    category: 'Crockery Art',
    image: 'https://images.unsplash.com/photo-1519003300449-424ad0405076?q=80&w=1200&auto=format&fit=crop',
    surface: 'table'
  },
];

function formatINR(n) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

export default function ProductGrid({ onAdd, onView, filterCategory }) {
  const products = filterCategory ? demoProducts.filter(p => p.category === filterCategory) : demoProducts;
  return (
    <section className="py-10 sm:py-14 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-stone-900">Featured Artworks</h2>
          <button onClick={() => onView('Shop')} className="text-stone-700 hover:text-stone-900">Explore more</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div key={p.id} className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-[4/5] overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-stone-900">{p.title}</h3>
                  <div className="flex items-center gap-1 text-amber-600"><Star className="w-4 h-4 fill-amber-500"/> 4.9</div>
                </div>
                <p className="mt-1 text-sm text-stone-600">{p.category}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-semibold text-stone-900">{formatINR(p.price)}</span>
                  <div className="flex gap-2">
                    <button onClick={() => onView('Product Details', p)} className="px-3 py-2 rounded-full border border-stone-300 text-stone-800 hover:bg-stone-50 text-sm">View</button>
                    <button onClick={() => onAdd(p)} className="px-3 py-2 rounded-full bg-stone-900 text-white text-sm">Add</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
