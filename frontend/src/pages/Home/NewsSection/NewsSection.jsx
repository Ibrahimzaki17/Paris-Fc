import './NewsSection.css';

function NewsSection() {

    return(
      <div className='news-section'>
         <div className='news-title'>
           <h2>LATEST NEWS</h2>
         </div>
         <div className='news-container'>
           <div className='news-card'>
             <div className='news-image'>
               <img src="images/paris.jpg"/>
             </div>
             <div className='news-content'>
                <div className='news-content-title'>
                    <p>New Player joins Paris Fc</p>
                </div>
                <div className='news-content-description'>
                    <p>Paris Fc welcomes a new Talent into the squad</p>
                </div>
                <div className='news-content-date'>
                    <p>20 June 2026</p>
                </div>
             </div>
           </div>
           <div className='news-card'>
             <div className='news-image'>
                <img src="images/stadium.avif"/>
             </div>
             <div className='news-content'>
               <div className='news-content-title'>
                    <p>Training Session Begins</p>
                </div>
                <div className='news-content-description'>
                    <p>The team prepares for the upcoming season.</p>
                </div>
                <div className='news-content-date'>
                    <p>25 June 2026</p>
                </div>
             </div>
           </div>
           <div className='news-card'>
             <div className='news-image'>
                <img src="images/parisfc.png"/>
             </div>
             <div className='news-content'>
               <div className='news-content-title'>
                    <p>Paris FC Wins Friendly Match</p>
                </div>
                <div className='news-content-description'>
                    <p>The team starts the season with a strong performance.</p>
                </div>
                <div className='news-content-date'>
                    <p>20 June 2026</p>
                </div>
             </div>
           </div>
         </div>
      </div>
    );
}

export default NewsSection