import servicesImages from "./servicesImages";

const GallerySection = () => {
    return (
      <section className="gallery" id="gallery">
        <div className="gallery-content">
          <div className="section-title">
            <h1>Gallery</h1>
            <span>the cutest pets</span>
          </div>
          <div className="gallery-list-img">
            {servicesImages.gallery.map((img,imgIndex) => (
              <div key={imgIndex} className="gallery-img">
                <img src={img} alt="Gallery image" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  export default GallerySection;