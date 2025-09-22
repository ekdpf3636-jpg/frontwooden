import './Modal.css';
import CloseBtnComponent from './CloseBtnComponent';
import ButtonComponent from './ButtonComponent';

const ModalComponent = ({bool,setBool}) => {

    return(
        <div className={"modal"+ (bool ? " show":"")}>
            <CloseBtnComponent setBool={setBool}/>
            <ButtonComponent setBool={setBool}/>
        </div>
    )
}
export default ModalComponent;