
import React from 'react';
import { ArrowUpRight, Users, MousePointer, Clock, Globe } from 'lucide-react';

// Mock Data for Charts
const VISITOR_DATA = [
  { day: 'Mon', count: 120 },
  { day: 'Tue', count: 180 },
  { day: 'Wed', count: 150 },
  { day: 'Thu', count: 240 },
  { day: 'Fri', count: 320 },
  { day: 'Sat', count: 280 },
  { day: 'Sun', count: 190 },
];

const TRAFFIC_SOURCES = [
  { source: 'Google Search', count: 850, percent: 45, color: 'bg-brand-black' },
  { source: 'Instagram (Social)', count: 520, percent: 28, color: 'bg-brand-red' },
  { source: 'Direct (URL)', count: 310, percent: 16, color: 'bg-neutral-400' },
  { source: 'Naver Blog', count: 205, percent: 11, color: 'bg-green-500' },
];

const Statistics: React.FC = () => {
  // Helper to calculate coordinates
  const maxCount = Math.max(...VISITOR_DATA.map(d => d.count));
  
  // Calculate points for SVG path
  const points = VISITOR_DATA.map((d, i) => {
    const x = (i / (VISITOR_DATA.length - 1)) * 100;
    const y = 100 - (d.count / maxCount) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
            <h1 className="text-3xl font-bold">Statistics</h1>
            <p className="text-neutral-500 text-sm mt-1">Traffic analytics and visitor insights.</p>
        </div>
        <div className="bg-white border border-neutral-200 px-4 py-2 rounded text-sm font-medium text-neutral-600 shadow-sm">
            Last 7 Days
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
            { label: 'Total Visitors', value: '1,854', change: '+12.5%', icon: Users },
            { label: 'Page Views', value: '5,230', change: '+8.2%', icon: MousePointer },
            { label: 'Avg. Duration', value: '2m 45s', change: '+5.1%', icon: Clock },
            { label: 'Bounce Rate', value: '42%', change: '-2.4%', icon: Globe },
        ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                    <div className={`p-2 rounded-lg ${i === 0 ? 'bg-red-50 text-brand-red' : 'bg-neutral-50 text-neutral-600'}`}>
                        <stat.icon size={18} />
                    </div>
                    <div className="flex items-center text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                        <ArrowUpRight size={10} className="mr-1" />
                        {stat.change}
                    </div>
                </div>
                <h3 className="text-2xl font-bold mb-1 tracking-tight">{stat.value}</h3>
                <p className="text-xs text-neutral-400 font-medium">{stat.label}</p>
            </div>
        ))}
      </div>

      {/* Main Chart: Weekly Traffic */}
      <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200">
        <h2 className="font-bold text-lg mb-8">Weekly Traffic Trend</h2>
        <div className="relative h-72 w-full">
            {/* Background Grid */}
            <div className="absolute inset-0 flex flex-col justify-between text-xs text-neutral-300 font-mono pointer-events-none">
                {[100, 75, 50, 25, 0].map(v => (
                    <div key={v} className="border-b border-dashed border-neutral-100 w-full h-0 flex items-center">
                        <span className="absolute -left-8">{Math.round(maxCount * (v/100))}</span>
                    </div>
                ))}
            </div>

            {/* SVG Layer for Line and Area ONLY (No Dots here to prevent distortion) */}
            <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                <defs>
                    <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#E0301E" stopOpacity="0.05" />
                        <stop offset="100%" stopColor="#E0301E" stopOpacity="0" />
                    </linearGradient>
                </defs>
                
                {/* Fill Area */}
                <polygon points={`0,100 ${points} 100,100`} fill="url(#gradient)" />
                
                {/* Line Stroke - Thin 1px */}
                <polyline points={points} fill="none" stroke="#E0301E" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            </svg>

            {/* HTML Layer for Dots (Overlay) - Prevents oval distortion */}
            <div className="absolute inset-0">
                {VISITOR_DATA.map((d, i) => {
                    const x = (i / (VISITOR_DATA.length - 1)) * 100;
                    const y = 100 - (d.count / maxCount) * 100;
                    return (
                        <div 
                            key={i}
                            className="absolute group"
                            style={{ left: `${x}%`, top: `${y}%` }}
                        >
                            {/* Dot Center Alignment Wrapper */}
                            <div className="relative -translate-x-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center cursor-pointer">
                                {/* The Visible Dot: Solid Red, No Border, Perfect Circle */}
                                <div className="w-2 h-2 bg-brand-red rounded-full transition-transform duration-200 group-hover:scale-150 shadow-sm"></div>
                                
                                {/* Tooltip */}
                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                    <div className="bg-brand-black text-white text-[10px] py-1 px-2 rounded whitespace-nowrap">
                                        {d.day}: {d.count}
                                    </div>
                                    {/* Tooltip Arrow */}
                                    <div className="w-2 h-2 bg-brand-black transform rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
        
        {/* X-Axis Labels */}
        <div className="flex justify-between mt-4 px-0 text-xs text-neutral-400 font-medium uppercase tracking-wider">
            {VISITOR_DATA.map(d => <span key={d.day}>{d.day}</span>)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Traffic Sources */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <h2 className="font-bold text-lg mb-6">Traffic Sources</h2>
            <div className="space-y-6">
                {TRAFFIC_SOURCES.map((item, i) => (
                    <div key={i}>
                        <div className="flex justify-between text-xs font-medium mb-2">
                            <span className="text-neutral-700">{item.source}</span>
                            <span className="text-neutral-500">{item.count} <span className="text-neutral-300 mx-1">/</span> {item.percent}%</span>
                        </div>
                        <div className="w-full bg-neutral-100 rounded-full h-1.5 overflow-hidden">
                            <div 
                                className={`h-full rounded-full ${item.color}`} 
                                style={{ width: `${item.percent}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Service Interest */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
             <h2 className="font-bold text-lg mb-6">Service Interest</h2>
             <p className="text-xs text-neutral-400 mb-6 mt-[-1rem]">Based on detail page views</p>
             
             <div className="space-y-4">
                {[
                    { name: 'Digital Frame Rental', val: 55, color: 'bg-brand-black' },
                    { name: 'Photo / Video Production', val: 30, color: 'bg-brand-red' },
                    { name: 'AI Creative', val: 15, color: 'bg-neutral-300' }
                ].map((svc, i) => (
                    <div key={i} className="flex items-center p-4 border border-neutral-100 rounded-lg hover:border-neutral-300 transition-colors">
                        <div className={`w-2 h-2 rounded-full ${svc.color} mr-4`}></div>
                        <div className="flex-1">
                            <h4 className="font-bold text-sm text-neutral-800">{svc.name}</h4>
                        </div>
                        <div className="font-bold text-lg text-brand-black">{svc.val}<span className="text-xs text-neutral-400 ml-0.5">%</span></div>
                    </div>
                ))}
             </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
