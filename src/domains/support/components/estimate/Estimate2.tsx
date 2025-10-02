// 견적문의 작성하는 컴포넌트

import { useState } from 'react';

interface Estimate2Props {
  onSubmit: () => void;
}

export default function Estimate2({ onSubmit }: Estimate2Props) {
  const [formData, setFormData] = useState({
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
    selectedConsentMethods: [] as string[],
    websiteType: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleConsentMethodClick = (method: string) => {
    setFormData(prev => ({
      ...prev,
      consentMethod: method
    }));
  };

  const handleMultipleConsentClick = (method: string) => {
    setFormData(prev => {
      const isSelected = prev.selectedConsentMethods.includes(method);
      return {
        ...prev,
        selectedConsentMethods: isSelected
          ? prev.selectedConsentMethods.filter(m => m !== method)
          : [...prev.selectedConsentMethods, method]
      };
    });
  };

  const handleWebsiteTypeClick = (type: string) => {
    setFormData(prev => ({
      ...prev,
      websiteType: type
    }));
  };

  const handleSubmit = () => {
    // 필수 항목 검증 (선택사항)
    if (!formData.name || !formData.contact) {
      alert('필수 항목을 입력해주세요.');
      return;
    }
    
    // Estimate3로 이동
    onSubmit();
  };

  return (
    <div className="w-full px-[450px] py-[60px]">
      <div className="max-w-6xl mx-auto bg-white">
        <h1 className="text-5xl font-bold text-center mt-18">주문제작 문의</h1>

        <div className="border-t-3 border-gray-400 pt-8 mt-40">
          <div className="flex items-center mb-6">
            <label className="w-20 flex-shrink-0 text-lg">
              제목<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="flex-1 border border-gray-300 border-2 px-4 py-3 text-lg focus:outline-none focus:border-blue-800"
            />
          </div>

          <div className="flex items-center mb-6">
            <label className="w-20 flex-shrink-0 text-lg">
              메일<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="menu"
              value={formData.menu}
              onChange={handleInputChange}
              className="flex-1 border border-gray-300 border-2 px-4 py-3 text-lg focus:outline-none focus:border-blue-800"
            />
          </div>

          <div className="flex items-center mb-6">
            <label className="w-20 flex-shrink-0 text-lg">
              연락처<span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              className="flex-1 border border-gray-300 border-2 px-4 py-3 text-lg focus:outline-none focus:border-blue-800"
            />
          </div>

          <div className="flex items-center mb-6">
            <label className="w-20 flex-shrink-0 text-lg">업체명</label>
            <input
              type="text"
              name="businessType"
              value={formData.businessType}
              onChange={handleInputChange}
              placeholder="(선택)"
              className="flex-1 border border-gray-300 border-2 px-4 py-3 text-lg focus:outline-none focus:border-blue-800"
            />
          </div>

          <div className="flex items-start mb-6 gap-4">
            <div className="flex items-center">
              <label className="w-20 flex-shrink-0 text-lg">
                이름<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-[200px] border border-gray-300 border-2 px-4 py-3 text-lg focus:outline-none focus:border-blue-800"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <label className="w-22 flex-shrink-0 text-lg ml-8">
                  비밀번호<span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-[200px] border border-gray-300 border-2 px-4 py-3 text-lg focus:outline-none focus:border-blue-800"
                />
                <p className="text-red-500 mt-1 ml-3">자동 잠금</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <label className="block mb-3 font-medium text-lg">
              상담 방식 동의<span className="text-red-500">*</span>
            </label>
            <p className="mb-4 text-gray-700 text-lg font-bold">
              입력해 주신 연락처로 전화 상담을 드리고 있습니다. 이에 동의하십니까?
            </p>
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => handleConsentMethodClick('예')}
                className={`w-38 h-10 border-2 font-medium ${
                  formData.consentMethod === '예'
                    ? 'border-blue-800 text-blue-800'
                    : 'border-gray-350 bg-white text-gray-400'
                }`}
              >
                예
              </button>
              <button
                onClick={() => handleConsentMethodClick('아니오')}
                className={`w-38 h-10 border-2 font-medium ${
                  formData.consentMethod === '아니오'
                    ? 'border-blue-800 text-blue-800'
                    : 'border-gray-350 bg-white text-gray-400'
                }`}
              >
                아니오
              </button>
            </div>

            <p className="mb-3 text-gray-400 text-base font-bold text-lg">
              ※아니오 선택 시 상담 희망 방법 선택
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => handleMultipleConsentClick('카카오톡')}
                className={`w-38 h-10 border-2 font-medium ${
                  formData.selectedConsentMethods.includes('카카오톡')
                    ? 'border-blue-800 text-blue-800'
                    : 'border-gray-350 bg-white text-gray-400'
                }`}
              >
                카카오톡
              </button>
              <button
                onClick={() => handleMultipleConsentClick('메일')}
                className={`w-38 h-10 border-2 font-medium ${
                  formData.selectedConsentMethods.includes('메일')
                    ? 'border-blue-800 text-blue-800'
                    : 'border-gray-350 bg-white text-gray-400'
                }`}
              >
                메일
              </button>
              <button
                onClick={() => handleMultipleConsentClick('개시판 답변')}
                className={`w-38 h-10 border-2 font-medium ${
                  formData.selectedConsentMethods.includes('개시판 답변')
                    ? 'border-blue-800 text-blue-800'
                    : 'border-gray-350 bg-white text-gray-400'
                }`}
              >
                개시판 답변
              </button>
            </div>
          </div>

            <div className="mb-8">
                <label className="block mb-3 font-medium text-lg">
                    인쇄방식 선택<span className="text-red-500">*</span>
                </label>
                <div className="space-y-4">  
                    <div className="flex gap-4">
                    <button
                        onClick={() => handleWebsiteTypeClick('그라비아인쇄(대량제작)')}
                        className={`w-60 h-10 border-2 font-medium ${
                        formData.websiteType === '그라비아인쇄(대량제작)'
                            ? 'border-blue-800 text-blue-800'
                            : 'border-gray-350 bg-white text-gray-400'
                        }`}
                    >
                        그라비아인쇄(대량제작)
                    </button>
                    <button
                        onClick={() => handleWebsiteTypeClick('플렉소 인쇄(친환경·소량제작)')}
                        className={`w-60 h-10 border-2 font-medium ${
                        formData.websiteType === '플렉소 인쇄(친환경·소량제작)'
                            ? 'border-blue-800 text-blue-800'
                            : 'border-gray-350 bg-white text-gray-400'
                        }`}
                    >
                        플렉소 인쇄(친환경·소량제작)
                    </button>
                    </div>
                    
                    <div className="flex gap-4">
                    <button
                        onClick={() => handleWebsiteTypeClick('디지털 인쇄(소량제작)')}
                        className={`w-60 h-10 border-2 font-medium ${
                        formData.websiteType === '디지털 인쇄(소량제작)'
                            ? 'border-blue-800 text-blue-800'
                            : 'border-gray-350 bg-white text-gray-400'
                        }`}
                    >
                        디지털 인쇄(소량제작)
                    </button>
                    <button
                        onClick={() => handleWebsiteTypeClick('기타(상담 후 결정)')}
                        className={`w-60 h-10 border-2 font-medium ${
                        formData.websiteType === '기타(상담 후 결정)'
                            ? 'border-blue-800 text-blue-800'
                            : 'border-gray-350 bg-white text-gray-400'
                        }`}
                    >
                        기타(상담 후 결정)
                    </button>
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <label className="block mb-3 font-medium text-lg">
                    유통 및 보관 환경<span className="text-red-500">*</span> <span className='text-gray-400 text-sm'>(중복 선택 가능)</span>
                </label>
                <div className="flex gap-4 mb-4">
                    <button
                        onClick={() => handleMultipleConsentClick('냉장보관')}
                        className={`w-38 h-10 border-2 font-medium ${
                        formData.selectedConsentMethods.includes('냉장보관')
                            ? 'border-blue-800 text-blue-800'
                            : 'border-gray-350 bg-white text-gray-400'
                        }`}
                    >
                        냉장보관
                    </button>
                    <button
                        onClick={() => handleMultipleConsentClick('냉동보관')}
                        className={`w-38 h-10 border-2 font-medium ${
                        formData.selectedConsentMethods.includes('냉동보관')
                            ? 'border-blue-800 text-blue-800'
                            : 'border-gray-350 bg-white text-gray-400'
                        }`}
                    >
                        냉동보관
                    </button>
                    <button
                        onClick={() => handleMultipleConsentClick('실온보관')}
                        className={`w-38 h-10 border-2 font-medium ${
                        formData.selectedConsentMethods.includes('실온보관')
                            ? 'border-blue-800 text-blue-800'
                            : 'border-gray-350 bg-white text-gray-400'
                        }`}
                    >
                        실온보관
                    </button>
                    <button
                        onClick={() => handleMultipleConsentClick('진공포장')}
                        className={`w-38 h-10 border-2 font-medium ${
                        formData.selectedConsentMethods.includes('진공포장')
                            ? 'border-blue-800 text-blue-800'
                            : 'border-gray-350 bg-white text-gray-400'
                        }`}
                    >
                        진공포장
                    </button>
                </div>
            </div>

            <div className="mb-8">
                <label className="block mb-3 font-medium text-lg">
                    재질 선택<span className="text-red-500">*</span> <span className='text-gray-400 text-sm'>(중복 선택 가능)</span>
                </label>
                <div className="flex gap-4 space-y-4">
                    <button
                        onClick={() => handleMultipleConsentClick('PET_PE')}
                        className={`w-38 h-10 border-2 font-medium ${
                        formData.selectedConsentMethods.includes('PET_PE')
                            ? 'border-blue-800 text-blue-800'
                            : 'border-gray-350 bg-white text-gray-400'
                        }`}
                    >
                        PET_PE
                    </button>
                    <button
                        onClick={() => handleMultipleConsentClick('NY+PE')}
                        className={`w-38 h-10 border-2 font-medium ${
                        formData.selectedConsentMethods.includes('NY+PE')
                            ? 'border-blue-800 text-blue-800'
                            : 'border-gray-350 bg-white text-gray-400'
                        }`}
                    >
                        NY+PE
                    </button>
                    <button
                        onClick={() => handleMultipleConsentClick('OPP+CPP')}
                        className={`w-38 h-10 border-2 font-medium ${
                        formData.selectedConsentMethods.includes('OPP+CPP')
                            ? 'border-blue-800 text-blue-800'
                            : 'border-gray-350 bg-white text-gray-400'
                        }`}
                    >
                        OPP+CPP
                    </button>
                  </div>
                    
                  <div className="flex gap-4">
                    <button
                        onClick={() => handleMultipleConsentClick('은박(증착)')}
                        className={`w-38 h-10 border-2 font-medium ${
                        formData.selectedConsentMethods.includes('은박(증착)')
                            ? 'border-blue-800 text-blue-800'
                            : 'border-gray-350 bg-white text-gray-400'
                        }`}
                    >
                        은박(증착)
                    </button>

                    <button
                        onClick={() => handleMultipleConsentClick('크라프트지')}
                        className={`w-38 h-10 border-2 font-medium ${
                        formData.selectedConsentMethods.includes('크라프트지')
                            ? 'border-blue-800 text-blue-800'
                            : 'border-gray-350 bg-white text-gray-400'
                        }`}
                    >
                        크라프트지
                    </button>

                    <button
                        onClick={() => handleMultipleConsentClick('친환경 재질(PLA 등)')}
                        className={`w-38 h-10 border-2 font-medium ${
                        formData.selectedConsentMethods.includes('친환경 재질(PLA 등)')
                            ? 'border-blue-800 text-blue-800'
                            : 'border-gray-350 bg-white text-gray-400'
                        }`}
                    >
                        친환경 재질(PLA 등)
                    </button>

                    <button
                        onClick={() => handleMultipleConsentClick('기타')}
                        className={`w-38 h-10 border-2 font-medium ${
                        formData.selectedConsentMethods.includes('기타')
                            ? 'border-blue-800 text-blue-800'
                            : 'border-gray-350 bg-white text-gray-400'
                        }`}
                    >
                        기타
                    </button>
                  </div>
            </div>

            <div className="mb-8">
                    <label className="block mb-3 font-medium text-lg">
                      후가공 선택<span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-4 mb-4">
                      <button
                        onClick={() => handleConsentMethodClick('유광')}
                        className={`w-38 h-10 border-2 font-medium ${
                          formData.consentMethod === '유광'
                            ? 'border-blue-800 text-blue-800'
                            : 'border-gray-350 bg-white text-gray-400'
                        }`}
                      >
                        유광
                      </button>
                      <button
                        onClick={() => handleConsentMethodClick('무광(※디지털 인쇄 불가)')}
                        className={`w-48 h-10 border-2 font-medium ${
                          formData.consentMethod === '무광(※디지털 인쇄 불가)'
                            ? 'border-blue-800 text-blue-800'
                            : 'border-gray-350 bg-white text-gray-400'
                        }`}
                      >
                        무광(※디지털 인쇄 불가)
                      </button>
                      <button
                        onClick={() => handleConsentMethodClick('후가공 없음')}
                        className={`w-38 h-10 border-2 font-medium ${
                          formData.consentMethod === '후가공 없음'
                            ? 'border-blue-800 text-blue-800'
                            : 'border-gray-350 bg-white text-gray-400'
                        }`}
                      >
                        후가공 없음
                      </button>
                    </div>
                  </div>

                  <div className="mb-8">
                <label className="block mb-3 font-medium text-lg">
                    디자인 파일 여부<span className="text-red-500">*</span>
                </label>
                <div className="space-y-4">  
                    <div className="flex gap-4">
                    <button
                        onClick={() => handleWebsiteTypeClick('일러스트(ai)파일 보유')}
                        className={`w-60 h-10 border-2 font-medium ${
                        formData.websiteType === '일러스트(ai)파일 보유'
                            ? 'border-blue-800 text-blue-800'
                            : 'border-gray-350 bg-white text-gray-400'
                        }`}
                    >
                        일러스트(ai)파일 보유
                    </button>
                    <button
                        onClick={() => handleWebsiteTypeClick('디자인 의뢰 예정')}
                        className={`w-60 h-10 border-2 font-medium ${
                        formData.websiteType === '디자인 의뢰 예정'
                            ? 'border-blue-800 text-blue-800'
                            : 'border-gray-350 bg-white text-gray-400'
                        }`}
                    >
                        디자인 의뢰 예정
                    </button>
                    <button
                        onClick={() => handleWebsiteTypeClick('디자인 의뢰 포함')}
                        className={`w-60 h-10 border-2 font-medium ${
                        formData.websiteType === '디자인 의뢰 포함'
                            ? 'border-blue-800 text-blue-800'
                            : 'border-gray-350 bg-white text-gray-400'
                        }`}
                    >
                        디자인 의뢰 포함
                    </button>
                    </div>
                    
                    <div className="flex gap-4">
                    <button
                        onClick={() => handleWebsiteTypeClick('로고/이미지만 보유')}
                        className={`w-60 h-10 border-2 font-medium ${
                        formData.websiteType === '로고/이미지만 보유'
                            ? 'border-blue-800 text-blue-800'
                            : 'border-gray-350 bg-white text-gray-400'
                        }`}
                    >
                        로고/이미지만 보유
                    </button>
                    <button
                        onClick={() => handleWebsiteTypeClick('참고 시안 있음')}
                        className={`w-60 h-10 border-2 font-medium ${
                        formData.websiteType === '참고 시안 있음'
                            ? 'border-blue-800 text-blue-800'
                            : 'border-gray-350 bg-white text-gray-400'
                        }`}
                    >
                        참고 시안 있음
                    </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col mt-4 gap-2 mb-12">
              <div className="flex items-center gap-7">
                <input
                  type="text"
                  className="border-2 w-124 h-7"
                />
                <button className="w-28 h-7 bg-gray-400 text-white hover:bg-gray-300 -ml-3">
                  파일 업로드
                </button>
              </div>

              <div className="text-gray-400 leading-5">
                <p>※ 첨부파일 (ai, png, jpg 등 3MB 이하)</p>
                <p>※ 용량 초과 시 별도 전달 방법 안내 예정</p>
              </div>
            </div>  

            <div className="flex items-center mb-6">
              <label className="w-24 flex-shrink-0 text-lg flex items-center">
                제작 규격
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="specification"
                value={formData.specification}
                onChange={handleInputChange}
                placeholder="ex) 170 X 270 mm"
                className="flex-1 border border-gray-300 border-2 px-4 h-10 text-lg focus:outline-none focus:border-blue-800 placeholder:text-sm"
              />
            </div>

            <div className="flex items-center mb-6">
              <label className="w-24 flex-shrink-0 text-lg flex items-center">
                제작 수량<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="number"
                value={formData.number}
                onChange={handleInputChange}
                placeholder="ex) 5,000장, 10,000장, 50,000장 이상 등"
                className="flex-1 border border-gray-300 border-2 px-4 h-10 text-lg focus:outline-none focus:border-blue-800 placeholder:text-sm"
              />
            </div>

            <div className="flex items-center mb-6">
              <label className="w-24 flex-shrink-0 text-lg flex items-center">
                포장 내용물<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="ex) 오징어채, 과일젤리, 화장품 샘플 등"
                className="flex-1 border border-gray-300 border-2 px-4 h-10 text-lg focus:outline-none focus:border-blue-800 placeholder:text-sm"
              />
            </div>

            <div className="flex items-center mb-12">
              <label className="w-24 flex-shrink-0 text-lg flex items-center">샘플 요청</label>
              <input
                type="text"
                name="sample"
                value={formData.sample}
                onChange={handleInputChange}
                placeholder="ex) 애호박 인큐 포장 및 김치 포장재 등"
                className="flex-1 border border-gray-300 border-2 px-4 h-10 text-lg focus:outline-none focus:border-blue-800 placeholder:text-sm"
              />
            </div>

            <div className="mb-8">
                <label className="block mb-3 font-medium text-lg">
                    유입 경로<span className="text-red-500">*</span> <span className='text-gray-400 text-sm'>(중복 선택 가능)</span>
                </label>
                <div className="space-y-4">  
                    <div className="flex gap-4">
                      <button
                          onClick={() => handleMultipleConsentClick('기존고객')}
                          className={`w-30 h-10 border-2 font-medium ${
                          formData.selectedConsentMethods.includes('기존고객')
                              ? 'border-blue-800 text-blue-800'
                              : 'border-gray-350 bg-white text-gray-400'
                          }`}
                      >
                          기존고객
                      </button>
                      <button
                          onClick={() => handleMultipleConsentClick('검색')}
                          className={`w-30 h-10 border-2 font-medium ${
                          formData.selectedConsentMethods.includes('검색')
                              ? 'border-blue-800 text-blue-800'
                              : 'border-gray-350 bg-white text-gray-400'
                          }`}
                      >
                          검색
                      </button>
                      <button
                          onClick={() => handleMultipleConsentClick('SNS/블로그')}
                          className={`w-30 h-10 border-2 font-medium ${
                          formData.selectedConsentMethods.includes('SNS/블로그')
                              ? 'border-blue-800 text-blue-800'
                              : 'border-gray-350 bg-white text-gray-400'
                          }`}
                      >
                          SNS/블로그
                      </button>
                      <button
                          onClick={() => handleMultipleConsentClick('소개/지인')}
                          className={`w-30 h-10 border-2 font-medium ${
                          formData.selectedConsentMethods.includes('소개/지인')
                              ? 'border-blue-800 text-blue-800'
                              : 'border-gray-350 bg-white text-gray-400'
                          }`}
                      >
                          소개/지인
                      </button>
                      <button
                          onClick={() => handleMultipleConsentClick('기타(직접입력)')}
                          className={`w-30 h-10 border-2 font-medium ${
                          formData.selectedConsentMethods.includes('기타(직접입력)')
                              ? 'border-blue-800 text-blue-800'
                              : 'border-gray-350 bg-white text-gray-400'
                          }`}
                      >
                          기타(직접입력)
                      </button>
                    </div>

                    <div className="flex gap-4">
                      <input
                        type="text"
                        name="route"
                        value={formData.route}
                        onChange={handleInputChange}
                        className="flex-1 border border-gray-300 border-2 px-4 h-10 text-lg focus:outline-none focus:border-blue-800 placeholder:text-sm"
                      />
                    </div>
                </div>
            </div>

            <div className="mb-8">
              <label className="block mb-2 font-medium text-lg">
                개인정보 수집 동의<span className="text-red-500">*</span>
              </label>
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="privacy"
                  className="w-5 h-5 border-2 border-gray-400 appearance-none checked:bg-blue-800 checked:border-blue-800"
                />
                <label htmlFor="privacy" className="text-gray-700">
                  (서비스 이용을 위한 필수 항목) 정보수집 및 이용에 동의합니다.
                </label>
              </div>
            </div>

            <div className="flex justify-end border-t border-gray-300 pt-4 mt-6">
              <button 
                onClick={handleSubmit}
                className="px-16 py-2 bg-blue-100 border-2 border-blue-800 text-blue-800 font-medium hover:bg-blue-200"
              >
                등 록
              </button>
            </div>

        </div>
      </div>
    </div>
  );
}