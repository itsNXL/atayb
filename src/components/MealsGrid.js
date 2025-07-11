import React, { useEffect, useState } from "react";

function getChefs() {
  return JSON.parse(localStorage.getItem("atayb_chefs") || "[]");
}
function getMeals() {
  return JSON.parse(localStorage.getItem("atayb_meals") || "[]");
}

export default function MealsGrid() {
  const [meals, setMeals] = useState([]);
  const [chefs, setChefs] = useState([]);

  useEffect(() => {
    setMeals(getMeals());
    setChefs(getChefs());
  }, []);

  if (chefs.length === 0) {
    return (
      <div className="text-center text-lg py-12">لا يوجد شيفات حالياً</div>
    );
  }

  // Group meals by chef
  const chefMeals = chefs.map(chef => ({
    ...chef,
    meals: meals.filter(meal => meal.chefId === chef.id)
  }));

  return (
    <section id="meals" className="grid md:grid-cols-2 gap-10">
      {chefMeals.map((chef) => (
        <div
          key={chef.id}
          className="bg-white/95 text-red-900 rounded-3xl shadow-2xl p-8 flex flex-col items-stretch border-t-8 border-red-900 relative overflow-hidden group transition-all duration-300 hover:scale-[1.02]"
        >
          <div className="flex items-center gap-5 mb-6">
            <div className="relative">
              <img
                src={chef.imageUrl || "/meal-placeholder.png"}
                alt={chef.name}
                className="w-24 h-24 object-cover rounded-full border-4 border-red-200 shadow-lg bg-white"
              />
              {/* Optionally, featured badge */}
              {/* <span className="absolute -top-2 -left-2 bg-red-700 text-white text-xs rounded-full px-3 py-1 font-bold shadow">مميز</span> */}
            </div>
            <div className="flex-1 text-right">
              <div className="text-2xl font-extrabold mb-2 tracking-tight">{chef.name}</div>
              {chef.whatsapp && (
                <a
                  href={`https://wa.me/9665XXXXXXXX`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-green-800 bg-green-100 rounded-full px-4 py-1 text-sm font-bold shadow hover:bg-green-200 transition"
                >
                  تواصل مع الإدارة
                </a>
              )}
            </div>
          </div>
          <div className="border-t border-red-100 my-4" />
          <div>
            <div className="font-bold mb-4 text-lg text-red-900 flex items-center gap-2">
              <svg className="w-6 h-6 text-red-700 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
              قائمة الشيف
            </div>
            {chef.meals.length === 0 ? (
              <div className="text-gray-400">لا توجد وجبات لهذا الشيف حالياً</div>
            ) : (
              <ul className="flex flex-col gap-4">
                {chef.meals.map(meal => (
                  <li key={meal.id} className="flex items-center bg-red-50/70 rounded-xl shadow-sm p-4 group-hover:bg-red-100 transition-all">
                    <img
                      src={meal.imageUrl || "/meal-placeholder.png"}
                      alt={meal.name}
                      className="w-14 h-14 object-cover rounded-full border-2 border-red-300 mr-3 shadow"
                    />
                    <div className="flex-1 mr-4 text-right">
                      <div className="font-bold text-lg mb-1">{meal.name}</div>
                      <span className="inline-block bg-red-200 text-red-900 rounded-full px-3 py-1 text-xs font-bold mr-2">{meal.price} ر.س</span>
                    </div>
                    <a
                      href={`https://wa.me/9665XXXXXXXX?text=السلام عليكم، أبي أطلب وجبة ${meal.name} من الشيف ${chef.name} من أطايب 🍽️`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-l from-red-900 to-red-700 text-white px-5 py-2 rounded-full font-bold shadow hover:scale-105 hover:from-red-800 hover:to-red-600 transition-all"
                    >
                      اطلبها واتساب
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}

