import React, { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { ServiceType } from '../types';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    services: [] as ServiceType[],
    budget: '',
    schedule: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleServiceChange = (service: ServiceType) => {
    setFormData(prev => {
      if (prev.services.includes(service)) {
        return { ...prev, services: prev.services.filter(s => s !== service) };
      }
      return { ...prev, services: [...prev.services, service] };
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    console.log("Submitting Form:", formData);
    setTimeout(() => setSubmitted(true), 1000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send size={32} />
          </div>
          <h2 className="text-3xl font-bold mb-4">문의가 접수되었습니다.</h2>
          <p className="text-neutral-600 mb-8">
            작성해주신 내용을 바탕으로 검토 후,<br/>
            영업일 기준 1~2일 이내에 이메일로 회신드리겠습니다.
          </p>
          <button 
            onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', services: [], budget: '', schedule: '', message: '' }); }}
            className="text-sm font-bold border-b border-black pb-1 hover:text-brand-red hover:border-brand-red transition-colors"
          >
            추가 문의하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 min-h-screen w-full bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <span className="text-brand-red font-bold tracking-widest uppercase text-xs mb-4 block">Contact</span>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Get a Quote</h1>
        <p className="text-neutral-500 mb-12">
            프로젝트에 대해 알려주세요. <br/>
            DIGIVISI 팀이 최적의 솔루션을 제안해드립니다.
        </p>

        <form onSubmit={handleSubmit} className="space-y-10">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-sm font-bold block">이름 / 회사명 *</label>
                    <input 
                        type="text" name="name" required 
                        value={formData.name} onChange={handleChange}
                        className="w-full border-b border-neutral-300 py-2 focus:outline-none focus:border-brand-red transition-colors placeholder-neutral-300"
                        placeholder="홍길동 / 디지비지 주식회사"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold block">연락처 *</label>
                    <input 
                        type="tel" name="phone" required 
                        value={formData.phone} onChange={handleChange}
                        className="w-full border-b border-neutral-300 py-2 focus:outline-none focus:border-brand-red transition-colors placeholder-neutral-300"
                        placeholder="010-0000-0000"
                    />
                </div>
                <div className="col-span-1 md:col-span-2 space-y-2">
                    <label className="text-sm font-bold block">이메일 *</label>
                    <input 
                        type="email" name="email" required 
                        value={formData.email} onChange={handleChange}
                        className="w-full border-b border-neutral-300 py-2 focus:outline-none focus:border-brand-red transition-colors placeholder-neutral-300"
                        placeholder="contact@company.com"
                    />
                </div>
            </div>

            {/* Services Checklist */}
            <div className="space-y-4">
                <label className="text-sm font-bold block">필요한 서비스 (중복 선택 가능)</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { label: 'Digital Frame Rental', val: ServiceType.FRAME },
                        { label: 'Photo / Video', val: ServiceType.PHOTO_VIDEO },
                        { label: 'AI Creative', val: ServiceType.AI_CREATIVE },
                    ].map((item) => (
                        <div 
                            key={item.val}
                            onClick={() => handleServiceChange(item.val)}
                            className={`cursor-pointer border p-4 text-center text-sm font-medium transition-all ${
                                formData.services.includes(item.val) 
                                ? 'border-brand-red bg-red-50 text-brand-red' 
                                : 'border-neutral-200 text-neutral-500 hover:border-black'
                            }`}
                        >
                            {item.label}
                        </div>
                    ))}
                </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                    <label className="text-sm font-bold block">예산 범위 (선택)</label>
                    <select 
                        name="budget" 
                        value={formData.budget} 
                        onChange={handleChange}
                        className="w-full border-b border-neutral-300 py-2 bg-transparent focus:outline-none focus:border-brand-red"
                    >
                        <option value="">선택해주세요</option>
                        <option value="under_1m">100만원 미만</option>
                        <option value="1m_3m">100만원 ~ 300만원</option>
                        <option value="3m_5m">300만원 ~ 500만원</option>
                        <option value="5m_10m">500만원 ~ 1000만원</option>
                        <option value="over_10m">1000만원 이상</option>
                        <option value="undecided">미정</option>
                    </select>
                </div>
                 <div className="space-y-2">
                    <label className="text-sm font-bold block">예상 일정 (선택)</label>
                    <input 
                        type="text" name="schedule" 
                        value={formData.schedule} onChange={handleChange}
                        className="w-full border-b border-neutral-300 py-2 focus:outline-none focus:border-brand-red transition-colors placeholder-neutral-300"
                        placeholder="YYYY.MM.DD 행사 예정"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold block">문의 내용</label>
                <textarea 
                    name="message" 
                    rows={5} 
                    value={formData.message} onChange={handleChange}
                    className="w-full border border-neutral-300 p-4 text-sm focus:outline-none focus:border-brand-red transition-colors resize-none"
                    placeholder="프로젝트 개요, 장소, 필요한 수량 등 구체적인 내용을 적어주시면 빠르고 정확한 상담이 가능합니다."
                ></textarea>
            </div>

            {/* File Attachment (Mock) */}
            <div className="flex items-center space-x-4 text-sm text-neutral-500">
                <button type="button" className="flex items-center space-x-2 hover:text-black transition-colors">
                    <Paperclip size={16} />
                    <span>파일 첨부 (Reference 등)</span>
                </button>
            </div>

            <div className="pt-8">
                <button 
                    type="submit" 
                    className="w-full md:w-auto px-12 py-4 bg-brand-black text-white font-bold text-lg hover:bg-brand-red transition-colors duration-300"
                >
                    문의 보내기
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
