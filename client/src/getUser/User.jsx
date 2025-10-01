import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'

export const User = () => {
  const navigate = useNavigate()

  

  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await fetch("http://localhost:8000/api/users")
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
      <table className='table table-bordered'>
          <thead>
            <Link to="/add">Add user</Link>
            <tr>
              <th scope='col'>S.NO</th>
              <th scope='col'>Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Address</th>
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
              <td>{user.address}</td>
              <td><Link to={`/update/${user._id}`} type='button' className='btn btn-danger'>Add</Link>
              <button onClick={() => handleDelete(user._id)} type='button' className='btn btn-info'>Del</button>
</td>
            </tr>
              )
            })}
            
          </tbody>
      </table>

    </div>
  )
}
