import React from 'react';
import { Paintbrush, Frame, Wall, Utensils } from 'lucide-react';

const categories = [
  {
    key: 'Canvas Paintings',
    title: 'Canvas Paintings',
    icon: Paintbrush,
    image: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80&w=1200&auto=format&fit=crop',
    desc: 'Original textures on premium cotton canvas.'
  },
  {
    key: 'Abstract Art',
    title: 'Abstract Art',
    icon: Frame,
    image: 'https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxBYnN0cmFjdCUyMEFydHxlbnwwfDB8fHwxNzYyNDQ5Nzc5fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    desc: 'Framed abstracts with earthy, modern palettes.'
  },
  {
    key: 'Wall Mural',
    title: 'Wall Murals',
    icon: Wall,
    image: 'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?q=80&w=1200&auto=format&fit=crop',
    desc: 'Site-specific art painted directly on walls.'
  },
  {
    key: 'Crockery Art',
    title: 'Crockery Art',
    icon: Utensils,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
    desc: 'Hand-painted tableware with artisanal detail.'
  },
];

export default function CategoryGrid({ goTo }) {
  return (
    <section className="py-10 sm:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-stone-900">Shop by Category</h2>
          <button onClick={() => goTo('Shop')} className="text-stone-700 hover:text-stone-900">View all</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(({ key, title, icon: Icon, image, desc }) => (
            <button
              key={key}
              onClick={() => goTo(key)}
              className="group text-left rounded-2xl overflow-hidden bg-stone-50 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 text-stone-900">
                  <Icon className="w-5 h-5" />
                  <h3 className="font-medium">{title}</h3>
                </div>
                <p className="mt-1 text-sm text-stone-600">{desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
