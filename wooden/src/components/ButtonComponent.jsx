const ButtonComponent = ({onClick, text, type = "button"}) => {
  
  return(
    <div>
      <button type={type} onClick={onClick}>
        {text}
      </button>
    </div>
  )
}
export default ButtonComponent;