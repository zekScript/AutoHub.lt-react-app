

import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from "react-router";
import { truncateText } from "../../truncText/TruncText";
import { getCurrentUser } from "../../getCurrentUser/getCurrentUser";

const ViewPosts = () => {
  const { id } = useParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const nav = useNavigate()
  
    const currentUser = getCurrentUser()
    if(id !== currentUser.id){
        nav("/")
    }
    
  
    useEffect(() => {
      const fetchAllUsersTickets = async () => {
        try {
          
          const resUserPost = await fetch(`http://localhost:8000/api/myListings/${id}`)
          const userDataPost = await resUserPost.json()
          setPosts(userDataPost.posts || [])
        } catch (err) {
          console.error("Error fetching tickets:", err);
        } finally {
          setLoading(false);
        }
        
      };
      fetchAllUsersTickets();
    }, [id]);


const handlePostDelete = async (params) =>{
  try{
    const reqDeletion = await fetch(`http://localhost:8000/api/delete/myListings/${params}`, {
      method: "DELETE",
    })
    if(reqDeletion.ok){
      alert("post deleted")
    }
  }
  catch(err){
    console.error(err)
  }
}

    return (
    <div className="container py-5">
      <h1 className="mb-4 text-center fw-bold">Mano skelbimai</h1>

      {/* Loading State */}
      {loading && (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Kraunama...</span>
          </div>
        </div>
      )}

      {/* No tickets */}
      {!loading && posts.length === 0 && (
        <div className="alert alert-info text-center">
          You don’t have any tickets yet. Create one to get started!
        </div>
      )}

      {/* Tickets Grid */}
      <div className="row g-4">
        {posts.map((post) => (
          <div className="col-md-6 col-lg-4" key={post._id}>
            <div className="card h-100 shadow-sm ticket-card">
              <div className="card-body d-flex flex-column">
                <p className="card-text flex-grow-1">
                  {post.carName} {post.model} {post.carType}
                </p>
                <div className="mt-auto">
                  <span className="badge bg-secondary me-2">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                  <a
                    href={`/edit?p=${post._id}`}
                    className="btn btn-sm btn-outline-primary float-end"
                  >
                    Redaguoti
                  </a>
                  {/* <button className='btn btn-danger' onClick={() => handlePostDelete(post._id)}>Ištrinti</button> */}
                  <button
                    onClick={() => handlePostDelete(post._id)}
                    className="btn btn-sm btn-outline-danger float-end "
                    style={{marginRight: "10px"}}
                  >
                    Ištrinti
                  </button>
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
  )
}

export default ViewPosts