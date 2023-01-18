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
      const { street, neighborhood, city, state } = data;
      const text = `${street} - ${neighborhood} - ${city} - ${state}`;
      cepInfo.innerHTML = text;
    }
    if (data.address_type) {
      const { district, city, state } = data;
      const addressName = data.address_name;
      const addressType = data.address_type;
      const text = `${addressType} ${addressName} - ${district} - ${city} - ${state}`;
      cepInfo.innerHTML = text;
    }
  } catch (error) {
    cepInfo.innerHTML = 'CEP não encontrado';
  }
};
