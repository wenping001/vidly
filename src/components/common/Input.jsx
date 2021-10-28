const Input = ({
  autoFocus,
  label,
  name,
  value,
  onChange,
  placeholder,
  type,
}) => {
  return (
    <div className="form-floating">
      <label for={name}>{label}</label>
      <input
        autoFocus={autoFocus}
        type={type}
        id={name}
        value={value}
        onChange={onChange}
        name={name}
        className="form-control"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
