const host = "http://127.0.0.1:3001";
// const host = "https://sellex.onrender.com/";

export const getStore = async (store) => {
  const res = await fetch(host + `/api/v1/stores/1?store=${store}`);
  const data = await res.json();
  return data;
};

export const getProducts = async (store) => {
  const res = await fetch(host + `/api/v1/products?store=${store}`);
  const data = await res.json();
  return data;
};

export const searchProduct = async (value, store) => {
  const res = await fetch(host + `/api/v1/search?q=${value}&store=${store}`);
  const data = await res.json();
  return data;
};

export const submitOrder = async (order) => {
  const res = await fetch(host + `/api/v1/orders`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(order),
  });
  const data = await res.json();
  return data;
};

// For static building
export const getStaticProduct = async (id) => {
  const res = await fetch(host + `/api/v1/products/${id}`);
  const data = await res.json();
  return data;
};

export const getStaticProducts = async () => {
  const res = await fetch(host + `/api/v1/products`, {
    method: "POST",
  });
  const data = await res.json();
  return data;
};
