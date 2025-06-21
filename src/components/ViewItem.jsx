import { useEffect } from "react";
import { useState } from "react";
import Modal from "./Modal";

export default function ViewItem() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3000/items");
      const data = await response.json();
      console.log(data);
      setItems(data);
    }
    fetchData();
  }, []);
  function showItemDetails(item) {
    setModalIsOpen(true);
    setSelectedItem(item);
  }
  function closeModal() {
    setModalIsOpen(false);
    setSelectedItem(null);
  }
  return (
    <>
      <Modal isOpen={modalIsOpen} onClose={closeModal} item={selectedItem} />
      {items.length === 0 ? (
        "Loading..."
      ) : (
        <div className="itemsContainer">
          {items.map((item) => {
            return (
              <div
                className="item"
                key={item.id}
                onClick={() => showItemDetails(item)}
              >
                <div className="itemImgContainer">
                  <img src={item.coverImage} alt={`${item.name} Preview`} />
                </div>
                <div className="itemName">{item.name}</div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
