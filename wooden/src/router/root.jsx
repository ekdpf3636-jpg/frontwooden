import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import BasicLayout from "../layouts/BasicLayout";
import BuyerRoutes from "./BuyerRouter";
import OrderRoutes from "./OrderRouter";
import PlanRoutes  from "./PlanRouter";
import StockRoutes from "./StockRouter";

// 페이지
const UserLogin  = lazy(() => import("../pages/user/UserLogin"));
const WoodenMain = lazy(() => import("../pages/WoodenMainPage"));


const Loading = <div>Loading...</div>;

const root = createBrowserRouter([
  {
    path: "/",                         // ← 루트는 "/" 권장
    element: <BasicLayout />,          // BasicLayout 안에 <Outlet /> 필수
    children: [
      // 인덱스 라우트 (메인)
      {
        index: true,                   // ← path: "" 대신 index:true
        element: (
          <Suspense fallback={Loading}>
            <WoodenMain />
          </Suspense>
        ),
      },

      // 로그인
      {
        path: "login",
        element: (
          <Suspense fallback={Loading}>
            <UserLogin />
          </Suspense>
        ),
      },

      // 모듈 라우트 (children = 배열)
      { path: "order", children: OrderRoutes() },
      { path: "buyer", children: BuyerRoutes() },
      { path: "plan",  children: PlanRoutes() },
      { path: "stock", children: StockRoutes() },

      // (선택) 404
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

export default root;
