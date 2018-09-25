import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const ChooseGrid = (props) => {

    return ( 
        <div className="chooseGrid">
            <span>Choose grid type: </span>
            <Link to={`${props.match.match.url}/game`} className="navLink"> <button onClick={() => props.chooseGrid(2)} className="chooseGridButton">2 x 2</button></Link>
            <Link to={`${props.match.match.url}/game`} className="navLink"> <button onClick={() => props.chooseGrid(4)} className="chooseGridButton">4 x 4</button></Link>
            <Link to={`${props.match.match.url}/game`} className="navLink"> <button onClick={() => props.chooseGrid(6)} className="chooseGridButton">6 x 6</button></Link>
        </div>
     );
} 
  
 
export default ChooseGrid ;