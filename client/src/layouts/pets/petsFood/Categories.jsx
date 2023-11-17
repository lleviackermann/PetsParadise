import images from './foodservicesLandingPage/images'

const Categories = () => {
    return (
    <section className="categories" id="categories">
      <h1 className="heading">Product <span>categories</span></h1>
      <div className="box-container">
        <div className="box">
          <img
            src={images.categories.dogFood6}
            style={{ width: "200px" }}
            alt="Dog Food"
          />
          <h3>Dog food</h3>
          <p>for all breeds</p>
          <a href="#products" className="btn">shop now</a>
        </div>
        <div className="box">
          <img
            src={images.categories.catFood6}
            style={{ width: "200px" }}
            alt="Cat Food"
          />
          <h3>Cat food</h3>
          <p>for all breeds</p>
          <a href="#products" className="btn">shop now</a>
        </div>
        <div className="box">
          <img
            src={images.categories.birdFood5}
            style={{ width: "200px" }}
            alt="Bird Food"
          />
          <h3>Bird food</h3>
          <p>for specific breeds</p>
          <a href="#products" className="btn">shop now</a>
        </div>
        <div className="box">
          <img
            src={images.categories.fishFood5}
            style={{ width: "200px" }}
            alt="Fish Food"
          />
          <h3>Fish food</h3>
          <p>for all breeds</p>
          <a href="#products" className="btn">shop now</a>
        </div>
      </div>
    </section>
  );
}

export default Categories;