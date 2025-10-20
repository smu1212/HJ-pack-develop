// store/EstimateStore.ts
import { create } from 'zustand';

// 문의 목록 아이템 타입
export interface InquiryData {
  id: number;
  title: string;
  name: string;
  date: string;
  views: number;
  specification?: string;
  number?: string;
  content?: string;
  answer?: string;
}

// 상세 문의 타입
export interface InquiryDetailData {
  title: string;
  name: string;
  specification: string;
  number: string;
  content: string;
  date?: string;
  answer?: string;
}

// 폼 데이터 타입
export interface FormData {
  title: string;
  menu: string;
  contact: string;
  businessType: string;
  name: string;
  password: string;
  specification: string;
  number: string;
  content: string;
  sample: string;
  route: string;
  consentMethod: string;
  selectedConsentMethod: string;
  consultConsent: string;
  postProcess: string;
  printMethod: string;
  designFileStatus: string;
  storageEnvironments: string[];
  materialTypes: string[];
  inflowRoutes: string[];
}

// Zustand 스토어 인터페이스
interface EstimateStore {
  // 페이지 상태
  currentStep: number;
  setCurrentStep: (step: number) => void;

  // 문의 목록
  inquiries: InquiryData[];
  addInquiry: (inquiry: InquiryDetailData) => void;

  // 선택된 문의
  selectedInquiry: InquiryDetailData | null;
  setSelectedInquiry: (inquiry: InquiryDetailData | null) => void;

  // 검색 상태
  searchType: string;
  setSearchType: (type: string) => void;
  searchText: string;
  setSearchText: (text: string) => void;

  // 폼 데이터
  formData: FormData;
  setFormData: (data: Partial<FormData>) => void;
  resetFormData: () => void;

  // EstimateDetail 상태
  inquiryContent: string;
  setInquiryContent: (content: string) => void;
  answer: string;
  setAnswer: (answer: string) => void;
}

// 초기 폼 데이터
const initialFormData: FormData = {
  title: '',
  menu: '',
  contact: '',
  businessType: '',
  name: '',
  password: '',
  specification: '',
  number: '',
  content: '',
  sample: '',
  route: '',
  consentMethod: '',
  selectedConsentMethod: '',
  consultConsent: '',
  postProcess: '',
  printMethod: '',
  designFileStatus: '',
  storageEnvironments: [],
  materialTypes: [],
  inflowRoutes: [],
};

// 초기 문의 목록
const initialInquiries: InquiryData[] = [
  { id: 10, title: "주문제작 견적 문의드립니다.", name: "홍길동", date: "2025/08/26", views: 0 },
  { id: 9, title: "[답변완료] 주문제작 견적 문의드립니다.", name: "홍길동", date: "2025/08/26", views: 0 },
  { id: 7, title: "[답변완료] 주문제작 견적 문의드립니다.", name: "홍길동", date: "2025/08/26", views: 0 },
  { id: 6, title: "[답변완료] 주문제작 견적 문의드립니다.", name: "홍길동", date: "2025/08/26", views: 0 },
  { id: 5, title: "[답변완료] 주문제작 견적 문의드립니다.", name: "홍길동", date: "2025/08/26", views: 0 },
  { id: 4, title: "[답변완료] 주문제작 견적 문의드립니다.", name: "홍길동", date: "2025/08/26", views: 0 },
  { id: 3, title: "[답변완료] 주문제작 견적 문의드립니다.", name: "홍길동", date: "2025/08/26", views: 0 },
  { id: 2, title: "[답변완료] 주문제작 견적 문의드립니다.", name: "홍길동", date: "2025/08/26", views: 0 },
  { id: 1, title: "[답변완료] 주문제작 견적 문의드립니다.", name: "홍길동", date: "2025/08/26", views: 0 },
];

// Zustand 스토어 생성
export const useEstimateStore = create<EstimateStore>((set) => ({
  // 초기 상태
  currentStep: 1,
  inquiries: initialInquiries,
  selectedInquiry: null,
  searchType: '이름',
  searchText: '',
  formData: initialFormData,
  inquiryContent: '',
  answer: '',

  // Actions
  setCurrentStep: (step) => set({ currentStep: step }),

  addInquiry: (inquiryData) => {
    const today = new Date();
    const dateStr = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`;

    set((state) => {
      const newId = state.inquiries.length > 0 ? Math.max(...state.inquiries.map(i => i.id)) + 1 : 1;
      const newInquiry: InquiryData = {
        id: newId,
        title: inquiryData.title,
        name: inquiryData.name,
        date: dateStr,
        views: 0,
        specification: inquiryData.specification,
        number: inquiryData.number,
        content: inquiryData.content,
      };

      return {
        inquiries: [newInquiry, ...state.inquiries],
        selectedInquiry: { ...inquiryData, date: dateStr },
      };
    });
  },

  setSelectedInquiry: (inquiry) => set({ selectedInquiry: inquiry }),

  setSearchType: (type) => set({ searchType: type }),
  setSearchText: (text) => set({ searchText: text }),

  setFormData: (data) => set((state) => ({
    formData: { ...state.formData, ...data }
  })),
  resetFormData: () => set({ formData: initialFormData }),

  setInquiryContent: (content) => set({ inquiryContent: content }),
  setAnswer: (answer) => set({ answer: answer }),
}));
