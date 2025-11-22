import React, { useState } from 'react';
import { ServiceType } from '../types';
import { PORTFOLIO_ITEMS } from '../constants';

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<ServiceType | 'ALL'>('ALL');

  const filteredItems = filter === 'ALL' 
    ? PORTFOLIO_ITEMS 
    : PORTFOLIO_ITEMS.filter(item => item.category === filter);

  return (
    <div className="pt-24 pb-24 min-h-screen w-full bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-12">Portfolio</h1>
        
        {/* Filter */}
        <div className="flex flex-wrap gap-6 mb-12 border-b border-neutral-200 pb-4">
          <button 
            onClick={() => setFilter('ALL')}
            className={`text-sm font-bold uppercase tracking-wide transition-colors ${filter === 'ALL' ? 'text-brand-red' : 'text-neutral-400 hover:text-black'}`}
          >
            All Works
          </button>
          <button 
             onClick={() => setFilter(ServiceType.FRAME)}
             className={`text-sm font-bold uppercase tracking-wide transition-colors ${filter === ServiceType.FRAME ? 'text-brand-red' : 'text-neutral-400 hover:text-black'}`}
          >
            Digital Frame
          </button>
          <button 
             onClick={() => setFilter(ServiceType.PHOTO_VIDEO)}
             className={`text-sm font-bold uppercase tracking-wide transition-colors ${filter === ServiceType.PHOTO_VIDEO ? 'text-brand-red' : 'text-neutral-400 hover:text-black'}`}
          >
            Photo & Video
          </button>
          <button 
             onClick={() => setFilter(ServiceType.AI_CREATIVE)}
             className={`text-sm font-bold uppercase tracking-wide transition-colors ${filter === ServiceType.AI_CREATIVE ? 'text-brand-red' : 'text-neutral-400 hover:text-black'}`}
          >
            AI Creative
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {filteredItems.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="aspect-[3/4] bg-neutral-100 overflow-hidden mb-4 relative">
                 <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0"
                 />
                 <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-2 py-1 text-[10px] font-bold tracking-widest uppercase">
                    {item.category.replace('_', ' ')}
                 </div>
              </div>
              <h3 className="text-xl font-bold mb-1 group-hover:text-brand-red transition-colors">{item.title}</h3>
              <p className="text-sm text-neutral-500">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
