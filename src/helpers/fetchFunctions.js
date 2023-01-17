export const fetchProduct = async (searchId) => {
  if (searchId === undefined) {
    throw new Error('ID não informado');
  }
  const API = `https://api.mercadolibre.com/items/${searchId}`;
  const response = await fetch(API);
  const data = await response.json();
  return data;
};

export const fetchProductsList = async (search) => {
  if (search === undefined) {
    throw new Error('Termo de busca não informado');
  }
  const API = `https://api.mercadolibre.com/sites/MLB/search?q=${search}`;
  const response = await fetch(API);
  const data = await response.json();
  return data.results;
};
