import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchCharacter } from '../api/api';
import Character from './Character.jsx';

const Characters = ({ charactersUrl }) => {
	const [allCharacters, setAllCharacters] = useState([]);

	useEffect(() => {
		const abortController = new AbortController();
		const { signal } = abortController;
		setAllCharacters([]);

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
			});
		});
		return () => {
			abortController.abort();
		};
	}, [charactersUrl]);

	return (
		<div className="characters">
			<div className="body-header">
				<h3>Characters</h3>
				<div className="gender">
					<label htmlFor="gender_select">Gender: </label>
					<select id="gender_select" name="gender_select" defaultValue="gender">
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
						<th>Name</th>
						<th>Gender</th>
						<th>Height</th>
					</tr>
				</thead>
				<Character characters={allCharacters} />
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
