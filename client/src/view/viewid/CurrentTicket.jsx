import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import {getCurrentUser} from '../../getCurrentUser/getCurrentUser';

const CurrentTicket = () => {
  const [ticketInfo, setTicketInfo] = useState([])
  const [userInfo, setUserInfo] = useState([])
  const user = getCurrentUser();
  const [replyByAdmin, setReplyByAdmin] = useState(false)

  const { id } = useParams();

  useEffect(() => {
    const fetchTicketAndUser = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/ticket/${id}`);
        const json = await res.json();
        if (res.ok) {
          setTicketInfo(json);

          // Now fetch user info using ticketJson.user
          if (json.user) {
            const userRes = await fetch(`http://localhost:8000/api/user/${json.user}`);
            const userJson = await userRes.json();
            if (userRes.ok) {
              setUserInfo(userJson);
            }
          }
        }
      } catch (error) {
        console.log('Error while fetching data', error);
      }
    };
    fetchTicketAndUser();
  }, [id]);

 
function handleReplyButtonFunc(){
  setReplyByAdmin(true)
}
    

  return (
    <div>
      <h1>Ticket info</h1>
      <p><strong>Title:</strong> {ticketInfo.title}</p>
      <p><strong>Description:</strong> {ticketInfo.description}</p>
      <p><strong>Status:</strong> {ticketInfo.status}</p>
      <p><strong>Created At:</strong> {new Date(ticketInfo.createdAt).toLocaleString()}</p>
      <p><strong>ticket made by:</strong> {userInfo.name}</p>

      {/* Add more fields as needed */}
      {user.role === "ADMIN" && <button onClick={handleReplyButtonFunc}>Reply</button> }
      {replyByAdmin && (
        <form>
          <textarea placeholder='write a message'></textarea>
          <button>Send</button>
        </form>
        
      )}
    </div>
  );
};

export default CurrentTicket;