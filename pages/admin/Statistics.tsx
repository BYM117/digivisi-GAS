
import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Users, MessageSquare, Calendar, PieChart } from 'lucide-react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import { Inquiry, ServiceType } from '../../types';

const Statistics: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [weeklyData, setWeeklyData] = useState<{ day: string; count: number }[]>([]);
  const [serviceStats, setServiceStats] = useState<{ name: string; count: number; percent: number; color: string }[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    thisMonth: 0,
    avgPerDay: "0.0"
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "inquiries"), orderBy("createdAt", "asc")); // Get all to calculate stats
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Inquiry));
        
        setInquiries(data);
        processInquiryData(data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const processInquiryData = (data: Inquiry[]) => {
    const now = new Date();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(now.getDate() - (6 - i));
      return {
        dateObj: d,
        label: d.toLocaleDateString('en-US', { weekday: 'short' }), // Mon, Tue
        dateStr: d.toISOString().split('T')[0], // 2024-05-20
        count: 0
      };
    });

    let thisMonthCount = 0;
    const currentMonthStr = now.toISOString().slice(0, 7); // 2024-05

    // Service Counters
    const sCounts = {
      [ServiceType.FRAME]: 0,
      [ServiceType.PHOTO_VIDEO]: 0,
      [ServiceType.AI_CREATIVE]: 0
    };
    let totalServicesSelected = 0;

    data.forEach(inq => {
      // 1. Weekly Trend
      // Inquiry date string might be YYYY.MM.DD or YYYY-MM-DD depending on input, assume YYYY-MM-DD for standard
      // Or use createdAt if available. Let's try to match the date string.
      // The Inquiry type has 'date' as string. In Contact.tsx we saved it as ISO string split T.
      const inqDate = inq.date; 
      const dayStat = last7Days.find(d => d.dateStr === inqDate);
      if (dayStat) {
        dayStat.count++;
      }

      // 2. Monthly Stats
      if (inqDate.startsWith(currentMonthStr)) {
        thisMonthCount++;
      }

      // 3. Service Interest
      if (inq.services) {
        inq.services.forEach(s => {
          if (sCounts[s] !== undefined) {
            sCounts[s]++;
            totalServicesSelected++;
          }
        });
      }
    });

    // Update States
    setWeeklyData(last7Days.map(d => ({ day: d.label, count: d.count })));
    
    setStats({
      total: data.length,
      thisMonth: thisMonthCount,
      avgPerDay: (data.length / 30).toFixed(1) // Rough average over last 30 days assumption or just total/days
    });

    // Calculate Percentages for Services
    const total = totalServicesSelected || 1; // prevent div by zero
    setServiceStats([
      { 
        name: 'Digital Frame', 
        count: sCounts[ServiceType.FRAME], 
        percent: Math.round((sCounts[ServiceType.FRAME] / total) * 100),
        color: 'bg-brand-black' 
      },
      { 
        name: 'Photo / Video', 
        count: sCounts[ServiceType.PHOTO_VIDEO], 
        percent: Math.round((sCounts[ServiceType.PHOTO_VIDEO] / total) * 100),
        color: 'bg-brand-red' 
      },
      { 
        name: 'AI Creative', 
        count: sCounts[ServiceType.AI_CREATIVE], 
        percent: Math.round((sCounts[ServiceType.AI_CREATIVE] / total) * 100),
        color: 'bg-neutral-300' 
      }
    ]);
  };

  // Calculate coordinates for chart
  const maxCount = Math.max(...weeklyData.map(d => d.count), 5); // Minimum scale of 5
  const points = weeklyData.map((d, i) => {
    const x = (i / (weeklyData.length - 1)) * 100;
    const y = 100 - (d.count / maxCount) * 100;
    return `${x},${y}`;
  }).join(' ');

  if (loading) {
    return <div className="p-8 text-center text-neutral-400">Loading Analytics...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="text-neutral-500 text-sm mt-1">Real-time inquiry & preference data.</p>
        </div>
        <div className="bg-white border border-neutral-200 px-4 py-2 rounded text-sm font-medium text-neutral-600 shadow-sm">
            Last 7 Days
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 rounded-lg bg-red-50 text-brand-red">
                    <MessageSquare size={18} />
                </div>
                <div className="flex items-center text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                    Live Data
                </div>
            </div>
            <h3 className="text-2xl font-bold mb-1 tracking-tight">{stats.total}</h3>
            <p className="text-xs text-neutral-400 font-medium">Total Inquiries (All Time)</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 rounded-lg bg-neutral-50 text-neutral-600">
                    <Calendar size={18} />
                </div>
            </div>
            <h3 className="text-2xl font-bold mb-1 tracking-tight">{stats.thisMonth}</h3>
            <p className="text-xs text-neutral-400 font-medium">Inquiries This Month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 rounded-lg bg-neutral-50 text-neutral-600">
                    <PieChart size={18} />
                </div>
            </div>
            <h3 className="text-2xl font-bold mb-1 tracking-tight">
                {serviceStats.sort((a,b) => b.percent - a.percent)[0]?.name || 'N/A'}
            </h3>
            <p className="text-xs text-neutral-400 font-medium">Most Popular Service</p>
        </div>
      </div>

      {/* Main Chart: Weekly Inquiry Trend */}
      <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200">
        <h2 className="font-bold text-lg mb-8">Weekly Inquiry Trend</h2>
        <div className="relative h-72 w-full">
            {/* Background Grid */}
            <div className="absolute inset-0 flex flex-col justify-between text-xs text-neutral-300 font-mono pointer-events-none">
                {[100, 75, 50, 25, 0].map(v => (
                    <div key={v} className="border-b border-dashed border-neutral-100 w-full h-0 flex items-center">
                        <span className="absolute -left-8">{Math.round(maxCount * (v/100))}</span>
                    </div>
                ))}
            </div>

            {/* SVG Layer */}
            <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                <defs>
                    <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#E0301E" stopOpacity="0.05" />
                        <stop offset="100%" stopColor="#E0301E" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <polygon points={`0,100 ${points} 100,100`} fill="url(#gradient)" />
                <polyline points={points} fill="none" stroke="#E0301E" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            </svg>

            {/* HTML Dots Overlay */}
            <div className="absolute inset-0">
                {weeklyData.map((d, i) => {
                    const x = (i / (weeklyData.length - 1)) * 100;
                    const y = 100 - (d.count / maxCount) * 100;
                    return (
                        <div 
                            key={i}
                            className="absolute group"
                            style={{ left: `${x}%`, top: `${y}%` }}
                        >
                            <div className="relative -translate-x-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center cursor-pointer">
                                <div className="w-2 h-2 bg-brand-red rounded-full transition-transform duration-200 group-hover:scale-150 shadow-sm"></div>
                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                    <div className="bg-brand-black text-white text-[10px] py-1 px-2 rounded whitespace-nowrap">
                                        {d.day}: {d.count} Inquiries
                                    </div>
                                    <div className="w-2 h-2 bg-brand-black transform rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
        
        <div className="flex justify-between mt-4 px-0 text-xs text-neutral-400 font-medium uppercase tracking-wider">
            {weeklyData.map((d, i) => <span key={i}>{d.day}</span>)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Service Interest */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <h2 className="font-bold text-lg mb-6">Service Demand</h2>
            <div className="space-y-6">
                {serviceStats.map((item, i) => (
                    <div key={i}>
                        <div className="flex justify-between text-xs font-medium mb-2">
                            <span className="text-neutral-700">{item.name}</span>
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

        {/* Empty State Placeholder for future feature */}
        <div className="bg-neutral-50 p-6 rounded-lg border border-dashed border-neutral-300 flex flex-col items-center justify-center text-center">
             <div className="bg-white p-3 rounded-full mb-4">
                <Users className="text-neutral-400" size={24} />
             </div>
             <h3 className="font-bold text-neutral-600 mb-1">More Insights Coming Soon</h3>
             <p className="text-xs text-neutral-400 max-w-xs">
                Google Analytics integration is required for detailed visitor traffic sources.
             </p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
