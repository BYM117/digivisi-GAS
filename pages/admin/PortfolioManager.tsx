
import React from 'react';
import { PORTFOLIO_ITEMS } from '../../constants';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const PortfolioManager: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Portfolio Manager</h1>
        <button className="bg-brand-black text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold hover:bg-neutral-800 transition-colors">
          <Plus size={18} />
          Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PORTFOLIO_ITEMS.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden group">
            <div className="aspect-video bg-neutral-100 relative overflow-hidden">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-2 right-2 bg-black/50 backdrop-blur p-1 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-bold px-1">{item.category}</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1 truncate">{item.title}</h3>
              <p className="text-xs text-neutral-500 mb-4 line-clamp-2">{item.description}</p>
              
              <div className="flex gap-2 pt-2 border-t border-neutral-100">
                <button className="flex-1 py-2 text-xs font-bold bg-neutral-50 text-neutral-600 rounded hover:bg-brand-black hover:text-white transition-colors flex items-center justify-center gap-1">
                    <Edit2 size={12} /> Edit
                </button>
                <button className="w-10 py-2 flex items-center justify-center text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                    <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioManager;
