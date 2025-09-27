import React from 'react'
import { useState } from 'react'

const LogIn = () => {
      const [name, setName] = useState("")
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [err, setErr] = useState(null);

  //     const handleSignIn = async (e) => {
  //   e.preventDefault();
  //   const user = { name, email, password };
  //   const res = await fetch("http://localhost:8000/api/signin", {
  //     method: 'POST',
  //     body: JSON.stringify(user),
  //     headers: { 'Content-Type': 'application/json' }
  //   });
  //   const json = await res.json();
  //   if (!res.ok) {
  //     setErr(json.error);
  //   } else {
  //     setErr(null);
  //     // Save token to localStorage or context
  //     // localStorage.setItem('token', json.token);
  //     console.log("User signed in");
  //   }
  // };


  const handleLogIn = async (e) => {
    e.preventDefault()
  }


  return (
    <>
    <form onSubmit={handleLogIn} className='w-50'>
      <div className="mb-3">
        <label htmlFor="signInEmail" className="form-label">Name</label>
        <input type="text" name='name' className="form-control" 
          value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="signInEmail" className="form-label">Email address</label>
        <input type="email" name='email' className="form-control" id="signInEmail"
          value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="signInPassword" className="form-label">Password</label>
        <input type="password" name='password' className="form-control" id="signInPassword"
          value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
      {err && <div className="text-danger">{err}</div>}
    </form>
    
    
    </>
  )
}

export default LogIn;