import { XMLHttpRequest } from "xmlhttprequest";

const url: string = 'https://rickandmortyapi.com/api/character/';

const X = (url: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200)
          resolve(JSON.parse(xhr.responseText));
        else
          reject(new Error(`Error ${xhr.status}`));
      }
    };
    xhr.open('GET', url, true, 'user', 'password'); // Añadir usuario y contraseña según sea necesario
    xhr.send(null); // Enviar null si no se envía ningún dato
  });
};

const fetchData = async () => {
  try {
    const characters = await X(url);
    console.log('Primer Llamado...');
    console.log(`Personajes: ${characters.info.count}`);

    const character = await X(`${url}${characters.results[0].id}`);
    console.log('Segundo Llamado...');
    console.log(`Primer Personaje: ${character.name}`);

    const origin = await X(character.origin.url);
    console.log('Tercer Llamado...');
    console.log(`Dimensión: ${origin.dimension}`);
  } catch (error) {
    console.error(`Error ${error}`);
  }
};

fetchData();
