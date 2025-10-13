import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
      <form onSubmit={handleSubmit} style={{ position: "relative" }}>
        {/* Filters */}
        <h3>Pagaminimo Data</h3>
        <input
          type="text"
          name="startDate"
        />
        <input
          type="text"
          name="endDate"
        />
        <h3>Kaina</h3>
        <input
          type="number"
          name="minPrice"
          placeholder="Min kaina"
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max kaina"
        />
        <h3>Rida</h3>
        <input
          type="number"
          name="minMileage"
          placeholder="Min rida"
        />
        <input
          type="number"
          name="maxMileage"
          placeholder="Max rida"
        />
        <h3>Kuro Tipas</h3>
        <select
          name="fuelType"
        >
          <option value="">Pasirinkite kuro tipą</option>
          <option value="benzinas">Benzinas</option>
          <option value="dyzelinas">Dyzelinas</option>
          <option value="elektra">Elektra</option>
          <option value="hibridas">
            Elektra + Benzinas (Hibridas)
          </option>
        </select>
        <input
          type="text"
          name="brand"
          placeholder="Marke..."
          value={brand}
          onChange={handleBrandChange}
        />
        {brandSuggestions.length > 0 && (
          <ul
            style={{
              border: "1px solid ",
              margin: 0,
              padding: "0 8px",
              listStyle: "none",
              position: "absolute",
              background: "#111",
              zIndex: 10,
            }}
          >
            {brandSuggestions.map((suggestion, idx) => (
              <li
                key={idx}
                style={{ cursor: "pointer", padding: "4px 0" }}
                onClick={() => handleBrandSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}

        <p>Modelis</p>
        <input type="text" name="model" placeholder="Įveskite modelį" />
        <p>Pavarų dėže</p>
        <select name="transmission">
          <option value="manual" name="manual">Mechaninė</option>
          <option value="automatic" name="automatic">Automatas</option>
        </select>
        <p>Kėbulo Tipas</p>
        <select name="carType" value={carType} onChange={handleCarTypeChange}>
          <option value="sedanas">Sedanas</option>
          <option value="hečbekas">Hečbekas</option>
          <option value="universalas">Universalas</option>
          <option value="kupe">Kupė</option>
          <option value="visureigis">Visureigis</option>
          <option value="kabrioletas">Kabrioletas</option>
          <option value="pikapas">Pikapas</option>
          <option value="furgonas">Furgonas</option>
        </select>
        <button type="submit">Search</button>
      </form>
      {/* Grid off all the listings */}
      <div>
        <div>Recently made listings</div>
        {/* Implement this feature when user hovers over an image it displays it on the first/main image */}
        {fetchedAllListings.map((listings, id) => (
          <div key={id}>
            {/* href={`/${listings._id}/car_listings`} */}
            <h1>{listings.carName}</h1>
            <p>{listings.description}</p>
            {listings.imageUrl && listings.imageUrl.length > 0 && (
              <img src={`http://localhost:8000${listings.imageUrl[0]}`} alt={listings.carName} style={{width: "150px"}} />
            )}
            </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
