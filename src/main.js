import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const createProducts = async () => {
  const sectionProducts = document.querySelector('.products');
  const product = await fetchProductsList('computador');
  product.forEach((e) => {
    sectionProducts.appendChild(createProductElement(e));
  });
};
createProducts();
