import React from "react";
import NominationsListItem from "./NominationsListItem";

export default function ResultsList(props) {
  const { nominations } = props;

  return nominations.map((movie) => {
    return (
      <NominationsListItem
        key={movie.imdbID}
        onRemove={props.remove}
        {...movie}
      />
    );
  });
}
