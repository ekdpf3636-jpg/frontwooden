import { Outlet,useLocation,useNavigate,Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { NavBar } from "../arrays/MainArrays";
import AsideComponent from "../components/AsideComponent";


const BasicLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [ asdieID, setAsideID ] = useState(null);
    const [ navID, setNavID ] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const activeNavMap = {
    "/orderlist": 1,
    "/customer":1,
    "/orderreceive":1,
    "/partlist": 2,
    "/buyercustomer": 2,
    "/partorder":2,
    "/currentdelivery":2,
    "/itemlist":3,
    "/plan": 3,
    "/stock": 4,
    "/sell":4,
  };
  const currentNavID = activeNavMap[location.pathname];
    const orderAside = location.pathname === "/orderlist" || location.pathname === "/customer" || location.pathname === "/orderreceive";

    const buyerAside = location.pathname === "/partlist" || location.pathname === "/buyercustomer"
    || location.pathname === "/partorder" || location.pathname === "/currentdelivery";

    const planAside = location.pathname === "/plan" || location.pathname === "/itemlist";

    const stockAside = location.pathname === "/stock" || location.pathname === "/sell";

    function navigateAndReset(path){
        setAsideID(null);
        setNavID(null);
        navigate(path);
    }
   
    function handleNavClick(list){
        setNavID(list.id);
    }
      useEffect(() => {
        const pathToNavIdMap = {
            "/itemlist": 1,
            "/customer":1,
            "/orderlist": 1,
            "/orderreceive": 1, // 'ORDER' 네비게이션 ID
            "/partlist": 2,
            "/buyercustomer": 2,
            "/currentdelivery":2,
            "/partorder":2,
            "/plan": 3,
            "/stock": 4,
            "/sell":4,
        };
    
        const pathToAsideIdMap = {
            "/itemlist": 1,
            "/orderlist": 1,
            "/customer":2,
            "/orderreceive": 3, // Aside의 ID를 3으로 설정
            "/partlist": 1,
            "/buyercustomer": 2,
            "/partorder":3,
            "/sell":2,
        };
        const loginStatus = localStorage.getItem("isLoggedIn");
        setIsLoggedIn(loginStatus === "true"); // 로그인 상태 불러오기
        setNavID(pathToNavIdMap[location.pathname] || null);
        setAsideID(pathToAsideIdMap[location.pathname] || null);
    }, [location.pathname]);

    return(
        <>
            <header>

                <div className="logo">
                    <h1>
                        <a href="#" onClick={() => navigateAndReset("/")}>
                            테스트로고
                        </a>
                    </h1>
                </div>
                <nav>
                    <ul className="header-ul">
                        { NavBar.map(data => (
                            <li key={data.id} 
                            className={currentNavID === data.id ? "selected":""}
                            onClick={() => {;
                                if (isLoggedIn){
                                    handleNavClick(data);
                                    navigate(data.path)
                                }
                                else{ alert("로그인이 필요합니다.");
                                    navigate("/login")
                                }
                            }
                            }  
                            >
                            <Link to={data.path} className="nav-items">{data.name}</Link>
                            </li>
                        ))}
                    </ul>
                    <p className="loginbtn">    {/*테스트*/}
                    {isLoggedIn ? 
                        <span
                        onClick={() => {
                        localStorage.removeItem("isLoggedIn");
                        setIsLoggedIn(false);
                        alert("로그아웃 되었습니다.")
                        navigateAndReset("/");
                        }}
                        >
                            로그아웃
                        </span>
                    : 
                        <span onClick={() => navigateAndReset("/login")}>로그인</span>
                    }
                    </p>

                </nav>
        </header>
        <div className="main_content">
        <div className = "main_aside">
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
            <Outlet/>
        </div>
        </div>
        
        </>
    )
}
export default BasicLayout;