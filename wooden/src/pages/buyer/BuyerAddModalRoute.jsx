import { useMemo, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { createBuyer } from "../../api/BuyerApi";
import Modal from "../../components/buyer_Modal/Modal";
import BuyerForm from "../../form/BuyerForm";

export default function BuyerAddModalRoute() {
  const nav = useNavigate();
  const { refresh } = useOutletContext();   // ✅ 리스트 새로고침 함수 가져오기
  const [form, setForm] = useState({
    buyerComp: "",
    buyerName: "",
    buyerEmail: "",
    buyerPhone: "",
    buyerAddr: ""
  });
  const [submitting, setSubmitting] = useState(false);

  const emailRe = useMemo(() => /^\S+@\S+\.\S+$/, []);
  const phoneRe = useMemo(() => /^[0-9]{10,11}$/, []);

  const onChange = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.buyerComp.trim()) return alert("구매처명을 입력하세요.");
    if (!form.buyerName.trim()) return alert("담당자를 입력하세요.");
    if (!emailRe.test(form.buyerEmail)) return alert("이메일 형식을 확인하세요.");
    if (!phoneRe.test(form.buyerPhone)) return alert("전화번호(숫자 10~11자리)만 입력하세요.");
    if (!form.buyerAddr.trim()) return alert("주소를 입력하세요.");

    try {
      setSubmitting(true);
      await createBuyer(form);
      alert("등록 완료!");

      await refresh(); // ✅ 리스트 갱신
      nav("..", { replace: true }); // ✅ 모달 닫고 리스트로 복귀
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open onClose={() => nav("..")}>
      <BuyerForm
        value={form}
        onChange={onChange}
        onSubmit={onSubmit}
        onCancel={() => nav("..")}
        submitting={submitting}
        mode="add"
        title="구매거래처 등록"
      />
    </Modal>
  );
}
