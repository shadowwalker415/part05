const Button = ({ label, action, type }) => {
  return (
    <>
      <button className="button" onClick={action} type={type ? type : "button"}>
        {label}
      </button>
    </>
  );
};

export default Button;
