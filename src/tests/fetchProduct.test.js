import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {

    it('fetchProduct é uma função', () => {
      const expected = 'function';
      expect(typeof fetchProduct).toBe(expected);
    });
  
    it('fetch é chamado ao executar fetchProduct', () => {
      const expected = 'object';
      expect(typeof fetchProduct('MLB1405519561')).toBe(expected);
    });
  
    it('fetch é chamado com o endpoint correto ao executar fetchProduct', async () => {
      const expected = 'MLB1405519561';
      const data = await fetchProduct('MLB1405519561');
      expect(data.id).toEqual(expected);
    });
  
    it('Teste se o retorno da função fetchProduct com o argumento computador é uma estrutura de dados igual ao objeto computadorSearch', async () => {
      expect(Object.keys(await fetchProduct('MLB1405519561'))).toEqual(Object.keys(product));
    });
  
    it('Teste se, ao chamar a função fetchProduct sem argumento, retorna um erro ', async () => {
      const expected = new Error('ID não informado');
      await expect(fetchProduct()).rejects.toThrow(expected);
    });
});
