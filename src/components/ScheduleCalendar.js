import React, { useState } from "react";

// Simple weekly schedule for chef/meal availability
const days = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
const hours = [
  "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"
];

export default function ScheduleCalendar({ onSelectSlot }) {
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedHour, setSelectedHour] = useState(null);

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 w-full max-w-2xl mx-auto mt-10 border-t-8 border-[#B33B3B]">
      <h3 className="text-2xl font-bold text-[#7B1E23] mb-4 text-center">جدول التوافر والحجز</h3>
      <div className="flex justify-center gap-2 mb-4 flex-wrap">
        {days.map((day, idx) => (
          <button
            key={day}
            onClick={() => { setSelectedDay(idx); setSelectedHour(null); }}
            className={`px-4 py-2 rounded-full font-bold text-lg transition-all border-2 ${selectedDay === idx ? 'bg-[#B33B3B] text-white border-[#B33B3B]' : 'bg-white text-[#7B1E23] border-[#B33B3B] hover:bg-[#B33B3B]/10'}`}
          >
            {day}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {hours.map(hour => (
          <button
            key={hour}
            onClick={() => { setSelectedHour(hour); onSelectSlot && onSelectSlot(days[selectedDay], hour); }}
            className={`px-6 py-3 rounded-xl font-bold text-lg transition-all border-2 ${selectedHour === hour ? 'bg-[#7B1E23] text-white border-[#7B1E23]' : 'bg-white text-[#B33B3B] border-[#B33B3B] hover:bg-[#B33B3B]/10'}`}
          >
            {hour}
          </button>
        ))}
      </div>
      {selectedHour && (
        <div className="mt-6 text-center text-lg font-bold text-[#B33B3B]">
          تم اختيار: <span className="text-[#7B1E23]">{days[selectedDay]}</span> الساعة <span className="text-[#7B1E23]">{selectedHour}</span>
        </div>
      )}
    </div>
  );
}
