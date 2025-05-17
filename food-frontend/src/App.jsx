import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Layout } from "./components/Layout";
import { Home } from "./screens/Home";
import { MyOrders } from "./screens/MyOrders";
import { Footer } from "./components/Footer";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import { CartProvider } from "./context";

function App() {
  return (
    <CartProvider>
      <div className="bg-backgroundColor text-primary dark:bg-darkbg dark:border-borderdark h-full w-full">
        <Navbar />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route path="/createuser" element={<Signup />} />
            <Route path="/userlogin" element={<Login />} />
            <Route path="/myorders" element={<MyOrders />} />
          </Route>
        </Routes>
        <Layout />
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
