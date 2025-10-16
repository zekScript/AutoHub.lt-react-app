import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
// import "./add_skelbima.css";
import {useNavigate, useSearchParams} from "react-router-dom"
import formatDate from "../../components/funcs/formatDate"

const EditPost = () => {


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
  const [brand, setBrand] = useState("");
  const [brandSuggestions, setBrandSuggestions] = useState([]);
  const [price, setPrice] = useState("");
  const [mileage, setMileage] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [description, setDescription] = useState("");
  const [enginePower, setEnginePower] = useState("");
  const [defects, setDefects] = useState("");
  const [color, setColor] = useState("");
  const [steeringPosition, setSteeringPosition] = useState("");
  const [condition, setCondition] = useState("");
  const [firstRegistration, setFirstRegistration] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [carName, setCarName] = useState("");
  const [model, setModel] = useState("");
  const [transmission, setTransmission] = useState("");
  const [carType, setCarType] = useState("");
  const [engineLiter, setEngineLiter] = useState("")
  const nav = useNavigate()
  const [searchParams ] = useSearchParams()


  const p = searchParams.get("p")

  
  const handleBrandSuggestionClick = (suggestion) => {
    setBrand(suggestion);
    setBrandSuggestions([]);
  };

  const handleBrandChange = (e) => {
    const value = e.target.value;
    setBrand(value);
    setCarName(value);
    if (value.length > 0) {
      const suggestions = brands.filter((b) =>
        b.toLowerCase().startsWith(value.toLowerCase())
      );
      setBrandSuggestions(suggestions);
    } else {
      setBrandSuggestions([]);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const post = {
      price,
      mileage,
      fuelType,
      description,
      enginePower,
      defects,
      carName,
      steeringPosition,
      condition,
      firstRegistration,
      contactNumber,
      model,
      transmission,
      carType,
      engineLiter
    };
    const res = await fetch(`http://localhost:8000/api/update/myListing/${p}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    const json = await res.json()
    console.log(json)
    if (res.ok) {
      alert("Post Updated");
    }

    
  };

   useEffect(() => {
    const fetchPostData = async () => {
        const getPostDataRes = await fetch(`http://localhost:8000/api/findListingByPostId/${p}`)
        const resPostData = await getPostDataRes.json()
        setBrand(resPostData.findPostById[0].carName)
        setPrice(resPostData.findPostById[0].price)
        setColor(resPostData.findPostById[0].color)
        setCarType(resPostData.findPostById[0].carType)
        setCondition(resPostData.findPostById[0].condition)
        setContactNumber(resPostData.findPostById[0].contactNumber)
        setEngineLiter(resPostData.findPostById[0].engineLiter)
        setDescription(resPostData.findPostById[0].description)
        setMileage(resPostData.findPostById[0].mileage)
        setEnginePower(resPostData.findPostById[0].enginePower)
        setSteeringPosition(resPostData.findPostById[0].steeringPosition)
        setFuelType(resPostData.findPostById[0].fuelType)
        setFirstRegistration(formatDate(resPostData.findPostById[0].firstRegistration))
        setModel(resPostData.findPostById[0].model)
        setTransmission(resPostData.findPostById[0].transmission)
        setDefects(resPostData.findPostById[0].defects)



    }
    fetchPostData()
  }, [])

  


  return (
    <div className="container my-5">
      <h2 className="mb-4">Pridėti skelbimą</h2>
      <form onSubmit={handleSubmit} className="row g-3 p-4 rounded shadow-sm">
        <div className="col-md-6">
          <label className="form-label">Markė</label>
          <input
            type="text"
            value={brand}
            onChange={handleBrandChange}
            
            name="carName"
            className="form-control"
            required
          />
          {brandSuggestions.length > 0 && (
          <ul

          className="mb-2 bg-light-subtle text-light-emphasis"
            style={{
              border: "1px solid ",
              margin: 0,
              padding: "0 8px",
              listStyle: "none",
              position: "absolute",
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
        </div>
        <div className="col-md-6">
          <label className="form-label">Modelis</label>
          <input
            onChange={(e) => setModel(e.target.value)}
            type="text"
            name="model"
            value={model}
            className="form-control"
            required
          />
          
        </div>
        
        <div className="col-md-4">
          <label className="form-label">Kaina</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            name="price"
            className="form-control"
            required
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Rida</label>
          <input
            type="number"
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
            name="mileage"
            className="form-control"
            required
          />
        </div>
        <div className="col-auto">
          <label className="form-label">Litras</label>
          <select
            name="fuelType"
            value={engineLiter}
            onChange={(e) => setEngineLiter(e.target.value)}
            className="form-select"
            required
          >
            <option value="">Pasirinkite</option>
            <option value="1.0">1.0</option>
            <option value="1.1">1.1</option>
            <option value="1.2">1.2</option>
            <option value="1.3">1.3</option>
            <option value="1.4">1.4</option>
            <option value="1.5">1.5</option>
            <option value="1.6">1.6</option>
            <option value="1.7">1.7</option>
            <option value="1.8">1.8</option>
            <option value="1.9">1.9</option>
            <option value="2.0">2.0</option>
            <option value="2.1">2.1</option>


            
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Kuro tipas</label>
          <select
            name="fuelType"
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            className="form-select"
            required
          >
            <option value="">Pasirinkite</option>
            <option value="benzinas">Benzinas</option>
            <option value="dyzelinas">Dyzelinas</option>
            <option value="elektra">Elektra</option>
            <option value="hibridas">Hibridas</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Variklio galia (AG)</label>
          <input
            onChange={(e) => setEnginePower(e.target.value)}
            type="number"
            name="enginePower"
            value={enginePower}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Defektai</label>
          <select
            name="defects"
            value={defects}
            onChange={(e) => setDefects(e.target.value)}
            className="form-select"
            required
          >
            <option value="">Pasirinkite</option>
            <option value="be">Nėra</option>
            <option value="Daužtas">Daužtas</option>
            <option value="Skestas">Skestas</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Spalva</label>
          {/* <input
            onChange={(e) => setColor(e.target.value)}
            type="text"
            name="color"
            value={color}
            className="form-control"
            required
          /> */}
<select
            name="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="form-select"
            required
          >
            <option value="">Pasirinkite</option>
            <option value="balta">Balta</option>
            <option value="juoda">Juoda</option>
            <option value="pilka">Pilka</option>
            <option value="sidabrine">Sidabrinė</option>
            <option value="melyna">Mėlyna</option>
            <option value="raudona">Raudona</option>
            <option value="zalia">Žalia</option>
            <option value="geltona">Geltona</option>
            <option value="ruda">Ruda</option>
            <option value="oranzine">Oranžinė</option>
            <option value="violetine">Violetinė</option>
            <option value="auksine">Auksinė</option>
            <option value="kita">Kita</option>
          </select>

        </div>
        <div className="col-md-6">
          <label className="form-label">Vairo padėtis</label>
          <select
            onChange={(e) => setSteeringPosition(e.target.value)}
            value={steeringPosition}
            className="form-select"
            required
          >
            <option value="">Pasirinkite</option>
            <option value="left">Kairė</option>
            <option value="right">Dešinė (Anglija)</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Būklė</label>
          <select
            onChange={(e) => setCondition(e.target.value)}
            value={condition}
            className="form-select"
            required
          >
            <option value="">Pasirinkite</option>
            <option value="new">Naujas</option>
            <option value="used">Naudotas</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Pirma registracija</label>
          <input
            onChange={(e) => setFirstRegistration(e.target.value)}
            type="date"
            name="firstRegistration"
            value={firstRegistration}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Telefono numeris susisiekti</label>
          <input
            onChange={(e) => setContactNumber(e.target.value)}
            type="text"
            name="contactNumber"
            value={contactNumber}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Transmisija</label>
          <select
            name="transmission"
            value={transmission}
            onChange={(e) => setTransmission(e.target.value)}
            className="form-select"
            required
          >
            <option value="">Pasirinkite transmisiją</option>
            <option value="manual">Mechaninė</option>
            <option value="automatic">Automatas</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Kėbulo tipas</label>
          <select
            name="carType"
            value={carType}
            onChange={(e) => setCarType(e.target.value)}
            className="form-select"
            required
          >
            <option value="">Pasirinkite</option>
            <option value="sedanas">Sedanas</option>
            <option value="hečbekas">Hečbekas</option>
            <option value="universalas">Universalas</option>
            <option value="kupe">Kupė</option>
            <option value="visureigis">Visureigis</option>
            <option value="kabrioletas">Kabrioletas</option>
            <option value="pikapas">Pikapas</option>
            <option value="furgonas">Furgonas</option>
          </select>
        </div>
        <div className="col-12">
          <label className="form-label">Aprašymas</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            value={description}
            className="form-control"
            rows={3}
            required
          ></textarea>
        </div>
        <div className="col-12 text-end">
          <button type="submit" className="btn btn-primary px-4">
            Skelbti
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditPost