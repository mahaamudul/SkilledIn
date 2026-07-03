import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CreditCard, FileDown, ShieldCheck, Mail, BookOpen, Inbox } from 'lucide-react';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { jsPDF } from 'jspdf';

export default function MyOrders() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Fetch enrolled payments classes dynamically
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['enrolled-classes', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/student-enrolled-classes/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  const handleInvoiceDownload = (order) => {
    const doc = new jsPDF();
    
    // Set Invoice Header
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(28, 59, 47); // #1c3b2f brand-primary
    doc.text("SkilledIn Academy", 20, 25);
    
    doc.setFontSize(10);
    doc.setFont("Helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    doc.text("Accredited Online Learning Platform", 20, 31);
    
    const invoiceDate = order.date ? new Date(order.date).toLocaleDateString() : new Date().toLocaleDateString();
    doc.text(`Date Issued: ${invoiceDate}`, 140, 25);
    doc.text(`Invoice ID: INV-${order.transaction_id}`, 140, 31);
    
    // Divider line
    doc.setDrawColor(226, 232, 240);
    doc.line(20, 40, 190, 40);
    
    // Billed to section
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(28, 59, 47);
    doc.text("Billed To Student:", 20, 52);
    
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    doc.text(`Email: ${order.student_email}`, 20, 59);
    
    // Details
    doc.setFont("Helvetica", "bold");
    doc.text("Course Syllabus Enrollment Details:", 20, 75);
    
    doc.setFont("Helvetica", "normal");
    doc.text(`Class Title: ${order.class_title}`, 20, 83);
    doc.text(`Instructor Email: ${order.teacher_email}`, 20, 90);
    doc.text(`Payment Gateway: Mock Card Checkout`, 20, 97);
    doc.text(`Transaction Receipt: ${order.transaction_id}`, 20, 104);
    
    // Total table header
    doc.setFillColor(28, 59, 47);
    doc.rect(20, 115, 170, 8, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("Helvetica", "bold");
    doc.text("Description", 25, 120);
    doc.text("Total Paid", 155, 120);
    
    // Table content
    doc.setTextColor(71, 85, 105);
    doc.setFont("Helvetica", "normal");
    doc.text(order.class_title, 25, 133);
    doc.text(`$${order.price.toFixed(2)} USD`, 155, 133);
    
    doc.line(20, 140, 190, 140);
    
    // Footer notes
    doc.setFontSize(9);
    doc.setFont("Helvetica", "italic");
    doc.setTextColor(148, 163, 184);
    doc.text("This receipt is dynamically generated. Payment is processed securely.", 20, 160);
    
    doc.save(`invoice_${order.transaction_id}.pdf`);
  };

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-[#f8fafc]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-teal" />
      </div>
    );
  }

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

        {orders.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto border border-slate-200">
              <Inbox className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-700">No payment records found</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                There are no transaction receipts associated with your student account.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-slate-655 border-collapse">
              <thead className="bg-slate-50/50 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-150">
                <tr>
                  <th className="px-6 py-4.5 text-left font-bold">Class Details</th>
                  <th className="px-6 py-4.5 text-left font-bold">Transaction ID</th>
                  <th className="px-6 py-4.5 text-left font-bold">Instructor Contacts</th>
                  <th className="px-6 py-4.5 text-center font-bold">Amount Paid</th>
                  <th className="px-6 py-4.5 text-right font-bold">Invoice PDF</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 max-w-sm">
                      <div className="flex gap-2.5 items-start">
                        <div className="p-2 bg-brand-primary/5 text-brand-primary rounded-soft shrink-0">
                          <BookOpen className="w-4 h-4 text-brand-teal" />
                        </div>
                        <div>
                          <span className="block font-bold text-brand-primary text-sm mb-0.5">{order.class_title}</span>
                          <span className="text-[10px] text-slate-400 font-semibold uppercase">
                            Purchased: {order.date ? new Date(order.date).toLocaleDateString() : new Date().toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-600 font-bold">
                      {order.transaction_id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                        <Mail className="w-3.5 h-3.5 text-brand-teal" />
                        {order.teacher_email}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                        <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                        ${order.price.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleInvoiceDownload(order)}
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
        )}
      </div>
    </div>
  );
}
