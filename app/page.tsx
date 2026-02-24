import { db } from "@/lib/db";
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
  // --- FINANCIAL CALCULATIONS (The "Professional" Logic) ---
  const grossMonthly = 3500; // This will eventually come from your database
  const pensionRate = 0.05;  // 5% pension contribution
  
  // UK Tax Logic (Based on 2024/25 tax year estimates)
  const personalAllowanceMonthly = 1048; 
  const taxableIncome = Math.max(0, grossMonthly - personalAllowanceMonthly);
  
  const tax = taxableIncome * 0.20; // 20% Basic Rate
  const ni = grossMonthly > 1048 ? (grossMonthly - 1048) * 0.08 : 0; // 8% Class 1 NI
  const pension = grossMonthly * pensionRate;
  
  const takeHomePay = grossMonthly - tax - ni - pension;

  // --- REWARD LOGIC (The "Treat" System) ---
  const savingsThisMonth = 1000;
  const rewardSuggestions = [
    { icon: <Coffee className="text-orange-500" />, text: "Get a fancy Caramel Latte", type: "Small" },
    { icon: <Pizza className="text-red-500" />, text: "Order that extra-large Pizza tonight", type: "Small" },
    { icon: <Heart className="text-pink-500" />, text: "Buy those flowers you liked", type: "Medium" },
    { icon: <Plane className="text-blue-500" />, text: "Time to browse flights for a weekend away!", type: "Large" }
  ];

  // Select a reward: If saved > £1000 show Large reward, else show Small
  const suggestedReward = savingsThisMonth >= 1000 ? rewardSuggestions[3] : rewardSuggestions[0];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER SECTION */}
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
              <p className="text-slate-400 font-medium">Actual money landing in your pocket</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 pt-10 border-t border-slate-800 relative z-10">
              <div>
                <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">Income Tax</p>
                <p className="text-pink-500 text-2xl font-black">-£{tax.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">National Insurance</p>
                <p className="text-pink-500 text-2xl font-black">-£{ni.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">Pension Contribution</p>
                <p className="text-indigo-400 text-2xl font-black">-£{pension.toFixed(2)}</p>
              </div>
            </div>
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full"></div>
          </div>

          {/* OVERTIME / QUICK ADD */}
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white flex flex-col justify-center items-center text-center shadow-xl shadow-indigo-100">
            <div className="bg-white/20 p-4 rounded-3xl mb-4 backdrop-blur-md">
              <Sparkles size={40} className="text-white" />
            </div>
