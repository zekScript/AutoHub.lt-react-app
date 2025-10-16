import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { truncateText } from "../../truncText/TruncText";
import { getCurrentUser } from "../../getCurrentUser/getCurrentUser";

const AllMyTickets = () => {
  const { id } = useParams();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate()

  const currentUser = getCurrentUser()
  if(id !== currentUser.id){
      nav("/")
  }
  

  useEffect(() => {
    const fetchAllUsersTickets = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/${id}/mytickets`);
        const data = await res.json();
        setTickets(data.tickets || []);
      } catch (err) {
        console.error("Error fetching tickets:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllUsersTickets();
  }, [id]);

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center fw-bold">My Tickets made</h1>

      {/* Loading State */}
      {loading && (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading tickets...</span>
          </div>
        </div>
      )}

      {/* No tickets */}
      {!loading && tickets.length === 0 && (
        <div className="alert alert-info text-center">
          Tu neturi tiketu
        </div>
      )}

      {/* Tickets Grid */}
      <div className="row g-4">
        {tickets.map((ticket) => (
          <div className="col-md-6 col-lg-4" key={ticket._id}>
            <div className="card h-100 shadow-sm ticket-card">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-primary">{ticket.title}</h5>
                <p className="card-text flex-grow-1">
                  {truncateText(ticket.description, 25)}
                </p>
                <div className="mt-auto">
                  <span className="badge bg-secondary me-2">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </span>
                  <a
                    href={`/view/${ticket._id}`}
                    className="btn btn-sm btn-outline-primary float-end"
                  >
                    Peržiura
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>
        {`
          .ticket-card {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            border-radius: 12px;
          }
          .ticket-card:hover {
            transform: translateY(-5px);
            box-shadow: 0px 8px 20px rgba(0,0,0,0.15);
          }
        `}
      </style>
    </div>
  );
};

export default AllMyTickets;
