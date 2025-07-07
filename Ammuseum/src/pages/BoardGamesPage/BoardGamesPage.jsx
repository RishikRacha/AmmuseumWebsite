import React, { useEffect, useState } from "react";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux'
import { gamesActionCreator , lightGamesActionCreator , mediumGamesActionCreator , heavyGamesActionCreator } from "../../redux/myAction";


import './BoardGamesPage.css'
import Nav from "../../components/Nav/Nav";
import GamesList from "../../pages/GamesList/GamesList";
import lightStrategy from '../../assets/cliparts/lightStrategy.png'
import mediumStrategy from '../../assets/cliparts/mediumStrategy.png'
import heavyStrategy from '../../assets/cliparts/heavyStrategy.png'

function BoardGamesPage() {
    const apiUrl = import.meta.env.VITE_API_URL;

    const [allGames, setAllGames] = useState();
    const [level, setLevel] = useState('');

    const gamesDispatch = useDispatch();
    const games = useSelector((store) => store.games);
    const lightGames = useSelector((store) => store.lightGames)
    const mediumGames = useSelector((store) => store.mediumGames)
    const heavyGames = useSelector((store) => store.heavyGames)

    const getAllGames = () => {
        if(games.length != 0) setAllGames(games);

        else axios
            .get(apiUrl+"/api/games/get-all-games")
            .then((res) => {
                console.log("Data fetched using get-all-games api");
                gamesDispatch(gamesActionCreator(res.data.result));
                setAllGames(res.data.result);
            });
    };

    const getFilteredGames = (level) => {
        if(level == 'light' && lightGames.length != 0) {
            setAllGames(lightGames);
        }
        else if(level == 'medium' && mediumGames.length != 0) {
            setAllGames(mediumGames);
        }
        else if(level == 'heavy' && heavyGames.length != 0) {
            setAllGames(heavyGames);
        }
        
        else axios
            .get(apiUrl+"/api/games/get-"+level)
            .then((res)=>{
                console.log("Data filtered to "+level+" from api");
                setAllGames(res.data.result);
                handleDispatch(level, res.data.result);
            })
    }

    function handleDispatch(level, data) {
        if (level == 'light') {
            gamesDispatch(lightGamesActionCreator(data))
        }
        else if (level== 'medium') {
            gamesDispatch(mediumGamesActionCreator(data))
        }
        else if(level == 'heavy') {
            gamesDispatch(heavyGamesActionCreator(data))
        }
    }

    const clickHandler = (levelParam) => {
        if( levelParam == level ) { setLevel(''); }
        else setLevel(levelParam);
    }

    useEffect(() => {
        if(level == '') getAllGames()
        else getFilteredGames(level)
    }, [level]);

    return (
        <div className="BoardGamesPageContainer">
            <Nav />
            
            <div className="filtersDiv">
                <img src={lightStrategy}  onClick={() => {clickHandler('light')}}     className={`filterBtn  light ${level=='light' ? 'active' : ''}`} />
                <img src={mediumStrategy} onClick={() => {clickHandler('medium'); }}   className={`filterBtn medium ${level=='medium'? 'active' : ''}`} />
                <img src={heavyStrategy}  onClick={() => {clickHandler('heavy'); }}     className={`filterBtn  heavy ${level=='heavy' ? 'active' : ''}`} />

            </div>

            <div className="gamesListDiv">
                <h1>All Our Board Games</h1>
                <GamesList gamesArray={allGames} />
            </div>

        </div>
    );
}

export default BoardGamesPage;
