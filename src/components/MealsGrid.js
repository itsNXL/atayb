import React, { useEffect, useState } from "react";
import ScheduleCalendar from "./ScheduleCalendar";

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

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);

  function handleSelectSlot(day, hour) {
    setSelectedDay(day);
    setSelectedHour(hour);
  }

  return (
    <>
      <section id="meals" className="grid md:grid-cols-2 gap-12">
        {chefMeals.map((chef) => (
          <div
            key={chef.id}
            className="bg-white text-red-900 rounded-3xl shadow-2xl p-10 flex flex-col items-stretch border-t-8 border-red-900 relative overflow-hidden group transition-all duration-300 hover:scale-[1.025]"
          >
            <div className="flex items-center gap-6 mb-8">
              <div className="relative">
                <img
                  src={chef.imageUrl || "/meal-placeholder.png"}
                  alt={chef.name}
                  className="w-28 h-28 object-cover rounded-full border-4 border-red-300 shadow-xl bg-white ring-4 ring-white"
                />
                {/* Optionally, featured badge */}
              </div>
              <div className="flex-1 text-right">
                <div className="text-2xl font-extrabold mb-2 tracking-tight text-red-900 drop-shadow">{chef.name}</div>
                {chef.whatsapp && (
                  <a
                    href={`https://wa.me/9665XXXXXXXX`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-green-800 bg-green-50 rounded-full px-4 py-1 text-sm font-bold shadow hover:bg-green-200 transition"
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
                    <li key={meal.id} className="flex items-center bg-white rounded-2xl shadow p-5 hover:bg-red-50 transition-all border border-red-50">
                      <div className="relative">
                        <img
                          src={meal.imageUrl || "/meal-placeholder.png"}
                          alt={meal.name}
                          className="w-16 h-16 object-cover rounded-full border-2 border-red-200 shadow mr-3 bg-white"
                        />
                        <span className="absolute -top-2 -left-2 bg-red-100 text-red-700 rounded-full px-2 py-1 text-xs font-bold shadow-sm flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                          وجبة
                        </span>
                      </div>
                      <div className="flex-1 mr-4 text-right">
                        <div className="font-bold text-lg mb-1 text-red-900">{meal.name}</div>
                        <span className="inline-block bg-red-100 text-red-900 rounded-full px-4 py-1 text-base font-bold mr-2 shadow">{meal.price} ر.س</span>
                      </div>
                      <a
                        href={`https://wa.me/9665XXXXXXXX?text=السلام عليكم، أبي أطلب وجبة ${meal.name} من الشيف ${chef.name} من أطايب 🍽️${selectedDay && selectedHour ? `\nالوقت المطلوب: ${selectedDay} الساعة ${selectedHour}` : ''}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-l from-red-900 to-red-700 text-white px-6 py-2 rounded-full font-bold shadow-lg hover:scale-105 hover:from-red-800 hover:to-red-600 transition-all"
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
      <ScheduleCalendar onSelectSlot={handleSelectSlot} />
      {selectedDay && selectedHour && (
        <div className="text-center text-lg font-bold text-[#B33B3B] mt-6">
          تم اختيار: <span className="text-[#7B1E23]">{selectedDay}</span> الساعة <span className="text-[#7B1E23]">{selectedHour}</span> — سيتم إرسال الوقت مع الطلب عبر واتساب
        </div>
      )}
    </>
  );
}

