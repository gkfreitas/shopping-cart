import { getSavedCartIDs, saveCartID } from './helpers/cartFunctions';
import { getAddress, searchCep } from './helpers/cepFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createCartProductElement, createProductElement } from './helpers/shopFunctions';
import './style.css';

const loadingElement = document.querySelector('.loading');
const sectionProducts = document.querySelector('.products');
const errorElement = document.querySelector('.error');
const cartProducts = document.querySelector('.cart__products');
const totalPrice = document.querySelector('.total-price');
const repeatCart = '.cart__product';

document.querySelector('.cep-button').addEventListener('click', searchCep);


const calcTotalPrice = () => {
  const product = document.querySelectorAll(repeatCart);
  let sum = 0;
  product.forEach((e) => {
    const values = e.querySelector('.product__price__value').innerHTML;
    sum += parseFloat(values);
  });
  totalPrice.innerHTML = sum;
};

const changeTotalPrice = () => {
  calcTotalPrice();
  const product = document.querySelectorAll(repeatCart);
  product.forEach((e) => {
    e.addEventListener('click', () => {
      calcTotalPrice();
    });
  });
};

const createProdcutsCart = async () => {
  const addCart = document.querySelectorAll('.product__add');
  const productId = document.querySelectorAll('.product__id');
  addCart.forEach((e, i) => e.addEventListener('click', async () => {
    const id = productId[i].innerHTML;
    saveCartID(id);
    const data = await fetchProduct(id);
    const cartProduct = createCartProductElement(data);
    cartProducts.appendChild(cartProduct);
    changeTotalPrice();
  }));
};

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
  createProdcutsCart();
};

const localStorageCart = async () => {
  const promises = getSavedCartIDs().map((e) => {
    const data = fetchProduct(e);
    return data;
  });
  const data = await Promise.all(promises);
  data.forEach((e) => {
    const cartProduct = createCartProductElement(e);
    cartProducts.appendChild(cartProduct);
  });
  calcTotalPrice();
  changeTotalPrice();
};

window.onload = function () {
  localStorageCart();
  createProducts('computador');
};
