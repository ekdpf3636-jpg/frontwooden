import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
const L = <div>Loading...</div>;

const BuyerListPage         = lazy(()=>import("../pages/buyer/BuyerListPage"));
const BuyerAddModalRoute    = lazy(()=>import("../pages/buyer/BuyerAddModalRoute"));
const BuyerIndexModalRoute  = lazy(()=>import("../pages/buyer/BuyerIndexModalRoute"));
const BuyerModifyModalRoute = lazy(()=>import("../pages/buyer/BuyerModifyModalRoute"));

export default function BuyerRoutes() {
  return [
    { index: true, element: <Navigate replace to="buyercustomer" /> },
    {
      path: "buyercustomer",
      element: <Suspense fallback={L}><BuyerListPage/></Suspense>, // 항상 리스트 렌더
      children: [
        { path: "add",          element: <Suspense fallback={L}><BuyerAddModalRoute/></Suspense> },
        { path: ":id",          element: <Suspense fallback={L}><BuyerIndexModalRoute/></Suspense> },
        { path: "modify/:id",   element: <Suspense fallback={L}><BuyerModifyModalRoute/></Suspense> },
      ],
    },
  ];
}
