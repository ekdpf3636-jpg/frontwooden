import { useEffect, useMemo, useState, useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { fetchBuyerList } from "../../api/BuyerApi";
import "./Buyer.css";

function Table({ rows, onRowClick }) {
  const safeRows = Array.isArray(rows) ? rows : [];

  return (
    <table>
      <thead>
        <tr>
          <th>번호</th>
          <th>구매처명</th>
          <th>담당자</th>
          <th>이메일</th>
          <th>전화</th>
          <th>주소</th>
        </tr>
      </thead>
      <tbody>
        {safeRows.map((r) => (
          <tr key={r?.buyerNo ?? `row-${r?.buyerComp}-${r?.buyerEmail}`}>
            <td>{r?.buyerNo ?? ""}</td>
            <td>
              <a
                href="#!"
                className="p-9"
                onClick={(e) => {
                  e.preventDefault();
                  onRowClick(r);
                }}
              >
                {r?.buyerComp ?? ""}
              </a>
            </td>
            <td>{r?.buyerName ?? ""}</td>
            <td>{r?.buyerEmail ?? ""}</td>
            <td>{r?.buyerPhone ?? ""}</td>
            <td className="addr-cell">{r?.buyerAddr ?? ""}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function BuyerListPage() {
  const nav = useNavigate();
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");

  // ✅ 항상 배열을 반환한다고 가정하고 한곳에서만 정규화
  const normalize = useCallback((arr) => {
    return (Array.isArray(arr) ? arr : []).map((r) => ({
      buyerNo:    r?.buyerNo   ?? null,
      buyerComp:  r?.buyerComp ?? "",
      buyerName:  r?.buyerName ?? "",
      buyerEmail: r?.buyerEmail?? "",
      buyerPhone: r?.buyerPhone?? "",
      buyerAddr:  r?.buyerAddr ?? "",
    }));
  }, []);

  // ✅ 공통 로더
  const loadList = useCallback(async () => {
    try {
      const list = await fetchBuyerList();   // ← 배열이 들어온다
      setRows(normalize(list));
    } catch (e) {
      console.error("[BUYER] list error:", e);
      setRows([]);
    }
  }, [normalize]);

  // ✅ 첫 로딩에 공통 로더 사용
  useEffect(() => {
    loadList();
  }, [loadList]);

  // 검색 필터
  const filteredRows = useMemo(() => {
    const q = (search ?? "").trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => (r?.buyerComp ?? "").toLowerCase().includes(q));
  }, [rows, search]);

  const goIndex = (row) => {
    if (!row?.buyerNo) return;
    nav(`/buyer/buyercustomer/${row.buyerNo}`);
  };

  return (
    <div className="buyer-page">
      <h1 className="page-title page-title--center">구매거래처</h1>

      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          placeholder="구매처명을 입력하세요"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Table rows={filteredRows} onRowClick={goIndex} />

      <button type="button" className="fab-left" onClick={() => nav("add")}>
        등록
      </button>

      {/* 모달에서 등록/수정/삭제 후 리스트 갱신용 */}
      <Outlet context={{ refresh: loadList }} />
    </div>
  );
}
