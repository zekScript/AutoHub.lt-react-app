

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const CarListings = () => {
      const [author, setAuthor] = useState("")
      const [carName, setCarName] = useState("")
      const [price, setPrice] = useState("")
      const [mileage, setMileage] = useState("")
      const [fuelType, setFuelType] = useState("")
      const [imageUrl, setImageUrl] = useState(null)
      const [description, setDescription] = useState("")
      const [enginePower, setEnginePower] = useState("")
      const [defects, setDefects] = useState("")



      const params = useParams()

            // Fetch car listings made by the user
            const fetchCarListings = async () => {
                  try {
                        const res = await fetch(`http://localhost:8000/api/skelbimai/${params.id}`, {
                              method: 'GET',
                              headers: {
                                    'Content-Type': 'application/json',
                              }
                        })
                        const json = await res.json()
                        console.log(json)
                        if(res.ok){
                              setAuthor(json.skelbimai[0].author)
                              setCarName(json.skelbimai[0].carName)
                              setPrice(json.skelbimai[0].price)
                              setMileage(json.skelbimai[0].mileage)
                              setFuelType(json.skelbimai[0].fuelType)
                              setImageUrl(json.skelbimai[0].imageUrl)
                              setDescription(json.skelbimai[0].description)
                              setEnginePower(json.skelbimai[0].enginePower)
                              setDefects(json.skelbimai[0].defects)
                              console.log(json)
                        }
                  }catch (error) {
                        console.error("Error fetching car listings:", error);}
            }
            fetchCarListings()
            console.log(author)



  return (
    <>
      <h1>Listing</h1>
      <img src={imageUrl} alt={carName} />
    </>
  )
}

export default CarListings