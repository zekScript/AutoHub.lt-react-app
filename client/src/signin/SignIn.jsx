import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router';
import "./sign-in.css"
import toast from 'react-hot-toast';
import { getCurrentUser } from '../getCurrentUser/getCurrentUser';


const SignIn = () => {
  const user = getCurrentUser();
        if(user){
          navigate("/")
        }
      const [name, setName] = useState("")
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [err, setErr] = useState(null);
      const navigate = useNavigate()

      const handleSignIn = async (e) => {
    e.preventDefault();
    const user = { name, email, password };
    const res = await fetch("http://localhost:8000/api/signin", {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' }
    });
    const json = await res.json();
    if (!res.ok) {
      toast.error(json.error || "There was something wrong")
    } else {
      setErr(null);
      navigate("/login")
      toast.success(`Your account is succesfully made! You can now log in`, {
        position: 'bottom-right',
        duration: 5000,

      })

    }
  };





  return (
    <>
    
    
    <main className="form-signin w-100 m-auto">
      <form onSubmit={handleSignIn}>
        <img
          className="mb-4"
          src="../assets/brand/bootstrap-logo.svg"
          alt=""
          width="72"
          height="57"

        />

       
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <div className="form-floating">
           <input type="text" name='name' className="form-control" 
          value={name} onChange={e => setName(e.target.value)} />
          <label for="floatingInput">Name</label>
        </div>
        <div className="form-floating">
          <input type="email" name='email' className="form-control" id="signInEmail"
          value={email} onChange={e => setEmail(e.target.value)} />
          <label for="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input type="password" name='password' className="form-control" id="signInPassword"
          value={password} onChange={e => setPassword(e.target.value)} />
          <label for="floatingPassword">Password</label>
        </div>
        <div className="form-check text-start ">
            {err && <div className="text-danger">{err}</div>}
        </div>
        <button className="btn btn-primary w-100 py-2" type="submit" >
          Sign in
        </button >
        <a href='/login' style={{marginTop: "50px"}}>Already have an account? Log in here.</a>
      </form>
    </main>

   
    
    </>
  )
}

export default SignIn