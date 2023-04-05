import { useEffect, useState } from "react";
import { submitOrder } from "../helpers/Helper";

const Checkout = ({ storageProducts, store, closeCart, showDialog }) => {
  const [order, setOrder] = useState({
    store: store.name,
    order_items: [
      ...storageProducts.map((product) => {
        return {
          product_id: product.id,
          quantity: product.quantity,
          variants: JSON.stringify(product.variants),
        };
      }),
    ],
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await submitOrder(order);

    if (res.message && res.message === "Order created.")
      localStorage.setItem("products", JSON.stringify([]));
    // Close cart
    closeCart();
    // Show pop up
    showDialog("We successfully received your order..!");
  };

  const handleChange = (e) => {
    setOrder((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  useEffect(() => {}, []);
  return (
    <div>
      <h1 className="text-center text-2xl font-semibold">Checkout</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between">
          <input
            type="text"
            name="first_name"
            placeholder="First name"
            onChange={handleChange}
            className="p-2 border rounded w-1/2 focus:outline mt-3 mr-3"
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last name"
            onChange={handleChange}
            className="p-2 border rounded w-1/2 focus:outline mt-3"
          />
        </div>
        <div className="flex justify-between">
          <input
            type="text"
            name="country"
            placeholder="Country"
            onChange={handleChange}
            className="p-2 border rounded w-1/2 focus:outline mt-3 mr-3"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
            className="p-2 border rounded w-1/2 focus:outline mt-3"
          />
        </div>
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          className="p-2 border rounded w-full focus:outline mt-3 mr-3"
        />
        <textarea
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleChange}
          className="p-2 border rounded w-full focus:outline mt-3 mb-1"
        ></textarea>

        <button
          className="text-lg w-full bg-black text-white pt-4 pb-4 text-center "
          data-variant="flat"
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
