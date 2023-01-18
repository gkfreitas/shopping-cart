export const getAddress = async () => {
  // seu código aqui
  const cepInput = document.querySelector('.cep-input').value;
  const APICEPAW = `https://cep.awesomeapi.com.br/json/${cepInput}`;
  const APICEPBR = `https://brasilapi.com.br/api/cep/v2/${cepInput}`;
  const responseAW = await fetch(APICEPAW);
  const dataAW = await responseAW.json();
  const responseBR = await fetch(APICEPBR);
  const dataBR = await responseBR.json();
  const promises = [dataAW, dataBR];
  const data = Promise.any(promises);
  return data;
};

export const searchCep = async () => {
  // seu código aqui
  const cepInfo = document.querySelector('.cart__address');
  try {
    const data = await getAddress();
    if (data.neighborhood) {
      cepInfo.innerHTML = `${data.street} - ${data.neighborhood} - ${data.city} - ${data.state}`;
    }
    if (data.address_type) {
      cepInfo.innerHTML = `${data.address_type} ${data.address_name} - ${data.district} - ${data.city} - ${data.state}`;
    }
  } catch (error) {
    cepInfo.innerHTML = 'CEP não encontrado';
  }
};
