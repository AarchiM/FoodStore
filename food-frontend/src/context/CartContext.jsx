import { createContext, useContext, useState } from "react";

export const CartContext = createContext({
  items: [
    {
      id: 1,
      itemName: "Pizza",
      quantity: 3,
      size: "half",
      price: 120,
    },
  ],
  addItem: (id, itemName, quantity, size, price) => {},
  deleteItem: (id) => {},
});

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
            i.id === item.id ? { ...i, quantity: item.quantity } : i
          );
      }
      return [...prevItems, {...item}]
    });
  };
  const deleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const emptyCart = () =>{
    setItems([]);
  }

  return (
    <CartContext.Provider value={{ items, addItem, deleteItem , emptyCart}}>
      {children}
    </CartContext.Provider>
  );
};
