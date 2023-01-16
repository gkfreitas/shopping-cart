import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

const loadingElement = document.querySelector('.loading');
const sectionProducts = document.querySelector('.products');
const errorElement = document.querySelector('.error');
document.querySelector('.cep-button').addEventListener('click', searchCep);
const createProducts = async (search) => {
  const product = await fetchProductsList(search);
  product.forEach((e) => {
    sectionProducts.appendChild(createProductElement(e));
  });
  loadingElement.parentNode.removeChild(loadingElement);
};

try {
  await createProducts('computador');
  errorElement.parentNode.removeChild(errorElement);
} catch (error) {
  errorElement.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
}
