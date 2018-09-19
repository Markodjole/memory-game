import React, { Component } from 'react';

const ChooseGrid = (props) => {

    return ( 
        <div className="chooseGrid">
            <span>Choose grid type: </span>
            <button onClick={() => props.chooseGrid(2)} className="chooseGridButton">2 x 2</button>
            <button onClick={() => props.chooseGrid(4)} className="chooseGridButton">4 x 4</button>
            <button onClick={() => props.chooseGrid(6)} className="chooseGridButton">6 x 6</button>
        </div>
     );
} 
  
 
export default ChooseGrid ;