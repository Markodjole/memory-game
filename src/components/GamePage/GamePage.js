import React, { Component } from 'react';
import Game from './Game/Game';
import ChooseGrid from './ChooseGrid/ChooseGrid';
import Scores from './Scores/Scores';
import Error from './../Error';
import { Route, Link, Switch } from 'react-router-dom';

const GamePage = (props) => {
 
  console.log(props.match)

  return (
    <div className="wrapperForGamePage">
      <div className="headerClass">
        <h3>MEMORY CARD GAME</h3>
        <p>Player name: {props.playerName.toUpperCase()}</p>

        {/* /////////////////////////////// choose grid ///////////////////////////// */}

        <ChooseGrid
          chooseGrid={props.chooseGrid}
          match={props.match}
        />
      </div>


    <Link to={`${props.match.match.url}/scores`} className="navLink"><button className="goBackButton" onClick={() => props.showScore()}>scores</button></Link>

    <Switch>
      {/* ///////////////////////////////// score list /////////////////////////////// */}

      
      <Route path={`${props.match.match.url}/scores`} render={() => (
          <Scores
          showScore={props.showScore}
          scoreList={props.scoreList}
          showScoreListIsOn={props.showScoreListIsOn}
        />
        )} />
      

      {/* //////////////////////////////////// game //////////////////////////////////////// */}
      {/* {props.shownGame ? */}
      <Route path={`${props.match.match.url}/game`} render={() => (
        <Game
          totalClicks={props.totalClicks}
          time={props.time}
          timeRestult={props.timeResult}
          gridColumns={props.gridColumns}
          cards={props.cards}
          shafleCards={props.shafleCards}
          isGameFinished={props.isGameFinished}
          handleCardClick={props.handleCardClick}
          shownGame={props.shownGame}
        />
        )} />
        {/* : null */}
      {/* } */}

      <Route path={`${props.match.match.url}/:id`} component={Error} />
    </Switch>

      

      {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

      <Link to='/' className="navLink">
      <button className="goBackButton" onClick={props.goToLogPage}>
        Go back
      </button>
      </Link>
    </div>
  )
}

export default GamePage;