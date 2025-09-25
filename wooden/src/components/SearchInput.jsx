const SearchInput = ({value, onChange, placeholder = "검색어 입력"}) => {

  return (
    <input 
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      style={{padding:"5px", width:"200px", marginBottom:"10px"}} />
  );
};

export default SearchInput;