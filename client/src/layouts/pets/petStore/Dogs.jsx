import Nav from "./navigation/Nav";
import Products from "./Products/Products";
import Recommended from "./Recommended/Recommended";
import SideBar from "./SideBar/SideBar";
import products from "../../../db/data";
import { dogData } from "../../../db/data";
import { useState, useEffect } from "react";
import Card from "./components/Card";
import { useHistory } from "react-router-dom";

const Dogs = () => {
  const [selectedPrice, setSelectedPrice] = useState([100, 10000]);
  const [list, setList] = useState(dogData);
  const [resultsFound, setResultsFound] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState([
    { id: 1, checked: false, label: "Sporting" },
    { id: 2, checked: false, label: "Hound" },
    { id: 3, checked: false, label: "Working" },
  ]);
  const [selectedRating, setSelectedRating] = useState(null);
  const handleChangeChecked = (id) => {
    const categoryList = category;
    const changeCheckedCategory = categoryList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setCategory(changeCheckedCategory);
  };

  const handleChangePrice = (event, value) => {
    setSelectedPrice(value);
  };

  const handleChange = (event, filterType) => {
    return !value ? null : setSelectedCategoryTemp(event.target.value);
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };
  const handleSelectRating = (event, value) =>
    !value ? null : setSelectedRating(value);

  const applyFilters = () => {
    let updatedList = dogData;
    if (selectedRating) {
      updatedList = updatedList.filter((item) => {
        return parseInt(item.rating) === parseInt(selectedRating);
      });
    }
    const categoryChecked = category
      .filter((item) => item.checked)
      .map((item) => item.label.toLowerCase());
    if (categoryChecked.length) {
      updatedList = updatedList.filter((item) => {
        return categoryChecked.includes(item.breed_group.toLowerCase());
      });
    }
    console.log("searchInput" + searchInput);
    if (searchInput) {
      updatedList = updatedList.filter(
        (item) =>
          item.name.toLowerCase().search(searchInput.toLowerCase().trim()) !==
          -1
      );
    }
    const minPrice = selectedPrice[0];
    const maxPrice = selectedPrice[1];
    updatedList = updatedList.filter((item) => {
      return item.price >= minPrice && item.price <= maxPrice;
    });
    setList(updatedList);
    !updatedList.length ? setResultsFound(false) : setResultsFound(true);
  };
  useEffect(() => {
    applyFilters();
  }, [selectedPrice, category, selectedRating, searchInput]);
  return (
    <>
      <SideBar
        priceValue={selectedPrice}
        handlePriceChange={handleChangePrice}
        handleChange={handleChange}
        category={category}
        changeChecked={handleChangeChecked}
        selectedRating={selectedRating}
        selectRating={handleSelectRating}
      />
      <Nav query={searchInput} handleInputChange={handleInputChange} />
      {/* <Recommended handleClick={handleChange} /> */}
      {/* {resultsFound ? <List list={list} /> : <EmptyView />} */}
      <Products result={list} />
    </>
  );
};

export default Dogs;
