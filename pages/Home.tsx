
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Monitor, Camera, Bot } from 'lucide-react';
import { SERVICES } from '../constants';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { PortfolioItem } from '../types';

// Slideshow Data
const HERO_SLIDES = [
  {
    id: 1,
    // Naver pstatic images often require no-referrer policy to work on external sites
    image: "https://postfiles.pstatic.net/MjAyNTEyMTlfMTE4/MDAxNzY2MDgzMzYyNTQx.tHEiLvM1DvS1anl4OjLMXzkWsjMdXKiw4x4w0MMhuG0g.ycvlMyOiSb8XPblcZIMwzVNmR83lGSGnYsVHtQ-BISEg.PNG/%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C_(4).png?type=w966",
    label: "DIGITAL FRAME",
    sub: "Space Direction"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1000",
    label: "PHOTO & VIDEO",
    sub: "Professional Shooting"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000",
    label: "AI CREATIVE",
    sub: "Generative Art"
  }
];

const Home: React.FC = () => {
  const [recentWorks, setRecentWorks] = useState<PortfolioItem[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Slide Interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000); // Increased duration for better viewing
    return () => clearInterval(timer);
  }, []);

  // Fetch Portfolio
  useEffect(() => {
    const fetchRecentWorks = async () => {
      try {
        const q = query(collection(db, "portfolio"), orderBy("createdAt", "desc"), limit(3));
        const querySnapshot = await getDocs(q);
        const loadedItems = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as PortfolioItem[];
        setRecentWorks(loadedItems);
      } catch (error) {
        console.error("Error fetching recent works:", error);
      }
    };
    fetchRecentWorks();
  }, []);

  return (
    <div className="w-full font-sans bg-white">
      {/* NEW HERO SECTION: Clean White + Korean Type + Slideshow */}
      <section className="relative min-h-screen w-full bg-white text-brand-black overflow-hidden flex flex-col pt-20 md:pt-0">
        
        {/* Simple Grid Lines (Subtle) */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="absolute left-6 md:left-12 top-0 bottom-0 w-[1px] bg-neutral-200"></div>
            <div className="absolute right-6 md:right-12 top-0 bottom-0 w-[1px] bg-neutral-200"></div>
        </div>

        <div className="flex-grow grid grid-cols-1 md:grid-cols-12 h-full relative z-10 max-w-[1920px] mx-auto w-full items-center">
            
            {/* Left Content: Typography */}
            <div className="col-span-12 md:col-span-6 flex flex-col justify-center px-6 md:pl-24 relative z-20 mt-12 md:mt-0 order-2 md:order-1">
                <div className="mb-6 inline-flex items-center space-x-3">
                    <span className="w-12 h-[1px] bg-brand-red"></span>
                    <span className="text-xs font-bold tracking-widest uppercase text-neutral-400">Visual Production Studio</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight mb-8">
                    우리는<br/>
                    비주얼을<br/>
                    만듭니다<span className="text-brand-red">.</span>
                </h1>
                
                <p className="text-neutral-600 max-w-md text-base md:text-lg leading-relaxed mb-12 font-medium">
                    브랜드와 공간의 언어를 가장 감각적인<br/>
                    시각 언어로 번역하는 크리에이티브 파트너.
                </p>

                <div className="flex items-center gap-4">
                    <Link to="/portfolio" className="bg-brand-black text-white px-8 py-4 text-sm font-bold hover:bg-brand-red transition-colors duration-300 flex items-center group shadow-lg">
                        포트폴리오 보기
                        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Right Content: Object Slideshow */}
            <div className="col-span-12 md:col-span-6 relative h-[50vh] md:h-screen w-full flex items-center justify-center overflow-hidden order-1 md:order-2">
                 
                 {/* Slides */}
                 {HERO_SLIDES.map((slide, index) => (
                    <div 
                        key={slide.id}
                        className={`absolute inset-0 flex items-center justify-center transition-all duration-[1500ms] ease-out ${
                            index === currentSlide 
                            ? 'opacity-100 z-10' 
                            : 'opacity-0 z-0'
                        }`}
                    >
                        {/* 
                            Animation Logic: 
                            Active: Scale 1.0 (Normal)
                            Inactive: Scale 1.1 (Slightly zoomed in)
                            Result: Gentle zoom-out effect when appearing
                        */}
                        <div className={`relative w-full h-full flex items-center justify-center transition-transform duration-[2000ms] ease-out ${
                             index === currentSlide ? 'scale-100' : 'scale-105'
                        }`}>
                            
                            {/* Image Container - Using object-contain to show the FULL product including frame */}
                            <div className="relative w-[80%] h-[80%] md:w-[70%] md:h-[70%] flex items-center justify-center">
                                <img 
                                    src={slide.image} 
                                    alt={slide.label} 
                                    className="w-full h-full object-contain drop-shadow-2xl"
                                    referrerPolicy="no-referrer"
                                />
                                
                                {/* Label Tag - Animated */}
                                <div className={`absolute -bottom-0 -left-4 md:-bottom-12 md:-left-12 bg-white/90 backdrop-blur-sm p-4 md:p-6 shadow-xl border border-neutral-100 transition-all duration-1000 delay-500 ${
                                    index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                }`}>
                                    <span className="block text-[10px] text-neutral-400 font-bold uppercase tracking-widest mb-1">{slide.sub}</span>
                                    <span className="block text-xl md:text-2xl font-black tracking-tighter">{slide.label}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                 ))}

                 {/* Slide Indicators */}
                 <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 flex space-x-3 z-20">
                    {HERO_SLIDES.map((_, idx) => (
                        <button 
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`h-1.5 transition-all duration-500 rounded-full shadow-sm ${
                                idx === currentSlide ? 'bg-brand-red w-12' : 'bg-neutral-200 w-3 hover:bg-neutral-300'
                            }`}
                        />
                    ))}
                 </div>
            </div>
        </div>
      </section>

      {/* WHAT WE MAKE */}
      <section className="py-24 border-t border-neutral-100 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-2xl md:text-3xl font-medium leading-relaxed mb-20 text-center max-w-3xl mx-auto">
            "DIGIVISI는 <span className="font-bold border-b-4 border-brand-red/20">디지털, 촬영, AI</span> 기술을 결합하여<br/>
            가장 진보된 형태의 비주얼 솔루션을 제공합니다."
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-50 transition-colors">
                <Monitor className="w-8 h-8 text-brand-black group-hover:text-brand-red transition-colors" />
              </div>
              <h3 className="text-lg font-bold mb-2">Digital Display</h3>
              <p className="text-sm text-neutral-500">전시/행사 디스플레이 솔루션</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-50 transition-colors">
                <Camera className="w-8 h-8 text-brand-black group-hover:text-brand-red transition-colors" />
              </div>
              <h3 className="text-lg font-bold mb-2">Visual Production</h3>
              <p className="text-sm text-neutral-500">사진 및 영상 촬영</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-50 transition-colors">
                <Bot className="w-8 h-8 text-brand-black group-hover:text-brand-red transition-colors" />
              </div>
              <h3 className="text-lg font-bold mb-2">AI Creative</h3>
              <p className="text-sm text-neutral-500">AI 기반 이미지/영상 생성</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section id="services" className="py-32 bg-brand-black text-white relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red rounded-full filter blur-[120px] opacity-20 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <div key={service.id} className="group border border-neutral-800 p-8 hover:border-brand-red transition-all duration-300 flex flex-col justify-between h-96 relative overflow-hidden bg-neutral-900/50 backdrop-blur-sm">
                
                <div className="relative z-10">
                  <span className="text-brand-red font-mono text-xs mb-4 block">0{index + 1}</span>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-6">{service.subtitle}</p>
                  <ul className="space-y-2">
                    {service.features.slice(0, 2).map((feature, i) => (
                      <li key={i} className="text-neutral-500 text-xs flex items-center">
                        <div className="w-1 h-1 bg-brand-red rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link to={service.path} className="relative z-10 inline-flex items-center text-sm font-medium hover:text-brand-red transition-colors mt-auto group-hover:translate-x-2 duration-300">
                  자세히 보기 <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO PREVIEW */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
                 <span className="text-brand-red font-bold text-xs tracking-widest uppercase block mb-2">Selected Works</span>
                 <h2 className="text-4xl font-bold tracking-tight">Recent Projects</h2>
            </div>
            <Link to="/portfolio" className="text-sm font-bold border-b border-black pb-1 hover:text-brand-red hover:border-brand-red transition-all">VIEW ALL</Link>
          </div>
          
          {recentWorks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentWorks.map((item) => (
                <Link key={item.id} to="/portfolio" className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100 mb-4">
                    <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x500?text=No+Image'; }}
                    />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-lg group-hover:text-brand-red transition-colors">{item.title}</h3>
                        <p className="text-xs text-neutral-500 uppercase tracking-wide mt-1">{item.category.replace('_', ' ')}</p>
                    </div>
                    <ArrowRight size={18} className="text-neutral-300 group-hover:text-brand-red -rotate-45 group-hover:rotate-0 transition-all duration-300" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-neutral-50 border border-neutral-100">
              <p className="text-neutral-400 mb-4">업데이트된 포트폴리오가 없습니다.</p>
              <Link to="/admin/login" className="text-xs font-bold underline">관리자 로그인</Link>
            </div>
          )}
        </div>
      </section>

      {/* WHY DIGIVISI */}
      <section className="py-32 bg-[#F2F2F2] border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-brand-red font-bold text-xs tracking-widest uppercase block mb-4">Our Philosophy</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Not just visuals,<br/>
                We build <span className="bg-brand-red text-white px-2">Context.</span>
            </h2>
            <p className="text-neutral-600 mb-8 leading-relaxed max-w-md">
              단순히 보기 좋은 이미지를 만드는 것을 넘어, 브랜드와 공간의 맥락(Context)을 이해하고 가장 효과적인 시각적 언어로 번역합니다.
            </p>
            <Link to="/about" className="inline-flex items-center text-sm font-bold border-b-2 border-brand-black pb-1 hover:text-brand-red hover:border-brand-red transition-colors">
              MORE ABOUT US <ArrowRight size={14} className="ml-2" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {[
              { title: "Integrated Solution", desc: "촬영, AI, 디스플레이를 아우르는 올인원 비주얼 솔루션" },
              { title: "Context-Driven", desc: "기획 의도와 공간의 특성을 반영한 맞춤형 결과물" },
              { title: "B2B Professional", desc: "비즈니스에 최적화된 명확한 커뮤니케이션과 납기 준수" },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 border border-neutral-200 hover:border-brand-red transition-colors group">
                <h3 className="text-lg font-bold mb-2 group-hover:text-brand-red transition-colors">{item.title}</h3>
                <p className="text-sm text-neutral-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-neutral-200 pb-8">
            <h2 className="text-3xl font-bold">Client Use Cases</h2>
            <p className="text-sm text-neutral-500 mt-4 md:mt-0">다양한 산업군의 클라이언트와 함께합니다.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { title: "Brand Promotion", desc: "브랜드 프로모션 행사" },
              { title: "Exhibition", desc: "팝업/전시/쇼룸" },
              { title: "Architecture", desc: "인테리어·공간 준공" },
              { title: "Social Content", desc: "제품·SNS 콘텐츠" },
              { title: "Conference", desc: "기업 세미나 기록" },
            ].map((item, i) => (
              <div key={i} className="group cursor-default p-4 border border-transparent hover:border-neutral-100 hover:bg-neutral-50 transition-all rounded">
                <div className="w-8 h-1 bg-brand-red mb-4 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-brand-red transition-colors">{item.title}</h3>
                <p className="text-xs text-neutral-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT TEASER */}
      <section className="py-32 bg-brand-black text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">LET'S VISUALIZE.</h2>
          <p className="text-neutral-400 mb-10 text-lg">
            당신의 프로젝트에 가장 강력한 시각적 힘을 더해드립니다.
          </p>
          <Link to="/contact" className="inline-block px-12 py-5 bg-white text-brand-black text-lg font-bold hover:bg-brand-red hover:text-white transition-all duration-300">
            견적 문의하기
          </Link>
        </div>
      </section>

      {/* SEO BLOCK */}
      <section className="py-12 bg-white border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-[10px] text-neutral-400 leading-relaxed text-justify font-mono">
            <p>
              DIGIVISI STUDIO | Visual Production | Seoul, Korea. We specialize in Digital Frame Rental, Event Photography, Architectural Photography, and AI-Generated Visuals. 
              우리는 브랜드와 공간의 가치를 시각화하는 전문 프로덕션입니다. <strong>디지털 액자 렌탈</strong> 서비스를 통해 전시 및 행사 공간에 최적화된 디스플레이 솔루션을 제공하며, 
              전문 포토그래퍼 팀이 <strong>행사 촬영</strong>, <strong>전시 촬영</strong>, 그리고 감각적인 <strong>인테리어 사진</strong>을 통해 현장의 분위기를 생생하게 기록합니다.
              또한, <strong>AI 이미지 제작</strong> 및 <strong>AI 영상</strong> 솔루션을 도입하여, 창의적인 <strong>브랜드 비주얼 제작</strong>을 지원합니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
