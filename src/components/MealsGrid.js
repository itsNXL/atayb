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
    <section id="meals" className="grid lg:grid-cols-3 md:grid-cols-2 gap-10 mt-10" style={{ direction: 'rtl', fontFamily: 'Tajawal, Cairo, Segoe UI, Arial, sans-serif', background: 'linear-gradient(135deg, #7f1d1d 0%, #b91c1c 100%)' }}>
      {chefMeals.map((chef) => (
        <div key={chef.id} className="relative bg-gradient-to-br from-white via-red-50 to-red-100 text-red-900 rounded-3xl shadow-2xl p-8 flex flex-col group hover:scale-105 transition-all border-2 border-red-200 h-96 w-80">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <img
                src={chef.imageUrl || "/meal-placeholder.png"}
                alt={chef.name}
                className="w-24 h-24 object-cover rounded-full border-4 border-red-200 shadow-lg group-hover:border-yellow-400 transition-all"
              />
              <span className="absolute -bottom-2 -left-2 bg-yellow-400 text-white px-2 py-1 rounded-full text-xs font-bold shadow">شيف</span>
            </div>
            <div className="flex-1">
              <div className="text-2xl font-extrabold mb-1">{chef.name}</div>
              {chef.whatsapp && (
                <a
                  href={`https://wa.me/9665XXXXXXXX`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-green-700 bg-green-100 rounded px-3 py-1 text-sm font-bold hover:bg-green-200 transition"
                >
                  تواصل مع الإدارة
                </a>
              )}
            </div>
          </div>
          <div>
            <div className="font-bold mb-3 text-lg border-b border-red-200 pb-1">قائمة الشيف</div>
            {chef.meals.length === 0 ? (
              <div className="text-gray-400">لا توجد وجبات لهذا الشيف حالياً</div>
            ) : (
              <div className="grid gap-4">
                {chef.meals.map(meal => (
                  <div key={meal.id} className="flex items-center bg-white rounded-xl p-3 shadow group-hover:bg-yellow-50 transition-all border border-red-100">
                    <img
                      src={meal.imageUrl || "/meal-placeholder.png"}
                      alt={meal.name}
                      className="w-16 h-16 object-cover rounded-full border-2 border-red-200 mr-2 shadow"
                    />
                    <div className="flex-1 mr-4">
                      <div className="font-bold text-lg">{meal.name}</div>
                      <div className="text-sm">السعر: <span className="font-semibold">{meal.price} ر.س</span></div>
                    </div>
                    <a
                      href={`https://wa.me/9665XXXXXXXX?text=السلام عليكم، أبي أطلب وجبة ${meal.name} من الشيف ${chef.name} من أطايب 🍽️`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-l from-yellow-400 to-red-500 text-white px-4 py-2 rounded-full font-bold hover:scale-105 transition-all shadow border-2 border-white"
                    >
                      اطلبها واتساب
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}

