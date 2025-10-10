import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const CarListings = () => {
  const [listing, setListing] = useState(null)
  const params = useParams()

  useEffect(() => {
    const fetchCarListings = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/skelbimai/${params.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        const json = await res.json()
        if (res.ok && json.skelbimai && json.skelbimai.length > 0) {
          setListing(json.skelbimai[0])
        }
      } catch (error) {
        console.error("Error fetching car listings:", error);
      }
    }
    fetchCarListings()
  }, [params.id])

  if (!listing) return <div>Loading...</div>

  return (
    <>
      <h1>{listing.carName} Listing</h1>
      <div>
        {listing.imageUrl && listing.imageUrl.map((img, idx) => (
          <img
            key={idx}
            src={`http://localhost:8000${img}`}
            alt={listing.carName}
            style={{ width: "200px", margin: "10px" }}
          />
        ))}
      </div>
      <div>
        <p>Price: {listing.price}</p>
        <p>Mileage: {listing.mileage}</p>
        <p>Fuel Type: {listing.fuelType}</p>
        <p>Description: {listing.description}</p>
        <p>Engine Power: {listing.enginePower}</p>
        <p>Defects: {listing.defects}</p>
      </div>
    </>
  )
}

export default CarListings