import React from "react";

export default function HeroSection() {
  return (
    <section className="relative flex justify-center items-center py-16 md:py-24 bg-gradient-to-br from-red-900/80 to-red-700/70 overflow-hidden">
      {/* Decorative Accent */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-red-200 opacity-20 rounded-full blur-2xl -z-10" />
      <div className="absolute bottom-0 right-0 w-56 h-56 bg-red-400 opacity-10 rounded-full blur-3xl -z-10" />
      {/* Card */}
      <div className="bg-white/90 shadow-2xl rounded-3xl px-8 py-10 max-w-xl w-full text-center border-t-8 border-red-900">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-red-900 leading-snug drop-shadow">
          أكل بيت؟ توصلك أطايب لين بابك <span className="align-middle">🍲</span>
        </h2>
        <p className="mb-8 text-lg md:text-xl text-red-800 font-medium">
          من شيفات سعوديين وشغوفين، نطبخ من القلب
        </p>
        <a
          href="#meals"
          className="inline-block bg-gradient-to-l from-red-900 to-red-700 text-white px-10 py-4 rounded-full font-extrabold text-lg shadow-lg hover:scale-105 hover:from-red-800 hover:to-red-600 transition-all duration-200"
        >
          ابدأ الطلب
        </a>
      </div>
    </section>
  );
}
