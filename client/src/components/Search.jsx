import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
const Search = () => {
  const [carType, setCarType] = useState(""); // Add state for car type
  const [brand, setBrand] = useState("");
  const [brandSuggestions, setBrandSuggestions] = useState([]);
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

  const handleFuelTypeChange = (e) => {
    setFuelType(e.target.value);
    console.log("Selected fuel type:", e.target.value); // Log selected value
  };
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
nav("/search")    
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ position: "relative" }}>
        {/* Filters */}
        <h3>Pagaminimo Data</h3>
        <input
          onChange={(e) => setStartDate(e.target.value)}
          type="text"
          name="startDate"
        />
        <input
          onChange={(e) => setEndDate(e.target.value)}
          type="text"
          name="endDate"
        />
        <h3>Kaina</h3>
        <input
          onChange={(e) => setMinPrice(e.target.value)}
          type="number"
          name="minPrice"
          placeholder="Min kaina"
        />
        <input
          onChange={(e) => setMaxPrice(e.target.value)}
          type="number"
          name="maxPrice"
          placeholder="Max kaina"
        />
        <h3>Rida</h3>
        <input
          onChange={(e) => setMinMileage(e.target.value)}
          type="number"
          name="minMileage"
          placeholder="Min rida"
        />
        <input
          onChange={(e) => setMaxMileage(e.target.value)}
          type="number"
          name="maxMileage"
          placeholder="Max rida"
        />
        <h3>Kuro Tipas</h3>
        <select
          name="fuelType"
          
        >
          <option value="">Pasirinkite kuro tipą</option>
          <option value="benzin">Benzinas</option>
          <option value="dyzelinas">Dyzelinas</option>
          <option value="elektra">Elektra</option>
          <option value="elektra-benzinas">
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
        <p>Kėbulo Tipas</p>
        <select value={carType} onChange={handleCarTypeChange}>
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
        <div>Grid of listings</div>
      </div>
    </div>
  );
};

export default Search;
