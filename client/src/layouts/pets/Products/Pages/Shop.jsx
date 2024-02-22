import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import NewsLetter from '../Components/NewsLetter/NewsLetter'
import exclusive_image from '../Components/Assets/banner_without_BG.png'
const Shop = () => {
  return (
    <div>
      <Hero/>
      <Popular/>
      <Offers image={exclusive_image}/>
      <NewCollections/>
      <NewsLetter/>
    </div>
  )
}

export default Shop
