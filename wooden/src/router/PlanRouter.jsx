import { lazy, Suspense } from "react";



const Loading = <div>Loading...</div>

const ItemList = lazy(() => import("../pages/plan/ItemListPage"));
const PlanList = lazy(() => import("../pages/plan/PlanListPage"));

const PlanRouter = [
  {
    path: "itemlist",
    element: <Suspense fallback={Loading}><ItemList /></Suspense>,
  },
  {
    path:"plan",
    element:<Suspense fallback={Loading}><PlanList/></Suspense>
  }
]
export default PlanRouter;