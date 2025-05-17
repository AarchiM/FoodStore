import React, { useEffect, useRef, useState } from "react";
import { useCart } from "../context";

const Card = (props) => {
  const PriceOptions = Object.keys(props.options);
  const priceCount = props.options;
  const priceRef = useRef();
  const {addItem, items} = useCart();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const HandleAddToCart =()=>{
    addItem({
      id: props.foodItem._id,
      itemName: props.foodItem.name,
      quantity: qty,
      size: size,
      price: props.options[size],
    })    
  }
  
  useEffect(()=>{
    setSize(priceRef.current.value)
  },[])
  
  return (
    <div className="flex flex-col border h-[450px] dark:border-gray-700 rounded text-gray-600 dark:text-white">
      <div>
        <img
          src={props.foodItem.img}
          alt="Food"
          style={{ maxHeight: "228px", objectFit: "fill" }}
        />
      </div>
      <div className="p-4">
        <h1>{props.foodItem.name}</h1>
        <p className="h-[72px] overflow-hidden">{props.foodItem.description}</p>
      </div>
      <div className="flex gap-3 px-4">
        <select className="bg-primary focus:outline-none rounded text-white w-1/2" ref={priceRef} onChange={(e)=> setSize(e.target.value)}>
          {
          PriceOptions.map((data) => {
            return (
              <option key={data} value={data} >
                {data}
              </option>
            );
          })
          }
        </select>    
        <div className="">
            {priceRef.current ? `₹ ${(priceCount[priceRef.current.value] * qty)}/-` : ""}
        </div>   
      </div>
      <hr className="mt-2"/>
      <div className="p-4 flex flex-row gap-3">
      <select className="bg-primary rounded focus:outline-none text-white w-1/3" onChange={(e)=> setQty(e.target.value)}>
          {Array.from(Array(6), (e, i) => {
            return (
              <option key={i + 1} value={i + 1} >
                {i + 1}
              </option>
            );
          })}
        </select>
      <button 
      className="flex justify-center w-2/3 gap-1 bg-primary text-white px-2 py-1 rounded hover:bg-orange-700"
      onClick={HandleAddToCart}>
        Add to Cart
      </button>
      </div>
    </div>
  );
};

export default Card;
