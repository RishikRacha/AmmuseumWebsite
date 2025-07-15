import React, { useState } from "react";
import "./Gamecard.css";
import { useNavigate } from "react-router-dom";
import playersIcon from "../../assets/cliparts/playerspixel.png"

function GameCard(gameInfo) {
    const navigate = useNavigate();

    const clickHandler = (_id) => {
        navigate(`/game-details?id=${_id}`);
    }


    return (
        <div className="gameCardContainer" onClick={() => clickHandler(gameInfo._id)}>
            <div className="gameImgDiv">
                <img src={gameInfo.image[0]} alt={`image of ${gameInfo.name}`} className="gameImg" loading="lazy" />
            </div>
            <div className="gameCardInfo">
                <div className="gameCardTitleContainer"><h3>{gameInfo.name}</h3></div>
                <div className="gameCardOtherContainer">
                    <h4>★ {gameInfo.level}</h4>
                    <h4> <img className="playersIcon" src={playersIcon} alt="" /> : {gameInfo.players.min} - {gameInfo.players.max}</h4>
                </div>
            </div>
        </div>
    );
}

export default GameCard;
