import React from "react";
import "../pages/buyer/Buyer.css";

export default function BuyerForm({
  value, onChange, onSubmit, onCancel, submitting = false, mode = "add", title,
}) {
  const btnText = mode === "edit" ? "수정 완료" : "등록";
  const pageTitle = title ?? (mode === "edit" ? "구매거래처 수정" : "구매거래처 등록");

  return (
    <div className="p-4">
      <h1 className="page-title">{pageTitle}</h1>
      <form className="buyer-form" onSubmit={onSubmit} noValidate>
        <label htmlFor="buyerComp" className="buyerlabel">구매처명</label>
        <input id="buyerComp" value={value.buyerComp} onChange={(e)=>onChange("buyerComp", e.target.value)} maxLength={20} autoFocus/>

        <label htmlFor="buyerName" className="buyerlabel">담당자</label>
        <input id="buyerName" value={value.buyerName} onChange={(e)=>onChange("buyerName", e.target.value)} maxLength={10}/>

        <label htmlFor="buyerPhone" className="buyerlabel">전화번호</label>
        <input id="buyerPhone" type="tel" inputMode="numeric" placeholder="숫자만" maxLength={11} 
        value={value.buyerPhone} 
        onChange={(e)=>onChange("buyerPhone", e.target.value.replace(/[^0-9]/g,"").slice(0,11))} />

        <label htmlFor="buyerEmail" className="buyerlabel">이메일</label>
        <input id="buyerEmail" type="email" value={value.buyerEmail} onChange={(e)=>onChange("buyerEmail", e.target.value)} maxLength={40}/>

        <label htmlFor="buyerAddr" className="buyerlabel">주소</label>
        <input id="buyerAddr" value={value.buyerAddr} onChange={(e)=>onChange("buyerAddr", e.target.value)} maxLength={50} />

        <div className="actions">
          <button className="btn btn-gray" type="submit" disabled={submitting}>{submitting ? "처리중..." : btnText}</button>
          <button className="btn btn-gray" type="button" onClick={onCancel} disabled={submitting}>취소</button>
        </div>
      </form>
    </div>
  )
}