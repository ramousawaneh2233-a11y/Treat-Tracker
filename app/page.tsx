import { db } from "@/lib/db";
import { Coffee, Pizza, Plane, Calculator, Heart, Sparkles } from "lucide-react";

export default async function ProfessionalDashboard() {
  // --- FINANCIAL CALCULATIONS ---
  const grossMonthly = 3500; // Example Gross Pay
  const pensionRate = 0.05; // 5%
  
  // Simple UK Tax Logic (Estimates)
  const taxableIncome = grossMonthly - 1048; // Personal allowance monthly
  const tax = taxableIncome > 0 ? taxableIncome * 0.20 : 0;
  const ni = grossMonthly > 1048 ? (grossMonthly - 1048) * 0.08 : 0; // New NI rates
  const pension = grossMonthly * pensionRate;
  const takeHomePay = grossMonthly - tax - ni - pension;

  // --- REWARD LOGIC ---
  const savingsThisMonth = 1000;
  const rewardSuggestions = [
    { icon: <Coffee />, text: "Get a fancy Caramel Latte", type: "Small" },
    { icon: <Pizza />, text: "Order that extra-large Pizza tonight", type: "Small" },
    { icon: <Heart />, text: "Buy those flowers you liked", type: "Medium" },
    { icon: <Plane />, text: "Time to browse flights for a weekend away!", type: "Large" }
  ];
  // Select a reward based on savings
  const suggestedReward = savingsThisMonth >= 1000 ? rewardSuggestions[3] : rewardSuggestions[0];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* 1. PAYCHECK DECODER (The "Professional" Part) */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-10">
          <div className="lg:col-span-3 bg-slate-900 rounded-[2rem] p-8 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-indigo-400 font-black tracking-widest text-xs uppercase mb-2 flex items-center gap-2">
                <Calculator size={14} /> Monthly Income Breakdown
              </h2>
              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-black">£{takeHomePay.toFixed(2)}</span>
                <span className="text-slate-400 font-bold line-through">£{grossMonthly}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-800">
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase">Income Tax</p>
                <p className="text-pink-500 font-black">-£{tax.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase">Nat. Insurance</p>
                <p className="text-pink-500 font-black">-£{ni.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase">Pension (5%)</p>
                <p className="text-indigo-400 font-black">-£{pension.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* OVERTIME CARD */}
          <div className="bg-indigo-50 rounded-[2rem] p-8 border-2 border-indigo-100 flex flex-col justify-center items-center text-center">
            <div className="bg-white p-4 rounded-full shadow-sm text-indigo-600 mb-4">
              <Sparkles size={32} />
            </div>
            <h3 className="font-black text-slate-800">Overtime?</h3>
            <p className="text-slate-500 text-sm mb-4">Log extra hours to boost your treats</p>
            <button className="w-full py-3 bg-indigo-600 text-white rounded-2xl font-black text-sm">Add Hours</button>
          </div>
        </section>

        {/* 2. THE POSITIVE REINFORCEMENT (The "Beautiful" Part) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-gradient-to-br from-pink-500 to-orange-400 rounded-[2.5rem] p-1 text-white shadow-xl shadow-pink-200">
            <div className="bg-white rounded-[2.4rem] p-10 h-full text-slate-900">
              <div className="flex items-center gap-2 text-pink-500 font-black uppercase tracking-tighter mb-4">
                <PartyPopper size={20} /> Milestone Achieved!
              </div>
              <h3 className="text-4xl font-black leading-tight mb-6 italic">
                "You've been amazing this month..."
              </h3>
              
              <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 flex items-center gap-6">
                <div className="text-4xl bg-white p-4 rounded-2xl shadow-sm">
                   {suggestedReward.icon}
                </div>
                <div>
                  <p className="font-black text-xl text-slate-800">{suggestedReward.text}</p>
                  <p className="text-slate-500 text-sm font-bold">Treat yourself, you've earned it!</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-[2.5rem] p-10 border-2 border-emerald-100 flex flex-col justify-between">
             <div>
                <h3 className="text-2xl font-black text-emerald-900 mb-2">Mortgage Pot</h3>
                <p className="text-emerald-700 font-medium">Securely tucked away for your future home.</p>
             </div>
             <div className="mt-10">
                <div className="flex justify-between font-black text-emerald-900 text-lg mb-2">
                   <span>Progress</span>
                   <span>£4,500 / £40k</span>
                </div>
                <div className="w-full bg-white h-4 rounded-full border border-emerald-200 overflow-hidden">
                   <div className="bg-emerald-500 h-full w-[12%]"></div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
