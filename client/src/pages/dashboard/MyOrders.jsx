import React from 'react';
import { CreditCard, FileDown, ShieldCheck, Mail, BookOpen } from 'lucide-react';

export default function MyOrders() {
  const mockOrders = [
    {
      id: "TXN-98234-SK",
      classTitle: "React Frontend Architecture & Design",
      price: "$99.00",
      teacherEmail: "sarah.j@skilledin.com",
      date: "2026-06-28"
    },
    {
      id: "TXN-17823-SK",
      classTitle: "Introduction to Figma UI/UX Layouts",
      price: "$79.00",
      teacherEmail: "david.c@skilledin.com",
      date: "2026-06-30"
    }
  ];

  const handleInvoiceDownload = (txnId) => {
    alert(`Downloading PDF Invoice for transaction: ${txnId}`);
  };

  return (
    <div className="space-y-6 text-left max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold text-brand-primary">My Payment History</h2>
        <p className="text-slate-500 text-xs">Verify past transaction records and download invoice statements.</p>
      </div>

      <div className="bg-white border border-slate-150 rounded-soft overflow-hidden shadow-md">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-150 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-brand-teal" />
          <h3 className="font-bold text-brand-primary">Order & Invoices Statement</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-slate-650 border-collapse">
            <thead className="bg-slate-50/50 text-[10px] font-bold uppercase tracking-wider text-slate-455 border-b border-slate-150">
              <tr>
                <th className="px-6 py-4.5 text-left font-bold">Class Details</th>
                <th className="px-6 py-4.5 text-left font-bold">Transaction ID</th>
                <th className="px-6 py-4.5 text-left font-bold">Instructor Contacts</th>
                <th className="px-6 py-4.5 text-center font-bold">Amount Paid</th>
                <th className="px-6 py-4.5 text-right font-bold">Invoice PDF</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150">
              {mockOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 max-w-sm">
                    <div className="flex gap-2.5 items-start">
                      <div className="p-2 bg-brand-primary/5 text-brand-primary rounded-soft shrink-0">
                        <BookOpen className="w-4 h-4 text-brand-teal" />
                      </div>
                      <div>
                        <span className="block font-bold text-brand-primary text-sm mb-0.5">{order.classTitle}</span>
                        <span className="text-[10px] text-slate-400 font-semibold uppercase">Purchased: {order.date}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-600 font-bold">
                    {order.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                      <Mail className="w-3.5 h-3.5 text-brand-teal" />
                      {order.teacherEmail}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                      {order.price}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleInvoiceDownload(order.id)}
                      className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-soft border border-slate-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 ml-auto shadow-sm"
                    >
                      <FileDown className="w-4 h-4 text-brand-teal" />
                      Invoice
                    </button>
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
