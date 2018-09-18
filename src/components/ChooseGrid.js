import React, { Component } from 'react';

let ChooseGrid = (props) => {

    return ( 
        <div className="chooseGrid">
            <span>Choose grid type: </span>
            <button onClick={() => props.onChooseGrid(2)} className="chooseGridButton">2 x 2</button>
            <button onClick={() => props.onChooseGrid(4)} className="chooseGridButton">4 x 4</button>
            <button onClick={() => props.onChooseGrid(6)} className="chooseGridButton">6 x 6</button>
        </div>
     );
} 
  
 
export default ChooseGrid ;