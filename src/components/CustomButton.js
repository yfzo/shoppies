import React from "react";
import classNames from "classnames";

import "../styles/CustomButton.css";

export default function CustomButton(props) {
  let buttonClass = classNames("custom-button", {
    "custom-button--nominate": props.nominate,
    "custom-button--remove": props.remove,
  });

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
