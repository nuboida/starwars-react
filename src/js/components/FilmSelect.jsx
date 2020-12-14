/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import '../../sass/components/filmSelect.scss';

const FilmSelect = ({ films }) => (
  <div className="filmSelect">
    <select
      defaultValue="no-value"
      name="select-film"
      required
    >
      <option value="no-value" disabled>Select a Starwars film...</option>
      {films.map((film) => (
        <option key={film.episode_id} value={film.title}>{film.title}</option>))}
    </select>
  </div>
);

FilmSelect.propTypes = {
  films: PropTypes.arrayOf(PropTypes.object),
};

FilmSelect.defaultProps = {
  films: [],
};

export default FilmSelect;
