
import React, { useState } from 'react';
import { MOCK_INQUIRIES } from '../../constants';
import { Inquiry } from '../../types';
import { MoreHorizontal, Search } from 'lucide-react';

const InquiryManager: React.FC = () => {
  const [inquiries] = useState<Inquiry[]>(MOCK_INQUIRIES);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInquiries = inquiries.filter(i => 
    i.name.includes(searchTerm) || 
    i.company.includes(searchTerm) || 
    i.email.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Inquiries</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={18} />
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-brand-black text-sm w-64"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-500 font-medium border-b border-neutral-200">
              <tr>
                <th className="px-6 py-3 whitespace-nowrap">Status</th>
                <th className="px-6 py-3 whitespace-nowrap">Date</th>
                <th className="px-6 py-3 whitespace-nowrap">Client</th>
                <th className="px-6 py-3 whitespace-nowrap">Contact</th>
                <th className="px-6 py-3 whitespace-nowrap">Budget</th>
                <th className="px-6 py-3 whitespace-nowrap">Schedule</th>
                <th className="px-6 py-3">Message</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredInquiries.map((inquiry) => (
                <tr key={inquiry.id} className="hover:bg-neutral-50 transition-colors group">
                   <td className="px-6 py-4 align-top">
                    <span className={`inline-block px-2 py-1 rounded text-[10px] font-bold uppercase ${
                      inquiry.status === 'NEW' ? 'bg-red-100 text-red-600' :
                      inquiry.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {inquiry.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-500 whitespace-nowrap align-top">{inquiry.date}</td>
                  <td className="px-6 py-4 align-top">
                    <div className="font-bold">{inquiry.company}</div>
                    <div className="text-xs text-neutral-500">{inquiry.name}</div>
                  </td>
                   <td className="px-6 py-4 align-top">
                    <div className="text-neutral-800">{inquiry.phone}</div>
                    <div className="text-xs text-neutral-400">{inquiry.email}</div>
                  </td>
                  <td className="px-6 py-4 text-neutral-500 whitespace-nowrap align-top">{inquiry.budget}</td>
                  <td className="px-6 py-4 text-neutral-500 whitespace-nowrap align-top">{inquiry.schedule}</td>
                  <td className="px-6 py-4 text-neutral-600 max-w-xs align-top">
                    <p className="line-clamp-2 text-xs leading-relaxed">{inquiry.message}</p>
                  </td>
                  <td className="px-6 py-4 text-right align-top">
                    <button className="text-neutral-400 hover:text-brand-black p-1">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredInquiries.length === 0 && (
            <div className="p-12 text-center text-neutral-400">
                No inquiries found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InquiryManager;
