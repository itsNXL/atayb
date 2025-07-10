import React, { useState } from "react";
import HeroSection from "./components/HeroSection";
import MealsGrid from "./components/MealsGrid";
import AdminPanel from "./components/AdminPanel";

export default function App() {
  const [adminMode, setAdminMode] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 to-red-700 text-white">
      <div className="container mx-auto px-2 py-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">أطايب</h1>
          <button
            className="bg-white text-red-900 rounded px-4 py-2 font-bold hover:bg-red-200 transition"
            onClick={() => setAdminMode((prev) => !prev)}
          >
            {adminMode ? "واجهة المستخدم" : "لوحة الإدارة"}
          </button>
        </div>
        {adminMode ? (
          <AdminPanel />
        ) : (
          <>
            <HeroSection />
            <MealsGrid />
          </>
        )}
      </div>
    </div>
  );
}
