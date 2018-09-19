import React, { Component } from 'react';

const Card = (props) => {
    return (
      <button
        className="grid-item"
        disabled={props.opened}
        style={{ backgroundColor: props.opened ? "rgb(0, 204, 153)" : "rgb(255, 102, 102)", pointerEvents: null }}
        onClick={() => props.onCardClick(props.obj)}
      >
        <div style={{ visibility: props.opened ? "visible" : "hidden" }}>
          {" "}
          {props.val}
        </div>
      </button>
    );
  }

  export default Card;