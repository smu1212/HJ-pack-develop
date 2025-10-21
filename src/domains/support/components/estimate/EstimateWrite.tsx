import { useState } from 'react';
import { cn } from '@util/index';
interface EstimateWriteProps {
  onSubmit: (inquiryData: {
    title: string;
    name: string;
    specification: string;
    number: string;
    content: string;
  }) => void;
}

const styles = {
  input: {
    base: "border-[2px] border-[#929292] px-[16px] text-[18px] focus:outline-none focus:border-[#355194]",
    full: "flex-1 py-[12px]",
    medium: "w-[200px] py-[12px]",
    text: "flex-1 h-[40px] placeholder:text-[14px]",
  },
  button: {
    base: "border-[2px] font-medium",
    small: "w-[152px] h-[40px]",
    medium: "w-[240px] h-[40px]",
    route: "w-[120px] h-[40px]",
    selected: "border-[#355194] text-[#355194]",
    default: "border-[#929292] bg-white text-[#929892]",
    disabled: "opacity-50 cursor-not-allowed",
  },
  label: {
    row: "flex items-center pb-[24px]",
    text: "flex-shrink-0 text-[18px]",
    width80: "w-[80px]",
    width96: "w-[96px]",
    block: "block pb-[12px] pt-[8px] font-medium text-[18px]",
  },
  section: "pb-[32px]",
  grid: {
    row: "flex gap-[16px]",
    rowWithSpace: "flex gap-[16px] pb-[16px]",
    column: "space-y-[16px]",
  }
};

