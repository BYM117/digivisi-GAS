import React from 'react';

const About: React.FC = () => {
  return (
    <div className="pt-24 pb-24 min-h-screen w-full bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <span className="text-brand-red font-bold tracking-widest uppercase text-xs mb-4 block">About DIGIVISI</span>
        <h1 className="text-4xl md:text-6xl font-bold mb-12 leading-tight">
          We visualize your <br/>brand value.
        </h1>
        
        <div className="prose prose-lg text-neutral-700 max-w-none">
          <p className="text-xl font-light mb-12">
            DIGIVISI는 브랜드와 공간, 그리고 행사의 본질을 시각화하는 비주얼 프로덕션 파트너입니다.
            디지털 기술과 아날로그적 감성, 그리고 AI의 효율성을 결합하여 클라이언트에게 최적의 결과물을 제공합니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-20">
             <div className="border-t border-black pt-6">
                <h3 className="font-bold text-lg mb-4">Our Standard</h3>
                <ul className="space-y-4 text-sm">
                    <li>
                        <strong>Completeness (완성도)</strong>
                        <p className="text-neutral-500 mt-1">타협하지 않는 비주얼 퀄리티를 지향합니다.</p>
                    </li>
                    <li>
                        <strong>Context (맥락)</strong>
                        <p className="text-neutral-500 mt-1">단순히 예쁜 이미지가 아닌, 기획 의도에 맞는 결과물을 만듭니다.</p>
                    </li>
                     <li>
                        <strong>Clarity (명확성)</strong>
                        <p className="text-neutral-500 mt-1">모호함 없는 정확한 소통과 납기를 약속합니다.</p>
                    </li>
                </ul>
             </div>
             <div className="border-t border-black pt-6">
                <h3 className="font-bold text-lg mb-4">Our Clients</h3>
                <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                    우리는 브랜드 마케터, 행사 기획자, 공간 디자이너와 함께 일합니다.
                    비즈니스의 언어를 이해하고, 그것을 시각적인 결과물로 치환하는 과정에 능숙합니다.
                </p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                    웨딩이나 개인 스냅 촬영보다는, 기업 및 브랜드의 아이덴티티를 표현하는 B2B 프로젝트에 집중하고 있습니다.
                </p>
             </div>
          </div>

          <div className="bg-neutral-50 p-10 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to work together?</h3>
            <p className="mb-8 text-neutral-600">
                귀사의 다음 프로젝트를 위한 시각적 파트너가 되어드리겠습니다.
            </p>
            <a href="/#/contact" className="text-brand-red font-bold underline underline-offset-4 hover:text-black transition-colors">
                지금 문의하기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
