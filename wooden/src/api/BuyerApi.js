import http from "./http";

// 모든 응답을 같은 규칙으로 "언랩"하는 유틸
const unwrap = (promise) =>
  promise.then((res) => {
    // res.data가 ApiResponse라면 res.data.data, 아니면 res.data
    const d = res?.data;
    return d && Object.prototype.hasOwnProperty.call(d, "data") ? d.data : d;
  });

// ===== BUYER API =====
// 목록 (배열 반환)
export const fetchBuyerList   = () => unwrap(http.get("/buyer/buyercustomer"));

// 단건 (객체 반환)
export const fetchBuyerById   = (id) => unwrap(http.get(`/buyer/buyercustomer/${id}`));

// 등록 (생성된 객체 반환)
export const createBuyer      = (payload) => unwrap(http.post("/buyer/buyercustomer/add", payload));

// 수정 (수정된 객체 반환)
export const modifyBuyer      = (id, payload) => unwrap(http.put(`/buyer/buyercustomer/modify/${id}`, payload));

// 삭제 (성공 시 true/빈 객체 정도 반환될 수 있음 → 필요 시 boolean으로 가공)
export const removeBuyer      = (id) => unwrap(http.delete(`/buyer/buyercustomer/${id}`));
