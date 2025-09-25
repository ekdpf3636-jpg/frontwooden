const ItemForm = ({formData, onChange}) => {

  return (
    <form>
      <label>
        상품코드 :
        <input name="code" value={formData.code} onChange={onChange} />
      </label><br/>
      <label>
        상품명 :
        <input name="name" value={formData.name} onChange={onChange} />
      </label><br/>
      <label>
        상품규격 :
        <input name="spec" value={formData.spec} onChange={onChange} placeholder="가로 * 세로 * 높이" />
      </label><br/>
      <label>
        상품단가 :
        <input name="price" type="number" value={formData.price} onChange={onChange}/>
      </label><br/>
    </form>
  );
};

export default ItemForm;