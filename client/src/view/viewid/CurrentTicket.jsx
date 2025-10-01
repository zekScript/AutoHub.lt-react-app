import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import Cookies from "js-cookie";
import { getCurrentUser } from '../../getCurrentUser/getCurrentUser';

const CurrentTicket = () => {
  const [ticketInfo, setTicketInfo] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);
  const [senderMap, setSenderMap] = useState({});
  const { id } = useParams();
  const currentUser = getCurrentUser();
  const nav = useNavigate()



  // if(currentUser.id != id){
  //   if(currentUser.role === "ADMIN"){
  //     return null
  //   }
  //   nav("/")
  // }


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

  // Fetch sender info for each unique sender ID
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
  };

  if (!ticketInfo) return <div>Loading...</div>;
  if(currentUser.id !== ticketInfo.user){
    if(currentUser.role === "ADMIN"){
      return null
    }
    nav("/")
  }
  
  return (
    <div>
      <h1>Ticket info</h1>
      <p><strong>Title:</strong> {ticketInfo.title}</p>
      <p><strong>Description:</strong> {ticketInfo.description}</p>
      <p><strong>Status:</strong> {ticketInfo.status}</p>
      <p><strong>Created At:</strong> {new Date(ticketInfo.createdAt).toLocaleString()}</p>
      <p><strong>ticket made by:</strong> {userInfo?.name}</p>

      <div style={{ border: "1px solid #ccc", padding: 10, margin: "20px 0", maxHeight: 300, overflowY: "auto" }}>
        <h3>Chat</h3>
        {messages.length === 0 && <div>No messages yet.</div>}
        {messages.map((msg, idx) => {
          let senderId = typeof msg.sender === "string" ? msg.sender : msg.sender?._id;
          let sender = senderMap[senderId];
          return (
            <div key={idx} style={{ marginBottom: 8 }}>
              <b>{sender ? sender.name : "Deleted User"} ({sender ? sender.role : "user"}):</b> {msg.text}
              <span style={{ color: "#888", fontSize: 12, marginLeft: 8 }}>
                {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : ""}
              </span>
            </div>
          );
        })}
      </div>

      {ticketInfo.status === "closed" ? (
        <h1>This ticket is closed by the admin</h1>
      ): (
<form onSubmit={handleSendMessage}>
        <textarea
          placeholder='Write a message'
          value={messageText}
          onChange={e => setMessageText(e.target.value)}
          rows={3}
          style={{ width: "100%" }}
        />
        
                <button type="submit" disabled={!messageText.trim()}>Send</button>

      </form>
      )}

      
    </div>
  );
};

export default CurrentTicket;