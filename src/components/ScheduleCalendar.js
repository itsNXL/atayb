import React, { useState } from "react";

const days = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
const hours = ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"];

function getNextDateOfWeek(dayIdx, hour) {
  // Returns a Date object for the next occurrence of the given dayIdx/hour in the future
  const now = new Date();
  // Map JS Sunday=0 to Arabic Sunday=0
  const today = (now.getDay() + 6) % 7; // Sunday=0, Monday=1, ..., Saturday=6
  let daysToAdd = (dayIdx - today + 7) % 7;
  let target = new Date(now);
  const [h, m] = hour.split(":").map(Number);
  target.setHours(h, m, 0, 0);
  if (daysToAdd === 0 && target <= now) daysToAdd = 7;
  target.setDate(now.getDate() + daysToAdd);
  return target;
}

export default function ScheduleCalendar({ onSelectSlot }) {
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedHour, setSelectedHour] = useState(null);
  const [error, setError] = useState("");

  const now = new Date();

  function isSlotValid(dayIdx, hour) {
    const slot = getNextDateOfWeek(dayIdx, hour);
    return slot.getTime() - now.getTime() >= 24 * 60 * 60 * 1000;
  }

  function handleHourClick(hour) {
    if (!isSlotValid(selectedDay, hour)) {
      setError("يجب أن يكون الحجز قبل 24 ساعة على الأقل من الآن");
      return;
    }
    setSelectedHour(hour);
    setError("");
    if (onSelectSlot) onSelectSlot(days[selectedDay], hour);
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 w-full max-w-2xl mx-auto mt-10 border-t-8 border-[#B33B3B]">
      <h3 className="text-2xl font-bold text-[#7B1E23] mb-4 text-center">جدول التوافر والحجز</h3>
      <div className="flex justify-center gap-2 mb-4 flex-wrap">
        {days.map((day, idx) => (
          <button
            key={day}
            onClick={() => { setSelectedDay(idx); setSelectedHour(null); setError(""); }}
            className={`px-4 py-2 rounded-full font-bold text-lg transition-all border-2 ${selectedDay === idx ? 'bg-[#B33B3B] text-white border-[#B33B3B]' : 'bg-white text-[#7B1E23] border-[#B33B3B] hover:bg-[#B33B3B]/10'}`}
          >
            {day}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {hours.map(hour => {
          const disabled = !isSlotValid(selectedDay, hour);
          return (
            <button
              key={hour}
              onClick={() => handleHourClick(hour)}
              disabled={disabled}
              className={`px-6 py-3 rounded-xl font-bold text-lg transition-all border-2 ${selectedHour === hour ? 'bg-[#7B1E23] text-white border-[#7B1E23]' : disabled ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-white text-[#B33B3B] border-[#B33B3B] hover:bg-[#B33B3B]/10'}`}
            >
              {hour}
            </button>
          );
        })}
      </div>
      {error && (
        <div className="mt-4 text-center text-red-700 font-bold text-lg">{error}</div>
      )}
      {selectedHour && !error && (
        <div className="mt-6 text-center text-lg font-bold text-[#B33B3B]">
          تم اختيار: <span className="text-[#7B1E23]">{days[selectedDay]}</span> الساعة <span className="text-[#7B1E23]">{selectedHour}</span>
        </div>
      )}
    </div>
  );
}
