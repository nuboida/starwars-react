import React from 'react';
import PropTypes from 'prop-types';
import '../../sass/components/filmDetails.scss';

const FilmDetails = ({ selectedFilm }) => {
  let details;
  if (!selectedFilm.title) {
    details = <div className="filmDetail"><h1>Starwars</h1></div>;
  } else {
    details = (
      <div className="filmDetail">
        <h2>
          Starwars:
          {' '}
          <span>{selectedFilm.title}</span>
        </h2>
      </div>
    );
  }

  return (
    <div className="filmDetails">
      {details}
    </div>
  );
};

FilmDetails.propTypes = {
  selectedFilm: PropTypes.objectOf(PropTypes.any),
};

FilmDetails.defaultProps = {
  selectedFilm: {},
};

export default FilmDetails;
