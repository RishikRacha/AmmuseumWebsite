import React from "react";
import "./GamesList.css";
import GameCard from "../../components/GameCard/GameCard";
import gameImg1 from "../../assets/GameAssets/gameImg1.jpg";

function GamesList({gamesArray = []}) {

    return (
            <div className="gamesDivContainer">
                {gamesArray.map((game, index) => (
                    <GameCard {...game} key={index}/>
                ))}

            </div>
    );
}

export default GamesList;
