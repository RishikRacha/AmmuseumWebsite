import React, { useEffect, useState } from "react";
import "./Nav.css";
import {Link, useNavigate} from "react-router-dom"
import logo from "../../assets/General/AmmuseumLogoPadded.png";
import menu from "../../assets/cliparts/menu.png"
import dots from "../../assets/cliparts/dots.png"

function Nav() {
    const [isOpaque, setIsOpaque] = useState(false);
    const [navOpen, setNavOpen] = useState(false);
    const [socialsOpen, setSocialsOpen] = useState(false);
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
    let links = {
        insta: 'https://www.instagram.com/whatisammuseum?igsh=MW93M2d1bmo0dXcwNQ==',
        whats: 'https://chat.whatsapp.com/Dvi0HfNzeviHLFuQxdFNFR',
        menu: 'https://webapp.bash-india.com/club/11',
        maps: 'https://maps.app.goo.gl/MHVd14ybozCci8Tr9',

    }

    return (
        <div className={`navContainer ${isOpaque ? 'opaque' : ''}`}>

            <div className="menuToggle navIcon" onClick={toggleNav}><img src={menu} /></div>

            <div className="titleDiv" onClick={() => navigate('/')}><img src={logo} className="title" /></div>

            <div className={`navButtons ${navOpen ? 'navOpen' : ''}`}>
                <div className={`navOverlay ${navOpen ? 'navOpen' : ''}`} onClick={toggleNav}></div>
                <Link className={`navBtn homeNavBtn ${window.location.pathname=="/" ? "active" : ""}`} to='/' onClick={toggleNav}>Home</Link>
                <Link className={`navBtn ${window.location.pathname=="/board-games" ? "active" : ""}`} to='/board-games' onClick={toggleNav}>Board Games</Link>
                <Link className={`navBtn ${window.location.pathname=="/events" ? "active" : ""}`} to='/events' onClick={toggleNav}>Events</Link>
                {/* <Link className={`navBtn ${window.location.pathname=="/other-games" ? "active" : ""}`} to='/other-games' onClick={toggleNav}>Other Games</Link> */}
                <Link className={`navBtn ${window.location.pathname=="/about" ? "active" : ""}`} to='/about' onClick={toggleNav}>About</Link>
            </div>


            <div className="more navIcon" onClick={toggleSocials}><img src={dots} /></div>

            <div className={`socials ${socialsOpen ? 'socialsOpen' : ''}`}>
                <div className={`socialsOverlay ${socialsOpen ? 'socialsOpen' : ''}`} onClick={toggleSocials}></div>
                <h1>More…</h1>
                <Link className={`navBtn socialsBtn`} to={links.menu} target="_blank" >🔗 Our Menu</Link>
                <Link className={`navBtn socialsBtn`} to={links.insta} target="_blank">🔗 Instagram</Link>
                <Link className={`navBtn socialsBtn`} to={links.whats} target="_blank">🔗 Join our Whatsapp Community</Link>
                <Link className={`navBtn socialsBtn`} to={links.maps} target="_blank">📍Our Location</Link>
            </div>
        </div>
    );
}

export default Nav;
