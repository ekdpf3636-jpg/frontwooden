import { useState } from "react";
import ModalComponent from "../../components/ModalComponent";

const ItemList = () => {
    const [bool,setBool] = useState(false);


    return(
        

    <>
    <h1>상품리스트</h1>
    <div className="table">
    <tr>
        <thead>
            <th>상품코드</th>
            <th>상품명</th>
            <th>상품규격</th>
            <th>상품단가</th>
            <th>상품제조일</th>
        </thead>
        <tbody>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tbody>
        <tbody>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tbody>
        <tbody>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tbody>
        <tbody>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tbody>
    </tr>
    </div>
    <button
    onClick={() => setBool(true)}>등록</button>
    <ModalComponent bool={bool}setBool={setBool}/>
    </>
    )

    
}

export default ItemList;

