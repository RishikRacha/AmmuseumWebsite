import React from 'react'
import { useSelector } from "react-redux";                              //redux stuff
import './Home.css'

import Nav from "../../components/Nav/Nav";
import Carousel from "../../components/Carousel/Carousel";
import GamesList from '../GamesList/GamesList';
import HomeGamesList from '../../components/HomeGamesList/HomeGamesList';

function Home() {

    const isLoggedIn = useSelector((store) => store.isLoggedIn);        //redux stuff
    const user = useSelector((store) => store.user);                    //redux stuff
    return (
        <div className='homepageContainer'>
            {/* <div className="headerDiv"> */}
                {/* <h1 className='headerTexts'>Ammuseum</h1> */}
                {/* <h4 className='headerTexts'>Bond Over Board Games</h4> */}
                {/* <p className='headerTexts body'> <b>Hyderabad's Fav Board Games Cafe </b> <br /></p> */}
            {/* </div> */}

            {/* {isLoggedIn && <h3 style={{margin:'0', textAlign: 'center'}}>Hi {user.name}</h3>} */}

            <Carousel />
            <HomeGamesList />
        </div>
    )
}

export default Home