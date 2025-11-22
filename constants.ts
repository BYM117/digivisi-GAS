
import { ServiceType, ServiceInfo, PortfolioItem, ProcessStep, Inquiry } from './types';

export const CONTACT_EMAIL = "contact@digivisi.com";
export const INSTAGRAM_LINK = "https://instagram.com/digivisi";

export const SERVICES: ServiceInfo[] = [
  {
    id: ServiceType.FRAME,
    title: "Digital Frame Rental",
    subtitle: "행사·전시·브랜드 공간용 디지털 액자 렌탈",
    description: "전시와 행사의 품격을 높이는 하이엔드 디지털 액자 솔루션입니다. 설치부터 철수, 콘텐츠 세팅까지 완벽한 공간 연출을 지원합니다.",
    features: [
      "다양한 사이즈의 고화질 디지털 액자",
      "전문가 설치 및 철수 지원",
      "전시 테마에 맞춘 콘텐츠 업로드 및 세팅",
      "다중 디스플레이 싱크 및 반복 재생 연출"
    ],
    useCases: ["브랜드 런칭 행사", "갤러리형 전시", "백화점 팝업 스토어", "기업 쇼룸 비주얼 연출"],
    imageUrl: "https://picsum.photos/800/600?grayscale&random=1",
    path: "/service/frame"
  },
  {
    id: ServiceType.PHOTO_VIDEO,
    title: "Photo / Video",
    subtitle: "브랜드·행사·공간을 기록하는 촬영",
    description: "순간의 기록을 넘어 브랜드의 가치를 담습니다. 행사 스케치부터 감각적인 공간 촬영까지 B2B 전문 촬영 팀이 함께합니다.",
    features: [
      "전문 장비를 활용한 고퀄리티 행사 스케치",
      "건축/인테리어 전문 공간 촬영",
      "제품 및 SNS 마케팅용 콘텐츠 촬영",
      "현장 하이라이트 영상 편집 및 납품"
    ],
    useCases: ["기업 세미나/컨퍼런스", "공간 준공 기록", "브랜드 프로모션 이벤트", "소셜 미디어 비주얼 에셋"],
    imageUrl: "https://picsum.photos/800/600?grayscale&random=2",
    path: "/service/photo-video"
  },
  {
    id: ServiceType.AI_CREATIVE,
    title: "AI Creative",
    subtitle: "전문가가 설계하는 AI 이미지·영상",
    description: "단순한 생성을 넘어, 디자이너의 감각으로 설계된 고품질 AI 비주얼을 제공합니다. 현실에 없는 이미지를 가장 현실적으로 구현합니다.",
    features: [
      "초현실적 브랜드 비주얼 및 키비주얼 제작",
      "쇼핑몰/상세페이지용 고효율 AI 이미지",
      "시선을 사로잡는 숏폼용 AI 영상 소스",
      "전문가 리터칭을 포함한 완벽한 마감"
    ],
    useCases: ["신제품 컨셉 이미지", "패션/뷰티 브랜드 룩북", "판타지/SF 컨셉의 광고 비주얼", "빠른 프로토타이핑이 필요한 시안"],
    imageUrl: "https://picsum.photos/800/600?grayscale&random=3",
    path: "/service/ai-creative"
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { id: '1', title: 'Tech Conference 2024', category: ServiceType.PHOTO_VIDEO, imageUrl: 'https://picsum.photos/600/800?grayscale&random=10', description: 'Global Summit Main Hall Sketch' },
  { id: '2', title: 'Cosmetic Brand Pop-up', category: ServiceType.FRAME, imageUrl: 'https://picsum.photos/600/800?grayscale&random=11', description: 'Digital Wall Installation' },
  { id: '3', title: 'Future City Concept', category: ServiceType.AI_CREATIVE, imageUrl: 'https://picsum.photos/600/800?grayscale&random=12', description: 'AI Generated Key Visual' },
  { id: '4', title: 'Luxury Hotel Lounge', category: ServiceType.PHOTO_VIDEO, imageUrl: 'https://picsum.photos/600/800?grayscale&random=13', description: 'Interior Photography' },
  { id: '5', title: 'Art Gallery Exhibition', category: ServiceType.FRAME, imageUrl: 'https://picsum.photos/600/800?grayscale&random=14', description: '4K Frame Rental Service' },
  { id: '6', title: 'Eco-Friendly Product', category: ServiceType.AI_CREATIVE, imageUrl: 'https://picsum.photos/600/800?grayscale&random=15', description: 'Product Concept Visualization' },
];

export const PROCESS_STEPS: ProcessStep[] = [
  { step: 1, title: "Consulting", description: "프로젝트 목표와 요구사항 확인" },
  { step: 2, title: "Planning", description: "최적의 솔루션 제안 및 견적 산출" },
  { step: 3, title: "Production", description: "촬영, AI 생성, 기기 준비 등 본 작업" },
  { step: 4, title: "Retouching", description: "전문가의 후보정 및 퀄리티 업" },
  { step: 5, title: "Delivery", description: "최종 결과물 납품 및 피드백" },
  { step: 6, title: "Setup", description: "(Option) 현장 설치 및 운영 지원" },
];

export const MOCK_INQUIRIES: Inquiry[] = [
  {
    id: '1001',
    date: '2024-05-20',
    name: '김철수',
    company: '스타트업 A',
    phone: '010-1234-5678',
    email: 'kim@startup-a.com',
    services: [ServiceType.PHOTO_VIDEO],
    budget: '3m_5m',
    schedule: '2024.06.15',
    message: '투자 유치를 위한 IR 행사 스케치 촬영 문의드립니다.',
    status: 'NEW'
  },
  {
    id: '1002',
    date: '2024-05-19',
    name: '이영희',
    company: '뷰티 브랜드 B',
    phone: '010-9876-5432',
    email: 'lee@beauty-b.co.kr',
    services: [ServiceType.FRAME, ServiceType.AI_CREATIVE],
    budget: '5m_10m',
    schedule: '2024.07.01',
    message: '성수동 팝업스토어에 설치할 디지털 액자 5대와 그 안에 들어갈 AI 기반 브랜드 영상 제작이 필요합니다.',
    status: 'IN_PROGRESS'
  },
  {
    id: '1003',
    date: '2024-05-18',
    name: '박지성',
    company: '전시기획사 C',
    phone: '010-5555-7777',
    email: 'park@exhibit-c.com',
    services: [ServiceType.FRAME],
    budget: 'over_10m',
    schedule: '2024.08.10',
    message: '대형 미디어 아트 전시를 기획 중입니다. 장기 렌탈 견적 부탁드립니다.',
    status: 'COMPLETED'
  }
];
