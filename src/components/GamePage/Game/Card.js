import React, { Component } from 'react';
import backCard from './backCard.png';

const Card = (props) => {
    return (
      <div
        className="grid-item"
        disabled={props.opened}
        onClick={() => props.onCardClick(props.obj)}
        style={{ backgroundImage: `url(${backCard})` }}
      >
        <div style={{ visibility: props.opened ? "visible" : "hidden" }}>
          {/* {" "} */}
          
         <img className="cardImg" src={`/cards/${props.obj.color}${props.obj.val}.png`} alt="ghh"/> 
         {/* <img src="/img/cards/1r.png" alt="ghh"/>  */}
         {/* <img className="cardImg" src={srcImg} alt="ghh"/>  */}
         {/* <img className="cardImg" src={card} alt="ghh"/>  */}
        </div>
      </div>
    );
  }

  export default Card;