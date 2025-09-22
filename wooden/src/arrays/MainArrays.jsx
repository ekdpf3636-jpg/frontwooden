export const OrderList = [
    { id: 1, name: "판매거래처",path:'customer'},
    { id: 2, name: "상품주문서",path:'orderlist'},
    { id: 3, name: "주문완료현황",path:"orderreceive"}
  ];

  export const BuyerList = [
    {id: 1, name:"구매거래처",path:'buyercustomer'},
    {id: 2, name: "부품리스트", path:'partlist'},
    {id: 3, name:"부품발주",path:"partorder"},
    {id: 4, name:"입고완료현황",path:"currentdelivery"}
  ]
  export const PlanList = [
    {id:1, name:"상품리스트",path:"itemlist"},
    {id:2, name:"생산리스트",path:"plan"},
  ]
  export const StockList = [
    {id :1, name:"생산완료재고",path:"stock"},
    {id :2, name:"실제판매수량",path:"sell"},
  ]


  export const NavBar = [
    { 
      id: 1, name:"ORDER", path:'/customer'
    },
    {
      id: 2, name:"BUYER",path:'/buyercustomer'
    },
    {
      id: 3, name:"PLAN",path:'/itemlist'
    },
    {
      id: 4, name:"STOCK",path:'/stock'
    }
  ];

  export const TestAdmin = {
    "ID":"admin",
    "Password":"1234"
  }




