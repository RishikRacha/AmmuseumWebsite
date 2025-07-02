import React, { useState } from "react";
import "./Gamecard.css";
import { useNavigate } from "react-router-dom";

function GameCard(gameInfo) {
    const navigate = useNavigate();

    const clickHandler = (_id) => {
        navigate(`/game-details?id=${_id}`);
    }


    return (
        <div className="gameCardContainer" onClick={() => clickHandler(gameInfo._id)}>
            <div className="gameImgDiv">
                <img src={gameInfo.image[0]} alt={`image of ${gameInfo.name}`} className="gameImg" />
            </div>
            <div className="gameCardInfo">
                <div className="gameCardTitleContainer"><h3>{gameInfo.name}</h3></div>
                <h4>★ {gameInfo.level} strategy</h4>
            </div>
        </div>
    );
}

export default GameCard;
