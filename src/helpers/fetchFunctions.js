export const fetchProduct = () => {
  // seu código aqui
};

function testFetchProductsList(search) {
  if (search === undefined) {
    throw new Error('Termo de busca não informado');
  }
}

export const fetchProductsList = (search) => {
  // seu código aqui
  try {
    testFetchProductsList(search);
  } catch (error) {
    return error.message;
  }
};
