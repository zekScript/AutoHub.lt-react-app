import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import './CarListing.css'
import formatDate from '../../components/funcs/formatDate'
import { numberWithCommas } from '../../components/funcs/bigNumberSeparation'
import engineConverter from "../../components/funcs/horsepowerAndKWConverter"
import upperCaseLetter from '../../components/funcs/upperCaseLetter'

const CarListings = () => {
  const [listing, setListing] = useState(null)
  const [seller, setSeller] = useState(null)
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


        const userRes = await fetch(`http://localhost:8000/api/user/${json.skelbimai[0].author}`)
        const jsonUser = await userRes.json()
          setSeller(jsonUser)

       
      } catch (error) {
        console.error("Error fetching car listings:", error);
      }
    }
    fetchCarListings()
  }, [params.id])



  if (!listing) return <div>Loading...</div>

  console.log(seller)
  console.log(listing)
  let toLithuanian
  if(listing.transmission === "manual"){
     toLithuanian = "Mechaninė"
  }
  else if(listing.transmission === "automatic"){
    toLithuanian = "Automatic"
  }
  let defects;

  if(listing.defects === "be"){
    defects = "Be defektu"
  }
  else(
    defects = listing.defects
  )

  let condition;
  if(listing.condition === "used"){
    condition = "Naudotas"
  }
  else{
    condition = "Naujas"
  }
  return (
    <div style={{padding: "24px"}}>
      {/* Title */}
      <div>
        <h3>{listing.carName} {listing.model} {listing.engineLiter}L, {listing.carType}</h3>
        <p>Skelbima sukurtas: {formatDate(listing.createdAt)}</p>
      </div>
      <div className='d-flex'>
        {/* Side info */}
        <div style={{marginTop: "20px", marginRight: "50px"}} className='w-75'>
          <p className='text-muted'>Kaina</p>
          <h1 style={{fontWeight: "bold"}}>{numberWithCommas(listing.price)}€</h1>
          <div style={{marginTop: "18px", padding: "15px 5px 15px 0px"}} className='bg-secondary-subtle'>
            {/* For some reason this display sometime works sometimes not */}
            {/* <p className='text-center'>Pardavėjas: {seller.name}</p> */}
            <div className='bg-secondary rounded w-50 text-center m-auto'>
              {listing.contactNumber}
            </div>
            
          </div>
<table className="table" >
  <thead>
    
  </thead>
  <tbody>
    <tr>
      <td>Pirma registracija:</td>
      <td>{formatDate(listing.firstRegistration)}</td>
    </tr>
    <tr>
      <td>Rida:</td>
      <td>{numberWithCommas(listing.mileage)} km</td>
    </tr>
    <tr>
      <td>Variklis:</td>
      <td>{listing.enginePower}kW ({engineConverter(listing.enginePower)} AG)</td>
    </tr>
    <tr>
      <td>Kėbulo tipas:</td>
      <td>{upperCaseLetter(listing.carType)}</td>
    </tr>
    <tr>
      <td>Transmisija</td>
      <td>{toLithuanian}</td>
    </tr>
    <tr>
      <td>Spalva</td>
      <td>{upperCaseLetter(listing.color)}</td>
    </tr>
    <tr>
      <td>Buklė</td>
      <td>{condition}</td>
    </tr>
    <tr>
      <td>Defektai</td>
      <td>{defects}</td>
    </tr>
  </tbody>
</table>
        </div>
        {/* Main container */}
        <div className='container ' >
<div id="carouselExampleIndicators" style={{marginBottom: "15px"}} className="carousel slide">
  {/* <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div> */}
  <div className="carousel-inner">
  {listing.imageUrl && listing.imageUrl.map((img, idx) => (
    <div key={idx} className={`carousel-item ${idx === 0 ? 'active' : ''}`}>
      <img
        src={`http://localhost:8000${img}`}
        className="d-block" 
        style={{width: "100%", height: "400px", objectFit: "cover"}}
        alt={`${listing.carName}-${idx}`}
      />
    </div>
  ))}
</div>

  <button className="carousel-control-prev bg-lime" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

<div className="alert alert-info text-center w-50 m-auto" >
         <h3>Įsigijai automobilį?</h3>
         <p>Deklaruok įgijimą ir registruok internetu!</p>
         <a href='https://www.regitra.lt/paslaugos/transporto-priemones/igijau-transporto-priemone/isigijau-transporto-priemone/isigijau-lietuvoje-anksciau-registruota-lietuvoje/'>Regitra</a>
        </div>

        </div>
      </div>

<div className='w-50 ' style={{marginTop: "15px", overflowWrap: "break-word"}}>
<h3>Aprašymas</h3>
      <hr/>
      <p>{listing.description}</p>
</div>
      
      
    </div>
  )
}

export default CarListings