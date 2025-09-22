import { useState } from "react";
import ModalComponent from "../../components/ModalComponent";

const BuyerCustomer = () => {
    const [bool,setBool]= useState(false)
    return(
        <>
            <h1>구매거래처</h1>
            <button type="button"
            onClick={() => setBool(true)}>
                등록
            </button>
        <ModalComponent bool={bool} setBool={setBool}/>
        </>
    )
}
export default BuyerCustomer;