import React, { useState } from 'react';

import Title from './Title';

const EmployeeExplorer = ({history}) => {
	const [searchValue, setSearchValue] = useState('');

	function handleChange(event) {
		setSearchValue(event.target.value);
	}

	function handleSubmit(event) {
		event.preventDefault();
		searchValue !== '' && history.push(`/overview/${searchValue}`);
  }

	return (
		<div className="container">
			<Title title='Employee Explorer' />
			<form className="form-search" onSubmit={handleSubmit}>
				<input type="text" value={searchValue} onChange={handleChange} />
				<input type="submit" value="Search" />
			</form>
		</div>
	)
}

export default EmployeeExplorer;
