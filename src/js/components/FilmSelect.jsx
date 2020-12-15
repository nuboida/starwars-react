/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import '../../sass/components/filmSelect.scss';

const FilmSelect = ({ films, getFilm }) => (
  <div className="filmSelect">
    <select
      defaultValue="no-value"
      name="select-film"
      required
      onChange={(e) => {
			  e.preventDefault();
			  const selectedFilm = e.target.options[e.target.selectedIndex].value;
			  getFilm(selectedFilm);
      }}
    >
      <option value="no-value" disabled>Select a Starwars film...</option>
      {films.map((film) => (
        <option key={film.episode_id} value={film.title}>{film.title}</option>))}
    </select>
  </div>
);

FilmSelect.propTypes = {
  films: PropTypes.arrayOf(PropTypes.object),
  getFilm: PropTypes.func,
};

FilmSelect.defaultProps = {
  films: [],
  getFilm: (f) => f,
};

export default FilmSelect;
