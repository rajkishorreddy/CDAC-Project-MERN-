import React from "react";
import "../scss/SignUp.scss";
import axios from "axios";
axios.defaults.withCredentials = true;
const login = ({ setislogin }) => {
  const onFormSubmit = async (e) => {
    e.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Cross-Origin-Embedder-Policy", "require-corp");
    headers.append("Cross-Origin-Opener-Policy", "same-origin");
    try {
      // const res = await axios({
      //   method: "POST",
      //   url: "http://127.0.0.1:8000/api/users/login",
      //   data: {
      //     email,
      //     password,
      //   },
      //   credentials: "include",
      // });
      let res = await fetch("http://127.0.0.1:8000/api/users/login", {
        method: "POST",
        mode: "cors",
        redirect: "follow",
        credentials: "include",
        headers: headers,
        body: JSON.stringify({ email, password }),
      });
      res = await res.json();
      console.log(res);
      if (res.status === "success") {
        alert(" Logged in successfully!");
        setislogin(true);
        window.setTimeout(() => {
          window.location.assign("http://localhost:3000/main");
        }, 1500);
      }
      if (res.status === "fail") {
        alert(" Invalid user name or password!");
      }
    } catch (err) {
      alert("error sigining in");
      console.log(err);
    }
  };
  return (
    <div className="formbody">
      <div className="welcome">
        Welcome
        <br /> <span className="back">Back!</span>
      </div>
      <div className="account">
        <h1 className="account-heading">Don't have an account</h1>
        <a href="/signup" className="account-link">
          Create one!
        </a>
      </div>
      <form className="loginForm" onSubmit={(e) => onFormSubmit(e)}>
        <div className="segment">
          <h1>Log in</h1>
        </div>
        <label>
          <input type="text" placeholder="Email Address" id="email" />
        </label>
        <label>
          <input type="password" placeholder="Password" id="password" />
        </label>
        <button className="red" type="submit">
          Log in
        </button>
      </form>
    </div>
  );
};
export default login;
