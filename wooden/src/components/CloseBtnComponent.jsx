

const CloseBtnComponent = ({onClick}) => {

    return(
        <div className="clsBtnWrapper">
            <button onClick={onClick}>
                X
            </button>
        </div>
    );
}
export default CloseBtnComponent;