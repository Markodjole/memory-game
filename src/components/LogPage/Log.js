import React, { Component } from 'react';

const Log = (props) => {

    return (
        <div className="welcome">
            <p>Welcome to memory game</p>
            <input className="logInput"
              onChange={props.onPlayerNameInInput}
              placeholder="Player name"
              type="text"
              required
            />
            <br />
            <button disabled={!props.playerNameInInput} onClick={props.onHandleStartGameClick} className="startButton">
              Start game
            </button>
          </div>
    )
}

export default Log ;