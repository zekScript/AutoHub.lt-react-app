import { useState, useEffect } from "react"
import { useSearchParams } from "react-router"

const SearchPage = () => {
  const [searchParams] = useSearchParams()
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  // Extract params
  const startDate = searchParams.get("startDate")
  const endDate = searchParams.get("endDate")
  const minPrice = searchParams.get("minPrice")
  const maxPrice = searchParams.get("maxPrice")
  const minMileage = searchParams.get("minMileage")
  const maxMileage = searchParams.get("maxMileage")
  const fuelType = searchParams.get("fuelType")
  const model = searchParams.get("model")
  const brand = searchParams.get("brand")

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true)
      // Build query string
      const params = new URLSearchParams()
      if (startDate) params.append("startDate", startDate)
      if (endDate) params.append("endDate", endDate)
      if (minPrice) params.append("minPrice", minPrice)
      if (maxPrice) params.append("maxPrice", maxPrice)
      if (minMileage) params.append("minMileage", minMileage)
      if (maxMileage) params.append("maxMileage", maxMileage)
      if (fuelType) params.append("fuelType", fuelType)
      if (model) params.append("model", model)
      if (brand) params.append("brand", brand)
      console.log(params.toString())

      const res = await fetch(`http://localhost:8000/api/listings/search?${params.toString()}`)
      const data = await res.json()
      console.log(res)
      console.log(data)
      setResults(data.skelbimai || [])
      setLoading(false)
    }
    fetchListings()
  }, [searchParams])

  console.log(results)

  return (
    <div>
      <h2>Search Results</h2>
      {loading && <div>Loading...</div>}
      {!loading && results.length === 0 && <div>No results found.</div>}
      <ul>
        {results.map(listing => (
          <li key={listing._id}>
            <h3>{listing.carName}</h3>
            <p>Price: {listing.price}</p>
            <p>Mileage: {listing.mileage}</p>
            <p>Fuel: {listing.fuelType}</p>
            {listing.imageUrl && listing.imageUrl.length > 0 && (
              <img src={`http://localhost:8000${listing.imageUrl[0]}`} alt={listing.carName} style={{width: "150px"}} />
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchPage