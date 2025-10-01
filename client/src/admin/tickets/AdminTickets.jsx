// ...existing code...
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'
import Cookies from "js-cookie"
import toast from 'react-hot-toast'

const AdminTickets = () => {
  const [tickets, setTickets] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try{
          const token = Cookies.get("token");
        const res = await fetch("http://localhost:8000/api/tickets", {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`
          }

        })
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
        setTickets(tickets.map(ticket =>
          ticket._id === id ? { ...ticket, status: newStatus } : ticket
        ));
        toast.success("status changed")
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
      

<div class="container-fluid">
        <main>
          <h2>Section title</h2>
          <div class="table-responsive small">
            <table class="table table-striped table-sm">
              <thead>
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
                  <Link to={`/view/${ticket._id}`} type='button'>View</Link>
                  {/* You can remove or update this button as needed */}
                </td>
              </tr>
            ))}
          </tbody>
            </table>
          </div>
        </main> 
      </div>
  )
}

export default AdminTickets;