import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Golden rays of unity and strength"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <p className="text-primary font-body text-sm uppercase tracking-[0.3em] mb-6 opacity-0 animate-fade-up">
          Explore · Learn · Remember
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-6 opacity-0 animate-fade-up [animation-delay:200ms]">
          <span className="text-foreground">Voices That</span>
          <br />
          <span className="text-gold-gradient">Shaped History</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground font-body leading-relaxed mb-10 opacity-0 animate-fade-up [animation-delay:400ms]">
          Journey through the pivotal moments, extraordinary people, and enduring legacy of Black history — from ancient civilizations to the modern era.
        </p>
        <div className="flex gap-4 justify-center opacity-0 animate-fade-up [animation-delay:600ms]">
          <a
            href="#figures"
            className="bg-gold-gradient text-primary-foreground font-body font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Start Exploring
          </a>
          <a
            href="#timeline"
            className="border border-primary/40 text-foreground font-body font-semibold px-8 py-3 rounded-lg hover:border-primary/80 transition-colors"
          >
            View Timeline
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in [animation-delay:1200ms]">
        <div className="w-px h-16 bg-gradient-to-b from-primary/60 to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
