import React from "react";

import CustomButton from "./CustomButton";

export default function NominationsListItem(props) {
  function onClick() {
    props.onRemove(props.title, props.year);
  }

  return (
    <div className="movie-nomination">
      <div className="movie-nomination__info">
        <h4 className="movie-nomination__info__title">
          {props.title}
        </h4>
        <p className="movie-nomination__info__year">
          ({props.year})
        </p>
      </div>
      <div className="custom-button">
        <CustomButton remove onClick={onClick}>
          Remove
        </CustomButton>
      </div>
    </div>
  );
}
