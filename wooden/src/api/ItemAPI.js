import axios_api from "./axios";

// 전체 조회
export const getItems = () => axios_api.get("/item");

// 단건 조회
export const getItemById = (id) => axios_api.get(`/item/${id}`);

// 등록
export const createItem = (item) => axios_api.post("/item", item);

// 수정
export const updateItem = (id, item) => axios_api.put(`/item/${id}`, item);

// 삭제
export const deleteItem = (id) => axios_api.delete(`/item/${id}`);
