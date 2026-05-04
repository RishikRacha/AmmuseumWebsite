import React, { useEffect, useState } from "react";
import "./Nav.css";
import {Link, useNavigate} from "react-router-dom"
import { useSelector } from "react-redux";                              //redux stuff

import logo from "../../assets/General/AmmuseumLogoPadded.png";
import menu from "../../assets/cliparts/menu.png"
import dots from "../../assets/cliparts/dots.png"
import Searchbar from "../Searchbar/Searchbar";

function Nav() {
    const [isOpaque, setIsOpaque] = useState(false);
    const [navOpen, setNavOpen] = useState(false);
    const [socialsOpen, setSocialsOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    const isLoggedIn = useSelector((store) => store.isLoggedIn);        //redux stuff
    const user = useSelector((store) => store.user);                    //redux stuff
    // const [showLogo, setShowLogo] = useState(true);
    const showLogo = ["/login", "/register"].includes(location.pathname);

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
    const toggleSocials = () => {
        setSocialsOpen(!socialsOpen);
    }
    const toggleSearch = () => {
        setSearchOpen(!searchOpen);
    }
    let links = {
        insta: 'https://www.instagram.com/whatisammuseum?igsh=MW93M2d1bmo0dXcwNQ==',
        whats: 'https://chat.whatsapp.com/Dvi0HfNzeviHLFuQxdFNFR',
        menu: 'https://webapp.bash-india.com/club/11',
        maps: 'https://maps.app.goo.gl/MHVd14ybozCci8Tr9',

    }

    return (
        <div className={`navContainer ${isOpaque ? 'opaque' : ''}`}>

            <div className="menuToggle navIcon nodrag" onClick={toggleNav} style={{backgroundImage: menu}}></div>

            <div className={`titleDiv ${showLogo ? "titleDiv2" : ""}`} onClick={() => navigate('/')}><img src={logo} className="title" draggable={false}/></div>

            <div className={`navButtons ${navOpen ? 'navOpen' : ''}`}>
                
                <div className={`navOverlay ${navOpen ? 'navOpen' : ''}`} onClick={toggleNav}></div>

                <Link className={`navBtn homeNavBtn ${window.location.pathname=="/" ? "active" : ""}`} to='/' onClick={toggleNav}>Home</Link>
                <Link className={`navBtn ${window.location.pathname=="/board-games" ? "active" : ""}`} to='/board-games' onClick={toggleNav}>Board Games</Link>
                <Link className={`navBtn ${window.location.pathname=="/events" ? "active" : ""}`} to='/events' onClick={toggleNav}>Events</Link>
                {isLoggedIn ? 
                <Link className={`navBtn ${window.location.pathname=="/login" ? "active" : ""}`} to='/login' onClick={toggleNav}>Account</Link> :
                <Link className={`navBtn ${window.location.pathname=="/login" ? "active" : ""}`} to='/login' onClick={toggleNav}>Login</Link>}
                {user?.username === 'admin' && <Link className={`navBtn ${window.location.pathname=="/create-event" ? "active" : ""}`} to='/create-event' onClick={toggleNav}>Create Event</Link>}
                {/* <Link className={`navBtn ${window.location.pathname=="/other-games" ? "active" : ""}`} to='/other-games' onClick={toggleNav}>Other Games</Link> */}
                {/* <Link className={`navBtn ${window.location.pathname=="/about" ? "active" : ""}`} to='/about' onClick={toggleNav}>About</Link> */}
                {isLoggedIn && <h4 className="navGreeting">Hi {user?.username}!</h4>}
            </div>


            {window.location.pathname=="/board-games" ? 
                // <div className="more navIcon" onClick={toggleSearch}></div> 
                <div className="more navIcon" onClick={toggleSocials}>{}</div>
                : 
                <div className="more navIcon" onClick={toggleSocials}>{}</div>
            }

            <div className={`socials ${socialsOpen ? 'socialsOpen' : ''}`}>
                <div className={`socialsOverlay ${socialsOpen ? 'socialsOpen' : ''}`} onClick={toggleSocials}></div>
                <h1>More…</h1>
                <Link className={`navBtn socialsBtn`} to={links.menu} target="_blank" >🔗 Our Menu</Link>
                <Link className={`navBtn socialsBtn`} to={links.insta} target="_blank">🔗 Instagram</Link>
                <Link className={`navBtn socialsBtn`} to={links.whats} target="_blank">🔗 Join our Whatsapp Community</Link>
                <Link className={`navBtn socialsBtn`} to={links.maps} target="_blank">📍Our Location</Link>
            </div>

            {/* <div className={`searchbar`} style={searchOpen ? {display:"block", position:'absolute', width:'90vw', height:"20px"} : {display: "none"}}>
                <Searchbar />
            </div> */}


        </div>
    );
}

export default Nav;
