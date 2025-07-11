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
    <section id="meals" className="grid md:grid-cols-2 gap-8">
      {chefMeals.map((chef) => (
        <div key={chef.id} className="bg-white text-red-900 rounded-2xl shadow-lg p-6 flex flex-col">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={chef.imageUrl || "/meal-placeholder.png"}
              alt={chef.name}
              className="w-20 h-20 object-cover rounded-full border-4 border-red-200"
            />
            <div className="flex-1">
              <div className="text-xl font-extrabold mb-1">{chef.name}</div>
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
            <div className="font-bold mb-2 text-lg">قائمة الشيف</div>
            {chef.meals.length === 0 ? (
              <div className="text-gray-400">لا توجد وجبات لهذا الشيف حالياً</div>
            ) : (
              <div className="grid gap-4">
                {chef.meals.map(meal => (
                  <div key={meal.id} className="flex items-center bg-red-50 rounded-lg p-3">
                    <img
                      src={meal.imageUrl || "/meal-placeholder.png"}
                      alt={meal.name}
                      className="w-16 h-16 object-cover rounded-full border-2 border-red-200 mr-2"
                    />
                    <div className="flex-1 mr-4">
                      <div className="font-bold text-base">{meal.name}</div>
                      <div className="text-sm">السعر: <span className="font-semibold">{meal.price} ر.س</span></div>
                    </div>
                    <a
                      href={`https://wa.me/9665XXXXXXXX?text=السلام عليكم، أبي أطلب وجبة ${meal.name} من الشيف ${chef.name} من أطايب 🍽️`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-red-900 text-white px-4 py-2 rounded-full font-bold hover:bg-red-700 transition"
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

