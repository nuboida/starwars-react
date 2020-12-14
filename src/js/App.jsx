/* eslint-disable import/extensions */
import React, { useEffect, useState } from 'react';
import '../sass/components/app.scss';
import FilmSelect from './components/FilmSelect.jsx';
import FilmDetails from './components/FilmDetails.jsx';
import { fetchFilms } from './api/api';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [films, setFilms] = useState({});
  const [selectedFilm, setSelectedFilm] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    fetchFilms(signal).then((data) => {
      if (data.error) {
        const appBody = document.querySelector('.app-body');
        const para = document.createElement('p');
        para.innerHTML = data.error;
        appBody.append(para);
      } else {
        setFilms(data.results);
        setLoading(false);
      }
      return () => {
        abortController.abort();
      };
    });
  }, []);

  const getFilm = (filmTitle) => {
    setSelectedFilm(films.filter((film) => filmTitle === film.title)[0]);
  };

  return (
    <div className="starwars">
      <header className="header">
        <h2>Starwars</h2>
      </header>
      {loading ? (
        <div className="app-body">
          <div className="loading-center-absolute">
            <div className="object" id="object_one" />
            <div className="object" id="object_two" />
            <div className="object" id="object_three" />
            <div className="object" id="object_four" />
          </div>
        </div>
      ) : (
        <div className="app-body">
          <FilmSelect films={films} getFilm={getFilm} />
          <FilmDetails selectedFilm={selectedFilm} />
        </div>
      )}
    </div>
  );
};

export default App;
