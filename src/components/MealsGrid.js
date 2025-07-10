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

  return (
    <section id="meals" className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
      {meals.length === 0 ? (
        <div className="col-span-full text-center text-lg">لا توجد وجبات حالياً</div>
      ) : (
        meals.map((meal) => {
          const chef = chefs.find((c) => c.id === meal.chefId);
          return (
            <div
              key={meal.id}
              className="bg-white text-red-900 rounded-xl shadow p-4 flex flex-col items-center"
            >
              <img
                src={meal.imageUrl || "/meal-placeholder.png"}
                alt={meal.name}
                className="w-32 h-32 object-cover rounded-full mb-3 border-4 border-red-200"
              />
              <h3 className="font-bold text-xl mb-1">{meal.name}</h3>
              <div className="mb-1">السعر: <span className="font-semibold">{meal.price} ر.س</span></div>
              <div className="mb-3 text-sm">الشيف: {chef ? chef.name : "غير معروف"}</div>
              {chef && chef.whatsapp ? (
                <a
                  href={`https://wa.me/${chef.whatsapp}?text=السلام عليكم، أبي أطلب وجبة ${meal.name} من أطايب 🍽️`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-900 text-white px-6 py-2 rounded-full font-bold mt-auto hover:bg-red-700 transition"
                >
                  اطلبها واتساب
                </a>
              ) : (
                <span className="text-gray-400 text-xs mt-2">رقم الشيف غير متوفر</span>
              )}
            </div>
          );
        })
      )}
    </section>
  );
}
