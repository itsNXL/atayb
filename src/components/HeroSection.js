import React from "react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl shadow-xl bg-gradient-to-br from-red-800 to-red-600 p-8 flex flex-col items-center justify-center my-10 mx-auto max-w-3xl">
      <div className="absolute inset-0 opacity-20 bg-[url('/meal-placeholder.png')] bg-center bg-cover pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center">
        <div className="bg-white rounded-full shadow-lg p-4 mb-4 flex items-center justify-center">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="24" cy="20" rx="16" ry="12" fill="#991B1B" />
            <rect x="12" y="28" width="24" height="12" rx="6" fill="#991B1B" />
            <ellipse cx="24" cy="20" rx="10" ry="8" fill="#F87171" />
          </svg>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow text-white">
          أكل بيت؟ توصلك أطايب لين بابك <span role="img" aria-label="food">🍲</span>
        </h2>
        <p className="mb-6 text-lg md:text-2xl text-white/90 font-medium">من شيفات سعوديين وشغوفين، نطبخ من القلب</p>
        <div className="flex items-center justify-center mb-4">
          <img src="/chef-hat.png" alt="Chef Hat" className="w-12 h-12 object-cover rounded-full mr-2" />
          <a
            href="#meals"
            className="inline-block bg-gradient-to-l from-yellow-400 to-red-500 text-red-900 px-10 py-4 rounded-full font-extrabold text-xl shadow-lg hover:scale-105 transition-all border-4 border-white"
          >
            ابدأ الطلب
          </a>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-red-800 to-red-600 opacity-50 pointer-events-none" />
      </div>
    </section>
  );
}
