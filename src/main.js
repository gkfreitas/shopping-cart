import { saveCartID } from './helpers/cartFunctions';
import { searchCep } from './helpers/cepFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createCartProductElement, createProductElement } from './helpers/shopFunctions';
import './style.css';

const loadingElement = document.querySelector('.loading');
const sectionProducts = document.querySelector('.products');
const errorElement = document.querySelector('.error');
const cartProducts = document.querySelector('.cart__products');
document.querySelector('.cep-button').addEventListener('click', searchCep);
const createProducts = async (search) => {
  try {
    const product = await fetchProductsList(search);
    product.forEach((e) => {
      sectionProducts.appendChild(createProductElement(e));
    });
    loadingElement.parentNode.removeChild(loadingElement);
    errorElement.parentNode.removeChild(errorElement);
  } catch (error) {
    errorElement.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
  }
};
const createProdcutsCart = async () => {
  await createProducts('computador');
  const addCart = document.querySelectorAll('.product__add');
  const productId = document.querySelectorAll('.product__id');
  addCart.forEach((e, i) => e.addEventListener('click', async () => {
    const id = productId[i].innerHTML;
    saveCartID(id);
    const data = await fetchProduct(id);
    const cartProduct = createProductElement(data);
    cartProducts.appendChild(cartProduct);
  }));
};

createProdcutsCart();
