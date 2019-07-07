import React, { useState } from "react";

import Title from "./Title";

const EmployeeExplorer = ({ history }) => {
  const [searchValue, setSearchValue] = useState("");

  function handleChange(event) {
    setSearchValue(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    searchValue !== "" && history.push(`/overview/${searchValue}`);
  }

  return (
    <div className="container">
      <Title title="Employee Explorer" />
      <form className="explorer-form" onSubmit={handleSubmit}>
        <input
          className="explorer-form__item explorer-form__input"
          type="text"
          value={searchValue}
          onChange={handleChange}
        />
        <input
          className="explorer-form__item explorer-form__button"
          type="submit"
          value="SEARCH"
        />
      </form>
    </div>
  );
};

export default EmployeeExplorer;
