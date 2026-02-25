import HeroSection from "@/components/HeroSection";
import FeaturedFigures from "@/components/FeaturedFigures";
import UndergroundRailroad from "@/components/UndergroundRailroad";
import Timeline from "@/components/Timeline";
import Quiz from "@/components/Quiz";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <FeaturedFigures />
      <UndergroundRailroad />
      <Timeline />
      <Quiz />
      <Footer />
    </div>
  );
};

export default Index;
