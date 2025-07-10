import React from "react";

export default function HeroSection() {
  return (
    <section className="text-center my-10">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4">أكل بيت؟ توصلك أطايب لين بابك 🍲</h2>
      <p className="mb-6 text-lg md:text-xl">من شيفات سعوديين وشغوفين، نطبخ من القلب</p>
      <a
        href="#meals"
        className="inline-block bg-white text-red-900 px-8 py-3 rounded-full font-bold text-lg shadow hover:bg-red-200 transition"
      >
        ابدأ الطلب
      </a>
    </section>
  );
}
