import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./searchForm.css"
import { numberWithCommas } from "./funcs/bigNumberSeparation";
const Search = () => {
  const [carType, setCarType] = useState(""); // Add state for car type
  const [brand, setBrand] = useState("");
  const [brandSuggestions, setBrandSuggestions] = useState([]);
  const [fetchedAllListings, setFetchedAllListings] = useState([])
  const nav = useNavigate();

  const brands = [
    "Audi",
    "BMW",
    "Mercedes",
    "Volkswagen",
    "Toyota",
    "Honda",
    "Ford",
    "Opel",
    "Renault",
    "Peugeot",
    "Nissan",
    "Fiat",
    "Mazda",
    "Kia",
    "Hyundai",
    "Škoda",
    "Seat",
    "Volvo",
    "Jaguar",
    "Land Rover",
    "Lexus",
    "Mitsubishi",
    "Subaru",
    "Suzuki",
    "Citroën",
    "Dacia",
    "Alfa Romeo",
    "Jeep",
    "Mini",
    "Smart",
    "Tesla",
    "Cadillac",
    "Chrysler",
    "Dodge",
    "Jeep",
    "Ram",
    "Lincoln",
    "Buick",
    "GMC",
    "Acura",
    "Infiniti",
    "Genesis",
    "Rivian",
    "Polestar",
    "BYD",
    "Great Wall",
    "Tata",
    "Mahindra",
    "Proton",
    "Perodua",
    "Lada",
    "Zotye",
    "Chery",
    "Geely",
    "Saab",
    "Hummer",
    "Pontiac",
    "Saturn",
    "Oldsmobile",
    "Mercury",
    "Scion",
    "Hino",
    "Isuzu",
    "Daihatsu",
    "Tata",
    "Mahindra",
    "Foton",
    "Wuling",
    "Baojun",
    "Changan",
    "Great Wall",
    "Lifan",
    "ZX Auto",
    "FAW",
    "JAC Motors",
  ];

 
  const handleCarTypeChange = (e) => {
    setCarType(e.target.value);
  };

  const handleBrandSuggestionClick = (suggestion) => {
    setBrand(suggestion);
    setBrandSuggestions([]);
  };

  const handleBrandChange = (e) => {
    const value = e.target.value;
    setBrand(value);
    if (value.length > 0) {
      const suggestions = brands.filter((b) =>
        b.toLowerCase().startsWith(value.toLowerCase())
      );
      setBrandSuggestions(suggestions);
    } else {
      setBrandSuggestions([]);
    }
  };

  const handleSubmit = () => {
  nav(`/search`)    
  };

 useEffect(() => {
   const fetchAllListings = async () => {
    const res = await fetch("http://localhost:8000/api/allListings")
    const data = await res.json()
    
    setFetchedAllListings(data)
  }

  fetchAllListings()
 }, []) 


  return (
    <div>
      <div className="search-wrapper">
        <form className="search-form-dark" onSubmit={handleSubmit}>

          {/* Year */}
          <div className="form-group mt-2">
            <label className="form-label-dark">Pagaminimo data</label>
            <div className="row">
              <div className="col">
                  <label className="form-label-dark">Metai nuo</label>
                <input name="startDate" type="text" className="form-control input-dark" placeholder="Nuo" />
              </div>
              <div className="col">
                <label className="form-label-dark">Metai iki</label>
                <input name="endDate" type="text" className="form-control input-dark" placeholder="Iki" />
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="form-group mt-2">
            <div className="row">
              <div className="col">
                <label className="form-label-dark">Kaina nuo</label>
                <input name="minPrice" type="number" className="form-control input-dark" placeholder="Min" />
              </div>
              <div className="col">
                <label className="form-label-dark">Kaina iki</label>
                <input name="maxPrice" type="number" className="form-control input-dark" placeholder="Max" />
              </div>
            </div>
          </div>

          {/* Mileage */}
          <div className="form-group mt-2">
            <div className="row">
              <div className="col">
                <label className="form-label-dark">Rida nuo</label>
                <input name="minMileage" type="number" className="form-control input-dark" placeholder="Min" />
              </div>
              <div className="col">
                <label className="form-label-dark">Rida iki</label>
                <input name="maxMileage" type="number" className="form-control input-dark" placeholder="Max" />
              </div>
            </div>
          </div>

          

          {/* Brand */}
          <div className="form-group mt-2 position-relative">
            <label className="form-label-dark">Markė</label>
            <input
              type="text"
              name="carName"
              className="form-control input-dark"
              placeholder="Markė..."
              value={brand}
              onChange={handleBrandChange}
            />
            {brandSuggestions.length > 0 && (
              <ul className="brand-suggestions-dark">
                {brandSuggestions.map((s, i) => (
                  <li key={i} onClick={() => handleBrandSuggestionClick(s)}>
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Model */}
          <div className="form-group mt-2">
            <label className="form-label-dark">Modelis</label>
            <input name="model" type="text" className="form-control input-dark" placeholder="Įveskite modelį" />
          </div>

          <div className="form-group mt-2">
            <label className="form-label-dark">Kuro Tipas</label>
            <select name="fuelType" className="form-select select-dark">
              <option value="">Pasirinkite kuro tipą</option>
              <option value="benzinas">Benzinas</option>
              <option value="dyzelinas">Dyzelinas</option>
              <option value="elektra">Elektra</option>
              <option value="hibridas">Elektra + Benzinas (Hibridas)</option>
            </select>
          </div>

          {/* Transmission */}
          <div className="form-group mt-2">
            <label className="form-label-dark">Pavarų dėžė</label>
            <select name="transmission" className="form-select select-dark">
              <option value="manual">Mechaninė</option>
              <option value="automatic">Automatas</option>
            </select>
          </div>

          {/* Car Type */}
          <div className="form-group mt-2">
            <label className="form-label-dark">Kėbulo Tipas</label>
            <select
              className="form-select select-dark"
              value={carType}
              onChange={handleCarTypeChange}
              name="carType"
            >
              <option value="">Pasirinkite</option>
              <option value="sedanas">Sedanas</option>
              <option value="hečbekas">Hečbekas</option>
              <option value="universalas">Universalas</option>
              <option value="visureigis">Visureigis</option>
              <option value="pikapas">Pikapas</option>
            </select>
          </div>

          <div className="form-group justify-end ">
            <button type="submit" className="btn btn-primary mt-3">
              Ieškoti
            </button>
          </div>
        </form>
      </div>

      {/* Results */}
      <div className="results-section-dark">
        <div className="results-list-dark">
          






{fetchedAllListings.map((car, index) => (
          <a href={`/${car._id}/car_listings`} style={{textDecoration: "none"}} className="listing-card-dark" key={index}>
            <img
              src={`http://localhost:8000${car.imageUrl[0]}`}

              alt={car.model}
              className="listing-img-dark"
            />
            <div className="listing-info-dark">
              {/* <h4>{car.model}</h4> */}
              <div className="listing-content w-100">
              <p>{car.carName} {car.model} {car.engineLiter}L</p>
              <p>{car.carType} </p>
              </div>
              <div className="vr"></div>
              <div className="text-center" >
              <p style={{fontSize: "18px", fontWeight: "bold"}}>€{numberWithCommas(car.price)} </p>

              </div>
            </div>
          </a>
        ))}







        </div>
      </div>
    </div>
  );
};

export default Search;
