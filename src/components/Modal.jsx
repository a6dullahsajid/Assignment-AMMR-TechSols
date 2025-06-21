export default function Modal({ isOpen, onClose, item }) {
  if (!isOpen || !item) return null;

  const images = [item.coverImage, ...item.additionalImages];

  return (
    <div className="modalContainer">
      <div className="modalStyle">
        <button onClick={onClose} className="closeBtn">
          ×
        </button>
        <h2>{item.name}</h2>
        {images.length > 0 && (
          <div className="carouselGallery">
            <div className="carouselScroll">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`extra-${i}`}
                  className="carouselImage"
                />
              ))}
            </div>
          </div>
        )}
        <p>{item.description}</p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`mailto:abdullahsajid1029@gmail.com?subject=${encodeURIComponent(
            `Enquiry about ${item.name}`
          )}&body=${encodeURIComponent(
            `Hello,\n\nI'm interested in the item "${item.name}".\n\nDescription: ${item.description}\n\nPlease let me know more details.`
          )}`}
        >
          <button>Enquire</button>
        </a>
      </div>
    </div>
  );
}
