//< Order라우터 >
import { lazy, Suspense } from "react";


const CustomerList = lazy(() => import("../pages/order/CustomerListPage"));
const OrderApprovePage = lazy(() => import("../pages/order/OrderApprovePage"));
const OrderListPage = lazy(() => import("../pages/order/OrderListPage"));

const Loading = <div>Loading...</div>;

const OrderRouter = [
  
  {
    path: "orderlist",
    element: <Suspense fallback={Loading}><OrderListPage /></Suspense>,
  },
  {
    path: "customer",
    element: <Suspense fallback={Loading}><CustomerList/></Suspense>
  },
  {
    path: "orderreceive",
    element: <Suspense fallback={Loading}><OrderApprovePage/></Suspense>
  }
];

export default OrderRouter;
