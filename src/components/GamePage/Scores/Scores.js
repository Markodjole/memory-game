import React, { Component } from 'react';

const Scores = (props) => {

        return ( 
        <div>
            {/* <button className="goBackButton" onClick={() => props.showScore()}>scores</button> */}

            {/* {props.showScoreListIsOn ? ( */}
            <div className="scores">
                 <h3>Top scores :</h3>
                 <ul className="scoreList">
                   {props.scoreList.map((score, i) => {
                     return <li key={i} className="scoreListItem"><span>{score.pName}</span> : <span>{score.sec}</span></li>
                   })}
                 </ul>
             </div>
             {/* )  */}
         {/* : null} */}
           
        </div>
         );
}

   
export default Scores;
