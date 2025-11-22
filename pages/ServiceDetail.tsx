import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { SERVICES, PROCESS_STEPS, PORTFOLIO_ITEMS } from '../constants';
import { ServiceType } from '../types';

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Map URL param to ServiceType enum logic
  let serviceType: ServiceType | undefined;
  if (id === 'frame') serviceType = ServiceType.FRAME;
  else if (id === 'photo-video') serviceType = ServiceType.PHOTO_VIDEO;
  else if (id === 'ai-creative') serviceType = ServiceType.AI_CREATIVE;

  const service = SERVICES.find(s => s.id === serviceType);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  const relatedPortfolio = PORTFOLIO_ITEMS.filter(item => item.category === service.id).slice(0, 3);

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-brand-black text-white py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="text-brand-red font-bold tracking-widest uppercase text-sm mb-4 block">Service</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{service.title}</h1>
          <p className="text-xl text-neutral-400 max-w-2xl font-light">{service.subtitle}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-2xl font-bold mb-6">Overview</h2>
          <p className="text-neutral-600 leading-relaxed mb-8 text-lg">
            {service.description}
          </p>
          
          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-lg mb-4 border-l-4 border-brand-red pl-4">Key Features</h3>
              <ul className="space-y-3">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-neutral-700">
                    <Check size={18} className="text-brand-red mr-3 mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 border-l-4 border-neutral-200 pl-4">Recommended For</h3>
              <div className="flex flex-wrap gap-2">
                {service.useCases.map((useCase, i) => (
                  <span key={i} className="px-3 py-1 bg-neutral-100 text-sm text-neutral-600 rounded-full">
                    {useCase}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          <div className="aspect-video bg-neutral-100 overflow-hidden">
            <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
          </div>

          <div className="bg-neutral-50 p-8 border border-neutral-200">
            <h3 className="font-bold mb-4">Process</h3>
            <ul className="space-y-4 relative">
                <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-neutral-200"></div>
                {PROCESS_STEPS.slice(0, 5).map((step) => (
                    <li key={step.step} className="relative pl-6">
                        <div className="absolute left-0 top-1.5 w-3.5 h-3.5 bg-white border-2 border-brand-black rounded-full"></div>
                        <span className="text-sm font-bold block">{step.title}</span>
                        <span className="text-xs text-neutral-500">{step.description}</span>
                    </li>
                ))}
            </ul>
          </div>
        </div>
      </section>

       {/* Related Portfolio */}
       {relatedPortfolio.length > 0 && (
        <section className="py-24 bg-white border-t border-neutral-100">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-2xl font-bold mb-8">Related Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedPortfolio.map(item => (
                        <Link key={item.id} to="/portfolio" className="group block">
                            <div className="aspect-[4/3] bg-neutral-200 overflow-hidden mb-3">
                                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                            </div>
                            <h3 className="font-bold text-sm group-hover:text-brand-red transition-colors">{item.title}</h3>
                            <p className="text-xs text-neutral-500">{item.description}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
       )}

      {/* CTA */}
      <section className="py-20 bg-brand-red text-white text-center">
         <h2 className="text-3xl font-bold mb-6">Start Your Project</h2>
         <p className="mb-8 opacity-90">구체적인 견적과 일정이 궁금하신가요?</p>
         <Link to="/contact" className="inline-block bg-white text-brand-red px-8 py-3 font-bold hover:bg-neutral-100 transition-colors">
            문의하기
         </Link>
      </section>
    </div>
  );
};

export default ServiceDetail;