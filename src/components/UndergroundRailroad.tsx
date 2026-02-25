import { useState } from "react";
import { X, MapPin, Users, Shield, Route, BookOpen, Heart, Star, AlertTriangle } from "lucide-react";

interface CellData {
  title: string;
  icon: React.ReactNode;
  items: string[];
  detail: string;
}

const railroadData: Record<string, CellData> = {
  conductors: {
    title: "CONDUCTORS",
    icon: <Users className="w-5 h-5" />,
    items: [
      "Harriet Tubman — 'Moses,' made 13 trips, freed ~70 people",
      "Levi Coffin — 'President of the Underground Railroad,' aided 2,000+",
      "John Fairfield — posed as a slaveholder to free enslaved people",
      "William Still — documented hundreds of journeys in Philadelphia",
    ],
    detail:
      "Conductors were the brave guides who led freedom seekers along secret routes, often risking their own lives and freedom.",
  },
  routes: {
    title: "KEY ROUTES",
    icon: <Route className="w-5 h-5" />,
    items: [
      "Eastern Route — through Maryland, Delaware, Pennsylvania to New York & Canada",
      "Western Route — through Kentucky, Indiana, Ohio to Detroit & Windsor",
      "Gulf Route — from Deep South through Florida to the Bahamas & Caribbean",
      "Central Route — through Tennessee, Kentucky to Ohio River crossings",
    ],
    detail:
      "Routes zigzagged through forests, rivers, and mountains — rarely straight lines. Travelers moved at night, guided by the North Star.",
  },
  safeHouses: {
    title: "STATIONS & SAFE HOUSES",
    icon: <MapPin className="w-5 h-5" />,
    items: [
      "Coffin House, Indiana — Levi & Catharine Coffin sheltered thousands",
      "Johnson House, Philadelphia — a key stop on the Eastern Line",
      "John Rankin House, Ohio — hilltop beacon visible from across the Ohio River",
      "AME Churches — served as stations across the North",
    ],
    detail:
      "Stations were the homes, churches, and barns where freedom seekers hid during the day before traveling again at night.",
  },
  signals: {
    title: "SECRET SIGNALS & CODES",
    icon: <Star className="w-5 h-5" />,
    items: [
      "'Follow the Drinking Gourd' — song encoding the route north via the Big Dipper",
      "Quilt patterns — Bear's Paw (follow animal trails), North Star (head north)",
      "Lanterns in windows — indicated a safe house was ready",
      "Knocking patterns — specific rhythms to identify allies",
    ],
    detail:
      "Communication had to be covert. Songs, quilts, and coded language disguised directions and warnings in plain sight.",
  },
  keyFigures: {
    title: "KEY FIGURES & ALLIES",
    icon: <Shield className="w-5 h-5" />,
    items: [
      "Frederick Douglass — sheltered fugitives in Rochester, NY",
      "Sojourner Truth — guided freedom seekers & advocated for abolition",
      "Thomas Garrett — aided 2,700 people, defied the Fugitive Slave Act",
      "Quaker communities — provided organized networks of safe houses",
    ],
    detail:
      "The Railroad relied on a vast network of Black and white abolitionists, free Black communities, and religious groups who risked everything.",
  },
  dangers: {
    title: "DANGERS & OBSTACLES",
    icon: <AlertTriangle className="w-5 h-5" />,
    items: [
      "Fugitive Slave Act (1850) — made aiding escapees a federal crime",
      "Slave catchers & bounty hunters with bloodhounds",
      "Harsh terrain — swamps, rivers, freezing winters",
      "Betrayal — informants and false allies along the route",
    ],
    detail:
      "Freedom seekers faced capture, torture, or death. Helpers faced imprisonment and heavy fines. Despite this, the network endured for decades.",
  },
  impact: {
    title: "IMPACT & LEGACY",
    icon: <Heart className="w-5 h-5" />,
    items: [
      "~100,000 people escaped slavery via the Railroad (1810–1860)",
      "Fueled the abolitionist movement and deepened the national divide",
      "Directly contributed to the tensions leading to the Civil War",
      "Inspired generations of resistance and civil rights activism",
    ],
    detail:
      "The Underground Railroad stands as one of the greatest acts of collective resistance in American history — proof that ordinary people can defy injustice.",
  },
  timeline: {
    title: "KEY DATES",
    icon: <BookOpen className="w-5 h-5" />,
    items: [
      "1780s — Quaker networks begin organized assistance",
      "1831 — term 'Underground Railroad' first appears in print",
      "1849 — Harriet Tubman escapes, begins conducting missions",
      "1850 — Fugitive Slave Act intensifies danger and resolve",
      "1860s — Civil War begins; Railroad's mission merges with the Union cause",
    ],
    detail:
      "The Railroad operated for nearly 80 years, growing from informal networks into an organized resistance movement.",
  },
};

