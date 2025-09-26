import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { fetchBuyerById, removeBuyer } from "../../api/BuyerApi";
import Modal from "../../components/buyer_Modal/Modal";

export default function BuyerIndexModalRoute() {
  const { id } = useParams(); 
  const nav = useNavigate();
  const [row, setRow] = useState(null);
  const { refresh } = useOutletContext();

useEffect(() => {
  (async () => {
    const buyer = await fetchBuyerById(id); 
    setRow(buyer);
  })();
}, [id]);

  if(!row) return <Modal open onClose={()=>nav("..")}><div className="p-4">로딩중…</div></Modal>;

  const onDelete = async ()=>{
    if(!window.confirm("삭제하시겠습니까?")) return;
    await removeBuyer(row.buyerNo);
    refresh();
    nav("..", { replace: true }); // 리스트로
  };

  return (
    <Modal open onClose={()=>nav("..")}>
      <div className="p-4">
        <h1 className="page-title">구매거래처 상세</h1>
        <div className="buyerIndex-wrapper">
          <div className="buyerlabel">구매처명:</div><div className="p-8">{row.buyerComp}</div>
          <div className="buyerlabel">담당자:</div><div className="p-8">{row.buyerName}</div>
          <div className="buyerlabel">이메일:</div><div className="p-8">{row.buyerEmail}</div>
          <div className="buyerlabel">전화번호:</div><div className="p-8">{row.buyerPhone}</div>
          <div className="buyerlabel">주소:</div><div className="p-8">{row.buyerAddr}</div>
        </div>
        <div style={{ display:"flex", gap:12, marginTop:20 }}>
          <button className="btn btn-gray" onClick={()=>nav(`../modify/${row.buyerNo}`)}>수정</button>
          <button className="btn btn-gray" onClick={onDelete}>삭제</button>
          <button className="btn btn-gray" onClick={()=>nav("..")}>닫기</button>
        </div>
      </div>
    </Modal>
  );
}
