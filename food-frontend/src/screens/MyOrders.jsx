import { useEffect, useState } from "react";

export const MyOrders = () => {
  const [myOrder, setMyOrder] = useState([]);
  let total = 0;
  const MyOrderedData = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      const response = await fetch("http://localhost:5000/api/myOrderedData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
        }),
      }).then((res) => res.json());

      if (!response.orderDate) {
        setMyOrder([]);
        return;
      }

      setMyOrder(response.orderDate.order_data);
    } catch (error) {
      console.log("Error in API call");
    }
  };

  useEffect(() => {
    MyOrderedData();
  }, []);

  return (
    <div className="min-h-[75vh]">
      {myOrder.length == 0 ? (
        <div className="flex w-full justify-center p-4 text-xl font-bold">
          No History
        </div>
      ) : (
        <>
          <div className="flex w-full justify-center p-4 text-xl font-bold">
            Previous Orders
          </div>
          {myOrder.reverse().map((order, index) => {
            total = 0;
            return (
              <div key={order.order_date}>
                {order.map((item, index) => {
                  if (item.order_date) {
                    return (
                      <div key={index + 2}>
                        <div className="font-bold p-4">
                          DATE: {item.order_date}{" "}
                        </div>
                        <hr className="border-b border-primary" />
                      </div>
                    );
                  } else {
                    total = total + item.price * item.quantity;
                  }
                })}
                <div>
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr className="border-b border-primary">
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Quantity</th>
                        <th className="px-4 py-2 text-left">Option</th>
                        <th className="px-4 py-2 text-left">Amount</th>
                      </tr>
                    </thead>

                    <tbody>
                      {order.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td className="px-4 py-2">{item.itemName}</td>
                            <td className="px-4 py-2">{item.quantity}</td>
                            <td className="px-4 py-2">{item.size}</td>
                            <td className="px-4 py-2">{item.price}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <h1 className="p-4 font-bold underline">Total: {total}</h1>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};
