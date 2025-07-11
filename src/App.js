import React, { useState } from "react";
import HeroSection from "./components/HeroSection";
import MealsGrid from "./components/MealsGrid";
import AdminPanel from "./components/AdminPanel";

export default function App() {
  const [adminMode, setAdminMode] = useState(window.location.hash === "#admin");
  const [adminAuth, setAdminAuth] = useState(
    sessionStorage.getItem("atayb_admin_auth") === "1"
  );
  const [showPrompt, setShowPrompt] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  React.useEffect(() => {
    const onHashChange = () => {
      setAdminMode(window.location.hash === "#admin");
      setShowPrompt(false);
      setPassword("");
      setError("");
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  React.useEffect(() => {
    if (adminMode && !adminAuth) {
      setShowPrompt(true);
    } else {
      setShowPrompt(false);
    }
  }, [adminMode, adminAuth]);

  const handlePassword = (e) => {
    e.preventDefault();
    if (password === "N12n123$$") {
      setAdminAuth(true);
      sessionStorage.setItem("atayb_admin_auth", "1");
      setShowPrompt(false);
    } else {
      setError("كلمة المرور غير صحيحة");
    }
  };

  return (
    <div className="min-h-screen bg-white bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-50 via-white to-red-100">
      <div className="container mx-auto px-2 py-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-red-900 drop-shadow-sm tracking-tight bg-white/80 px-6 py-2 rounded-full shadow-md">أطايب</h1>
        </div>
        {adminMode ? (
          adminAuth ? (
            <AdminPanel />
          ) : showPrompt ? (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <form
                onSubmit={handlePassword}
                className="bg-white text-red-900 rounded-2xl shadow-2xl p-10 w-full max-w-xs text-center border-t-4 border-red-900"
              >
                <h2 className="text-2xl font-bold mb-4">لوحة الإدارة</h2>
                <input
                  type="password"
                  className="border rounded px-3 py-2 w-full mb-3"
                  placeholder="كلمة المرور"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoFocus
                />
                {error && <div className="text-red-600 mb-2">{error}</div>}
                <button className="bg-red-900 text-white px-4 py-2 rounded font-bold w-full" type="submit">
                  دخول
                </button>
              </form>
            </div>
          ) : null
        ) : (
          <>
            <HeroSection />
            <div className="my-10" />
            <MealsGrid />
          </>
        )}
      </div>
    </div>
  );
}
