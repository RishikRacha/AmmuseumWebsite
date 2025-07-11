import React, { useEffect, useState } from 'react'
import './GameDetails.css'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import Nav from '../../components/Nav/Nav';

import gameImg1 from "../../assets/GameAssets/gameImg1.jpg";
import ammuseumLogo from "../../assets/carousel/AmmuseumLogoBG.jpg"


function GameDetails() {

    const apiUrl = import.meta.env.VITE_API_URL;

    const [searchParams, setSearchParams] = useSearchParams();
    const [game, setGame] = useState({
        _id:'',
        name:'',
        image:[],
        difficulty:'',
        description:'',
        more:'',
        players: {},
    })
    const id = searchParams.get('id');

    useEffect(() => {
        axios
            .get(apiUrl+'/api/games/get-one-game?id='+id)
            .then((res) => {
                setGame(res.data.result);
            })
            .catch(err => {res.send(err)})
    },[]);

    let images = [...game.image, ammuseumLogo]

return (
    <div>

        <div className='gameDetailsContainer'>

            <div className="carouselContainer">
                    {images.map((image, index) => (
                        <div key={index} className="carouselContainerIn">
                            <img src={index==0 ? image : `https://ik.imagekit.io/t03abdmv1/game-assets/public/${image}`} className="carouselImg" alt={image}/>
                        </div>
                    ))}
            </div>

            <div className='gameDetails'>
                <h2>{game.name}</h2>
                {/* <p>Game id: {id}</p> */}
                <h3>BGG Weight: {game.difficulty} ★</h3>
                <h3>Strategy level: {game.level}</h3>

                <p>{game.description}</p>
            </div>

        </div>
    </div>
  )
}

export default GameDetails