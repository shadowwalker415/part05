import Button from "./Button";

const Login = ({ handleUserName, handlePassword, onHandleSubmit }) => {
  return (
    <>
      <form onSubmit={onHandleSubmit}>
        <div>
          Username
          <input
            data-testid="username"
            type="text"
            name="userName"
            onChange={handleUserName}
          />
        </div>
        <div>
          Password
          <input
            data-testid="password"
            type="password"
            name="passWord"
            onChange={handlePassword}
          />
        </div>
        <Button label={"login"} type={"submit"} />
      </form>
    </>
  );
};

export default Login;
