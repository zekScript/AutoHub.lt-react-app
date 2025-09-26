import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

const UpdateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [err, setErr] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/user/${id}`);
        const json = await res.json();
        if (res.ok) {
          setName(json.name);
          setEmail(json.email);
          setAddress(json.address);
        }
      } catch (error) {
        console.log('Error while fetching data', error);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      name,
      email,
      address,
    };
    try {
      const res = await fetch(`http://localhost:8000/api/update/user/${id}`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await res.json();
      if (!res.ok) {
        setErr(json.error);
      } else {
        setErr(null);
        console.log('User updated successfully');
        navigate('/'); 
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <h1>Update User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            autoComplete="off"
            placeholder="Name..."
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email} 
            autoComplete="off"
            placeholder="Email..."
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={address} 
            autoComplete="off"
            placeholder="Address..."
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default UpdateUser;