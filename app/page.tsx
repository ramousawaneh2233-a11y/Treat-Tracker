import { db } from "@/lib/db";
import { Wallet, Receipt, TrendingDown, CreditCard } from "lucide-react";

export default async function FinanceDashboard() {
  const expenseCount = await db.treat.count();
  const expenses = await db.treat.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5
  });

  // Calculate total spent (treating 'calories' as the amount)
  const totalSpent = expenses.reduce((acc, curr) => acc + (curr.calories || 0), 0);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <Wallet className="text-blue-600" /> Treat Tracker Pro: Finance
          </h1>
          <p className="text-slate-500 font-medium">Monitoring your fixed expenses & emergency fund</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Total Monthly Expenses */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-red-50 text-red-600 rounded-lg"><TrendingDown size={20}/></div>
              <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full uppercase">Outgoings</span>
            </div>
            <p className="text-slate-500 text-sm">Monthly Expenses</p>
            <p className="text-3xl font-bold text-slate-900">£{totalSpent.toFixed(2)}</p>
          </div>

          {/* Active Subscriptions */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><CreditCard size={20}/></div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full uppercase">Bills</span>
            </div>
            <p className="text-slate-500 text-sm">Active Subscriptions</p>
            <p className="text-3xl font-bold text-slate-900">{expenseCount}</p>
          </div>
        </div>

        {/* Recent Transactions List */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
              <Receipt size={18} className="text-slate-400" /> Recent Transactions
            </h2>
          </div>
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
              <tr>
                <th className="px-6 py-3 font-semibold">Description</th>
                <th className="px-6 py-3 font-semibold">Date</th>
                <th className="px-6 py-3 font-semibold text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {expenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{expense.name}</td>
                  <td className="px-6 py-4 text-slate-500 text-sm">
                    {new Date(expense.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-slate-900">
                    £{expense.calories?.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
