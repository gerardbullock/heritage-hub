const events = [
  {
    era: "Ancient Civilizations",
    year: "3000 BCE – 600 CE",
    title: "Kingdoms of Africa",
    description: "The empires of Kush, Axum, and Great Zimbabwe flourished with advanced architecture, trade networks, and written languages.",
  },
  {
    era: "The Transatlantic Slave Trade",
    year: "1500s – 1800s",
    title: "Forced Migration & Resistance",
    description: "Millions were enslaved, yet resistance never ceased — from rebellions aboard ships to the formation of maroon communities across the Americas.",
  },
  {
    era: "Abolition & Reconstruction",
    year: "1865 – 1877",
    title: "The Fight for Freedom",
    description: "The 13th Amendment ended slavery. During Reconstruction, Black Americans built schools, held office, and laid foundations for equality.",
  },
  {
    era: "The Harlem Renaissance",
    year: "1920s – 1930s",
    title: "A Cultural Explosion",
    description: "Art, music, literature, and intellectualism flourished in Harlem, reshaping American culture and Black identity forever.",
  },
  {
    era: "Civil Rights Movement",
    year: "1954 – 1968",
    title: "The Struggle for Equality",
    description: "From Brown v. Board to the Voting Rights Act, a generation fought — and won — landmark battles against segregation and injustice.",
  },
  {
    era: "Modern Era",
    year: "2008 – Present",
    title: "Breaking Barriers",
    description: "From the first Black president to global movements for justice, the fight for equity continues to reshape society worldwide.",
  },
];

const Timeline = () => {
  return (
    <section id="timeline" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary font-body text-sm uppercase tracking-[0.3em] mb-3">
            Through The Ages
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            A Journey Through <span className="text-gold-gradient">Time</span>
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent" />

          {events.map((event, index) => (
            <div
              key={event.era}
              className={`relative flex items-start mb-12 last:mb-0 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-gold z-10 mt-2" />

              {/* Content */}
              <div
                className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8 md:ml-auto"
                }`}
              >
                <span className="text-primary font-body text-xs uppercase tracking-wider">
                  {event.year}
                </span>
                <h3 className="text-lg font-display font-bold text-foreground mt-1">
                  {event.title}
                </h3>
                <p className="text-muted-foreground text-xs uppercase tracking-wider font-body mb-2">
                  {event.era}
                </p>
                <p className="text-secondary-foreground font-body text-sm leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
