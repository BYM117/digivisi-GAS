import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Monitor, Camera, Bot } from 'lucide-react';
import { SERVICES, PROCESS_STEPS } from '../constants';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { PortfolioItem } from '../types';

const Home: React.FC = () => {
  const [recentWorks, setRecentWorks] = useState<PortfolioItem[]>([]);
  
  useEffect(() => {
    const fetchRecentWorks = async () => {
      try {
        // Fetch top 3 recent items
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
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden flex items-center">
        {/* Background Image & Overlay - Absolute Full Width */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop" 
            alt="Abstract Digital Production Background" 
            className="w-full h-full object-cover object-center"
          />
          {/* Dark overlay with gradient for depth */}
          <div className="absolute inset-0 bg-neutral-950/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
        </div>
        
        {/* Content Container - Constrained & Centered */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pt-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tighter mb-8 text-white animate-fade-in-up">
              우리는<br/>
              <span className="text-brand-red">비주얼</span>을 만듭니다.
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 max-w-xl mb-12 font-light leading-relaxed">
              디지털, 촬영, AI를 결합한 B2B 비주얼 스튜디오.<br/>
              브랜드, 행사, 공간에 최적화된 시각적 경험을 제공합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#services" className="px-10 py-4 border border-white text-white hover:bg-white hover:text-brand-black transition-all duration-300 text-sm font-bold tracking-wide text-center">
                서비스 보기
              </a>
              <Link to="/contact" className="px-10 py-4 bg-brand-red text-white border border-brand-red hover:bg-red-700 transition-all duration-300 text-sm font-bold tracking-wide text-center">
                문의하기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE MAKE */}
      <section className="py-24 border-t border-neutral-100 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-2xl md:text-4xl font-medium leading-snug mb-20 text-center max-w-4xl mx-auto">
            "브랜드·행사·공간을 위한 본질적인 시각적 결과물을 제작합니다."
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
      <section id="services" className="py-32 bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <div key={service.id} className="group border border-neutral-800 p-8 hover:border-brand-red transition-colors duration-300 flex flex-col justify-between h-96 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative z-10">
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

                <Link to={service.path} className="relative z-10 inline-flex items-center text-sm font-medium hover:text-brand-red transition-colors mt-auto">
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
            <h2 className="text-3xl font-bold tracking-tight">Recent Works</h2>
            <Link to="/portfolio" className="text-sm text-neutral-500 hover:text-brand-red underline decoration-1 underline-offset-4">전체 보기</Link>
          </div>
          
          {recentWorks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentWorks.map((item) => (
                <Link key={item.id} to="/portfolio" className="group relative aspect-[4/5] overflow-hidden bg-neutral-100">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0 grayscale"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x500?text=No+Image'; }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-end p-6">
                    <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-xs font-bold text-brand-red uppercase tracking-wider mb-1 block">{item.category.replace('_', ' ')}</span>
                      <h3 className="text-white font-medium">{item.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-neutral-50 text-neutral-400 border border-neutral-100 rounded">
              <p>업데이트된 포트폴리오가 없습니다. 관리자 페이지에서 추가해주세요.</p>
            </div>
          )}
        </div>
      </section>

      {/* WHY DIGIVISI */}
      <section className="py-32 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8">Why DIGIVISI?</h2>
            <p className="text-neutral-600 mb-8 leading-relaxed">
              우리는 단순한 제작사가 아닙니다. 공간과 목적을 이해하고, 가장 효과적인 시각적 언어로 번역합니다.
            </p>
            <Link to="/about" className="text-sm font-bold border-b border-black pb-1 hover:text-brand-red hover:border-brand-red transition-colors">
              회사 소개 더보기
            </Link>
          </div>
          <div className="space-y-6">
            {[
              "촬영·AI·디지털 디스플레이를 결합한 통합 솔루션",
              "기획 의도에 철저히 맞춘 맞춤형 결과물",
              "B2B 비즈니스에 최적화된 명확한 커뮤니케이션",
              "설치부터 철수까지 책임지는 현장 케어"
            ].map((item, i) => (
              <div key={i} className="flex items-start">
                <div className="mt-1 mr-4 w-5 h-5 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-brand-red">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span className="text-lg font-medium text-brand-black">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-sm font-bold text-brand-red uppercase tracking-widest mb-12">Use Cases</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 border-t border-neutral-200 pt-8">
            {[
              { title: "Brand Promotion", desc: "브랜드 프로모션 행사" },
              { title: "Exhibition", desc: "팝업/전시/쇼룸" },
              { title: "Architecture", desc: "인테리어·공간 준공" },
              { title: "Social Content", desc: "제품·SNS 콘텐츠" },
              { title: "Conference", desc: "기업 세미나 기록" },
            ].map((item, i) => (
              <div key={i} className="group cursor-default">
                <h3 className="font-bold text-lg mb-2 group-hover:text-brand-red transition-colors">{item.title}</h3>
                <p className="text-sm text-neutral-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-32 bg-brand-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-16">Work Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-bold text-neutral-800 mb-4">{step.step}</div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-xs text-neutral-400 leading-normal">{step.description}</p>
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-8 right-0 w-full h-[1px] bg-neutral-800 -mr-4" style={{ left: '50%', width: '100%'}}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT TEASER */}
      <section className="py-32 bg-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">Ready to Visualize?</h2>
          <p className="text-neutral-600 mb-10">
            프로젝트의 시작을 함께 고민합니다.<br/>
            단순 견적 문의도 언제든 환영합니다.
          </p>
          <Link to="/contact" className="inline-block px-12 py-4 bg-brand-red text-white text-lg font-medium hover:bg-red-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            프로젝트 문의하기
          </Link>
        </div>
      </section>

      {/* SEO BLOCK */}
      <section className="py-12 bg-neutral-50 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-xs text-neutral-400 leading-relaxed text-justify">
            <p>
              DIGIVISI는 브랜드와 공간의 가치를 시각화하는 전문 프로덕션입니다. 우리는 <strong>디지털 액자 렌탈</strong> 서비스를 통해 전시 및 행사 공간에 최적화된 디스플레이 솔루션을 제공하며, 
              전문 포토그래퍼 팀이 <strong>행사 촬영</strong>, <strong>전시 촬영</strong>, 그리고 감각적인 <strong>인테리어 사진</strong>을 통해 현장의 분위기를 생생하게 기록합니다.
              또한, 변화하는 디지털 환경에 맞춰 <strong>AI 이미지 제작</strong> 및 <strong>AI 영상</strong> 솔루션을 도입하여, 기존의 방식으로는 구현하기 어려웠던 창의적인 <strong>브랜드 비주얼 제작</strong>을 지원합니다.
              쇼핑몰 및 마케팅을 위한 <strong>상세페이지 이미지</strong> 기획부터 기업의 아이덴티티를 담은 <strong>브랜드 영상</strong> 제작까지, DIGIVISI는 B2B 클라이언트의 성공적인 비주얼 커뮤니케이션을 위한 올인원 파트너입니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;