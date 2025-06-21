import { useState } from "react";
import axios from "axios";

export default function AddItem() {
  const [item, setItem] = useState({
    name: "",
    type: "",
    description: "",
    coverImage: null,
    additionalImages: [],
  });
  const [showSubmiion, setShowSubmiion] = useState(false);

  function handleChange(e) {
    setItem({ ...item, [e.target.name]: e.target.value });
  }

  function handleCoverImageChange(e) {
    setItem({ ...item, coverImage: e.target.files[0] });
  }

  function handleAdditionalImagesChange(e) {
    setItem({ ...item, additionalImages: Array.from(e.target.files) });
  }

  async function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      console.log(reader.result);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  }

  async function handleSubmit(e){
    e.preventDefault();
    console.log(item.coverImage);
    const coverImageBase64 = await toBase64(item.coverImage);
    const additionalImagesBase64 = await Promise.all(
      item.additionalImages.map(toBase64)
    );
    console.log(coverImageBase64+"  "+additionalImagesBase64);
    const sendData = {
      name: item.name,
      type: item.type,
      description: item.description,
      coverImage: coverImageBase64,
      additionalImages: additionalImagesBase64,
    };
    
    await axios.post("http://localhost:3000/add-item", sendData);

    setShowSubmiion(true);

    setItem({
      name: "",
      type: "",
      description: "",
      coverImage: null,
      additionalImages: [],
    });

    setTimeout(() => {
      setShowSubmiion(false);
    }, 2000);

    console.log(item);
  };
  return (
    <>
      {showSubmiion ? (
        <div className="successMsg">Item successfully added</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Add New Item</h2>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={item.name}
            onChange={handleChange}
            required
          />

          <label>Type:</label>
          <select
            name="type"
            value={item.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="Shirt">Shirt</option>
            <option value="Pant">Pant</option>
            <option value="Shoes">Shoes</option>
            <option value="Sports Gear">Sports Gear</option>
          </select>

          <label>Description:</label>
          <textarea
            name="description"
            value={item.description}
            onChange={handleChange}
            required
          />

          <label>Cover Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverImageChange}
            required
          />

          <label>Additional Images:</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleAdditionalImagesChange}
          />

          <button type="submit">Add Item</button>
        </form>
      )}
    </>
  );
}
