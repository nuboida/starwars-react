/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

const Character = ({ characters }) => {
  let noOfCharacters;

  const abbrGender = (gender) => {
    if (gender === 'male') {
      return 'M';
    } if (gender === 'female') {
      return 'F';
    }
    return 'N/A';
  };

  const addHeight = () => characters.reduce((acca, character) => acca += new Number(character.height), 0);

  const heightToFeet = (n) => {
    const realFeet = ((n * 0.394) / 12);
    const feet = Math.floor(realFeet);
    const inches = Math.round((realFeet - feet) * 12);
    return `${n}cm (${feet}ft/${inches}in)`;
  };

  return (
    <>
      <tbody>
        {characters.map((character, i) => {
				  noOfCharacters = i + 1;
				  return (
  <tr key={`character${i}`}>
    <td>{character.name}</td>
    <td>{abbrGender(character.gender)}</td>
    <td>{character.height}</td>
  </tr>
				  );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td rowSpan="2">
            No Of Characters:
            {' '}
            {noOfCharacters}
          </td>
          <td>
            Sum Of Heights:
            {' '}
            {heightToFeet(addHeight())}
          </td>
        </tr>
      </tfoot>
    </>
  );
};

Character.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.any),
};

Character.defaultProps = {
  characters: [],
};

export default Character;
