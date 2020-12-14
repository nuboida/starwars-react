/* eslint-disable no-console */
export const fetchFilms = (signal) => fetch('https://swapi.dev/api/films', {
  method: 'GET',
  signal,
}).then((res) => res.json()).catch((err) => {
  console.log(err);
});
