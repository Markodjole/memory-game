import React, { Component } from 'react';
import Game from './Game/Game';
import ChooseGrid from './ChooseGrid/ChooseGrid';
import Scores from './Scores/Scores';
import { Link } from 'react-router-dom';

const GamePage = (props) => {

  return (
    <div className="wrapperForGamePage">
      <div className="headerClass">
        <h3>MEMORY CARD GAME</h3>
        <p>Player name: {props.playerName.toUpperCase()}</p>

        {/* /////////////////////////////// choose grid ///////////////////////////// */}

        <ChooseGrid
          chooseGrid={props.chooseGrid}
        />
      </div>


      {/* ///////////////////////////////// score list /////////////////////////////// */}
      <Scores
        showScore={props.showScore}
        scoreList={props.scoreList}
        showScoreListIsOn={props.showScoreListIsOn}
      />

      {/* //////////////////////////////////// game //////////////////////////////////////// */}
      {props.shownGame ?

        <Game
          totalClicks={props.totalClicks}
          time={props.time}
          timeRestult={props.timeResult}
          gridColumns={props.gridColumns}
          cards={props.cards}
          shafleCards={props.shafleCards}
          isGameFinished={props.isGameFinished}
          handleCardClick={props.handleCardClick}
        />

        : null
      }

      {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

      <button className="goBackButton" onClick={props.goToLogPage}>
        <Link to='/'>Go back</Link>
      </button>

    </div>
  )
}

export default GamePage;