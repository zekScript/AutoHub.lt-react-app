import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import { getCurrentUser } from "../getCurrentUser/getCurrentUser";

const MakeTicket = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const currentUser = getCurrentUser()

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    const res = await fetch("http://localhost:8000/api/ticket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description }),
    });

    if (res.status === 401) {
      navigate("/login");
      toast.error("Access denied.\nReason: You are not logged in", {
        position: "top-right",
        duration: 3000,
      });
      return;
    }

    const json = await res.json();
    if (res.ok) {
      setTitle("");
      setDescription("");
      toast((t) => (
        <span>
          ✅ Your ticket is made. See all your tickets{" "}
          <a href={`/${currentUser.id}/tickets`} className="text-blue-600 fw-bold">
            here
          </a>
          .
          <button
            onClick={() => toast.dismiss(t.id)}
            className="btn btn-sm btn-outline-primary ms-2"
          >
            Ok
          </button>
        </span>
      ));
    } else {
      setMessage(json.message || "Error creating ticket");
      toast.error(
        `Error.\nReason: ${json.message || "Error creating ticket"}`,
        {
          position: "top-right",
          duration: 3000,
        }
      );
    }
  };

  

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ maxWidth: "600px", width: "100%" }}>
        <div className="card-body">
          <h6 className="card-title text-center mb-4 fw-bold">
            Please provide details about the issue you are having:
          </h6>
          {message && <div className="alert alert-danger">{message}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label fw-semibold">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-control"
                placeholder="Enter ticket title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label fw-semibold">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                rows="4"
                placeholder="Describe your issue..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="d-flex w-100 justify-content-end">
<button type="submit" className="btn btn-primary fw-bold">
              Send
            </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default MakeTicket;
