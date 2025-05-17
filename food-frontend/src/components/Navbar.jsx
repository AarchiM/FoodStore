import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaBoxOpen, FaShoppingCart } from "react-icons/fa";

import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Link } from "react-router-dom";
import CartModal from "../screens/CartModal";
import { useCart } from "../context";

export const Navbar = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("light");
  const [openCart, setOpenCart] = useState(false);
  const {items} = useCart();
  // const [localStorage.getItem("authToken"), setlocalStorage.getItem("authToken")] = useState(localStorage.getItem("authToken"));

  const DarkModeHandler = () => {
    if (mode === "light") setMode("dark");
    else setMode("light");
  };

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");

    document.querySelector("html").classList.add(mode);
  }, [mode]);

  return (
    <>
      {openCart ? <div className="w-full"><CartModal openCart={openCart} setOpenCart={setOpenCart}/></div> : <></>}
      <div className="flex gap-8 m-0 p-4 shadow dark:shadow-sm dark:shadow-gray-700 items-center justify-between">
        <div className="flex gap-8 items-center">
          <button className="bg-primary w-8 rounded-3xl font-bold text-white flex justify-center items-center h-8">
            A
          </button>

          <ul className="flex gap-5">
            <li>
              <Link to={"/"} className="flex items-center gap-1">
                <FaHome /> Home
              </Link>
            </li>
            {localStorage.getItem("authToken") ? (
              <li>
                <Link to={"/myorders"} className="flex items-center gap-1">
                  <FaBoxOpen /> My Orders
                </Link>
              </li>
            ) : (
              <></>
            )}
          </ul>
        </div>

        <div className="flex items-center gap-5">
          {!localStorage.getItem("authToken") ? (
            <button className="flex items-center gap-1 bg-primary text-white px-2 py-1 rounded">
              <Link to={"/createuser"} className="flex items-center gap-1">
                Sign Up
              </Link>
            </button>
          ) : (
            <button
              onClick={(e) => setOpenCart(true)}
              className="flex items-center gap-1 bg-primary text-white px-2 py-1 rounded"
            >
              <FaShoppingCart /> Cart {items.length !== 0 && <div className="bg-white text-xs px-1 rounded-xl text-primary">{items.length}</div>}
            </button>
          )}
          {localStorage.getItem("authToken") ? (
            <button
              className="flex items-center gap-1 bg-primary text-white px-2 py-1 rounded"
              onClick={(e) => {
                localStorage.removeItem("authToken");
                localStorage.removeItem("userEmail");
                navigate("/userlogin");
              }}
            >
              Logout
            </button>
          ) : (
            <button className="flex items-center gap-1 bg-primary text-white px-2 py-1 rounded">
              <Link to={"/userlogin"}>Login</Link>
            </button>
          )}
          <button
            onClick={DarkModeHandler}
            className="flex items-center gap-1 border p-2 rounded-3xl border-primary"
          >
            {mode == "light" ? <MdDarkMode /> : <MdLightMode />}
          </button>
        </div>
      </div>
    </>
  );
};
