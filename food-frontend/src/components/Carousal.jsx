import React, { useState, useEffect } from "react";
import food from "../assets/foodone.jpeg";
import food1 from "../assets/food2.jpeg";
import food2 from "../assets/food3.jpeg";

const Carousal = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const images = [food, food1, food2];

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 3000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className='"w-full h-[60vh] overflow-hidden'>
      <img className="w-full h-full object-contains brightness-[50%] dark:brightness-[35%]" src={images[imageIndex]} alt="loading" />
      <div 
        className="flex absolute w-1/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
      <input
        type="text"
        placeholder="Search..."
        className="w-full px-4 py-2 rounded-l-lg shadow-md focus:outline-none"
      />
      <button className="bg-primary text-white px-4 py-2 rounded-r-lg focus:outline-none">Search</button>
      </div>
    </div>
  );
};

export default Carousal;
