import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import Cookies from "js-cookie";
import { getCurrentUser } from '../../getCurrentUser/getCurrentUser';
import toast from "react-hot-toast"

const CurrentTicket = () => {
  const [ticketInfo, setTicketInfo] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);
  const [senderMap, setSenderMap] = useState({});
  const { id } = useParams();
  const currentUser = getCurrentUser();
  const nav = useNavigate()



if(!currentUser){
  nav("/login")
}


  useEffect(() => {
    const fetchTicketAndUser = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/ticket/${id}`);
        const json = await res.json();
        if (res.ok) {
          setTicketInfo(json);
          setMessages(json.messages || []);
          if (json.user) {
            const userRes = await fetch(`http://localhost:8000/api/user/${json.user}`);
            const userJson = await userRes.json();
            if (userRes.ok) setUserInfo(userJson);
          }
        }
      } catch (error) {
        console.log('Error while fetching data', error);
      }
    };
    fetchTicketAndUser();
  }, [id]);

  useEffect(() => {
    const fetchSenders = async () => {
      const uniqueSenderIds = [
        ...new Set(messages.map(msg => typeof msg.sender === "string" ? msg.sender : msg.sender?._id))
      ].filter(Boolean);

      const newSenderMap = { ...senderMap };
      for (const senderId of uniqueSenderIds) {
        if (!newSenderMap[senderId]) {
          try {
            const res = await fetch(`http://localhost:8000/api/user/${senderId}`);
            const json = await res.json();
            if (res.ok) {
              newSenderMap[senderId] = json;
            }
          } catch (e) {}
        }
      }
      setSenderMap(newSenderMap);
    };
    fetchSenders();

  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if(ticketInfo.status === "closed"){
      return toast.error("Admin closed the ticket")
    }
    const token = Cookies.get("token");
    const res = await fetch(`http://localhost:8000/api/ticket/${id}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: messageText }),
    });
    if (res.ok) {
      const updatedMessages = await res.json();
      setMessages(updatedMessages);
      setMessageText('');
    }
    window.location.reload()
  };

  if (!ticketInfo) return <div>Loading...</div>;
  if(currentUser.id !== ticketInfo.user){
    if(currentUser.role === "ADMIN"){
      return null
    }
    nav("/")
  }
  
  return (
    <div className="container w-75">
      {/* Ticket Info */}
      <div className="card shadow-lg mb-4">
        <div className="card-body">
          <h2 className="card-title mb-3">{ticketInfo.title}</h2>
          <p><strong>Description:</strong> {ticketInfo.description}</p>
          <p><strong>Status:</strong> <span className={`badge ${ticketInfo.status === "closed" ? "bg-danger" : "bg-success"} ${ticketInfo.status === "in review" ? "bg-warning" : null}`}>{ticketInfo.status}</span></p>
          <p><strong>Created At:</strong> {new Date(ticketInfo.createdAt).toLocaleString()}</p>
          <p><strong>Ticket made by:</strong> {userInfo?.name}</p>
        </div>
      </div>

      {/* Chat Section */}
      <div className="card shadow-lg mb-1">
        <div className="card-header text-white">
          <h4 className="mb-0">Online Chat</h4>
        </div>
        <div className="card-body" style={{ maxHeight: "300px", overflowY: "auto" }}>
          {messages.length === 0 && <div className="text-muted">No messages yet.</div>}
          {messages.map((msg, idx) => {
            let senderId = typeof msg.sender === "string" ? msg.sender : msg.sender?._id;
            let sender = senderMap[senderId];
            let isAdmin = sender?.role === "ADMIN";

            return (
              <div
                key={idx}
                className={`p-2 mb-2 rounded ${isAdmin ? " border-start border-primary border-4" : "bg-white border"}`}
              >
                <b>{sender ? sender.name : "Deleted User"} ({sender ? sender.role : "user"}):</b> {msg.text}
                <div className="text-muted small">{msg.createdAt ? new Date(msg.createdAt).toLocaleString() : ""}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Message Input */}
      {ticketInfo.status === "closed" ? (
        <div className="alert alert-danger text-center">
          This ticket is closed by the admin
        </div>
      ) : (
        <form onSubmit={handleSendMessage} className="card shadow-lg p-2">
  <div className="input-group">
    <input
      type="text"
      className="form-control p-2"
      placeholder="Write a message..."
      value={messageText}
      onChange={e => setMessageText(e.target.value)}
    />
    <button
      type="submit"
      className="btn btn-primary d-flex align-items-center justify-content-center"
      disabled={!messageText.trim()}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
        className="bi bi-send-fill" viewBox="0 0 16 16">
        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 
          5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 
          4.995 3.178 3.178 4.995.002.002.26.41a.5.5 
          0 0 0 .886-.083zm-1.833 1.89L6.637 
          10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 
          7.494-7.494 1.178-.471z"/>
      </svg>
    </button>
  </div>
</form>

      )}
    </div>
  );
};

export default CurrentTicket;