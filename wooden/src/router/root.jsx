import { lazy,Suspense } from "react";
import Header from "../layouts/BasicLayout";
import OrderRouter from "./OrderRouter";
import BuyerRouter from "./BuyerRouter";
import PlanRouter from "./PlanRouter";
import StockRouter from "./StockRouter";

const {createBrowserRouter} = require("react-router-dom");

const UserLogin = lazy(() => import('../pages/login/UserLogin'))
const WoodenMain = lazy(() => import("../pages/WoodenMainPage"))

const Loading = <div>Loading...</div>

const root = createBrowserRouter([
    {
        path:'',
        element: <Header/>,
        children:[
            {
                path:"",
                element:<Suspense fallback={Loading}><WoodenMain/></Suspense>
            },
            
            {
                path:"login",
                element: <Suspense fallback={Loading}><UserLogin/></Suspense>
            },
            ...OrderRouter,
            ...BuyerRouter,
            ...PlanRouter,
            ...StockRouter
        ]
    },
]);
export default root;

