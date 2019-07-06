import React, { useState } from 'react';

const EmployeeExplorer = ({history}) => {
	const [searchValue, setSearchValue] = useState('');

	function handleChange(event) {
		setSearchValue(event.target.value);
	}

	function handleSubmit(event) {
		event.preventDefault();
		history.push({
			pathname: '/overview',
			search: `${searchValue}`,
			state: {employee: searchValue}
		})
  }

	return (
		<div className="container">
			<header className="header">
				<h5> Employee Explorer </h5>
			</header>
			<form className="form-search" onSubmit={handleSubmit}>
				<input type="text" value={searchValue} onChange={handleChange} />
				<input type="submit" value="Search" />
			</form>
		</div>
	)
}

export default EmployeeExplorer;
