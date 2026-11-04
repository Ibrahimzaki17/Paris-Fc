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
         <div className="recent-announcements">
          {news.map(new1 => {
            return(
              <div key={new1.id} className='news-card'>
             <div className='news-image'>
               <img src={new1.image}/>
             </div>
             <div className='news-content'>
                <div className='news-content-title'>
                    <p><b><u>{new1.title}</u></b></p>
                </div>
                <div className='news-content-description'>
                    <p>{new1.message}</p>
                </div>
                <div className='news-content-date'>
                    <p><b>{formatMatchDate(new1.createdAt) }</b></p>
                </div>
             </div>
           </div>
            )
})}
           


         </div>
      </div>
    );
}

export default NewsSection