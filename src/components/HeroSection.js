import React from "react";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col justify-center items-center py-20 md:py-32 bg-gradient-to-br from-[#7B1E23] via-[#B33B3B] to-[#7B1E23] overflow-hidden min-h-[70vh]">
      {/* Logo prominently displayed */}
      <img
        src="/logo-main.jpg"
        alt="شعار أطايب"
        className="w-40 md:w-56 h-auto mb-6 drop-shadow-2xl rounded-2xl bg-[#7B1E23]/80 p-2"
        style={{ boxShadow: '0 8px 40px 0 rgba(80,0,0,0.25)' }}
      />
      <div className="bg-white/90 shadow-2xl rounded-3xl px-8 py-10 max-w-xl w-full text-center border-t-8 border-[#B33B3B]">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-[#7B1E23] leading-snug drop-shadow">
          أكل بيت؟ توصلك أطايب لين بابك
        </h2>
        <p className="mb-8 text-lg md:text-xl text-[#B33B3B] font-medium">
          من شيفات سعوديين وشغوفين، نطبخ من القلب
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-8">
          <a
            href="#meals"
            className="inline-block bg-gradient-to-l from-[#7B1E23] to-[#B33B3B] text-white px-8 py-4 rounded-full font-extrabold text-lg shadow-lg hover:scale-105 hover:from-[#8C2328] hover:to-[#B33B3B] transition-all duration-200"
          >
            ابدأ الطلب
          </a>
          <a
            href="https://wa.me/9665XXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white border-2 border-[#B33B3B] text-[#7B1E23] px-8 py-4 rounded-full font-bold text-lg shadow hover:bg-red-50 hover:text-[#B33B3B] transition-all duration-200"
          >
            تواصل معنا واتساب
          </a>
          <a
            href="#meals"
            className="inline-block bg-[#B33B3B]/10 text-[#7B1E23] px-8 py-4 rounded-full font-bold text-lg shadow hover:bg-[#B33B3B]/20 hover:text-[#B33B3B] transition-all duration-200"
          >
            تعرف على الشيفات
          </a>
        </div>
      </div>
    </section>
  );
}
