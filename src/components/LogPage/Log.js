import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


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
      
        {props.playerNameInInput ? <NavLink  to='/game-page' className="navLink">
        <button disabled={!props.playerNameInInput} onClick={props.onHandleStartGameClick} className="startButton">
        Play game
        </button>
        </NavLink> 
        :
        <button disabled={!props.playerNameInInput} onClick={props.onHandleStartGameClick} className="startButton">
        Write your name
        </button>
        }
        
      
    </div>
  )
}

export default Log;