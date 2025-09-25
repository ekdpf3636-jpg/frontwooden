import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";


const Loading = <div>Loading...</div>

const ItemList = lazy(() => import("../pages/plan/ItemListPage"));
const PlanList = lazy(() => import("../pages/plan/PlanListPage"));

const PlanRouter = () => {

  return[
    {
    path: "",
    element: <Navigate replace to = "itemlist"/>
    },
    {
      path: "itemlist",
      element: <Suspense fallback={Loading}><ItemList /></Suspense>,
    },
    {
      path:"planlist",
      element:<Suspense fallback={Loading}><PlanList/></Suspense>
    }
  ]
}
  

export default PlanRouter;