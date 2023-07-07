

export const addToLocal = (items) => {
  localStorage.setItem('cart', JSON.stringify(items));
};


export const getLocal = () => {
  const data = localStorage.getItem('cart');
  return data === null ? [] : JSON.parse(data);
}