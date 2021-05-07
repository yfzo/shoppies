import React from "react";

import CustomButton from "./CustomButton";

export default function ResultsListItem(props) {
  function onClick() {
    props.onNominate(props.Title, props.Year);
  }

  return (
    <div className="movie-result">
      <div className="movie-result__info">
          {props.Title} ({props.Year})
      </div>
      <div>
        <CustomButton nominate disabled={props.disabled} onClick={onClick}>
          Nominate
        </CustomButton>
      </div>
    </div>
  );
}
