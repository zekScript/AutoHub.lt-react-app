import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
const Add_skelbima = () => {
  const [price, setPrice] = useState("");
  const [mileage, setMileage] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [description, setDescription] = useState("");
  const [enginePower, setEnginePower] = useState("");
  const [defects, setDefects] = useState("");
  const [color, setColor] = useState("");
  const [steeringPosition, setSteeringPosition] = useState("");
  const [condition, setCondition] = useState("");
  const [firstRegistration, setFirstRegistration] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [carName, setCarName] = useState("");

  // fetch data
  const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("price", price);
  formData.append("mileage", mileage);
  formData.append("fuelType", fuelType);
  formData.append("description", description);
  formData.append("enginePower", enginePower);
  formData.append("defects", defects);
  formData.append("carName", carName);
  formData.append("color", color);
  formData.append("steeringPosition", steeringPosition);
  formData.append("condition", condition);
  formData.append("firstRegistration", firstRegistration);
  formData.append("contactNumber", contactNumber);

  // Append all selected files
  for (let i = 0; i < imageUrl.length; i++) {
    formData.append("images", imageUrl[i]);
  }

  const res = await fetch("http://localhost:8000/api/add_skelbima", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
    body: formData,
  });
  const json = await res.json();
  console.log(res)
  console.log(json);
};

  



  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Markė
        </label>
        <input
          type="text"
          value={carName}
          onChange={(e) => setCarName(e.target.value)}
          name="carName"
          required
        />
        <label>Kaina:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          name="price"
          required
        />
        <label>Rida:</label>
        <input
          type="number"
          value={mileage}
          onChange={(e) => setMileage(e.target.value)}
          name="mileage"
          required
        />
        <label>Kuro tipas:</label>
        <select
          name="fuelType"
          value={fuelType}
          onChange={(e) => setFuelType(e.target.value)}
          required
        >
          <option value="benzinas">Benzinas</option>
          <option value="dyzelinas">Dyzelinas</option>
          <option value="elektra">Elektra</option>
          <option value="hibridas">Hibridas</option>
        </select>

        <label>Nuotrauka (URL):</label>
        <input
  onChange={(e) => setImageUrl(e.target.files)}
  type="file"
  accept="image/*"
  name="images"
  multiple
  required
/>
        <label>Aprašymas:</label>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          name="description"
          required
        ></textarea>
        <label>Variklio galia (AG):</label>
        <input
          onChange={(e) => setEnginePower(e.target.value)}
          type="number"
          name="enginePower"
          required
        />
        <label>Defektai:</label>
        <select
          name="defects"
          value={defects}
          onChange={(e) => setDefects(e.target.value)}
          required
        >
          <option value="be">Nėra</option>
          <option value="Daužtas">Daužtas</option>
          <option value="Skestas">Skestas</option>
        </select>
        <label>Spalva</label>
        <input
          onChange={(e) => setColor(e.target.value)}
          type="text"
          name="color"
          required
        />
        <label>Vairo padėtis</label>
        <select onChange={(e) => setSteeringPosition(e.target.value)} required>
          <option value="left">Kairė</option>
          <option value="right">Dešinė (Anglija)</option>
        </select>
        <label>Buklė</label>
        <select onChange={(e) => setCondition(e.target.value)} required>
          <option value="new">Naujas</option>
          <option value="used">Naudotas</option>
        </select>
        <label>pirma registracija</label>
        <input
          onChange={(e) => setFirstRegistration(e.target.value)}
          type="date"
          name="firstRegistration"
          required
        />
        <label>Telefono numeris susisiekti</label>
        <input
          onChange={(e) => setContactNumber(e.target.value)}
          type="text"
          name="contactNumber"
          required
        />
        <button type="submit">Skelbti</button>
      </form>
    </>
  );
};

export default Add_skelbima;
