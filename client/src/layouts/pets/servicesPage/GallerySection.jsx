import servicesImages from "./servicesImages";
import classes from "./servicesLandingPage.module.css"; 

const GallerySection = () => {
  return (
    <section className={classes.gallery} id="gallery"> 
      <div className={classes["gallery-content"]}> 
        <div className={classes["section-title"]}> 
          <h1>Gallery</h1>
          <span>the cutest pets</span>
        </div>
        <div className={classes["gallery-list-img"]}> 
          {servicesImages.gallery.map((img, imgIndex) => (
            <div key={imgIndex} className={classes["gallery-img"]}> 
              <img src={img} alt="Gallery image" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GallerySection;
