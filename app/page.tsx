import { db } from "./db";
import { 
  Coffee, 
  Pizza, 
  Plane, 
  Calculator, 
  Heart, 
  Sparkles, 
  PartyPopper, 
  TrendingUp, 
  Home, 
  ArrowUpRight 
} from "lucide-react";
export default async function ProfessionalDashboard() {
  // --- FINANCIAL CALCULATIONS ---
  const grossMonthly = 3500; 
  const pensionRate = 0.05; 
  const personalAllowanceMonthly = 1048; 
  const taxableIncome = Math.max(0, grossMonthly - personalAllowanceMonthly);
  const tax = taxableIncome * 0.20; 
  const ni = grossMonthly > 1048 ? (grossMonthly - 1048) * 0.08 : 0; 
  const pension = grossMonthly * pensionRate;
  const takeHomePay = grossMonthly - tax - ni - pension;

  const savingsThisMonth = 1000;
  const rewardSuggestions = [
    { icon: <Coffee className="text-orange-500" />, text: "Get a fancy Caramel Latte" },
    { icon: <Plane className="text-blue-500" />, text: "Time to browse flights for a weekend away!" }
  ];
  const suggestedReward = savingsThisMonth >= 1000 ? rewardSuggestions[1] : rewardSuggestions[0];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans p-4 md:p-8">
      <ConfettiTrigger />
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500">
            TREAT TRACKER PRO
          </h1>
          <div className="bg-slate-100 px-4 py-2 rounded-full flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-black uppercase text-slate-600 tracking-widest">Live Budget Sync</span>
          </div>
        </header>

        {/* 1. PAYCHECK DECODER */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
          <div className="lg:col-span-3 bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-indigo-400 font-black tracking-widest text-xs uppercase mb-4 flex items-center gap-2">
                <Calculator size={16} /> Monthly Income Breakdown
              </h2>
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-6xl font-black tracking-tighter">£{takeHomePay.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                <span className="text-slate-500 font-bold line-through text-2xl">£{grossMonthly}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 pt-10 border-t border-slate-800 relative z-10">
              <div>
                <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">Income Tax</p>
                <p className="text-pink-500 text-2xl font-black">-£{tax.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">Nat. Insurance</p>
                <p className="text-pink-500 text-2xl font-black">-£{ni.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">Pension (5%)</p>
                <p className="text-indigo-400 text-2xl font-black">-£{pension.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white flex flex-col justify-center items-center text-center shadow-xl shadow-indigo-100">
            <div className="bg-white/20 p-4 rounded-3xl mb-4 backdrop-blur-md">
              <Sparkles size={40} className="text-white" />
            </div>
            <h3 className="font-black text-xl mb-2 italic">Worked Overtime?</h3>
            <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black text-sm mt-4 hover:scale-105 transition-transform">
              Add Hours
            </button>
          </div>
        </section>

        {/* 2. MILESTONE & MORTGAGE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 rounded-[3rem] p-1 shadow-2xl">
            <div className="bg-white rounded-[2.9rem] p-10 h-full">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2 text-pink-500 font-black uppercase tracking-tighter">
                  <PartyPopper size={24} /> Milestone Unlocked
                </div>
              </div>
              <h3 className="text-4xl font-black leading-[1.1] mb-8 text-slate-800">"Time for a treat?"</h3>
              <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100 flex items-center gap-6">
                <div className="text-5xl bg-white p-5 rounded-3xl shadow-sm italic">{suggestedReward.icon}</div>
                <div>
                  <p className="font-black text-2xl text-slate-900 mb-1">{suggestedReward.text}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-[3rem] p-10 border-2 border-emerald-100 flex flex-col justify-between">
             <div>
                <div className="flex items-center gap-2 text-emerald-600 font-black uppercase tracking-widest text-xs mb-4">
                  <Home size={16} /> Mortgage Goal Pot
                </div>
                <h3 className="text-4xl font-black text-emerald-900 mb-2">Dream Home</h3>
             </div>
             <div className="mt-12">
                <div className="flex justify-between font-black text-emerald-900 text-xl mb-4">
                   <span>£4,500 / £40,000</span>
                </div>
                <div className="w-full bg-white h-8 rounded-full border-4 border-white shadow-inner overflow-hidden">
                   <div className="bg-emerald-500 h-full w-[11.25%] transition-all"></div>
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
