import { useState } from "react";
import ModalComponent from "../../components/ModalComponent";

const PartListPage = () => {
    const [bool,setBool]= useState(false)
    return(
        <div>
            <h1>부품리스트</h1>
            <button type="button"
            onClick={() => setBool(true)}>
                등록
            </button>
            <ModalComponent bool={bool} setBool={setBool}/>
        </div>
    )
}
export default PartListPage;