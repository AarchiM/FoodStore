import { useEffect, useState } from "react";
import Card from "../components/Card";
import food3 from "../assets/foodone.jpeg";
import food1 from "../assets/food2.jpeg";
import food2 from "../assets/food3.jpeg";

export const Home = () => {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [searchVal, setSearchVal] = useState('');
  const images = [food3, food1, food2];

  const loadData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setFoodItem(data[0]);
      setFoodCat(data[1]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 3000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);


  return (
    <div>
      <div className='"w-full h-[65vh] overflow-hidden'>
        <img
          className="w-full h-full object-contains brightness-[50%] dark:brightness-[35%]"
          src={images[imageIndex]}
          alt="loading"
        />
        <div className="flex absolute w-1/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-lg shadow-md focus:outline-none"
            value={searchVal}
            onChange={(e)=> setSearchVal(e.target.value)}
          />
          {/* <button className="bg-primary text-white px-4 py-2 rounded-r-lg focus:outline-none">
            Search
          </button> */}
        </div>
      </div>
      <div className="m-3">
        {foodCat.map((cat) => {
          return (
            <div key={cat._id}>
              <div className="m-3 font-bold">
                {cat.categoryName.toUpperCase()}
              </div>
              <hr />
              <div className="p-3 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
                {foodItem
                  .filter((item) => (item.categoryName === cat.categoryName) && (item.name.toLowerCase().includes(searchVal.toLowerCase())))
                  .map((food) => {
                    return (
                      <div className="m-3 font-bold" key={food._id}>
                        <Card
                          foodItem = {food}
                          options={food.options[0]}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
