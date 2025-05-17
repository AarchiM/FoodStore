import { FaShoppingCart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useCart } from "../context";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CartModal = ({ setOpenCart, openCart }) => {
  const onClose = () => {
    setOpenCart(false);
  };
  const [amount, setAmount] = useState(0);
  const { items, deleteItem, emptyCart } = useCart();
  const navigate = useNavigate();
  
  const HandleCheckout = async () =>{
    try {
      const userEmail = localStorage.getItem("userEmail");
      const res = await fetch("http://localhost:5000/api/orderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_data: items,
          email: userEmail,
          order_date: new Date().toDateString()
        })
      });
      
      emptyCart();
      alert("Your Order is Completed\nThank you")
      
    } catch (error) {
      console.log("Server Error....", error);
      
    }
  }

  const HandleBrowseItem = () =>{
    setOpenCart(false);
    navigate('/')
  }

  useEffect(()=>{
    setAmount(0);
    items.map((item)=> setAmount((prev) => prev + (item.price * item.quantity))
    )
  },[items])
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 w-full"
      onClick={onClose}
    >
        {
            items.length === 0 ? <div
            className="flex h-[400px] flex-col relative dark:bg-darkbg w-3/4 items-center p-6 bg-white rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="flex items-center gap-3 font-bold pb-2">
          {" "}
          <FaShoppingCart /> Your Cart is Empty
        </h1>
            <button className="flex justify-center gap-1 bg-primary w-1/5 text-white px-2 py-1 rounded" onClick={HandleBrowseItem}
            >
                Browse Items
            </button>
          </div>
          :  
      <div
        className="relative dark:bg-darkbg w-3/4 p-6 bg-white rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="flex items-center gap-3 font-bold pb-2">
          <FaShoppingCart /> Your Cart{" "}
        </h1>
        <hr className="border-b border-primary" />
        <table className="min-w-full table-auto">
          <thead>
            <tr className="border-b border-primary">
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-left">Option</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">&nbsp;</th>
            </tr>
          </thead>
          
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{item.itemName}</td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">{item.size}</td>
                <td className="px-4 py-2">{item.price}</td>
                <td className="px-4 py-2" onClick={()=>deleteItem(item.id)}>
                  <MdDelete />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="flex flex-col gap-3">
            <hr />
            <p className="py-3">
            Total Amount : {amount}
            </p>
            <hr />
            <button className="flex items-center justify-center gap-1 bg-primary w-1/5 text-white px-2 py-1 rounded hover:bg-orange-700"
            onClick={HandleCheckout}
            >
                Check Out
            </button>
        </div>
        <button
          className="absolute top-2 right-4 text-primary hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
}
    </div>
  );
};

export default CartModal;
