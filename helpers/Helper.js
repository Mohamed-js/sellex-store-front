export const getStore = async () => {
  const res = await fetch("http://localhost:3001/api/v1/stores/khaby");
  const data = await res.json();
  return data;
};

export const getProduct = async (id, store) => {
  const res = await fetch(
    `http://localhost:3001/api/v1/products/${id}?store=${store}`
  );
  const data = await res.json();
  return data;
};

export const getProducts = async (store) => {
  const res = await fetch(
    `http://localhost:3001/api/v1/products?store=${store}`
  );
  const data = await res.json();
  return data;
};

export const getStaticProducts = async (store) => {
  const res = await fetch(`http://localhost:3001/api/v1/products`, {
    method: "POST",
  });
  const data = await res.json();
  return data;
};
