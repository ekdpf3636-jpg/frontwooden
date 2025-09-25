import { useEffect, useState } from "react";
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from "../../api/CustomerAPI";
import ModalComponent from "../../components/ModalComponent"
import CustomerForm from "../../form/CustomerForm";
import SearchInput from "../../components/SearchInput";

const SellerCustomerListPage = () => {
    const [customers, setCustomers] = useState([]);     // 전체 고객 리스트
    const [searchTerm, setSearchTerm] = useState("");   // 검색
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);     // 수정/삭제할 ID 

    // 입력할 폼 데이터
    const [formData, setFormData] = useState({
        company:"",
        manager:"",
        email:"",
        phone:"",
        address:"",
    });

    // 고객 전체 조회
    useEffect(() => {
        fetchCustomers();
    }, []);
    const fetchCustomers = () => {
        getCustomers()
            .then((res) => setCustomers(res.data))
            .catch((err) => console.error("고객 조회 실패 : " + err));
    };

    // 검색 필터 (판매 거래처명으로만 검색)
    const filteredCustomers = customers.filter((c) =>
        c.company.toLowerCase().includes(searchTerm.toLowerCase()));

    // 입력값 변경 핸들러
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    // 등록 이벤트
    const handleCreate = () => {
        console.log("등록 요청 데이터 : ", formData); // 로그로 데이터가 들어오는지 확인용
        createCustomer(formData)
            .then(() => {
                alert("등록 성공");
                setCreateModalOpen(false); // 모달 닫기
                setFormData({company: "", manager: "", email: "", phone: "", address: "",}) // 입력 초기화
                fetchCustomers();   // 등록 후 새로고침
            })
            .catch((err) => {
                if (err.response && err.response.data) {
                    // 백엔드에서 온 에러 메세지 JSON 파싱
                    const errors = err.response.data;
                    let messages = Object.values(errors).join("\n");  // 여러 필드 메세지 합치기
                    alert(messages); // 모달창 대신 간단히 얼럿
                } else {
                    console.error("등록 실패 : " + err);
                    alert("알 수 없는 오류가 발생했습니다");                   
                }
            });
    };

    // 수정 이벤트
    const handleUpdate = () => {
        updateCustomer(selectedId, formData)
            .then(() => {
                alert("수정 성공");
                setEditModalOpen(false);
                fetchCustomers();
            })
            .catch((err) => console.error("수정 실패 : " + err));
    };

    // 삭제
    const handleDelete = () => {
        console.log("삭제 요청 확인");
        if (window.confirm("삭제하시겠습니까?")) {
            deleteCustomer(selectedId)
                .then(() => {
                    alert("삭제 완료");
                    setEditModalOpen(false);
                    fetchCustomers();
                })
                .catch((err) => console.error("삭제 실패 : ", err));
        }
    };

    // 등록 열기
    const openCreateModal = () => {
        setFormData({company:"", manager:"", email:"", phone:"", address:""});
        setCreateModalOpen(true);
    };

    // 수정 모달 열기
    const openEditModal = (customer) => {
        setSelectedId(customer.id);
        setFormData({
            company:customer.company,
            manager:customer.manager, 
            email:customer.email, 
            phone:customer.phone, 
            address:customer.address
        });
        setEditModalOpen(true);
    }

    // 컴포넌트가 처음 렌더링될 때 API 호출
    useEffect(() => {
        getCustomers().then((res) => {
            setCustomers(res.data);
        })
        .catch((err) => {
            console.error("고객 조회 실패 : ", err);
        });
    }, []);

    return(
        <div style={{padding:"20px"}} className="Add-wrapper">
            <h2 style={{textAlign:"center"}}>판매 거래처 리스트</h2>
            {/* 공통 검색 컴포넌트 */}
            <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="판매처명 검색"/>

            {/* Customer 리스트 테이블 */}
            <table border="1" style={{width:"100%", textAlign:"center", borderCollapse:"collapse", marginTop:"20px"}}>
                <thead style={{backgroundColor:"lightgreen"}}>
                    <tr>
                        <th style={{padding:"10px"}}>No.</th>
                        <th style={{padding:"10px"}}>판매처명</th>  
                        <th style={{padding:"10px"}}>판매처 담당자</th> 
                        <th style={{padding:"10px"}}>담당자 이메일</th>
                        <th style={{padding:"10px"}}>번호</th>
                        <th style={{padding:"10px"}}>주소</th>    
                    </tr>                    
                </thead>
                
                <tbody>
                    {filteredCustomers.length > 0 ? (
                        filteredCustomers.map((c, index) => (
                            <tr key={c.id} className="row">
                                <td>{index + 1}</td>
                                <td 
                                    style={{cursor:"pointer", color:"blue", textDecoration:"underline"}}
                                    onClick={() => openEditModal(c)} // 판매처명 클릭시 수정/삭제 모달 열림
                                >
                                    {c.company}
                                </td>
                                <td>{c.manager}</td>
                                <td>{c.email}</td>
                                <td>{c.phone}</td>
                                <td>{c.address}</td>
                            </tr>
                        ))
                        ) : (
                            <tr>
                                <td colSpan="6">등록된 판매 거래처가 없습니다</td>
                            </tr>
                    )}
                </tbody>
            </table> <br/>
            {/* 등록 버튼 */}

            <button className="AddBtn" onClick={openCreateModal}>거래처 등록</button>

            {/* 등록 모달 */}
            <ModalComponent 
                isOpen={isCreateModalOpen} 
                onClose={() => setCreateModalOpen(false)}
                title="판매 거래처 등록"
                onConfirm={handleCreate}>
                    <CustomerForm formData={formData} onChange={handleChange} />
            </ModalComponent>

            {/* 수정/삭제 모달 */}
            <ModalComponent
                isOpen={isEditModalOpen}
                onClose={() => setEditModalOpen(false)}
                title="판매 거래처 수정/삭제"
                onConfirm={handleUpdate}>
                    <CustomerForm formData={formData} onChange={handleChange} />
                    <button style={{marginTop:"10px", backgroundColor:"red", color:"white"}}
                            onClick={handleDelete}>
                        삭제    
                    </button>                    
            </ModalComponent>
        </div>
        
    )

    
}
export default SellerCustomerListPage;