export default function EstimateWrite({ onSubmit }: EstimateWriteProps) {
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
    consultConsent: '',
    selectedConsentMethod: '',
    postProcess: '',
    printMethod: '',   
    designFileStatus: '',
    storageEnvironments: [] as string[],
    materialTypes: [] as string[],
    inflowRoutes: [] as string[],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSingleSelect = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleToggleSelect = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev] === value ? '' : value
    }));
  };

  const handleMultiSelect = (field: 'storageEnvironments' | 'materialTypes' | 'inflowRoutes', item: string) => {
    setFormData(prev => {
      const currentArray = prev[field];
      const isSelected = currentArray.includes(item);
      return {
        ...prev,
        [field]: isSelected
          ? currentArray.filter(i => i !== item)
          : [...currentArray, item],
      };
    });
  };

  const handleConsultConsentClick = (value: string) => {
    setFormData(prev => ({
      ...prev,
      consultConsent: value,
      selectedConsentMethod: value === '예' ? '' : prev.selectedConsentMethod
    }));
  };

  const getButtonClass = (isSelected: boolean, isDisabled: boolean = false, customWidth?: string) => {
    return cn(
      customWidth || styles.button.small,
      styles.button.base,
      isSelected ? styles.button.selected : styles.button.default,
      isDisabled && styles.button.disabled
    );
  };

  const getSubmitButtonText = () => {
    return isLoading ? '접수 중...' : '등 록';
  };

  const handleSubmit = async () => {
    setError(null);
    
    if (!formData.name || !formData.contact || !formData.menu) {
      setError('필수 항목을 입력해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      const requestData = {
        name: formData.name,
        phone: formData.contact,
        email: formData.menu,
        company: formData.businessType,
        companyPhone: formData.contact,
        content: `제목: ${formData.title}\n규격: ${formData.specification}\n수량: ${formData.number}\n내용: ${formData.content}`
      };

      const response = await fetch('https://api.dev.hj-pack.eoe.sh/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`API 요청 실패: ${response.statusText}`);
      }

      const data = await response.json();
      
      onSubmit?.({
        title: formData.title,
        name: formData.name,
        specification: formData.specification,
        number: formData.number,
        content: formData.content,
      });

      alert('견적 요청이 성공적으로 접수되었습니다.');
      console.log('API 응답:', data);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '요청 중 오류가 발생했습니다.';
      setError(errorMessage);
      console.error('API 에러:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full px-[450px] py-[60px]">
      <div className="max-w-[1152px] mx-auto bg-white">
        <h1 className="text-[48px] font-bold text-center pt-[72px] pb-[104px]">주문제작 문의</h1>

        {error && (
          <div className="pt-[16px] p-[16px] bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="border-t-[3px] border-[#929292] pt-[40px]">
          <div className={styles.label.row}>
            <label className={cn(styles.label.width80, styles.label.text)}>
              제목<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={cn(styles.input.base, styles.input.full)}
            />
          </div>

          <div className={styles.label.row}>
            <label className={cn(styles.label.width80, styles.label.text)}>
              메일<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="menu"
              value={formData.menu}
              onChange={handleInputChange}
              className={cn(styles.input.base, styles.input.full)}
            />
          </div>

          <div className={styles.label.row}>
            <label className={cn(styles.label.width80, styles.label.text)}>
              연락처<span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              className={cn(styles.input.base, styles.input.full)}
            />
          </div>

          <div className={styles.label.row}>
            <label className={cn(styles.label.width80, styles.label.text)}>업체명</label>
            <input
              type="text"
              name="businessType"
              value={formData.businessType}
              onChange={handleInputChange}
              placeholder="(선택)"
              className={cn(styles.input.base, styles.input.full)}
            />
          </div>

          <div className="flex items-start pb-[48px] gap-[16px]">
            <div className="flex items-center">
              <label className={cn(styles.label.width80, styles.label.text)}>
                이름<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={cn(styles.input.base, styles.input.medium)}
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <label className="w-[128px] flex-shrink-0 text-[18px] pl-[32px]">
                  비밀번호<span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={cn(styles.input.base, styles.input.medium)}
                />
                <p className="text-red-500 pt-[4px] pl-[12px]">자동 잠금</p>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <label className={styles.label.block}>
              상담 방식 동의<span className="text-red-500">*</span>
            </label>
            <p className="pb-[16px] text-gray-700 text-[18px] font-bold">
              입력해 주신 연락처로 전화 상담을 드리고 있습니다. 이에 동의하십니까?
            </p>
            <div className={styles.grid.rowWithSpace}>
              <button
                onClick={() => handleConsultConsentClick('예')}
                className={getButtonClass(formData.consultConsent === '예')}
              >
                예
              </button>
              <button
                onClick={() => handleConsultConsentClick('아니오')}
                className={getButtonClass(formData.consultConsent === '아니오')}
              >
                아니오
              </button>
            </div>

            <p className="pb-[12px] text-gray-400 text-base font-bold text-[16px]">
              ※아니오 선택 시 상담 희망 방법 선택
            </p>
            <div className={styles.grid.row}>
              {['카카오톡', '메일', '개시판 답변'].map(method => (
                <button
                  key={method}
                  onClick={() => handleToggleSelect('selectedConsentMethod', method)}
                  disabled={formData.consultConsent === '예'}
                  className={getButtonClass(
                    formData.selectedConsentMethod === method,
                    formData.consultConsent === '예'
                  )}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <label className={styles.label.block}>
              인쇄방식 선택<span className="text-red-500">*</span>
            </label>
            <div className={styles.grid.column}>
              <div className={styles.grid.row}>
                {['그라비아인쇄(대량제작)', '플렉소 인쇄(친환경·소량제작)'].map(method => (
                  <button
                    key={method}
                    onClick={() => handleSingleSelect('printMethod', method)}
                    className={getButtonClass(formData.printMethod === method, false, styles.button.medium)}
                  >
                    {method}
                  </button>
                ))}
              </div>
              <div className={styles.grid.row}>
                {['디지털 인쇄(소량제작)', '기타(상담 후 결정)'].map(method => (
                  <button
                    key={method}
                    onClick={() => handleSingleSelect('printMethod', method)}
                    className={getButtonClass(formData.printMethod === method, false, styles.button.medium)}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <label className={styles.label.block}>
              유통 및 보관 환경<span className="text-red-500">*</span>{' '}
              <span className="text-gray-400 text-[14px]">(중복 선택 가능)</span>
            </label>
            <div className={styles.grid.rowWithSpace}>
              {['냉장보관', '냉동보관', '실온보관', '진공포장'].map(env => (
                <button
                  key={env}
                  onClick={() => handleMultiSelect('storageEnvironments', env)}
                  className={getButtonClass(formData.storageEnvironments.includes(env))}
                >
                  {env}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <label className={styles.label.block}>
              재질 선택<span className="text-red-500">*</span>{' '}
              <span className="text-gray-400 text-[14px]">(중복 선택 가능)</span>
            </label>
            <div className={styles.grid.row}>
              {['PET_PE', 'NY+PE', 'OPP+CPP'].map(material => (
                <button
                  key={material}
                  onClick={() => handleMultiSelect('materialTypes', material)}
                  className={getButtonClass(formData.materialTypes.includes(material))}
                >
                  {material}
                </button>
              ))}
            </div>
            <div className={cn(styles.grid.row, 'pt-[16px]')}>
              {['은박(증착)', '크라프트지', '친환경 재질(PLA 등)', '기타'].map(material => (
                <button
                  key={material}
                  onClick={() => handleMultiSelect('materialTypes', material)}
                  className={getButtonClass(formData.materialTypes.includes(material))}
                >
                  {material}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <label className={styles.label.block}>
              후가공 선택<span className="text-red-500">*</span>
            </label>
            <div className={styles.grid.rowWithSpace}>
              <button
                onClick={() => handleSingleSelect('postProcess', '유광')}
                className={getButtonClass(formData.postProcess === '유광')}
              >
                유광
              </button>
              <button
                onClick={() => handleSingleSelect('postProcess', '무광(※디지털 인쇄 불가)')}
                className={getButtonClass(formData.postProcess === '무광(※디지털 인쇄 불가)', false, 'w-[192px] h-[40px]')}
              >
                무광(※디지털 인쇄 불가)
              </button>
              <button
                onClick={() => handleSingleSelect('postProcess', '후가공 없음')}
                className={getButtonClass(formData.postProcess === '후가공 없음')}
              >
                후가공 없음
              </button>
            </div>
          </div>

          <div className={styles.section}>
            <label className={styles.label.block}>
              디자인 파일 여부<span className="text-red-500">*</span>
            </label>
            <div className={styles.grid.column}>
              <div className={styles.grid.row}>
                {['일러스트(ai)파일 보유', '디자인 의뢰 예정', '디자인 의뢰 포함'].map(status => (
                  <button
                    key={status}
                    onClick={() => handleSingleSelect('designFileStatus', status)}
                    className={getButtonClass(formData.designFileStatus === status, false, styles.button.medium)}
                  >
                    {status}
                  </button>
                ))}
              </div>
              <div className={styles.grid.row}>
                {['로고/이미지만 보유', '참고 시안 있음'].map(status => (
                  <button
                    key={status}
                    onClick={() => handleSingleSelect('designFileStatus', status)}
                    className={getButtonClass(formData.designFileStatus === status, false, styles.button.medium)}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col pt-[16px] gap-[8px] pb-[48px]">
            <div className="flex items-center gap-[28px]">
              <input
                type="text"
                className="border-[2px] w-[496px] h-[28px] border-[#929292] hover:border-[#355194]"
              />
              <button className="w-[112px] h-[28px] bg-[#929292] text-white hover:bg-[#355194] -pl-[12px]">
                파일 업로드
              </button>
            </div>
            <div className="text-[#929292] leading-5">
              <p>※ 첨부파일 (ai, png, jpg 등 3MB 이하)</p>
              <p>※ 용량 초과 시 별도 전달 방법 안내 예정</p>
            </div>
          </div>

          <div className={styles.label.row}>
            <label className={cn(styles.label.width96, styles.label.text)}>
              제작 규격<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="specification"
              value={formData.specification}
              onChange={handleInputChange}
              placeholder="ex) 170 X 270 mm"
              className={cn(styles.input.base, styles.input.text)}
            />
          </div>

          <div className={styles.label.row}>
            <label className={cn(styles.label.width96, styles.label.text)}>
              제작 수량<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleInputChange}
              placeholder="ex) 5,000장, 10,000장, 50,000장 이상 등"
              className={cn(styles.input.base, styles.input.text)}
            />
          </div>

          <div className={styles.label.row}>
            <label className={cn(styles.label.width96, styles.label.text)}>
              포장 내용물<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="ex) 오징어채, 과일젤리, 화장품 샘플 등"
              className={cn(styles.input.base, styles.input.text)}
            />
          </div>

          <div className="flex items-center pb-[48px]">
            <label className={cn(styles.label.width96, styles.label.text)}>샘플 요청</label>
            <input
              type="text"
              name="sample"
              value={formData.sample}
              onChange={handleInputChange}
              placeholder="ex) 애호박 인큐 포장 및 김치 포장재 등"
              className={cn(styles.input.base, styles.input.text)}
            />
          </div>

          <div className="pb-8">
            <label className={styles.label.block}>
              유입 경로<span className="text-red-500">*</span>{' '}
              <span className="text-gray-400 text-[14px]">(중복 선택 가능)</span>
            </label>
            <div className={styles.grid.column}>
              <div className={styles.grid.row}>
                {['기존고객', '검색', 'SNS/블로그', '소개/지인', '기타(직접입력)'].map(route => (
                  <button
                    key={route}
                    onClick={() => handleMultiSelect('inflowRoutes', route)}
                    className={getButtonClass(formData.inflowRoutes.includes(route), false, styles.button.route)}
                  >
                    {route}
                  </button>
                ))}
              </div>
              <div className="flex gap-4">
                <input
                  type="text"
                  name="route"
                  value={formData.route}
                  onChange={handleInputChange}
                  className={cn(styles.input.base, styles.input.text)}
                />
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <label className="block pb-[8px] font-medium text-[18px]">
              개인정보 수집 동의<span className="text-red-500">*</span>
            </label>
            <div className="flex items-start gap-[8px]">
              <input
                type="checkbox"
                id="privacy"
                className="w-[20px] h-[20px] border-[2px] border-[#929292] appearance-none checked:bg-blue-800 checked:border-[#355194]"
              />
              <label htmlFor="privacy">
                (서비스 이용을 위한 필수 항목) 정보수집 및 이용에 동의합니다.
              </label>
            </div>
          </div>

          <div className="flex justify-end border-t border-[#929292] pt-[16px] pt-[24px]">
            <button 
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-[64px] py-[8px] bg-[#d6e4ff] border-[2px] border-[#355194] text-[#355194] font-bold hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {getSubmitButtonText()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}