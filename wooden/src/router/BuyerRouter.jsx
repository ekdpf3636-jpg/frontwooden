// Buyer라우터
import { lazy, Suspense } from 'react';


const PartList = lazy(() => import('../pages/buyer/PartListPage'));
const BuyerCustomer = lazy(() => import('../pages/buyer/BuyerCustomer'))
const PartOrder = lazy(() => import("../pages/buyer/PartOrderListPage"))
const CurrentDeliveryPage = lazy(() => import("../pages/buyer/BuyerDeliveryPage"))

const Loading = <div>Loading...</div>
const BuyerRouter = [
    {
        path:'partlist',
        element: <Suspense fallback={Loading}><PartList/></Suspense>
    },
    {
        path:'buyercustomer',
        element: <Suspense fallback={Loading}><BuyerCustomer/></Suspense>
    },
    {
        path: "partorder",
        element: <Suspense fallback={Loading}><PartOrder/></Suspense>
    },
    {
        path: "currentdelivery",
        element: <Suspense fallback={Loading}><CurrentDeliveryPage/></Suspense>
    }
];
export default BuyerRouter;