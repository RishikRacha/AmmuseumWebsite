import React from 'react'
import Nav from "../../components/Nav/Nav";
import Carousel from "../../components/Carousel/Carousel";
import GamesList from '../GamesList/GamesList';
import HomeGamesList from '../../components/HomeGamesList/HomeGamesList';

function Home() {
  return (
    <div>
        <Nav/>
        <Carousel />
        <HomeGamesList />
    </div>
  )
}

export default Home