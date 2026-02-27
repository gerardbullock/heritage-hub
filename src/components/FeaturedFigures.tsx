import { useState } from "react";
import FigureLayout from "./FigureLayout";
import ConnectionWeb from "./ConnectionWeb";

const figures = [
  {
    name: "Harriet Tubman",
    years: "1822–1913",
    role: "Abolitionist & Freedom Fighter",
    description: "Led hundreds to freedom through the Underground Railroad, earning the name 'Moses of her people.'",
    emoji: "🕊️",
  },
  {
    name: "Martin Luther King Jr.",
    years: "1929–1968",
    role: "Civil Rights Leader",
    description: "Champion of nonviolent resistance whose dream of equality transformed a nation and inspired the world.",
    emoji: "✊",
  },
  {
    name: "Maya Angelou",
    years: "1928–2014",
    role: "Poet & Activist",
    description: "Her words gave voice to the voiceless, weaving resilience and beauty into the fabric of American literature.",
    emoji: "✍️",
  },
  {
    name: "Frederick Douglass",
    years: "1818–1895",
    role: "Orator & Statesman",
    description: "Escaped slavery to become one of the most powerful voices for abolition and human rights in American history.",
    emoji: "📜",
  },
  {
    name: "Rosa Parks",
    years: "1913–2005",
    role: "Civil Rights Icon",
    description: "Her courageous refusal to surrender her bus seat ignited the Montgomery Bus Boycott and the modern civil rights movement.",
    emoji: "🌹",
  },
  {
    name: "W.E.B. Du Bois",
    years: "1868–1963",
    role: "Scholar & Co-founder of NAACP",
    description: "Pioneering sociologist and intellectual whose scholarship laid the groundwork for the fight against racial injustice.",
    emoji: "📚",
  },
];

const FeaturedFigures = () => {
  const [selectedFigure, setSelectedFigure] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"layout" | "web">("web");

  return (
    <section id="figures" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary font-body text-sm uppercase tracking-[0.3em] mb-3">
            Trailblazers
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Figures Who Changed <span className="text-gold-gradient">Everything</span>
          </h2>
          <p className="text-muted-foreground font-body text-sm mt-4">
            Select a figure to explore their connections
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {figures.map((figure, index) => (
            <article
              key={figure.name}
              onClick={() => setSelectedFigure(figure.name)}
              className={`group bg-card border rounded-xl p-8 cursor-pointer transition-all duration-500 ${
                selectedFigure === figure.name
                  ? "border-primary shadow-gold ring-1 ring-primary/30"
                  : "border-border hover:border-primary/40 hover:shadow-gold"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl mb-4">{figure.emoji}</div>
              <h3 className="text-xl font-display font-bold text-foreground group-hover:text-gold-gradient transition-colors">
                {figure.name}
              </h3>
              <p className="text-primary text-sm font-body mt-1">{figure.years}</p>
              <p className="text-muted-foreground text-xs uppercase tracking-wider mt-1 mb-4 font-body">
                {figure.role}
              </p>
              <p className="text-secondary-foreground font-body text-sm leading-relaxed">
                {figure.description}
              </p>
              <p className="text-primary/60 text-xs font-body mt-4 group-hover:text-primary transition-colors">
                Tap to explore connections →
              </p>
            </article>
          ))}
        </div>
      </div>

      {selectedFigure && (
        <div>
          {/* View mode toggle */}
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] flex bg-card border border-border rounded-full p-1 shadow-gold">
            <button
              onClick={() => setViewMode("web")}
              className={`px-4 py-1.5 rounded-full text-xs font-body transition-all ${
                viewMode === "web"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Connection Web
            </button>
            <button
              onClick={() => setViewMode("layout")}
              className={`px-4 py-1.5 rounded-full text-xs font-body transition-all ${
                viewMode === "layout"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Historical Layout
            </button>
          </div>

          {viewMode === "web" ? (
            <ConnectionWeb
              figureName={selectedFigure}
              onClose={() => setSelectedFigure(null)}
            />
          ) : (
            <FigureLayout
              figureName={selectedFigure}
              onClose={() => setSelectedFigure(null)}
            />
          )}
        </div>
      )}
    </section>
  );
};

export default FeaturedFigures;
