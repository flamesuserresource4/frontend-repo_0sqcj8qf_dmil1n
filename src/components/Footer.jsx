import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="text-xl font-semibold text-stone-900">ARTO</div>
            <p className="mt-2 text-stone-600">Premium, handcrafted artworks from India. Minimal, earthy and deeply textured for modern homes.</p>
          </div>
          <div>
            <h4 className="font-medium text-stone-900">Explore</h4>
            <ul className="mt-2 space-y-2 text-stone-600">
              <li>Shop</li>
              <li>Gallery</li>
              <li>Custom Art</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-stone-900">Contact</h4>
            <ul className="mt-2 space-y-2 text-stone-600">
              <li>Email: hello@arto.studio</li>
              <li>Instagram: @arto.studio</li>
              <li>Phone: +91 98765 43210</li>
            </ul>
          </div>
        </div>
        <div className="pt-6 mt-6 border-t border-stone-200 text-sm text-stone-500">© {new Date().getFullYear()} ARTO. All rights reserved.</div>
      </div>
    </footer>
  );
}
