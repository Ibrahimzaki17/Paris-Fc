import Header from "../../components/Header";
import AboutSection from "./AboutSection/AboutSection";
import FeaturedPlayers from "./FeaturedPlayers/FeaturedPlayers";
import Footer from "../../components/Footer/Footer";
import HeroSection from "./HeroSection/HeroSection";
import NewsSection from "./NewsSection/NewsSection";
import TeamStats from "./TeamStats/TeamStats";
import UpComingMatches from "./UpComingMatches/UpComingMatches";

function HomePage() {
  return (
    <>
      <title>Paris FC</title>
      <HeroSection />
      <AboutSection />
      <TeamStats />
      <NewsSection />
      <UpComingMatches />
      <FeaturedPlayers />
    </>
  );
}

export default HomePage;
