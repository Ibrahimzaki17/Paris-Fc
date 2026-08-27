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
import PlayerDashboard from './pages/PlayerDashboardPage/PlayerDashboard';
import CoachDashboard from './pages/CoachDashboard/CoachDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AdminLayout } from './pages/Admin/AdminLayout';
import PlayerManagement from './pages/Admin/AdminPages/PlayerManagement'
import CoachManagement from './pages/Admin/AdminPages/CoachManagement';
import MatchManagement from './pages/Admin/AdminPages/MatchManagement';
import AnnouncementsManagement from './pages/Admin/AdminPages/AnnouncementsManagement';
import AdminProfile from './pages/Admin/AdminPages/AdminProfile';


function App() {

  const location = useLocation();
  const isDashboard =
  location.pathname.startsWith("/admin-dashboard") ||
  location.pathname.startsWith("/coach-dashboard") ||
  location.pathname.startsWith("/player-dashboard");

  return (
    <>
      {!isDashboard && location.pathname !== "/login" && <Header />}
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/players' element={<PlayersPage />} />
        <Route path='/trophies' element={<Trophies />} />
        <Route path='/contact' element={<Contacts />} />
        <Route path='/coach' element={<Coach />} />
        <Route path='/login' element={<Login />} />

        <Route path='/player-dashboard' element={
          <ProtectedRoute role="player">
            <PlayerDashboard />
          </ProtectedRoute>
        }
        />
        <Route path='/coach-dashboard' element={
          <ProtectedRoute role="coach">
            <CoachDashboard />
          </ProtectedRoute>
        }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          
          <Route
            path="players"
            element={ <PlayerManagement /> }
          />
          <Route
            path="coaches"
            element={ <CoachManagement /> }
          />
          <Route
            path="matches"
            element={ <MatchManagement /> }
          />
          <Route
            path="announcements"
            element={ <AnnouncementsManagement /> }
          />
          <Route
            path="profile"
            element={ <AdminProfile /> }
          />
        </Route>
      </Routes>
      {!isDashboard && location.pathname !== "/login" && <Footer />}

    </>
  );
}

export default App