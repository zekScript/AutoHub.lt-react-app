import React, { useState } from 'react';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


const MakeTicket = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

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
    return;
  }

  const json = await res.json();
  if (res.ok) {
    setMessage("Ticket created!");
    setTitle("");
    setDescription("");
  } else {
    setMessage(json.message || "Error creating ticket");
  }
};

  return (
    <div>
      <h1>Create Ticket</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type='text'
            id='title'
            name='title'
            autoComplete='off'
            placeholder='Title...'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type='text'
            id='description'
            name='description'
            autoComplete='off'
            placeholder='Description...'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Create Ticket</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
};

export default MakeTicket;