import Nav from "./navigation/Nav";
import Products from "./Products/Products";
import SideBar from "./SideBar/SideBar";
import { useState, useEffect, memo } from "react";
import { useHistory } from "react-router-dom";
import usePets from "./use-Pets";
const Cats = () => {
  const {
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
  } = usePets("cat", [0, 10000]);
  const [initialRender, setIntialRender] = useState(true);
  const history = useHistory();
  const [list, setList] = useState([]);
  console.log(list);
  useEffect(() => {
    console.log("useEffect called");
    const timer = setTimeout(() => {
      console.log("in timer");
      applyFilters((data) => {
        setList(data);
      });
      console.log(initialRender);
      if (initialRender) {
        setIntialRender(false);
        return;
      }
      history.push({
        pathname: `/pets/cats/${1}`,
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [selectedPrice, category, selectedRating, searchInput, applyFilters]);
  return (
    <>
      <SideBar
        priceValue={selectedPrice}
        handlePriceChange={handleChangePrice}
        category={category}
        changeChecked={handleChangeChecked}
        selectedRating={selectedRating}
        selectRating={handleSelectRating}
      />
      <Nav query={searchInput} handleInputChange={handleInputChange} />
      <Products isLoading={isLoading} result={list} />
    </>
  );
};

export default memo(Cats);
