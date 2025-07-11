import React, { useEffect, useState } from "react";
import './HomeGamesList.css'
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

            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.128910924752!2d78.4792233!3d17.405600100000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99846bd249cf%3A0xd44fa5593a65fb42!2sAMMUSEUM%20-%20Bond%20Over%20Board%20Games!5e0!3m2!1sen!2sin!4v1752235212277!5m2!1sen!2sin"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    );
}

export default HomeGamesList;
