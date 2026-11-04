import './HeroSection.css'
import { NavLink } from 'react-router';

function HeroSection() {

    return(
     <div className='hero-section'>
       <h1>Paris Fc</h1>
       <h2>fight till we win</h2>
       <div>
        <button>
         <NavLink to="/about" className="nav">Learn More</NavLink>
        </button>
        <button>
          Join Us
        </button>
       </div>
     </div>
    );
}

export default HeroSection