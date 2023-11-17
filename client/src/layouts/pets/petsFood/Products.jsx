// import { useEffect } from 'react';
import foodDetails from "./foodImages";
import images from './foodservicesLandingPage/images';
import { BsCurrencyRupee } from 'react-icons/bs';

function Products() {
  // useEffect(() => {
  //   refresh();
  // }, []);

  // function refresh() {
  //   let elements = document.querySelectorAll(".items");
  //   elements.forEach((ele) => {
  //     ele.classList.remove("inactive");
  //   });

  //   let dog = document.getElementsByClassName("dogs");
  //   let cat = document.getElementsByClassName("cats");
  //   let bird = document.getElementsByClassName("birds");
  //   let fish = document.getElementsByClassName("fishes");

  //   const ex = document.getElementsByClassName("button-value");

  //   for (let i = 0; i < ex.length; i++) {
  //     let check = ex[i];
  //     check.addEventListener("click", () => {
  //       switch (check.innerHTML) {
  //         case "All":
  //           for (let i = 0; i < 5; i++) {
  //             let c1 = cat[i];
  //             let c2 = bird[i];
  //             let c3 = fish[i];
  //             let c4 = dog[i];

  //             c1.classList.remove("inactive");
  //             c2.classList.remove("inactive");
  //             c3.classList.remove("inactive");
  //             c4.classList.remove("inactive");
  //           }
  //           check.classList.add("active");
  //           break;
  //         case "Dog":
  //           for (let i = 0; i < 5; i++) {
  //             let c1 = cat[i];
  //             let c2 = bird[i];
  //             let c3 = fish[i];

  //             c1.classList.add("inactive");
  //             c2.classList.add("inactive");
  //             c3.classList.add("inactive");
  //           }
  //           check.classList.add("active");
  //           break;
  //         case "Cat":
  //           for (let i = 0; i < 5; i++) {
  //             let c1 = dog[i];
  //             let c2 = bird[i];
  //             let c3 = fish[i];

  //             c1.classList.add("inactive");
  //             c2.classList.add("inactive");
  //             c3.classList.add("inactive");
  //           }
  //           check.classList.add("active");
  //           break;
  //         case "Bird":
  //           for (let i = 0; i < 5; i++) {
  //             let c1 = dog[i];
  //             let c2 = cat[i];
  //             let c3 = fish[i];

  //             c1.classList.add("inactive");
  //             c2.classList.add("inactive");
  //             c3.classList.add("inactive");
  //           }
  //           check.classList.add("active");
  //           break;
  //         case "Fish":
  //           for (let i = 0; i < 5; i++) {
  //             let c1 = dog[i];
  //             let c2 = bird[i];
  //             let c3 = cat[i];

  //             c1.classList.add("inactive");
  //             c2.classList.add("inactive");
  //             c3.classList.add("inactive");
  //           }
  //           check.classList.add("active");
  //           break;
  //       }
  //     });
  //     check.classList.remove("active");
  //   }
  // }

  return (
    <section className="products" id="products">
      <h1 className="heading">our <span>products</span></h1>
      <div className="wrapper">
        <div id="search-container">
          <input type="search" id="search-input" placeholder="Search for items"/>
          <button id="search">Search</button>
        </div>
        <div id="buttons">
          {images.buttons.map((b,index) => (
            <a key={index} href="#products" className="button-value" value={b.value}>
            {b.desc}
          </a>
          ))}
        </div>
      </div>
      <div className="product-content">
        {foodDetails.map((item, index) => (
          <div key={index} className={`${item.petType} items`}>
            <img className="imgsrc" src={item.productDetails.src} style={{ width: '200px' }} />
            <div className="des">
              <h3 className="title">{item.productDetails.Name}</h3>
              <div className="prices" style={{ fontSize: '1.5rem' }}>
              <BsCurrencyRupee />{item.productDetails.price}
              </div>
            </div>
            <p className="name" style={{ display: 'none' }}>{item.productDetails.Name}</p>
            <p className="price" style={{ display: 'none' }}>{item.productDetails.price}</p>
            <p className="src" style={{ display: 'none' }}>{item.productDetails.src}</p>
            <p className="type" style={{ display: 'none' }}>Food</p>
            <div className="product-cart">
              <a className="btn">Add to cart</a>
            </div>
          </div>
        ))}
      </div>
      <div className="view-more">
        <center><button href="#products" className="btn viewbtn">View more</button></center>
      </div>
    </section>
  );
}

export default Products;