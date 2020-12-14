/* eslint-disable no-console */
export const fetchFilms = (signal) => fetch('https://swapi.dev/api/films', {
  method: 'GET',
  signal,
}).then((res) => res.json()).catch((err) => {
  console.log(err);
});

export const fetchCharacter = (url, signal) => fetch(url, {
  method: 'GET',
  signal,
}).then((res) => res.json()).catch((err) => {
  console.log(err);
});
