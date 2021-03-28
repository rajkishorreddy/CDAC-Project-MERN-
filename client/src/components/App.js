import React, { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Route from "./Route.js";
import Link from "../components/Link";
import "../scss/App.scss";
import Signup from "./Signup";
import Login from "./login";

const App = () => {
  const [islogin, setislogin] = useState(false);
  return (
    <div className="body">
      <Header islogin={islogin} />
      <Route path="/login">
        <Login setislogin={setislogin} />
      </Route>
      <Route path="/signup">
        <Signup setislogin={setislogin} />
      </Route>
      <Route path="/main">
        <Main />
      </Route>
      <Route path="/">
        <div>
          <p className="text">
            Hello <br />
            <span className="text-small">I hope you’re doing well</span>
          </p>
          <Link href="/signup" className="signup">
            New Here ! Sign up.
          </Link>
          <Link href="/login" className="login">
            In the family! Login
          </Link>
        </div>
      </Route>
      <footer className="footer">&copy; RajaKishorReddy </footer>
      <section className="animated-area"></section>
    </div>
  );
};

export default App;
