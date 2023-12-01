// ProductSection.js
// import React from 'react';
// import './ProductSection.css'; // Assuming you have a CSS file for styling
import productDetails from "./productsDetails";
const ProductSection = () => {
  // const refresh = () => {
  //   // Add any logic for refreshing here
  // };

  return (
    <section id="product1" className="section-p1">
      <div className="headings">
        <h2>Featured Products</h2>
        <p>Summer Collection New Modern Designs</p>
      </div>
      <div className="wrapper">
        <div id="search-container">
          <input type="search" id="search-input" placeholder="Search for items" />
          {/* <button id="search" onClick={refresh}>Search</button> */}
        </div>
        <div id="buttons">
          {/* <a href="#products" className="button-value" onClick={refresh} value="all">All</a>
          <a href="#products" className="button-value" onClick={refresh} value="dog">Dog</a>
          <a href="#products" className="button-value" onClick={refresh} value="cat">Cat</a>
          <a href="#products" className="button-value" onClick={refresh} value="bird">Bird</a>
          <a href="#products" className="button-value" onClick={refresh} value="fish">Fish</a> */}
        </div>
        <div id="view-products"></div>
      </div>

      <div className="pro-container">
      {productDetails.map((product, index) => (
        <div key={index} className={`pro ${product.petType}`}>
          <img className="imgsrc" src={product.productDetails.src} alt="" />
          <div className="des">
            <span>adidas</span>
            <h5 className="title">{product.productDetails.Name}</h5>
            <div className="star">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
            <h4 className="rate">
              <i className="fa-solid fa-indian-rupee-sign"></i>
              {product.productDetails.price}
            </h4>
          </div>
          <p className="name" style={{ display: 'none' }}>{product.productDetails.Name}</p>
          <p className="price" style={{ display: 'none' }}>{product.productDetails.price}</p>
          <p className="src" style={{ display: 'none' }}>{product.productDetails.src}</p>
          <p className="type" style={{ display: 'none' }}>Accessory</p>
          <button className="product-cart">
            <i className="fa-solid fa-cart-shopping" id="shop"></i>
          </button>
        </div>
      ))}
      </div>
    </section>
  );
};

export default ProductSection;
