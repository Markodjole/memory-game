import React, { Component } from 'react';
import Card from './Card'

const Game = (props) => {


  return (
    <div className="wrapperForGame">
    {!props.shownGame ? null : 
    <div>
    <div className="totalClicks">
        <p>Total clicks: {props.totalClicks}</p>
        <p>Time: {props.time < 1 ? props.timeResult : props.time} s</p>
      </div>



      <div className="grid-container"
        style={{ gridTemplateColumns: props.gridColumns }}
      >
        {props.cards.map(card => {
          return (
            <Card
              val={card.val}
              key={card.id}
              id={card.id}
              onCardClick={props.handleCardClick}
              opened={card.opened}
              obj={card}
            />
          );
        })}
      </div>
      <div><button className="shafleCardsButton" onClick={props.shafleCards}
      >Start new game</button></div>
      {props.isGameFinished ? (
        <p className="gameOver">Game over, well done! You did it in {props.totalClicks} clicks !</p>
      ) : null}
    </div>
    }
      
    </div>
  )


}

export default Game;