

const CloseBtnComponent = ({setBool}) => {

    return(
        <div className="clsBtnWrapper">
            <button onClick={() => setBool(false)}>
                X
            </button>
        </div>
    );
}
export default CloseBtnComponent;