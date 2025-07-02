import React, { useEffect, useState } from "react";
import "./Nav.css";
import {Link, useNavigate} from "react-router-dom"
import logo from "../../assets/General/ammuseumLogo.png";
import menu from "../../assets/cliparts/menu.png"
import search from "../../assets/cliparts/search.png"

function Nav() {
    const [isOpaque, setIsOpaque] = useState(false);
    const [navOpen, setNavOpen] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
      const handleScroll = () => {setIsOpaque(window.scrollY > 10);}; // make nav opaque after scrolling a lil bit

      window.addEventListener('scroll', handleScroll);

      // Clean up
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleNav = ()=> {
      setNavOpen(!navOpen);
    }

    return (
        <div className={`navContainer ${isOpaque ? 'opaque' : ''}`}>

            <div className="menuToggle navIcon" onClick={toggleNav}><img src={menu} /></div>

            <div className="titleDiv" onClick={() => navigate('/')}><img src={logo} className="title" /></div>

            <div className={`navButtons ${navOpen ? 'navOpen' : ''}`}>
                <div className={`navOverlay ${navOpen ? 'navOpen' : ''}`} onClick={toggleNav}></div>
                <Link className="navBtn" to='/'>Home</Link>
                <Link className="navBtn" to='/board-games'>Board Games</Link>
                <Link className="navBtn">Events</Link>
            </div>

            <div className="search navIcon"><img src={search} /></div>
        </div>
    );
}

export default Nav;
