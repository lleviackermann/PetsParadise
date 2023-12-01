import React from "react";
import { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { dogData, catData } from "../../../db/data";
const catergoryData = {
  dogs: [
    { id: 1, checked: false, label: "Sporting" },
    { id: 2, checked: false, label: "Hound" },
    { id: 3, checked: false, label: "Working" },
  ],
  cats: [
    { id: 1, checked: false, label: "Sporting" },
    { id: 2, checked: false, label: "Hound" },
    { id: 3, checked: false, label: "Working" },
  ],
};

function usePets(pet, priceRange) {
  const [initialRender, setIntialRender] = useState(true);
  const [selectedPrice, setSelectedPrice] = useState(priceRange);
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState(catergoryData[pet]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };
  const handleSelectRating = (event, value) =>
    !value ? setSelectedRating(null) : setSelectedRating(value);

  const applyFilters = useCallback(
    (sendData) => {
      console.log("apply filter called");
      setIsLoading(true);
      let updatedList = [];
      if (pet === "dogs") {
        updatedList = dogData;
      }
      if (pet === "cats") {
        updatedList = catData;
      }

      console.log("selected rating", selectedRating);
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
      if (searchInput) {
        updatedList = updatedList.filter(
          (item) =>
            item.name.toLowerCase().search(searchInput.toLowerCase().trim()) !==
            -1
        );
      }
      const minPrice = selectedPrice[0];
      const maxPrice = selectedPrice[1];
      console.log(minPrice, maxPrice);

      updatedList = updatedList.filter((item) => {
        return item.price >= minPrice && item.price <= maxPrice;
      });

      sendData(updatedList);
      setIsLoading(false);
      // !updatedList.length ? setResultsFound(false) : setResultsFound(true);
    },
    [selectedRating, searchInput, selectedPrice, category]
  );
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     applyFilters();
  //     if (initialRender) {
  //       setIntialRender(false);
  //       console.log("returned");
  //       return;
  //     }
  //     history.push({
  //       pathname: `/pets/dogs/${1}`,
  //     });
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, [selectedPrice, category, selectedRating, searchInput]);

  return {
    selectedPrice,
    selectedRating,
    searchInput,
    category,
    handleChangeChecked,
    handleChangePrice,
    handleInputChange,
    handleSelectRating,
    applyFilters,
    isLoading,
  };
}

export default usePets;
