/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../sass/components/characters.scss';
import { fetchCharacter } from '../api/api';
import Character from './Character.jsx';

const Characters = ({ charactersUrl }) => {
  const [allCharacters, setAllCharacters] = useState([]);
  const [filterCharacters, setFilterCharacters] = useState(false);
  const [charactersByGender, setCharactersByGender] = useState(null);
  const [descend, setDescend] = useState(false);
  const [sortBy, setSortBy] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    setAllCharacters([]);
    setFilterCharacters(false);
    const genderSelector = document.querySelector('#gender_select');
    genderSelector.selectedIndex = 0;

    charactersUrl.map((url) => {
      fetchCharacter(url, signal).then((data) => {
        if (data.error) {
          const appBody = document.querySelector('.app-body');
          const para = document.createElement('p');
          para.innerHTML = data.error;
          appBody.append(para);
        } else {
          setAllCharacters((prevCharacters) => [...prevCharacters, data]);
        }
        return true;
      });
      return true;
    });
    return () => {
      abortController.abort();
    };
  }, [charactersUrl]);

  const handlerGenderChange = (e) => {
    e.preventDefault();
    const selectedOption = e.target.options[e.target.selectedIndex].value;
    if (!selectedOption) {
      setFilterCharacters(false);
      setCharactersByGender(null);
      return true;
    }
    setFilterCharacters(true);
    setCharactersByGender(allCharacters.filter((characters) => {
      if (selectedOption === 'other') {
        return characters.gender !== 'male' && characters.gender !== 'female';
      }
      return selectedOption === characters.gender;
    }));
    return true;
  };

  const sortCharacters = (e) => {
    setDescend(true);
    const column = e.target.cellIndex;
    switch (column) {
      case 0: setSortBy('name');
        break;
      case 1: setSortBy('gender');
        break;
      case 2: setSortBy('height');
        break;
      default: setSortBy(null);
        break;
    }
    const descending = sortBy && !descend;

    setDescend(descending);
    setAllCharacters(allCharacters.sort((a, b) => {
      if (sortBy === 'height') {
        return descending ? (a[sortBy] - b[sortBy]) : (b[sortBy] - a[sortBy]);
      }
      return descending ? (a[sortBy] < b[sortBy] ? 1 : -1) : (a[sortBy] > b[sortBy] ? 1 : -1);
    }));
  };

  return (
    <div className="characters">
      <div className="body-header">
        <h3>
          Characters:
          {' '}
          <span>{`(${!filterCharacters ? allCharacters.length : charactersByGender.length})`}</span>
        </h3>
        <div className="gender">
          <label htmlFor="gender_select">Gender: </label>
          <select id="gender_select" name="gender_select" defaultValue="gender" onChange={handlerGenderChange}>
            <option value="">---</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th onDoubleClick={sortCharacters}>Name</th>
            <th onDoubleClick={sortCharacters}>Gender</th>
            <th onDoubleClick={sortCharacters}>Height</th>
          </tr>
        </thead>
        <Character characters={filterCharacters ? charactersByGender : allCharacters} />
      </table>
    </div>
  );
};

Characters.propTypes = {
  charactersUrl: PropTypes.arrayOf(PropTypes.string),
};

Characters.defaultProps = {
  charactersUrl: [],
};

export default Characters;
