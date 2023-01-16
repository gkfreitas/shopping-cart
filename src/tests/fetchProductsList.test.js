import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    const expected = 'function';
    expect(typeof fetchProductsList).toBe(expected);
  });

  it('fetch é chamado ao executar fetchProductsList', () => {
    const expected = 'object';
    expect(typeof fetchProductsList('computador')).toBe(expected);
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
    const expected = 'computador';
    expect(await fetchProductsList('computador').query).toEqual(expected);
  });

  it('Teste se o retorno da função fetchProductsList com o argumento computador é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    expect(await fetchProductsList('computador').results[0]).toEqual(computadorSearch);
  });

  it('Teste se, ao chamar a função fetchProductsList sem argumento, retorna um erro ', async () => {
    const expected = new Error('Termo de busca não informado');
    expect(await fetchProductsList()).toThrow(expected);
  });
});
