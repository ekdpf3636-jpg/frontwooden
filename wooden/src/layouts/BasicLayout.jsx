import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { NavBar } from "../arrays/MainArrays";
import AsideComponent from "../components/AsideComponent";

const BasicLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ 상태는 [값, 세터]로 받기 + 네이밍 통일(카멜케이스)
  const [setAsideId] = useState(null);  //const [asideId, setAsideId] = useState(null);
  const [navId, setNavId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 경로 ↔ Nav ID 매핑 (헤더 강조용)
  const activeNavMap = {
    "/order/orderlist": 1,
    "/order/sellercustomer": 1,
    "/order/orderreceive": 1,
    "/buyer/partlist": 2,
    "/buyer/buyercustomer": 2,
    "/buyer/partorder": 2,
    "/buyer/buyerdelivery": 2,
    "/plan/itemlist": 3,
    "/plan/planlist": 3,
    "/stock/stocklist": 4,
    "/stock/sellamount": 4,
  };

  // 현재 경로 기준으로 강조될 Nav ID
  const currentNavIdFromPath = activeNavMap[location.pathname] ?? null;

  // Aside 표시 그룹
  const asideGroups = {
    order: "/order",
    buyer: "/buyer",
    plan: "/plan",
    stock: "/stock",
  };

  const orderAside = location.pathname.startsWith(asideGroups.order);
  const buyerAside = location.pathname.startsWith(asideGroups.buyer);
  const planAside  = location.pathname.startsWith(asideGroups.plan);
  const stockAside = location.pathname.startsWith(asideGroups.stock);

  function navigateAndReset(path) {
    setAsideId(null);
    setNavId(null);
    navigate(path);
  }

  function handleNavClick(list) {
    // 클릭 즉시 로컬 상태도 갱신 (UX 반응성 ↑)
    setNavId(list.id);
  }

  useEffect(() => {
    // 로그인 상태 로드
    const loginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loginStatus === "true");

    // 경로가 바뀔 때마다 navId를 경로 기반으로 동기화
    setNavId(currentNavIdFromPath);
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <header>
        <div className="logo">
          <h1>
            <Link to="/">테스트로고</Link>
          </h1>
        </div>

        <nav>
          <ul className="header-ul">
            {NavBar.map((data) => (
              <li
                key={data.id}
                className={(navId ?? currentNavIdFromPath) === data.id ? "selected" : ""}
                onClick={() => {
                  if (isLoggedIn) {
                    handleNavClick(data);
                    navigate(data.path);
                  } else {
                    alert("로그인이 필요합니다.");
                    navigate("/login");
                  }
                }}
              >
                <Link to={data.path} className="nav-items">
                  {data.name}
                </Link>
              </li>
            ))}
          </ul>

          <p className="loginbtn">
            {isLoggedIn ? (
              <span
                onClick={() => {
                  localStorage.removeItem("isLoggedIn");
                  setIsLoggedIn(false);
                  alert("로그아웃 되었습니다.");
                  navigateAndReset("/");
                }}
              >
                로그아웃
              </span>
            ) : (
              <span onClick={() => navigateAndReset("/login")}>로그인</span>
            )}
          </p>
        </nav>
      </header>

      <div className="main_content">
        <div className="main_aside">
          <div className="main_article">
            <ul className="aside-ul">
              <AsideComponent
                orderAside={orderAside}
                buyerAside={buyerAside}
                planAside={planAside}
                stockAside={stockAside}
              />
            </ul>
          </div>
        </div>

        <div className="main_body">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default BasicLayout;
