

const ButtonComponent = ({setBool}) => {
  
  return(
    <div>
      <button type="submit"
      name={"submit"}
      onClick={() => setBool(false)}>등록</button>
    </div>
  )
}
export default ButtonComponent;