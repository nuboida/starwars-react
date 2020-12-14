import React from 'react';
import PropTypes from 'prop-types';

const Character = ({ characters }) => (
	<>
		<tbody>
			{characters.map((character, i) => (
				<tr key={`character${i}`}>
					<td>{character.name}</td>
					<td>{character.gender}</td>
					<td>{character.height}</td>
				</tr>
			))}
		</tbody>
	</>
);

Character.propTypes = {
	characters: PropTypes.arrayOf(PropTypes.any),
};

Character.defaultProps = {
	characters: [],
};

export default Character;
