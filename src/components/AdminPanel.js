import React, { useState, useEffect } from "react";

const initialChef = { name: "", whatsapp: "", imageUrl: "", available: true };
const initialMeal = { name: "", price: "", imageUrl: "", chefId: "", category: "" };

function getChefs() {
  return JSON.parse(localStorage.getItem("atayb_chefs") || "[]");
}
function getMeals() {
  return JSON.parse(localStorage.getItem("atayb_meals") || "[]");
}
function saveChefs(chefs) {
  localStorage.setItem("atayb_chefs", JSON.stringify(chefs));
}
function saveMeals(meals) {
  localStorage.setItem("atayb_meals", JSON.stringify(meals));
}

export default function AdminPanel() {
  const [chefs, setChefs] = useState([]);
  const [meals, setMeals] = useState([]);
  const [chefForm, setChefForm] = useState(initialChef);
  const [mealForm, setMealForm] = useState(initialMeal);
  const [editChefId, setEditChefId] = useState(null);
  const [editMealId, setEditMealId] = useState(null);
  const [tab, setTab] = useState("chefs");

  useEffect(() => {
    setChefs(getChefs());
    setMeals(getMeals());
  }, []);

  // Chef CRUD
  const handleChefSubmit = (e) => {
    e.preventDefault();
    if (!chefForm.name || !chefForm.whatsapp) return;
    if (editChefId) {
      const updated = chefs.map((c) =>
        c.id === editChefId ? { ...chefForm, id: editChefId } : c
      );
      setChefs(updated);
      saveChefs(updated);
      setEditChefId(null);
    } else {
      const newChef = { ...chefForm, id: Date.now().toString() };
      const updated = [...chefs, newChef];
      setChefs(updated);
      saveChefs(updated);
    }
    setChefForm(initialChef);
  };
  const handleChefEdit = (id) => {
    const chef = chefs.find((c) => c.id === id);
    setChefForm(chef);
    setEditChefId(id);
  };
  const handleChefDelete = (id) => {
    if (!window.confirm("هل أنت متأكد من حذف الشيف؟")) return;
    const updated = chefs.filter((c) => c.id !== id);
    setChefs(updated);
    saveChefs(updated);
    // Remove meals belonging to deleted chef
    const mealsUpdated = meals.filter((m) => m.chefId !== id);
    setMeals(mealsUpdated);
    saveMeals(mealsUpdated);
  };

  // Meal CRUD
  const handleMealSubmit = (e) => {
    e.preventDefault();
    if (!mealForm.name || !mealForm.price || !mealForm.chefId) return;
    if (editMealId) {
      const updated = meals.map((m) =>
        m.id === editMealId ? { ...mealForm, id: editMealId } : m
      );
      setMeals(updated);
      saveMeals(updated);
      setEditMealId(null);
    } else {
      const newMeal = { ...mealForm, id: Date.now().toString() };
      const updated = [...meals, newMeal];
      setMeals(updated);
      saveMeals(updated);
    }
    setMealForm(initialMeal);
  };
  const handleMealEdit = (id) => {
    const meal = meals.find((m) => m.id === id);
    setMealForm(meal);
    setEditMealId(id);
  };
  const handleMealDelete = (id) => {
    if (!window.confirm("هل أنت متأكد من حذف الوجبة؟")) return;
    const updated = meals.filter((m) => m.id !== id);
    setMeals(updated);
    saveMeals(updated);
  };

  return (
    <div className="bg-white text-red-900 rounded-xl shadow p-6">
      <div className="flex gap-2 mb-4">
        <button
          className={`px-4 py-2 rounded font-bold ${tab === "chefs" ? "bg-red-900 text-white" : "bg-red-100"}`}
          onClick={() => setTab("chefs")}
        >
          الشيفات
        </button>
        <button
          className={`px-4 py-2 rounded font-bold ${tab === "meals" ? "bg-red-900 text-white" : "bg-red-100"}`}
          onClick={() => setTab("meals")}
        >
          الوجبات
        </button>
      </div>
      {tab === "chefs" ? (
        <>
          <form onSubmit={handleChefSubmit} className="mb-6 grid md:grid-cols-4 gap-4 items-end">
            <input
              className="border rounded px-3 py-2 col-span-1"
              placeholder="اسم الشيف"
              value={chefForm.name}
              onChange={e => setChefForm(f => ({ ...f, name: e.target.value }))}
              required
            />
            <input
              className="border rounded px-3 py-2 col-span-1"
              placeholder="رقم واتساب (9665xxxxxxx)"
              value={chefForm.whatsapp}
              onChange={e => setChefForm(f => ({ ...f, whatsapp: e.target.value }))}
              required
            />
            <input
              className="border rounded px-3 py-2 col-span-1"
              placeholder="رابط صورة (اختياري)"
              value={chefForm.imageUrl}
              onChange={e => setChefForm(f => ({ ...f, imageUrl: e.target.value }))}
            />
            <button className="bg-red-900 text-white px-4 py-2 rounded font-bold col-span-1" type="submit">
              {editChefId ? "تحديث" : "إضافة"}
            </button>
          </form>
          <div className="overflow-x-auto">
            <table className="w-full text-center">
              <thead>
                <tr className="bg-red-100">
                  <th>الصورة</th>
                  <th>اسم الشيف</th>
                  <th>رقم واتساب</th>
                  <th>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {chefs.map((chef) => (
                  <tr key={chef.id}>
                    <td>
                      {chef.imageUrl ? (
                        <img src={chef.imageUrl} alt={chef.name} className="w-12 h-12 rounded-full mx-auto" />
                      ) : (
                        <span className="text-xs text-gray-400">بدون</span>
                      )}
                    </td>
                    <td>{chef.name}</td>
                    <td>{chef.whatsapp}</td>
                    <td>
                      <button className="text-blue-600 mx-1" onClick={() => handleChefEdit(chef.id)}>تعديل</button>
                      <button className="text-red-600 mx-1" onClick={() => handleChefDelete(chef.id)}>حذف</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <form onSubmit={handleMealSubmit} className="mb-6 grid md:grid-cols-5 gap-4 items-end">
            <input
              className="border rounded px-3 py-2 col-span-1"
              placeholder="اسم الوجبة"
              value={mealForm.name}
              onChange={e => setMealForm(f => ({ ...f, name: e.target.value }))}
              required
            />
            <input
              className="border rounded px-3 py-2 col-span-1"
              placeholder="السعر (ر.س)"
              value={mealForm.price}
              onChange={e => setMealForm(f => ({ ...f, price: e.target.value }))}
              required
            />
            <input
              className="border rounded px-3 py-2 col-span-1"
              placeholder="رابط صورة (اختياري)"
              value={mealForm.imageUrl}
              onChange={e => setMealForm(f => ({ ...f, imageUrl: e.target.value }))}
            />
            <select
              className="border rounded px-3 py-2 col-span-1"
              value={mealForm.chefId}
              onChange={e => setMealForm(f => ({ ...f, chefId: e.target.value }))}
              required
            >
              <option value="">اختر الشيف</option>
              {chefs.map((chef) => (
                <option value={chef.id} key={chef.id}>{chef.name}</option>
              ))}
            </select>
            <button className="bg-red-900 text-white px-4 py-2 rounded font-bold col-span-1" type="submit">
              {editMealId ? "تحديث" : "إضافة"}
            </button>
          </form>
          <div className="overflow-x-auto">
            <table className="w-full text-center">
              <thead>
                <tr className="bg-red-100">
                  <th>الصورة</th>
                  <th>اسم الوجبة</th>
                  <th>السعر</th>
                  <th>الشيف</th>
                  <th>رابط الطلب</th>
                  <th>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {meals.map((meal) => {
                  const chef = chefs.find((c) => c.id === meal.chefId);
                  return (
                    <tr key={meal.id}>
                      <td>
                        {meal.imageUrl ? (
                          <img src={meal.imageUrl} alt={meal.name} className="w-12 h-12 rounded-full mx-auto" />
                        ) : (
                          <span className="text-xs text-gray-400">بدون</span>
                        )}
                      </td>
                      <td>{meal.name}</td>
                      <td>{meal.price} ر.س</td>
                      <td>{chef ? chef.name : "غير معروف"}</td>
                      <td>
                        {chef && chef.whatsapp ? (
                          <a
                            href={`https://wa.me/${chef.whatsapp}?text=السلام عليكم، أبي أطلب وجبة ${meal.name} من أطايب 🍽️`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 underline"
                          >
                            رابط الطلب
                          </a>
                        ) : (
                          <span className="text-xs text-gray-400">غير متوفر</span>
                        )}
                      </td>
                      <td>
                        <button className="text-blue-600 mx-1" onClick={() => handleMealEdit(meal.id)}>تعديل</button>
                        <button className="text-red-600 mx-1" onClick={() => handleMealDelete(meal.id)}>حذف</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
