import React, {useState} from 'react'
import Cookies from "js-cookie"
import toast from "react-hot-toast"
import { getCurrentUser } from '../getCurrentUser/getCurrentUser';

const Home = () => {
  const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const user = getCurrentUser()

      const isLoggedIn = user ? true : false


  const handleLogIn = async (e) => {

      e.preventDefault();
      const res = await fetch("http://localhost:8000/api/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(`Error.\nReason: ${json.message || json.errorMessage}`, {
        position: "top-right",
        duration: 3000
      })
      } else {
        Cookies.set('token', json.user.token, { expires: 62 });
        toast.success("You are successfully logged in.", {
        position: "top-right",
        duration: 3000
      })
        window.location.reload()
      }
    };
    
  return (
    <main>
      {/* Support Section */}
      <div className="px-4 py-5 my-5 text-center">
        <img
          className="d-block mx-auto mb-4"
          src="/home.png"
          alt="logo"
          width="250"
          height="250"
        />
        <h1 className="display-5 fw-bold text-body-emphasis">
          Get Support with Ticket Master
        </h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Behind every support request is the **power of the MERN stack**:
            <br />
            <strong>MongoDB</strong> stores your tickets securely,{" "}
            <strong>Express</strong> handles them with speed,{" "}
            <strong>Your data</strong> is secured and hashed to our database
            <br />
            Open a ticket and lets talk
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <a
              href="/make-ticket"
              type="button"
              className="btn btn-primary btn-lg px-4 gap-3"
            >
              Make Ticket
            </a>
          </div>
        </div>
      </div>

      {/* Login / User Section */}
      <div className="container col-xl-10 col-xxl-8 px-4 py-5">
        <div className="row align-items-center g-lg-5 py-5">
          <div className="col-lg-7 text-center text-lg-start">
            <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
              {isLoggedIn ? "Welcome back to Support!" : "Sign in to get started"}
            </h1>
            <p className="col-lg-10 fs-4">
              {isLoggedIn
                ? `You are logged in as ${user.email}. Feel free to create and manage your support tickets.`
                : "Sign in below to create new support tickets and track existing ones in real-time."}
            </p>
          </div>
          <div className="col-md-10 mx-auto col-lg-5">
            {!isLoggedIn ? (
              <form
                className="p-4 p-md-5 border rounded-3 bg-body-tertiary"
                onSubmit={handleLogIn}
              >
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="signInEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="signInEmail">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="signInPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="signInPassword">Password</label>
                </div>
                <div className="checkbox mb-3">
                  <label>
                    <input type="checkbox" value="remember-me" /> Remember me
                  </label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">
                  Sign in
                </button>
                <hr className="my-4" />
                <small className="text-body-secondary">
                  By clicking Sign in, you agree to the terms of use.
                </small>
              </form>
            ) : (
              <div className="p-4 border rounded-3">
                <h4>Hello, {user.name} 👋</h4>
                <p>You’re already logged in. Start creating tickets anytime.</p>
                <a href="/make-ticket" className="btn btn-success w-100">
                  Go to Ticket Dashboard
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home