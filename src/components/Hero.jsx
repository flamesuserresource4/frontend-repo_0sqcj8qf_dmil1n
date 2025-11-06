import React from 'react';
import { motion } from 'framer-motion';

export default function Hero({ onShop }) {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-semibold tracking-tight text-stone-900"
            >
              Handcrafted Indian Art with a Modern Soul
            </motion.h1>
            <p className="mt-4 text-stone-700 leading-relaxed">
              ARTO is a premium studio by a professional Indian artist creating canvas paintings, 
              framed abstracts, bespoke wall murals, and delicate crockery paintings. Each piece 
              is crafted with earthy palettes and rich texture for a luxurious, authentic home.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={onShop}
                className="bg-stone-900 text-white px-5 py-3 rounded-full shadow-sm hover:shadow-md transition"
              >
                Shop Originals
              </button>
              <a
                href="#story"
                className="px-5 py-3 rounded-full border border-stone-300 text-stone-800 hover:bg-stone-50"
              >
                Artist Story
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl bg-gradient-to-b from-stone-50 to-amber-50 p-6 shadow-inner">
              <div className="w-full h-full rounded-xl overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1617050371672-2b43fb53a27d?q=80&w=1200&auto=format&fit=crop"
                  alt="Canvas painting on a wooden easel"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-amber-200/60 rounded-2xl blur-2xl" />
              <div className="absolute -top-4 -right-6 w-28 h-28 bg-stone-200/60 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
