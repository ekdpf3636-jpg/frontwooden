import "./Modal.css";
import CloseBtnComponent from "./CloseBtnComponent";

const ModalComponent = ({ isOpen, onClose, title, children, onConfirm }) => {
    if (!isOpen) return null; // 닫혀있으면 렌더링 안함
    
    return (
        <div className="modal show">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>{title}</h3>
                    {/* onClose 전달 */}
                    <CloseBtnComponent onClick={onClose} />
        </div>

        <div className="modal-body">{children}</div>

        <div className="modal-footer">
            <button onClick={onClose}>취소</button>
            {onConfirm && <button onClick={onConfirm}>완료</button>}
            </div>
        </div>
    </div>
    );
};

export default ModalComponent;
