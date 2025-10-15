import { useState, useEffect } from "react"
import { useLoaderData, useLocation, useNavigate, useSearchParams } from "react-router"
import "./sidebars.css"
import { numberWithCommas } from "../../components/funcs/bigNumberSeparation"

const SearchPage = () => {
  const [searchParams] = useSearchParams()
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentSortingFilter, setCurrentSortingFilter] = useState("cheapest")

  // Extract params
  const startDate = searchParams.get("startDate")
  const endDate = searchParams.get("endDate")
  const minPrice = searchParams.get("minPrice")
  const maxPrice = searchParams.get("maxPrice")
  const minMileage = searchParams.get("minMileage")
  const maxMileage = searchParams.get("maxMileage")
  const fuelType = searchParams.get("fuelType")
  const model = searchParams.get("model")
  const carName = searchParams.get("carName")
  const carType = searchParams.get("carType")
  const sortBy = searchParams.get("sortBy")
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
      if (carName) params.append("carName", carName)
      if(carType) params.append("carType", carType)
      if(sortBy) params.append("sortBy", sortBy)

      const res = await fetch(`http://localhost:8000/api/listings/search?${params.toString()}`)
      const data = await res.json()
      
      setResults(data.skelbimai || [])
      setLoading(false)
    }
    fetchListings()
  }, [searchParams])
  const nav = useNavigate()
  const location = useLocation()

  const handleChangeFilters = (value) => {
  const params = new URLSearchParams(location.search);
  params.set("sortBy", value); 
  setCurrentSortingFilter(value);
  nav(`${location.pathname}?${params.toString()}`);
};

  

 

  return (
    <div className="d-flex">

      {/* <div className="flex-shrink-0 p-3 w-50" >
        <a
          href="/"
          className="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none border-bottom"
        >
          <svg
            className="bi pe-none me-2"
            width="30"
            height="24"
            aria-hidden="true"
          >
            <use xlink:href="#bootstrap"></use>
          </svg>
          <span className="fs-5 fw-semibold">Collapsible</span>
        </a>
        <ul className="list-unstyled ps-0">
          <li className="mb-1">
            <button
              className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#home-collapse"
              aria-expanded="true"
            >
              Home
            </button>
            <div className="collapse show" id="home-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small col-gap-2">
                <li>
                  <div className="checkbox p-3 d-flex flex-column">
                <label>
                  <input type="checkbox" value="Balta" /> Balta
                  
                </label>
                <label>
                  <input type="checkbox" value="Juoda" /> Juoda
                </label>
              </div>
                </li>
                <li>
                  <a
                    href="#"
                    className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                    >Updates</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                    >Reports</a
                  >
                </li>
              </ul>
            </div>
          </li>
          <li className="mb-1">
            <button
              className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#dashboard-collapse"
              aria-expanded="false"
            >
              Dashboard
            </button>
            <div className="collapse" id="dashboard-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <a
                    href="#"
                    className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                    >Overview</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                    >Weekly</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                    >Monthly</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                    >Annually</a
                  >
                </li>
              </ul>
            </div>
          </li>
          <li className="mb-1">
            <button
              className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#orders-collapse"
              aria-expanded="false"
            >
              Orders
            </button>
            <div className="collapse" id="orders-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <a
                    href="#"
                    className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                    >New</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                    >Processed</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                    >Shipped</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                    >Returned</a
                  >
                </li>
              </ul>
            </div>
          </li>
          <li className="border-top my-3"></li>
          <li className="mb-1">
            <button
              className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#account-collapse"
              aria-expanded="false"
            >
              Account
            </button>
            <div className="collapse" id="account-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <a
                    href="#"
                    className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                    >New...</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                    >Profile</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                    >Settings</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                    >Sign out</a
                  >
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div> */}
      {loading && <div>Loading...</div>}
      {!loading && results.length === 0 && <div>No results found.</div>}
      <ul>
        
        {results.map(listing => (
          <li key={listing._id}>
            <h3>{listing.carName}</h3>
            <p>Price: {numberWithCommas(listing.price)}</p>
            <p>Mileage: {numberWithCommas(listing.mileage)}</p>
            <p>Fuel: {listing.fuelType}</p>
            {listing.imageUrl && listing.imageUrl.length > 0 && (
              <img src={`http://localhost:8000${listing.imageUrl[0]}`} alt={listing.carName} style={{width: "150px"}} />
            )}
          </li>
        ))}
      </ul>
<select name="sortBy" value={currentSortingFilter} onChange={(e) => handleChangeFilters(e.target.value)}>
          <option value="cheapest">Pigiausi viršuje</option>
          <option value="most_expensive">Brangiausi viršuje</option>
          <option value="newest">Naujausi viršuje</option>
          <option value="oldest">Seniausi viršuje</option>
          <option value="mileage_highest">mažiausia rida</option>
          <option value="mileage_lowest">didžiausia rida</option>
        </select>
  

    </div>
  )
}

export default SearchPage