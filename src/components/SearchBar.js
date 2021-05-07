import React, { useState, useEffect, useCallback } from "react";

import useDebounce from "../hooks/useDebounce";

import "../styles/SearchBar.css";

export default function SearchBar(props) {
  const [state, setState] = useState({
    value: "",
  });
  const query = useDebounce(state.value, 400);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSearch = useCallback(props.onSearch, [query]);

  useEffect(() => {
    onSearch(query);
  }, [query, onSearch]);

  return (
    <div className="search">
      <form
        className="search__form"
        onSubmit={(event) => event.preventDefault()}
      >
        <input
          className="radius search__form__input"
          spellCheck="false"
          placeholder="Enter Movie Title"
          name="search"
          type="text"
          value={state.value}
          onChange={(event) =>
            setState({ ...state, value: event.target.value })
          }
        />
      </form>
    </div>
  );
}
