export const fetchProduct = async () => {
  // seu código aqui
};

export const fetchProductsList = async (search) => {
  // seu código aqui
  if (search === undefined) {
    throw new Error('Termo de busca não informado');
  }
  const API = `https://api.mercadolibre.com/sites/MLB/search?q=${search}`;
  const response = await fetch(API);
  const data = await response.json();
  return data.results;
};
