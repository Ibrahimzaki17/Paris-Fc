import './App.css'
import Header from './components/Header';
import { Routes, Route } from 'react-router';
import HomePage from './pages/Home/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import PlayersPage from './pages/Players/PlayersPage';
import Footer from './components/Footer/Footer';
import Trophies from './pages/Trophies/Trophies';
import Contacts from './pages/Contacts/Contacts';
import Coach from './pages/Coach/Coach';
import Login from './pages/Login/Login';
import { useLocation } from 'react-router';

function App() {

  const location = useLocation();

  return(
    <>
    
    {location.pathname !== '/login' && <Header />}
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/players' element={<PlayersPage />} />
      <Route path='/trophies' element={<Trophies />} />
      <Route path='/contact' element={<Contacts />} />
      <Route path='/coach' element={<Coach />} />
      <Route path='/login' element={<Login />} />
    </Routes>
    {location.pathname !== '/login' && <Footer />}
   
    </>
  );
}

export default App