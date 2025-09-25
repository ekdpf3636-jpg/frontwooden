import axios_api from "./axios";

// 전체 조회
export const getCustomers = () => axios_api.get("/customer");

// 판매거래처명으로 단건 조회
export const getCustomerByCompany = (company) =>
  axios_api.get(`/customer/company/${company}`);

// 등록
export const createCustomer = (customer) =>
  axios_api.post("/customer", customer);

// 수정
export const updateCustomer = (id, customer) =>
  axios_api.put(`/customer/${id}`, customer);

// 삭제
export const deleteCustomer = (id) =>
  axios_api.delete(`/customer/${id}`);