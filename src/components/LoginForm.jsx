import { useState } from "react";
import Input from "./common/Input";
function LoginForm() {
  const [account, setAccount] = useState({ username: "", password: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submited");
  };

  const handleChange = ({ target: input }) => {
    let copyAccount = { ...account };
    copyAccount[input.name] = input.value;
    setAccount(copyAccount);
  };
  return (
    <main className="form-signin">
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <Input
          label="Username"
          name="username"
          value={account.username}
          onChange={handleChange}
          placeholder="Username"
          autoFocus={true}
        />

        <Input
          label="Password"
          name="password"
          value={account.password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
        />

        <br />
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
      </form>
    </main>
  );
}

export default LoginForm;
