import i1 from "./images/gal1.jpg"
import i2 from "./images/gal2.jpg"
import i3 from "./images/gal3.jpg"
import i4 from "./images/gal4.jpg"
import i5 from "./images/gal5.jpg"
import i6 from "./images/gal6.jpg"
const Gallery =()=>{
    return (
        <div className="gallery" id="gallery">
      <h1>Gallery</h1>
      <div className="main-gallery">
        <div className="inner-gallery">
          <img src={i1} alt="" />
        </div>

        <div className="inner-gallery">
          <img src={i2} alt="" />
        </div>

        <div className="inner-gallery">
          <img src={i3} alt="" />
        </div>

        <div className="inner-gallery">
          <img src={i4} alt="" />
        </div>

        <div className="inner-gallery">
          <img src={i5} alt="" />
        </div>

        <div className="inner-gallery">
          <img src={i6} alt="" />
        </div>
      </div>
    </div>
    );
}

export default Gallery;