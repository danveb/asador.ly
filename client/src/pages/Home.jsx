import { Footer } from "../components";
import { Link } from "react-router-dom";
import "../styles/Home.scss";

const Home = () => {
  return (
    <>
      <div className="home">
        <div className="home__main">
          <div className="home__title">
            <h2>Welcome to Asador</h2>
            <p>Share the best parrillas (steakhouses) of Buenos Aires. From traditional eateries to world-acclaimed establishments, there's always a fix for authentic Argentine <span>asado</span>.</p>
            <Link to="/map">Check Our Map</Link>
          </div>
        </div>
        <div className="home__content">
          <div className="home__subtitle">
            <h2>Asador</h2>
            <p>At <span>Asador</span> we have curated a list of the best parrillas in Buenos Aires -- we may have missed a few, on purpose, just so you can share your favorite ones. </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home