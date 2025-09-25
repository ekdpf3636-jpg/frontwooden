const CustomerForm = ({formData, onChange}) => {

  return (
    <form>
      <label>
        거래처명 :
        <input name="company" value={formData.company} onChange={onChange} />
      </label><br/>
      <label>
        담당자명 :
        <input name="manager" value={formData.manager} onChange={onChange} />
      </label><br/>
      <label>
        이메일 :
        <input name="email" value={formData.email} onChange={onChange} />
      </label><br/>
      <label>
        연락처 :
        <input name="phone" value={formData.phone} onChange={onChange} />
      </label><br/>
      <label>
        주소 :
        <input name="address" value={formData.address} onChange={onChange} />
      </label>
    </form>
  );
};

export default CustomerForm;