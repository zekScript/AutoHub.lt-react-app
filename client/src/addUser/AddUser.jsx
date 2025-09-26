import React, { useState } from 'react'

 const AddUser = () => {

            const [name, setName] = useState("")
            const [email, setEmail] = useState("")
            const [address, setAddress] = useState("")
            const [err, setErr] = useState(null)


            
            const handleSubmit = async (e) => {
                        e.preventDefault()
                        const user = {
                                    name,
                                    email,
                                    address
                        }
                        const res = await fetch("http://localhost:8000/api/user", {
                                    method: 'POST',
                                    body: JSON.stringify(user),
                                    headers: {
                                          'Content-Type': 'application/json'      
                                    }
                        })
                        const json = await res
                        if(!res.ok){
                                    setErr(json.error)
                        }
                        if(res.ok){

                                    setErr(null)
                                    console.log("new user added")
                        }
            }

  return (
    <div>
            <h1>Add new user</h1>
            <form onSubmit={handleSubmit}>
                        <div>
                                    <label htmlfor="name">Name:</label>
                                    <input type='text'
                                    id='name'
                                    name='name'
                                    autoComplete='off'
                                    placeholder='Name...'
                                    onChange={(e) => setName(e.target.value)}
                                    ></input>
                        </div>   
                        <div>
                                    <label htmlfor="email">Email:</label>
                                    <input type='email'
                                    id='email'
                                    name='email'
                                    autoComplete='off'
                                    placeholder='Email...'
                                    onChange={(e) => setEmail(e.target.value)}
                                    ></input>
                        </div> 
                        <div>
                                    <label htmlfor="address">Address:</label>
                                    <input type='text'
                                    id='address'
                                    name='address'
                                    autoComplete='off'
                                    placeholder='Address...'
                                    onChange={(e) => setAddress(e.target.value)}
                                    ></input>
                        </div> 
                        <button>Add user</button>    
            </form>
    </div>
  )
}

export default AddUser;