import React, { useEffect, useState } from "react";
import GamesList from "../../pages/GamesList/GamesList";

import {useDispatch, useSelector} from 'react-redux'

import axios from "axios";
import { defaultsActionCreator } from "../../redux/myAction";

function HomeGamesList() {

    const apiUrl = import.meta.env.VITE_API_URL;
    // const [allGames, setAllGames] = useState();
    const defaultGamesDispatch = useDispatch();
    const defaultGames = useSelector((store) => store.defaultGames);
    

    const getDefaultGames = () => {
        axios
            .get(apiUrl+'/api/games/get-defaults')
            .then((res) => {
                console.log("defaults api called");
                console.log(res);                
                // setAllGames(res.data.result);
                defaultGamesDispatch(defaultsActionCreator(res.data.result));
            });

        
    }

    useEffect(() => {
        if(defaultGames.length == 0) getDefaultGames();
    }, []);

    
    return (
        <div>
            <div className="gamesListDiv">

                <h1>Our Fav Games</h1>
            </div>

            <GamesList gamesArray={defaultGames} />
        </div>
    );
}

export default HomeGamesList;
