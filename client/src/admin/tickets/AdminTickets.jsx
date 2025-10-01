// ...existing code...
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'

const AdminTickets = () => {
  const [tickets, setTickets] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await fetch("http://localhost:8000/api/tickets")
        const json = await res.json()
        if(res.status === 403){
          navigate("/")
        }
        if(res.ok){
          setTickets(json)
        }
      }catch(error){
        console.log("Error while fetching data", error)
      }
    }
    fetchData()
  }, [])

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:8000/api/update/ticket/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        alert("Status changed")
        setTickets(tickets.map(ticket =>
          ticket._id === id ? { ...ticket, status: newStatus } : ticket
        ));
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className='userTable'>
      <table className='table table-bordered'>
          <thead>
            <Link to="/add">Add user</Link>
            <tr>
              <th scope='col'>S.NO</th>
              <th scope='col'>Title</th>
              <th scope='col'>Description</th>
              <th scope='col'>Status</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, i) => (
              <tr key={i}>
                <td>{i+1}</td>
                <td>{ticket.title}</td>
                <td>{ticket.description}</td>
                <td>
                  <select
                    value={ticket.status}
                    onChange={e => handleStatusChange(ticket._id, e.target.value)}
                  >
                    <option value="open">Open</option>
                    <option value="in review">In Review</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
                <td>
                  <Link to={`/view/${ticket._id}`} type='button' className='btn btn-danger'>View</Link>
                  {/* You can remove or update this button as needed */}
                </td>
              </tr>
            ))}
          </tbody>
      </table>
    </div>
  )
}

export default AdminTickets;