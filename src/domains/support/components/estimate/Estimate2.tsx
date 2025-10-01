import { useState } from 'react';

export default function Estimate2() {
  const [formData, setFormData] = useState({
    title: '',
    menu: '',
    contact: '',
    businessType: '',
    name: '',
    password: '',
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

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white">
        {/* 제목 */}
        <h1 className="text-3xl font-bold text-center mb-12">주문제작 문의</h1>

        <div className="border-t-2 border-gray-300 pt-8">
          {/* 제목 입력 */}
          <div className="flex items-center mb-6">
            <label className="w-24 flex-shrink-0 text-lg">
              제목<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="flex-1 border border-gray-300 rounded px-4 py-3 text-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* 메일 입력 */}
          <div className="flex items-center mb-6">
            <label className="w-24 flex-shrink-0 text-lg">
              메일<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="menu"
              value={formData.menu}
              onChange={handleInputChange}
              className="flex-1 border border-gray-300 rounded px-4 py-3 text-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* 연락처 입력 */}
          <div className="flex items-center mb-6">
            <label className="w-24 flex-shrink-0 text-lg">
              연락처<span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              className="flex-1 border border-gray-300 rounded px-4 py-3 text-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* 업체명 입력 */}
          <div className="flex items-center mb-6">
            <label className="w-24 flex-shrink-0 text-lg">업체명</label>
            <input
              type="text"
              name="businessType"
              value={formData.businessType}
              onChange={handleInputChange}
              placeholder="(선택)"
              className="flex-1 border border-gray-300 rounded px-4 py-3 text-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* 이름과 비밀번호 */}
          <div className="flex items-start mb-6 gap-4">
            <div className="flex items-center flex-1">
              <label className="w-24 flex-shrink-0 text-lg">
                이름<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="flex-1 border border-gray-300 rounded px-4 py-3 text-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <label className="w-24 flex-shrink-0 text-lg">
                  비밀번호<span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="flex-1 border border-gray-300 rounded px-4 py-3 text-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex">
                <div className="w-24 flex-shrink-0"></div>
                <p className="text-sm text-red-500 mt-1">자동 등급</p>
              </div>
            </div>
          </div>

          {/* 상담 방식 동의 */}
          <div className="mb-8">
            <label className="block mb-3 font-medium text-lg">
              상담 방식 동의<span className="text-red-500">*</span>
            </label>
            <p className="mb-4 text-gray-700 text-lg">
              인력해 주신 연락처로 전화 상담을 드리고 있습니다. 이에 동의하십니까?
            </p>
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => handleConsentMethodClick('예')}
                className={`w-32 py-3 border-2 rounded text-lg ${
                  formData.consentMethod === '예'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 bg-white'
                }`}
              >
                예
              </button>
              <button
                onClick={() => handleConsentMethodClick('아니오')}
                className={`w-32 py-3 border-2 rounded text-lg ${
                  formData.consentMethod === '아니오'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 bg-white'
                }`}
              >
                아니오
              </button>
            </div>

            <p className="mb-3 text-gray-600 text-base">
              ※아니오 선택 시 상담 희망 방법 선택
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => handleMultipleConsentClick('카카오톡')}
                className={`px-8 py-3 border-2 rounded text-lg ${
                  formData.selectedConsentMethods.includes('카카오톡')
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 bg-white'
                }`}
              >
                카카오톡
              </button>
              <button
                onClick={() => handleMultipleConsentClick('메일')}
                className={`px-10 py-3 border-2 rounded text-lg ${
                  formData.selectedConsentMethods.includes('메일')
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 bg-white'
                }`}
              >
                메일
              </button>
              <button
                onClick={() => handleMultipleConsentClick('개시판 답변')}
                className={`px-6 py-3 border-2 rounded text-lg ${
                  formData.selectedConsentMethods.includes('개시판 답변')
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 bg-white'
                }`}
              >
                개시판 답변
              </button>
            </div>
          </div>

          {/* 인쇄방식 선택 */}
            <div className="mb-8">
                <label className="block mb-3 font-medium text-lg">
                    인쇄방식 선택<span className="text-red-500">*</span>
                </label>
                <div className="space-y-4">  {/* ← 세로 간격을 위한 wrapper */}
                    {/* 첫 번째 줄 */}
                    <div className="flex gap-4">
                    <button
                        onClick={() => handleWebsiteTypeClick('그라비아인쇄(대량제작)')}
                        className={`px-6 py-4 border-2 rounded text-lg ${
                        formData.websiteType === '그라비아인쇄(대량제작)'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 bg-white'
                        }`}
                    >
                        그라비아인쇄(대량제작)
                    </button>
                    <button
                        onClick={() => handleWebsiteTypeClick('플렉소 인쇄(친환경·소량제작)')}
                        className={`px-6 py-4 border-2 rounded text-lg ${
                        formData.websiteType === '플렉소 인쇄(친환경·소량제작)'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 bg-white'
                        }`}
                    >
                        플렉소 인쇄(친환경·소량제작)
                    </button>
                    </div>
                    
                    {/* 두 번째 줄 */}
                    <div className="flex gap-4">
                    <button
                        onClick={() => handleWebsiteTypeClick('디지털 인쇄(소량제작)')}
                        className={`px-6 py-4 border-2 rounded text-lg ${
                        formData.websiteType === '디지털 인쇄(소량제작)'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 bg-white'
                        }`}
                    >
                        디지털 인쇄(소량제작)
                    </button>
                    <button
                        onClick={() => handleWebsiteTypeClick('기타(상담 후 결정)')}
                        className={`px-6 py-4 border-2 rounded text-lg ${
                        formData.websiteType === '기타(상담 후 결정)'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 bg-white'
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
                        className={`w-45 py-2 border-2 text-lg ${
                        formData.selectedConsentMethods.includes('냉장보관')
                            ? 'border-blue-800 text-blue-800 bg-white'
                            : 'border-gray-300 text-gray-500 bg-white'
                        }`}
                    >
                        냉장보관
                    </button>
                    <button
                        onClick={() => handleMultipleConsentClick('냉동보관')}
                        className={`w-45 py-2 border-2 text-lg ${
                        formData.selectedConsentMethods.includes('냉동보관')
                            ? 'border-blue-800 text-blue-800 bg-white'
                            : 'border-gray-300 text-gray-500 bg-white'
                        }`}
                    >
                        냉동보관
                    </button>
                    <button
                        onClick={() => handleMultipleConsentClick('실온보관')}
                        className={`w-45 py-2 border-2 text-lg ${
                        formData.selectedConsentMethods.includes('실온보관')
                            ? 'border-blue-800 text-blue-800 bg-white'
                            : 'border-gray-300 text-gray-500 bg-white'
                        }`}
                    >
                        실온보관
                    </button>
                    <button
                        onClick={() => handleMultipleConsentClick('진공포장')}
                        className={`w-45 py-2 border-2 text-lg ${
                        formData.selectedConsentMethods.includes('진공포장')
                            ? 'border-blue-800 text-blue-800 bg-white'
                            : 'border-gray-300 text-gray-500 bg-white'
                        }`}
                    >
                        진공포장
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}