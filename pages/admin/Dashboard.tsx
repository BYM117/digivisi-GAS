import React, { useEffect, useState } from 'react';
import { MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { Inquiry } from '../../types';

const Dashboard: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch Inquiries Real-time
    const q = query(collection(db, "inquiries"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Inquiry[];
      setInquiries(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const totalInquiries = inquiries.length;
  const newInquiries = inquiries.filter(i => i.status === 'NEW').length;
  const pendingInquiries = inquiries.filter(i => i.status === 'IN_PROGRESS').length;

  if (loading) {
    return <div className="p-8 text-center text-neutral-400">Loading Dashboard Data...</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-neutral-500 text-sm font-medium uppercase tracking-wide">New Inquiries</h3>
            <AlertCircle className="text-brand-red" size={20} />
          </div>
          <p className="text-4xl font-bold">{newInquiries}</p>
          <p className="text-xs text-neutral-400 mt-2">Requires attention</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-neutral-500 text-sm font-medium uppercase tracking-wide">In Progress</h3>
            <MessageSquare className="text-blue-500" size={20} />
          </div>
          <p className="text-4xl font-bold">{pendingInquiries}</p>
          <p className="text-xs text-neutral-400 mt-2">Currently active conversations</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-neutral-500 text-sm font-medium uppercase tracking-wide">Total Inquiries</h3>
            <CheckCircle className="text-green-500" size={20} />
          </div>
          <p className="text-4xl font-bold">{totalInquiries}</p>
          <p className="text-xs text-neutral-400 mt-2">Lifetime received</p>
        </div>
      </div>

      {/* Recent Inquiries Preview */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-100 flex justify-between items-center">
          <h2 className="font-bold text-lg">Recent Inquiries</h2>
          <Link to="/admin/inquiries" className="text-xs text-brand-red font-bold hover:underline">VIEW ALL</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-500 font-medium border-b border-neutral-100">
              <tr>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Company</th>
                <th className="px-6 py-3">Service</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {inquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-neutral-400">No inquiries yet.</td>
                </tr>
              ) : (
                inquiries.slice(0, 5).map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                        inquiry.status === 'NEW' ? 'bg-red-100 text-red-600' :
                        inquiry.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {inquiry.status ? inquiry.status.replace('_', ' ') : 'NEW'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-neutral-500">{inquiry.date}</td>
                    <td className="px-6 py-4 font-medium">{inquiry.name}</td>
                    <td className="px-6 py-4 text-neutral-500">{inquiry.company}</td>
                    <td className="px-6 py-4 text-neutral-500">{inquiry.services?.join(', ')}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;