const { XMLHttpRequest } = require("xmlhttprequest");

const url = 'https://rickandmortyapi.com/api/character/';  
// Cambio de nombre de las variables A, B y X a url, xhr y apiCall para mejorar la legibilidad del código
const apiCall = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest(); // Uso de una nueva instancia para cada petición
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status === 200)
          resolve(JSON.parse(xhr.responseText));
        else
          reject(new Error(`Error ${xhr.status}`));
      }
    };
    xhr.open('GET', url, true); // Se cambia el tercer parámetro a true para que se realice una petición asíncrona
    xhr.send();
  });
};

const fetchData = async () => { // Uso de async/await
  try {
    const characters = await apiCall(url);
    console.log('Primer Llamado...');
    console.log(`Personajes: ${characters.info.count}`);

    const character = await apiCall(`${url}${characters.results[0].id}`);
    console.log('Segundo Llamado...');
    console.log(`Primer Personaje: ${character.name}`);

    const origin = await apiCall(character.origin.url);
    console.log('Tercer Llamado...');
    console.log(`Dimensión: ${origin.dimension}`);
  } catch (error) { // Los errores se centralizan en un solo bloque
    console.error(`Error ${error}`);
  }
};

fetchData();
