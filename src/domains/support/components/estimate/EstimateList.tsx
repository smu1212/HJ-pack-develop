"use client";

import { useEstimateStore } from "@domains/support/store/EstimateStore";
import { cn } from "@util/index";
interface EstimateListProps {
  onButtonClick?: () => void;
}

const styles = {
  container: "px-[450px] py-[60px]",
  title: "text-[48px] font-bold text-center pt-[72px]",
  
  inquiry: {
    wrapper: "text-center pt-40 pb-26",
    button: "bg-[#ffc8bd] text-[24px] w-[280px] h-[60px] rounded-full text-black hover:bg-red-300 font-medium",
  },
  
  table: {
    base: "w-[100%] border-t border-gray-400 text-center",
    header: "border-b border-[#a8a9a9] bg-[#fafafa] text-[#626262] py-[8px]",
    row: "border-b border-[#a8a9a9]",
    cell: "py-[14px]",
    cellLeft: "text-left pl-[32px]",
  },
  
  border: {
    primary: "border-[#929292]",
    hover: "hover:border-[#355194]",
    active: "border-[#355194]",
  },
  
  text: {
    primary: "text-[#929292]",
    primaryHover: "hover:text-[#355194]",
    active: "text-[#355194]",
  },
  
  search: {
    container: "flex items-center text-[16px] pt-[20px]",
    radioGroup: "flex gap-[28px] pr-[32px] pl-[12px]",
    radioLabel: "flex items-center gap-[4px]",  
    input: "border w-[140px] px-[4px] pr-[16px]",
    button: "border px-[8px]",
  }, 
  
  pagination: {
    container: "flex justify-center pt-[80px] pb-[112px] space-x-[8px] text-[#c8c8c8]",
    button: "flex items-center justify-center w-[32px] h-[32px] border border-[#c8c8c8] rounded-full hover:border-[#355194] hover:text-[#355194]",
    pageNupber: "px-[4px] py-[4px] h-[28px] hover:text-[#355194]",
    pageActive: "text-[#355194] border-b-[2px] border-[#355194]",
  },
  
  spacing: {
    pl16: "pl-[16px]",
    pl4: "pl-[4px]",
  },
};

export default function EstimateList({ onButtonClick }: EstimateListProps) {
  const {
    inquiries,
    searchType,
    setSearchType,
    searchText,
    setSearchText,
  } = useEstimateStore();

  const handleSearch = () => {
    console.log("검색:", searchType, searchText);
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>주문제작 문의</h1>

      <div className={styles.inquiry.wrapper}>
        <button
          onClick={onButtonClick}
          className={styles.inquiry.button}
        >
          주문제작 견적문의
        </button>
      </div>

      <div className="flex-1">
        <table className={styles.table.base}>
          <thead>
            <tr className={styles.table.header}>
              <th className={cn(styles.table.header, 'w-[60px]')}>번호</th>
              <th className={styles.table.header}>제목</th>
              <th className={cn(styles.table.header, 'w-[120px]')}>이름</th>
              <th className={cn(styles.table.header, 'w-[120px]')}>날짜</th>
              <th className={cn(styles.table.header, 'w-[90px]')}>조회</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map(({ id, title, name, date, views }) => (
              <tr key={id} className={styles.table.row}>
                <td className={styles.table.cell}>{id}</td>
                <td className={cn(styles.table.cell, styles.table.cellLeft)}>
                  {title}
                </td>
                <td className={styles.table.cell}>{name}</td>
                <td className={styles.table.cell}>{date}</td>
                <td className={styles.table.cell}>{views}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.search.container}>
          <div className={styles.search.radioGroup}>
            {["이름", "제목", "내용"].map((type) => (
              <label key={type} className={styles.search.radioLabel}>
                <input
                  type="radio"
                  name="searchType"
                  checked={searchType === type}
                  onChange={() => setSearchType(type)}
                />
                {type}
              </label>
            ))}
          </div>

          <div className="flex items-center gap-[4px]">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className={cn(
              styles.search.input,
              styles.border.primary,
              styles.border.hover
            )}
            />
            <button
              onClick={handleSearch}
              className={cn(
              styles.search.button,
              styles.text.primary,
              styles.border.primary,
              styles.border.hover,
              styles.text.primaryHover
            )}
            >
              검색
            </button>
          </div>
        </div>

        <div className={styles.pagination.container}>
          <div className="flex items-center gap-[4px]">
            <button className={styles.pagination.button}>{"<<"}</button>
            <button className={styles.pagination.button}>{"<"}</button>
          </div>

          <div className="flex items-center gap-[12px] px-[16px]">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className={cn(
                  styles.pagination.pageNupber,
                  num === 1 && styles.pagination.pageActive,
                  num === 1 ? styles.spacing.pl4 : styles.spacing.pl16
                )}
              >
                {num}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-[4px]">
            <button className={cn(styles.pagination.button)}>{">"}</button>
            <button className={styles.pagination.button}>{">>"}</button>
          </div>
        </div>
      </div>
    </section>
  );
}