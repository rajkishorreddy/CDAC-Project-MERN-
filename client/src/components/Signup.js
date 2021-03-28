import React from "react";
import "../scss/SignUp.scss";
import axios from "axios";
axios.defaults.withCredentials = true;
const Signup = ({ setislogin }) => {
  const onFormSubmit = async (e) => {
    e.preventDefault();
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const age = document.querySelector("#age").value;
    const passwordConfirm = document.querySelector("#passwordConfirm").value;
    try {
      // const res = await axios.post(
      //   "http://127.0.0.1:8000/api/users/signup",
      //   {
      //     name,
      //     age,
      //     email,
      //     password,
      //     passwordConfirm,
      //   },
      //   { withCredentials: true, credentials: "include" }
      // );
      const res = await axios({
        method: "POST",
        url: "http://127.0.0.1:8000/api/users/signup",
        data: {
          name,
          age,
          email,
          password,
          passwordConfirm,
        },
        credentials: "include",
      });
      if (res.data.status === "success") {
        alert(" Logged in successfully!");

        window.setTimeout(() => {
          window.location.assign("http://localhost:3000/main");
          // window.history.replaceState(null, "New Page Title", "/main");
          setislogin(true);
        }, 1500);
      }
    } catch (err) {
      alert(
        "error sigining in || Please fill all the required fiedls OR user account already exists"
      );
    }
  };
  return (
    <div className="formbody">
      <div className="welcome">
        Create an
        <br /> <span className="back"> Account</span>
      </div>
      <div className="easy">it's quick and easy</div>
      <div className="account">
        <h1 className="account-heading">Already have an account</h1>
        <a href="/signup" className="account-link">
          login!
        </a>
      </div>
      <form className="signupFrom" onSubmit={(e) => onFormSubmit(e)}>
        <div className="segment">
          <h1>Sign up</h1>
        </div>
        <label>
          <input type="text" placeholder="Name" id="name" />
        </label>
        <label>
          <input type="text" placeholder="Email Address" id="email" />
        </label>
        <label>
          <input type="text" placeholder="age" id="age" />
        </label>
        <label>
          <input type="password" placeholder="Password" id="password" />
        </label>
        <label>
          <input
            type="text"
            placeholder="Password Confirm"
            id="passwordConfirm"
          />
        </label>
        <button className="red" type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
};
export default Signup;
