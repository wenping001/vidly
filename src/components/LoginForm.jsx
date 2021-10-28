import { useState } from "react";
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

        <div className="form-floating">
          <label for="floatingInput">Username</label>
          <input
            autoFocus
            value={account.username}
            onChange={handleChange}
            name="username"
            className="form-control"
            id="floatingInput"
            placeholder="username"
          />
        </div>
        <div className="form-floating">
          <label for="floatingPassword">Password</label>
          <input
            type="password"
            name="password"
            value={account.password}
            onChange={handleChange}
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
        </div>

        <br />
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
      </form>
    </main>
  );
}

export default LoginForm;
