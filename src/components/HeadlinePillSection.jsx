import React from 'react';

export default function HeadlinePillSection() {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Signature Inline Capsule Typography from Reference Design */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-slate-900 leading-[1.3] sm:leading-[1.35] font-sans">
            Take the step and explore{' '}
            <span className="inline-capsule-img w-20 sm:w-28 md:w-36 h-9 sm:h-12 md:h-14 mx-1.5 align-middle shadow-md relative group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=400&q=80"
                alt="Snowy Solang Valley Mountains"
                className="w-full h-full object-cover object-center group-hover:scale-115 transition-transform duration-500"
              />
              <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black/40 flex items-center justify-center text-[10px] text-white font-semibold transition-opacity duration-300">
                Solang Pass
              </span>
            </span>{' '}
            the <br className="hidden sm:inline" />
            Himalayas{' '}
            <span className="inline-capsule-img w-24 sm:w-32 md:w-40 h-9 sm:h-12 md:h-14 mx-1.5 align-middle shadow-md relative group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=400&q=80"
                alt="Chandratal Lake Spiti"
                className="w-full h-full object-cover object-center group-hover:scale-115 transition-transform duration-500"
              />
              <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black/40 flex items-center justify-center text-[10px] text-white font-semibold transition-opacity duration-300">
                Chandratal
              </span>
            </span>{' '}
            waiting for you.
          </h2>

          <p className="mt-8 text-base sm:text-lg text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
            Traveling changes you. You see new places, meet warm Pahadi people, and discover a serene new version of yourself.
          </p>
        </div>
      </div>
    </section>
  );
}
