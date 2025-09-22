import { lazy,Suspense } from "react";

const Loading = <div>Loading...</div>

const StockListPage = lazy(() => import("../pages/stock/StockListPage"));
const SellListPage = lazy(() => import("../pages/stock/SellListPage"))

const StockRouter = [
  {
    path:"stock",
    element:<Suspense fallback={Loading}><StockListPage/></Suspense>
  },
  {
    path:"sell",
    element: <Suspense fallback={Loading}><SellListPage/></Suspense>
  }
]
export default StockRouter;