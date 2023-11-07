// import foodDetails from "./foodImages";

// function Products() {
//   return (
//     <section className="products" id="products">
//       <h1 className="heading">our <span>products</span></h1>
//       <div className="wrapper">
//         <div id="search-container">
//           <input
//             type="search"
//             id="search-input"
//             placeholder="Search for items"
//           />
//           <button id="search">Search</button>
//         </div>
//         <div id="buttons">
//           <a
//             href="#products"
//             className="button-value"
//             onClick={refresh}
//             value="all"
//           >
//             All
//           </a>
//           <a
//             href="#products"
//             className="button-value"
//             onClick={refresh}
//             value="dog"
//           >
//             Dog
//           </a>
//           <a
//             href="#products"
//             className="button-value"
//             onClick={refresh}
//             value="cat"
//           >
//             Cat
//           </a>
//           <a
//             href="#products"
//             className="button-value"
//             onClick={refresh}
//             value="bird"
//           >
//             Bird
//           </a>
//           <a
//             href="#products"
//             className="button-value"
//             onClick={refresh}
//             value="fish"
//           >
//             Fish
//           </a>
//         </div>
//         {/* <div id="view-products"></div> */}
//       </div>
//       <div className="product-content">
//       {foodDetails.map((item, index) => (
//           <div key={index} className={`${item.petType} items`}>
//             <img className="imgsrc" src={item.productDetails.src} style={{ width: '200px' }} />
//             <div className="des">
//               <h3 className="title">{item.productDetails.Name}</h3>
//               <div className="prices" style={{ fontSize: '1.5rem' }}>
//                 <i className="fa-solid fa-indian-rupee-sign"></i>
//                 {item.productDetails.price}
//               </div>
//             </div>
//             <p className="name" style={{ display: 'none' }}>{item.productDetails.Name}</p>
//             <p className="price" style={{ display: 'none' }}>{item.productDetails.price}</p>
//             <p className="src" style={{ display: 'none' }}>{item.productDetails.src}</p>
//             <p className="type" style={{ display: 'none' }}>Food</p>
//             <div className="product-cart">
//               <a className="btn">Add to cart</a>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="view-more">
//         <center>
//           <button href="#products" className="btn viewbtn">View more</button>
//         </center>
//       </div>
//     </section>
//   );
// }


// function refresh() {
//   console.log("refresh clicked");
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
//     console.log('Adding click');
//     let check = ex[i];
//     console.log(check);
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

// export default Products;



import { useEffect } from 'react';
import foodDetails from "./foodImages";

function Products() {
  useEffect(() => {
    refresh(); // Call the refresh function when the component mounts
  }, []);

  function refresh() {
    let elements = document.querySelectorAll(".items");
    elements.forEach((ele) => {
      ele.classList.remove("inactive");
    });

    let dog = document.getElementsByClassName("dogs");
    let cat = document.getElementsByClassName("cats");
    let bird = document.getElementsByClassName("birds");
    let fish = document.getElementsByClassName("fishes");

    const ex = document.getElementsByClassName("button-value");

    for (let i = 0; i < ex.length; i++) {
      let check = ex[i];
      check.addEventListener("click", () => {
        switch (check.innerHTML) {
          case "All":
            for (let i = 0; i < 5; i++) {
              let c1 = cat[i];
              let c2 = bird[i];
              let c3 = fish[i];
              let c4 = dog[i];

              c1.classList.remove("inactive");
              c2.classList.remove("inactive");
              c3.classList.remove("inactive");
              c4.classList.remove("inactive");
            }
            check.classList.add("active");
            break;
          case "Dog":
            for (let i = 0; i < 5; i++) {
              let c1 = cat[i];
              let c2 = bird[i];
              let c3 = fish[i];

              c1.classList.add("inactive");
              c2.classList.add("inactive");
              c3.classList.add("inactive");
            }
            check.classList.add("active");
            break;
          case "Cat":
            for (let i = 0; i < 5; i++) {
              let c1 = dog[i];
              let c2 = bird[i];
              let c3 = fish[i];

              c1.classList.add("inactive");
              c2.classList.add("inactive");
              c3.classList.add("inactive");
            }
            check.classList.add("active");
            break;
          case "Bird":
            for (let i = 0; i < 5; i++) {
              let c1 = dog[i];
              let c2 = cat[i];
              let c3 = fish[i];

              c1.classList.add("inactive");
              c2.classList.add("inactive");
              c3.classList.add("inactive");
            }
            check.classList.add("active");
            break;
          case "Fish":
            for (let i = 0; i < 5; i++) {
              let c1 = dog[i];
              let c2 = bird[i];
              let c3 = cat[i];

              c1.classList.add("inactive");
              c2.classList.add("inactive");
              c3.classList.add("inactive");
            }
            check.classList.add("active");
            break;
        }
      });
      check.classList.remove("active");
    }
  }

  return (
    <section className="products" id="products">
      <h1 className="heading">our <span>products</span></h1>
      <div className="wrapper">
        <div id="search-container">
          <input
            type="search"
            id="search-input"
            placeholder="Search for items"
          />
          <button id="search">Search</button>
        </div>
        <div id="buttons">
          <a
            href="#products"
            className="button-value"
            value="all"
          >
            All
          </a>
          <a
            href="#products"
            className="button-value"
            value="dog"
          >
            Dog
          </a>
          <a
            href="#products"
            className="button-value"
            value="cat"
          >
            Cat
          </a>
          <a
            href="#products"
            className="button-value"
            value="bird"
          >
            Bird
          </a>
          <a
            href="#products"
            className="button-value"
            value="fish"
          >
            Fish
          </a>
        </div>
        {/* <div id="view-products"></div> */}
      </div>
      <div className="product-content">
        {foodDetails.map((item, index) => (
          <div key={index} className={`${item.petType} items`}>
            <img className="imgsrc" src={item.productDetails.src} style={{ width: '200px' }} />
            <div className="des">
              <h3 className="title">{item.productDetails.Name}</h3>
              <div className="prices" style={{ fontSize: '1.5rem' }}>
                <i className="fa-solid fa-indian-rupee-sign"></i>
                {item.productDetails.price}
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
        <center>
          <button href="#products" className="btn viewbtn">View more</button>
        </center>
      </div>
    </section>
  );
}

export default Products;
