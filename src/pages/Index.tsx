import HeroSection from "@/components/HeroSection";
import FeaturedFigures from "@/components/FeaturedFigures";
import Timeline from "@/components/Timeline";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <FeaturedFigures />
      <Timeline />
      <Footer />
    </div>
  );
};

export default Index;