const UndergroundRailroad = () => {
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const selected = selectedCell ? railroadData[selectedCell] : null;

  return (
    <section id="railroad" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary font-body text-sm uppercase tracking-[0.3em] mb-3">
            Historical Layout
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            The Underground <span className="text-gold-gradient">Railroad</span>
          </h2>
          <p className="text-muted-foreground font-body text-sm mt-3 max-w-xl mx-auto">
            Tap any section to learn more about the secret network that led thousands to freedom
          </p>
        </div>

        {/* Canvas grid inspired by the reference image */}
        <div className="max-w-6xl mx-auto border border-border rounded-2xl bg-card p-3 md:p-5 shadow-gold">
          {/* Top row: 5 columns like the reference */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-3">
            {/* Conductors — tall left cell */}
            <Cell
              id="conductors"
              data={railroadData.conductors}
              selected={selectedCell}
              onSelect={setSelectedCell}
              className="md:row-span-2"
            />
            {/* Routes — top middle-left */}
            <Cell
              id="routes"
              data={railroadData.routes}
              selected={selectedCell}
              onSelect={setSelectedCell}
            />
            {/* Safe Houses — tall center cell */}
            <Cell
              id="safeHouses"
              data={railroadData.safeHouses}
              selected={selectedCell}
              onSelect={setSelectedCell}
              className="md:row-span-2"
            />
            {/* Signals — top middle-right */}
            <Cell
              id="signals"
              data={railroadData.signals}
              selected={selectedCell}
              onSelect={setSelectedCell}
            />
            {/* Key Figures — tall right cell */}
            <Cell
              id="keyFigures"
              data={railroadData.keyFigures}
              selected={selectedCell}
              onSelect={setSelectedCell}
              className="md:row-span-2"
            />
            {/* Dangers — bottom middle-left */}
            <Cell
              id="dangers"
              data={railroadData.dangers}
              selected={selectedCell}
              onSelect={setSelectedCell}
            />
            {/* Timeline — bottom middle-right */}
            <Cell
              id="timeline"
              data={railroadData.timeline}
              selected={selectedCell}
              onSelect={setSelectedCell}
            />
          </div>

          {/* Bottom row: 2 wide columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Cell
              id="impact"
              data={railroadData.impact}
              selected={selectedCell}
              onSelect={setSelectedCell}
            />
            <div className="border border-border rounded-xl p-6 flex items-center justify-center">
              <p className="font-display text-2xl md:text-3xl text-muted-foreground/30 font-bold tracking-wide text-center">
                Freedom's Path
              </p>
            </div>
          </div>
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="max-w-3xl mx-auto mt-8 bg-card border border-border rounded-xl p-6 animate-fade-up shadow-gold relative">
            <button
              onClick={() => setSelectedCell(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="text-primary">{selected.icon}</div>
              <h3 className="font-display font-bold text-foreground text-lg">
                {selected.title}
              </h3>
            </div>
            <p className="text-muted-foreground font-body text-sm mb-4 leading-relaxed">
              {selected.detail}
            </p>
            <ul className="space-y-2">
              {selected.items.map((item, i) => (
                <li
                  key={i}
                  className="text-secondary-foreground font-body text-sm flex items-start gap-2"
                >
                  <span className="text-primary mt-1 shrink-0">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

interface CellProps {
  id: string;
  data: CellData;
  selected: string | null;
  onSelect: (id: string | null) => void;
  className?: string;
}

const Cell = ({ id, data, selected, onSelect, className = "" }: CellProps) => {
  const isSelected = selected === id;

  return (
    <button
      onClick={() => onSelect(isSelected ? null : id)}
      className={`text-left border rounded-xl p-4 md:p-5 transition-all duration-300 cursor-pointer ${className} ${
        isSelected
          ? "border-primary bg-primary/5 shadow-gold"
          : "border-border hover:border-primary/40"
      }`}
    >
      <div className="text-primary mb-2">{data.icon}</div>
      <h4 className="font-display font-bold text-primary text-xs uppercase tracking-wider mb-2">
        {data.title}
      </h4>
      <p className="text-muted-foreground font-body text-xs leading-relaxed line-clamp-3">
        {data.items[0]}
      </p>
    </button>
  );
};

export default UndergroundRailroad;
