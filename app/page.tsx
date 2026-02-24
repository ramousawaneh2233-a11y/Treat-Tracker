import { db } from "@/lib/db";
import { Wallet, Receipt, ShieldCheck, ArrowUpRight } from "lucide-react";

export default async function FinanceDashboard() {
  const expenses = await db.treat.findMany();
  
  // 1. Calculate Monthly Fixed Expenses from your Database
  const monthlyFixedExpenses = expenses.reduce((acc, curr) => acc + (curr.calories || 0), 0);
  
  // 2. Your specific financial numbers (from our previous chat)
  const takeHomePay = 2852.80;
  const groceryBudget = 250.00;
  const discretionary = 150.00;
  const directSavings = 450.00;
  
  // 3. Emergency Fund Calculation (The "Leftover")
  const emergencyFundContribution = takeHomePay - monthlyFixedExpenses - groceryBudget - discretionary - directSavings;
  
  // 4. Goal: 3 Months of safety (Fixed Expenses + Essentials * 3)
  const emergencyGoal = (monthlyFixedExpenses + groceryBudget) * 3;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
              <Wallet className="text-indigo-600" /> Treat Tracker Pro
            </h1>
            <p className="text-slate-500 font-medium">Budget & Emergency Fund Status</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full uppercase">Database Live</span>
          </div>
        </header>

        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-slate-500 text-sm font-semibold mb-1">Monthly Fixed Bills</p>
            <p className="text-3xl font-bold text-slate-900">£{monthlyFixedExpenses.toFixed(2)}</p>
          </div>

          <div className="bg-indigo-600 p-6 rounded-2xl shadow-lg text-white">
            <p className="text-indigo-100 text-sm font-semibold mb-1">Emergency Fund Monthly</p>
            <p className="text-3xl font-bold">£{emergencyFundContribution.toFixed(2)}</p>
            <div className="mt-2 flex items-center text-xs text-indigo-200">
              <ArrowUpRight size={14} /> +£450.00 auto-savings also active
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-slate-500 text-sm font-semibold mb-1">Safety Net Goal (3mo)</p>
            <p className="text-3xl font-bold text-slate-900">£{emergencyGoal.toFixed(2)}</p>
          </div>
        </div>

        {/* Emergency Fund Progress Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-100 text-green-700 rounded-lg"><ShieldCheck /></div>
            <h2 className="text-xl font-bold text-slate-800">Safety Net Progress</h2>
          </div>
          
          <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden">
            {/* Let's assume you have £2,500 currently saved */}
            <div className="bg-green-500 h-full" style={{ width: '45%' }}></div>
          </div>
          <div className="flex justify-between mt-3 text-sm font-medium">
            <span className="text-slate-600">Current: £2,500.00</span>
            <span className="text-slate-400">Target: £{emergencyGoal.toFixed(2)}</span>
          </div>
        </div>

        {/* Bill Breakdown (Your Subscriptions) */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
           <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
              <Receipt size={18} className="text-slate-400" /> Active Subscriptions & Bills
            </h2>
            <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700">+ Add New Bill</button>
          </div>
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Bill Name</th>
                <th className="px-6 py-4 text-right">Monthly Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td className="px-6 py-4 text-slate-900 font-medium">{expense.name}</td>
                  <td className="px-6 py-4 text-right font-bold text-slate-900">£{expense.calories?.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
}
