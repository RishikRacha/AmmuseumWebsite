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
import RollingDice from "../../components/Dice/RollingDice";

function BoardGamesPage() {
    const apiUrl = import.meta.env.VITE_API_URL;

//States
    const [allGames, setAllGames] = useState([]);
    const [level, setLevel] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const cache_Timeout = 1000 * 60 * 60 * 4;

//Redux Stuff
    const gamesDispatch = useDispatch();
    const games = useSelector((store) => store.games);
    const lightGames = useSelector((store) => store.lightGames)
    const mediumGames = useSelector((store) => store.mediumGames)
    const heavyGames = useSelector((store) => store.heavyGames)

    //Dispatch light med heavy games from getAllGames data to redux
    const dispatchLevels = (all) => {
        //filter all games by level
        const light = all.filter(game => game.level === 'Light');
        const medium = all.filter(game => game.level === 'Medium');
        const heavy = all.filter(game => game.level === 'Heavy');

        if(lightGames.length == 0) gamesDispatch(lightGamesActionCreator(light));
        if(mediumGames.length == 0) gamesDispatch(mediumGamesActionCreator(medium));
        if(heavyGames.length == 0) gamesDispatch(heavyGamesActionCreator(heavy));
    };

    function handleDispatch(level, data) {  //depricated
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


// Core Functions

    const getAllGames = () => {
        //redux check first
        if(games.length !== 0) {
            console.log("Loaded games from redux");

            setAllGames(games);
            dispatchLevels(games);
            startLoader(500);

            return;
        }

        //local storage check if redux is empty
        const cached = JSON.parse(localStorage.getItem('games'));
        if(cached && (Date.now() - cached.timestamp < cache_Timeout)) {
            console.log("Loaded games from localStorage");

            setAllGames(cached.data);
            gamesDispatch(gamesActionCreator(cached.data));         //add to redux store after fetching from localStorage
            dispatchLevels(cached.data);
            startLoader(500);

            return;
        }

        setIsLoading(true);
        //api for when redux is empty and local storage is expired or empty
        axios
            .get(apiUrl+"/api/games/get-all-games")
            .then((res) => {
                const all = res.data.result;
                console.log("Data fetched using get-all-games api");

                //add to localStorage
                localStorage.setItem('games', JSON.stringify({ 
                    timestamp: Date.now(),
                    data: all,
                }))                

                gamesDispatch(gamesActionCreator(all));             //add to redux store after fetching from api
                setAllGames(all);

                dispatchLevels(all); // Filter all games data by level
                setIsLoading(false);

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
        
        else axios      //fallback, usage depricated
            .get(apiUrl+"/api/games/get-"+level)
            .then((res)=>{
                console.log("Data filtered to "+level+" from api");
                setAllGames(res.data.result);
                handleDispatch(level, res.data.result);
            })
    }


    const clickHandler = (levelParam) => {
        if(levelParam == level) setLevel('')
        else setLevel(levelParam);
        startLoader(500);
    }

    const startLoader = (time) => {
        setIsLoading(true);
        setTimeout(() => {setIsLoading(false)}, time);
    }

    useEffect(() => {
        if(level == '') getAllGames()
        else getFilteredGames(level)
        // startLoader(1000);
    }, [level]);

    return (
        <div className="BoardGamesPageContainer">
            <h1 className="listingheading2">All Our Board Games</h1>

            <hr className="listingFiltersSeperator"/>

            <h2 className="filtersHeading">Filter Strategy Level:</h2>
            
            <div className="filtersDiv">
                <img src={lightStrategy}  onClick={() => {clickHandler('light')}}     className={`filterBtn  light ${level=='light' ? 'active' : ''}`} draggable={false} />
                <img src={mediumStrategy} onClick={() => {clickHandler('medium'); }}   className={`filterBtn medium ${level=='medium'? 'active' : ''}`} draggable={false} />
                <img src={heavyStrategy}  onClick={() => {clickHandler('heavy'); }}     className={`filterBtn  heavy ${level=='heavy' ? 'active' : ''}`} draggable={false} />

            </div>

            {/* <hr className="listingFiltersSeperator"/> */}

            {/* <h2 className="filtersHeading">{level ? level : 'All'} games</h2> */}

            {isLoading ? <div style={{ textAlign: "center", marginTop: 50 }}>
                <h2>Loading…</h2>
                <RollingDice />
                
            </div> 
            :

            <div className="gamesListDiv">
                <GamesList gamesArray={allGames} />
            </div>}

        </div>
    );
}

export default BoardGamesPage;
