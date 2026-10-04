import './NewsSection.css';
import api from '../../../api/axios';
import formatMatchDate from '../../../formatDate';
import { useEffect, useState } from 'react';

function NewsSection() {

  const [news, setNews] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNews = async () => {
    try {
      const response = await api.get('/public/announcements?limit=3');

      setNews(response.data.announcements);
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to load Latest news"
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews();
},[])

  if (loading) {
    return <p>Loading Latest news...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!news) {
    return <p>Player profile not found.</p>;
  }
    return(
      <div className='news-section'>
         <div className='news-title'>
           <h2>LATEST NEWS</h2>
         </div>
         <div className='news-container'>
          {news.map(new1 => {
            return(
              <div key={new1.id} className='news-card'>
             <div className='news-image'>
               <img src={new1.image}/>
             </div>
             <div className='news-content'>
                <div className='news-content-title'>
                    <p>{new1.title}</p>
                </div>
                <div className='news-content-description'>
                    <p>{new1.message}</p>
                </div>
                <div className='news-content-date'>
                    <p>{formatMatchDate(new1.createdAt) }</p>
                </div>
             </div>
           </div>
            )
})}
           

           {/* <div className='news-card'>
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
           </div> */}
         </div>
      </div>
    );
}

export default NewsSection