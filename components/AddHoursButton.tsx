"use client";

import { useState } from "react";
import { Sparkles, Plus } from "lucide-react";
import confetti from "canvas-confetti";

export default function AddHoursButton() {
  const [hours, setHours] = useState(0);

  const handleAdd = () => {
    setHours(prev => prev + 1);
    
    // Celebrate every 5 hours worked!
    if ((hours + 1) % 5 === 0) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white flex flex-col justify-center items-center text-center shadow-xl shadow-indigo-100">
      <div className="bg-white/20 p-4 rounded-3xl mb-4 backdrop-blur-md">
        <Sparkles size={40} className="text-white" />
      </div>
      <h3 className="font-black text-xl mb-1 italic">Worked Overtime?</h3>
      <p className="text-indigo-200 text-xs font-bold mb-4 uppercase tracking-widest">
        Total: {hours} Hours
      </p>
      
      <button 
        onClick={handleAdd}
        className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg"
      >
        <Plus size={16} /> Add 1 Hour
      </button>
    </div>
  );
}
