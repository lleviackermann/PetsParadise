// import { useState, useEffect } from "react";
// import { BsCurrencyRupee } from "react-icons/bs";
// import classes from "./petfoodLandingPage.module.css";
// import images from "./foodservicesLandingPage/images";
// import foodDetails from "./foodImages";

// function Products() {
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchFoodDetails = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/food");
//         const data = await response.json();
//         setFilteredProducts(data);
//         setData(data);
//       } catch (error) {
//         console.error("Error fetching food details:", error);
//       }
//     };
//     fetchFoodDetails();
//   }, []);

//   const [selectedPetType, setSelectedPetType] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleButtonClick = (petType) => {
//     const petTypeProducts =
//       petType === "ALL"
//         ? data
//         : data.filter((product) => product.petType === petType);

//     setFilteredProducts(petTypeProducts);
//     setSelectedPetType(petType);
//   };

//   const handleSearch = (event) => {
//     const term = event.target.value;
//     setSearchTerm(term);

//     const searchedProducts = data.filter((product) =>
//       product.name.toLowerCase().includes(term.toLowerCase())
//     );

//     setFilteredProducts(searchedProducts);
//     setSelectedPetType(null);
//   };

  
//   const viewmore = () => {
//     const show = document.querySelector(".productContent");
//     const view = document.querySelector(".viewbtn");

//     // Check if elements exist before accessing properties
//     if (show && view) {
//       if (view.innerHTML === "View more") {
//         show.classList.remove("view-search");
//         show.classList.add("show-more");
//         view.innerHTML = "Show Less";
//       } else {
//         show.classList.add("view-search");
//         show.classList.remove("show-more");
//         view.innerHTML = "View more";
//       }
//     }else{
//       console.log('No elements');
//     }
//   };

//   return (
//     <section className={`${classes.products} ${classes.section}`} id="products">
//       <h1 className={classes.heading}>
//         our <span>products</span>
//       </h1>
//       <div className={classes.wrapper}>
//         <div id="search-container">
//           <input
//             type="text"
//             id="search-input"
//             placeholder="Search for items"
//             value={searchTerm}
//             onChange={handleSearch}
//             style={{fontSize: "1rem", height: "5px"}}
//           />
//         </div>
//         <div id="buttons">
//           {images.buttons.map((b, index) => (
//             <a
//               key={index}
//               href="#products"
//               className={classes.buttonValue}
//               onClick={() => handleButtonClick(b.desc)}
//               style={{fontSize: "1rem", padding: "1rem 1.5rem"}}
//             >
//               {b.desc}
//             </a>
//           ))}
//         </div>
//       </div>
//       <div className={classes.productContent}>
//         {filteredProducts.map((item, index) => (
//           <div key={index} className={`${item.petType} ${classes.items}`}>
//             <img
//               className={classes.imgsrc}
//               src={
//                 "/src/layouts/pets/petsFood" +
//                 item.src.substring(
//                   item.src.indexOf("../../img") + "../../img".length
//                 )
//               }
//               alt={item.name}
//               style={{ width: "190px", height: "250px" }}
//             />
//             <div className={classes.des}>
//               <h3 className={classes.title}>{item.name}</h3>
//               <div className={classes.prices} style={{ fontSize: "1.5rem" }}>
//                 <BsCurrencyRupee />
//                 {item.price}
//               </div>
//             </div>
//             <div className={classes.productCart}>
//               <button className={classes.btn}>Add to cart</button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className={classes.viewMore}>
//         <center>
//           <button
//             href="#products"
//             className={`${classes.btn} ${classes.viewbtn}`}
//             onClick={() => viewmore()}
//           >
//             View more
//           </button>
//         </center>
//       </div>
//     </section>
//   );
// }

// export default Products;


import React, { useState, useEffect } from "react";
import { BsCurrencyRupee } from "react-icons/bs";
import classes from "./petfoodLandingPage.module.css";
import images from "./foodservicesLandingPage/images";
import foodDetails from "./foodImages";

function Products() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [data, setData] = useState([]);
  const [selectedPetType, setSelectedPetType] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const response = await fetch("http://localhost:8000/food");
        const data = await response.json();
        setFilteredProducts(data);
        setData(data);
      } catch (error) {
        console.error("Error fetching food details:", error);
      }
    };
    fetchFoodDetails();
  }, []);

  const handleButtonClick = (petType) => {
    const petTypeProducts =
      petType === "ALL"
        ? data
        : data.filter((product) => product.petType === petType);

    setFilteredProducts(petTypeProducts);
    setSelectedPetType(petType);
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const searchedProducts = data.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredProducts(searchedProducts);
    setSelectedPetType(null);
  };

  const viewmore = () => {
    setShowMore((prevShowMore) => !prevShowMore);
  };

  return (
    <section className={`${classes.products} ${classes.section}`} id="products">
      <h1 className={classes.heading}>
        our <span>products</span>
      </h1>
      <div className={classes.wrapper}>
        <div id="search-container">
          <input
            type="text"
            id="search-input"
            placeholder="Search for items"
            value={searchTerm}
            onChange={handleSearch}
            style={{ fontSize: "1rem", height: "5px" }}
          />
        </div>
        <div id="buttons">
          {images.buttons.map((b, index) => (
            <a
              key={index}
              href="#products"
              className={classes.buttonValue}
              onClick={() => handleButtonClick(b.desc)}
              style={{ fontSize: "1rem", padding: "1rem 1.5rem" }}
            >
              {b.desc}
            </a>
          ))}
        </div>
      </div>
      <div className={`${classes.productContent} ${showMore ? classes.showMore : classes.viewSearch}`}>
        {filteredProducts.map((item, index) => (
          <div key={index} className={`${item.petType} ${classes.items}`}>
            <img
              className={classes.imgsrc}
              src={
                "/src/layouts/pets/petsFood" +
                item.src.substring(
                  item.src.indexOf("../../img") + "../../img".length
                )
              }
              alt={item.name}
              style={{ width: "190px", height: "250px" }}
            />
            <div className={classes.des}>
              <h3 className={classes.title}>{item.name}</h3>
              <div className={classes.prices} style={{ fontSize: "1.5rem" }}>
                <BsCurrencyRupee />
                {item.price}
              </div>
            </div>
            <div className={classes.productCart}>
              <button className={classes.btn}>Add to cart</button>
            </div>
          </div>
        ))}
      </div>
      <div className={classes.viewMore}>
        <center>
          <button
            href="#products"
            className={`${classes.btn} ${classes.viewbtn}`}
            onClick={viewmore}
          >
            {showMore ? "Show Less" : "View more"}
          </button>
        </center>
      </div>
    </section>
  );
}

export default Products;
