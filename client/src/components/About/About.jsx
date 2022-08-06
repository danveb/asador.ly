import { Link } from "react-router-dom"; 
import { Navbar, Menu, Footer } from "../index"; 
import brasa from "../../assets/about/brasa.png"; 
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import "./About.scss"; 

const About = ({ menuOpen, setMenuOpen }) => {
    return (
        <div>
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <div className="about">
                <div className="about-top">
                    <div className="about-title">
                        <h3>Explore...</h3>
                        <h1>Buenos Aires</h1>
                        <Link to="/">Check Our Map</Link>
                    </div>
                    <div className="about-img">
                        <img src={brasa} alt="charcoal" />
                    </div>
                    <div className="arrow">
                        <KeyboardArrowDownIcon />
                    </div>
                </div>
                <div className="about-bottom">
                    <div className="about-subtitle">
                        <h2>Asador</h2>
                        <p>It's all about sharing the joy of <span>asado</span> (barbeque) that  makes Argentina a prime destination for dining at <span>parrillas</span> (steakhouses). From traditional eateries to fine-dining establishments, there's always a <span>parrilla</span> to choose from for a fix of authentic Argentine <span>asado</span>. </p>
                        <p>Here at <span>Asador</span> we have curated a list we recommend of the best steakhouses in Buenos Aires (we may have missed a few, on purpose, just so you can share your experience with us too) for every budget. Carnivores rejoice!</p> 
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default About