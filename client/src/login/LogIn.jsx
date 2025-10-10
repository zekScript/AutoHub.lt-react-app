import React from 'react'
import { useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router'
import { getCurrentUser } from '../getCurrentUser/getCurrentUser'
import { toast } from 'react-hot-toast'

const LogIn = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [err, setErr] = useState(null);
      const navigate = useNavigate();

      const user = getCurrentUser();
      if(user){
        navigate("/")
      }
      
  

  const handleLogIn = async (e) => {
    e.preventDefault();
    setErr(null);
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

    }

  };


  return (
    <>
    

    
    <main className="form-signin w-100 m-auto">
      <form onSubmit={handleLogIn}>
        <img
          className="mb-4"
          src="/home.png"
          alt=""
          width="72"
          height="57"

        />

       
        <h1 className="h3 mb-3 fw-normal">Please log in</h1>
        <div className="form-floating">
           <input type="email" name='email' className="form-control" id="signInEmail"
          value={email} onChange={e => setEmail(e.target.value)} />
          <label for="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input type="password" name='password' className="form-control" id="signInPassword"
          value={password} onChange={e => setPassword(e.target.value)} />
          <label for="floatingInput">Password</label>
        </div>
        
        <div className="checkbox mb-3">
                <label>
                  <input type="checkbox" value="remember-me" /> Remember me
                </label>
              </div>
        <button className="btn btn-primary w-100 py-2" type="submit" >
          Sign in
        </button >
        <a href='/signin' style={{marginTop: "50px"}}>Don't have an account? Sign up here.</a>
      </form>
    </main>

    
    
    </>
  )
}

export default LogIn;