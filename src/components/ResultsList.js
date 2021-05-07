import React from "react";
import ResultsListItem from "./ResultsListItem";

export default function ResultsList(props) {
  const { searchResults } = props;

  if (searchResults.length === 0) {
    return null;
  }

  function isNominated(title, year) {
    return props.nominations.find(
      (movie) => movie.title === title && movie.year === year
    );
  }

  return searchResults.map((movie) => {
    return (
      <ResultsListItem
        key={movie.imdbID}
        disabled={props.disabled || isNominated(movie.Title, movie.Year)}
        onNominate={props.nominate}
        {...movie}
      />
    );
  });
}
