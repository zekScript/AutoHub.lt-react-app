import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import Cookies from "js-cookie"
import "./user.css"

export const User = () => {
  const navigate = useNavigate()

  

  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try{
        const token = Cookies.get("token")
        const res = await fetch("http://localhost:8000/api/users", {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`
          }
        })
        const json = await res.json()
        if(res.status === 403) {
          navigate("/")
        }
        if(res.ok){
          setUsers(json)
        }
        

      }catch(error){
        console.log("Error while fetching data", error)
      }
    }
    fetchData()
  }, [])

  
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/delete/user/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setUsers(users.filter((user) => user._id !== id)); 
        alert("User deleted successfully!");
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  


  return (
    <div className='userTable'>
      




      
      <div class="container-fluid">
              <main>
                <h2>Section title</h2>
                <div class="table-responsive small">
                  <table class="table table-striped table-sm">
                    <thead>
            <tr>
              <th scope='col'>S.NO</th>
              <th scope='col'>Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Password</th>
              <th scope='col'>Actions</th>


            </tr>
          </thead>
                   <tbody>
            {users.map((user, i) => {
              return(
<tr key={i}>
  <td>{i+1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>

              <td><Link to={`/update/${user._id}`} type='button' >Update</Link>
              <a onClick={() => handleDelete(user._id)} type='button' className='space-between'>Delete</a>
</td>
            </tr>
              )
            })}
            
          </tbody>
                  </table>
                </div>
              </main> 
            </div>

    </div>



  )
}
