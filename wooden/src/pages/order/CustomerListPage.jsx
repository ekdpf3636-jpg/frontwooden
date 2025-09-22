import { useState} from "react";
import ModalComponent from "../../components/ModalComponent";


const CustomerListPage = () => {
    const [bool,setBool] = useState(false);
    
  
    return(
        <>
        <h1>
            판매거래처
        </h1>
            <tr>
        <thead>
            <th>거래처</th>
            <th>test</th>
            <th>test</th>
            <th>test</th>
            <th>test</th>
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
        <div>
            <button type="button"
            onClick={() => setBool(true)}>
                등록
            </button>
        </div>
        <ModalComponent bool={bool} setBool={setBool}/>
        </>
        
    )

    
}
export default CustomerListPage;

