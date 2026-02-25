import { useState } from "react";
import { X, Calendar, Award, Quote, Landmark, Flame, Users, BookOpen, MapPin } from "lucide-react";

interface CellData {
  title: string;
  icon: React.ReactNode;
  items: string[];
  detail: string;
}

type FigureLayoutData = Record<string, CellData>;

const figureLayouts: Record<string, FigureLayoutData> = {
  "Harriet Tubman": {
    keyEvents: {
      title: "KEY EVENTS",
      icon: <Calendar className="w-5 h-5" />,
      items: [
        "1849 — Escaped slavery from Maryland's Eastern Shore",
        "1850–1860 — Made 13 rescue missions via the Underground Railroad",
        "1858 — Met John Brown, who called her 'General Tubman'",
        "1863 — Led the Combahee River Raid, freeing 700+ enslaved people",
      ],
      detail: "Tubman's life was a series of daring acts — from her own escape to leading armed raids during the Civil War.",
    },
    achievements: {
      title: "ACHIEVEMENTS",
      icon: <Award className="w-5 h-5" />,
      items: [
        "Freed approximately 70 enslaved people in 13 missions",
        "First woman to lead an armed expedition in the Civil War",
        "Established the Harriet Tubman Home for the Aged",
        "Worked as a Union spy, scout, and nurse",
      ],
      detail: "Despite being born into slavery, Tubman became one of the most effective freedom fighters in American history.",
    },
    quotes: {
      title: "NOTABLE WORDS",
      icon: <Quote className="w-5 h-5" />,
      items: [
        "\"I freed a thousand slaves. I could have freed a thousand more if only they knew they were slaves.\"",
        "\"Every great dream begins with a dreamer.\"",
        "\"I never ran my train off the track and I never lost a passenger.\"",
      ],
      detail: "Tubman's words reveal her fierce determination and deep faith in freedom.",
    },
    legacy: {
      title: "LEGACY",
      icon: <Landmark className="w-5 h-5" />,
      items: [
        "Selected for the $20 bill redesign",
        "Harriet Tubman National Historical Park established 2017",
        "Inspired generations of civil rights and women's rights activists",
        "Honored with a U.S. postage stamp in 1978",
      ],
      detail: "Tubman's legacy transcends her era — she remains a universal symbol of courage and liberation.",
    },
    challenges: {
      title: "CHALLENGES",
      icon: <Flame className="w-5 h-5" />,
      items: [
        "Suffered a traumatic head injury as a child causing lifelong seizures",
        "Fugitive Slave Act of 1850 made her work far more dangerous",
        "$40,000 bounty placed on her capture",
        "Faced poverty in her later years despite her service",
      ],
      detail: "Tubman overcame extraordinary physical and legal obstacles, never once losing a person she guided to freedom.",
    },
    allies: {
      title: "ALLIES & NETWORK",
      icon: <Users className="w-5 h-5" />,
      items: [
        "Frederick Douglass — sheltered freedom seekers she brought north",
        "William Still — documented her rescue missions in Philadelphia",
        "Thomas Garrett — Delaware stationmaster who aided her journeys",
        "Quaker communities — provided safe houses along the route",
      ],
      detail: "Tubman's success depended on a vast network of abolitionists, free Black communities, and sympathetic allies.",
    },
  },
  "Martin Luther King Jr.": {
    keyEvents: {
      title: "KEY EVENTS",
      icon: <Calendar className="w-5 h-5" />,
      items: [
        "1955 — Led the Montgomery Bus Boycott",
        "1963 — Delivered 'I Have a Dream' at the March on Washington",
        "1964 — Awarded the Nobel Peace Prize at age 35",
        "1965 — Led the Selma to Montgomery marches for voting rights",
      ],
      detail: "King's leadership defined the American civil rights movement, using nonviolent protest to dismantle segregation.",
    },
    achievements: {
      title: "ACHIEVEMENTS",
      icon: <Award className="w-5 h-5" />,
      items: [
        "Civil Rights Act of 1964 — ended legal segregation",
        "Voting Rights Act of 1965 — secured voting access",
        "Youngest Nobel Peace Prize laureate at the time",
        "Inspired nonviolent movements worldwide",
      ],
      detail: "King's strategic campaigns led directly to landmark legislation that transformed American law and society.",
    },
    quotes: {
      title: "NOTABLE WORDS",
      icon: <Quote className="w-5 h-5" />,
      items: [
        "\"Injustice anywhere is a threat to justice everywhere.\"",
        "\"The arc of the moral universe is long, but it bends toward justice.\"",
        "\"Darkness cannot drive out darkness; only light can do that.\"",
      ],
      detail: "King's oratory remains among the most powerful and quoted in human history.",
    },
    legacy: {
      title: "LEGACY",
      icon: <Landmark className="w-5 h-5" />,
      items: [
        "Martin Luther King Jr. Day — federal holiday since 1986",
        "MLK Memorial on the National Mall in Washington, D.C.",
        "Over 900 streets named after King in the United States",
        "Continues to inspire global movements for justice and equality",
      ],
      detail: "King's vision of a beloved community continues to shape movements for justice around the world.",
    },
    philosophy: {
      title: "PHILOSOPHY",
      icon: <BookOpen className="w-5 h-5" />,
      items: [
        "Nonviolent resistance — inspired by Mahatma Gandhi",
        "Beloved Community — a society based on justice and goodwill",
        "Direct action — sit-ins, marches, and boycotts",
        "Agape love — unconditional love as a force for social change",
      ],
      detail: "King synthesized theology, philosophy, and political strategy into a coherent framework for peaceful revolution.",
    },
    allies: {
      title: "ALLIES & NETWORK",
      icon: <Users className="w-5 h-5" />,
      items: [
        "Rosa Parks — her arrest catalyzed King's leadership",
        "Bayard Rustin — organized the March on Washington",
        "Ralph Abernathy — co-founded SCLC, lifelong partner",
        "John Lewis — SNCC leader, key ally in Selma",
      ],
      detail: "King's movement was powered by a coalition of activists, clergy, students, and ordinary citizens.",
    },
  },
  "Maya Angelou": {
    keyEvents: {
      title: "KEY EVENTS",
      icon: <Calendar className="w-5 h-5" />,
      items: [
        "1969 — Published 'I Know Why the Caged Bird Sings'",
        "1993 — Read 'On the Pulse of Morning' at Clinton's inauguration",
        "1960s — Served as Northern Coordinator for SCLC",
        "2011 — Awarded the Presidential Medal of Freedom",
      ],
      detail: "Angelou's life spanned continents and careers — singer, dancer, actress, director, and one of America's greatest literary voices.",
    },
    achievements: {
      title: "ACHIEVEMENTS",
      icon: <Award className="w-5 h-5" />,
      items: [
        "7 autobiographies that redefined the memoir genre",
        "Over 50 honorary doctorate degrees",
        "Grammy Award for Best Spoken Word Album",
        "First Black woman to write a screenplay for a major film",
      ],
      detail: "Angelou broke barriers across every art form she touched, becoming a cultural institution in her lifetime.",
    },
    quotes: {
      title: "NOTABLE WORDS",
      icon: <Quote className="w-5 h-5" />,
      items: [
        "\"Still I rise.\"",
        "\"There is no greater agony than bearing an untold story inside you.\"",
        "\"People will forget what you said, but people will never forget how you made them feel.\"",
      ],
      detail: "Angelou's words became anthems of resilience, self-worth, and the power of storytelling.",
    },
    legacy: {
      title: "LEGACY",
      icon: <Landmark className="w-5 h-5" />,
      items: [
        "Her works are standard reading in schools nationwide",
        "U.S. quarter featuring Angelou released in 2022",
        "Maya Angelou Presidential Library planned",
        "Inspired generations of Black writers, poets, and activists",
      ],
      detail: "Angelou proved that lived experience — especially Black women's experience — is worthy of the world's greatest literature.",
    },
    challenges: {
      title: "CHALLENGES",
      icon: <Flame className="w-5 h-5" />,
      items: [
        "Childhood trauma led to years of selective mutism",
        "Faced racism and poverty throughout her early life",
        "Navigated being a single mother while pursuing art",
        "Experienced the assassinations of close friends MLK and Malcolm X",
      ],
      detail: "Angelou transformed her deepest pain into art that healed millions.",
    },
    places: {
      title: "KEY PLACES",
      icon: <MapPin className="w-5 h-5" />,
      items: [
        "Stamps, Arkansas — childhood home, setting of her first memoir",
        "San Francisco — where she found her voice as a young woman",
        "Ghana & Egypt — lived abroad, deepened her Pan-African identity",
        "Wake Forest University — Reynolds Professor for over 30 years",
      ],
      detail: "Angelou's geography shaped her perspective — from the rural South to Africa to the halls of American academia.",
    },
  },
  "Frederick Douglass": {
    keyEvents: {
      title: "KEY EVENTS",
      icon: <Calendar className="w-5 h-5" />,
      items: [
        "1838 — Escaped slavery disguised as a free Black sailor",
        "1845 — Published 'Narrative of the Life of Frederick Douglass'",
        "1847 — Founded 'The North Star' newspaper in Rochester, NY",
        "1863 — Recruited Black soldiers for the 54th Massachusetts Regiment",
      ],
      detail: "Douglass's journey from enslaved person to statesman is one of the most extraordinary in American history.",
    },
    achievements: {
      title: "ACHIEVEMENTS",
      icon: <Award className="w-5 h-5" />,
      items: [
        "Most photographed American of the 19th century",
        "Served as U.S. Marshal and Minister to Haiti",
        "Published three autobiographies read worldwide",
        "Advised President Lincoln on emancipation and Black soldiers",
      ],
      detail: "Douglass used every platform available — pen, podium, and political office — to fight for equality.",
    },
    quotes: {
      title: "NOTABLE WORDS",
      icon: <Quote className="w-5 h-5" />,
      items: [
        "\"If there is no struggle, there is no progress.\"",
        "\"I prayed for freedom for twenty years, but received no answer until I prayed with my legs.\"",
        "\"Once you learn to read, you will be forever free.\"",
      ],
      detail: "Douglass's words cut to the heart of American hypocrisy while inspiring action.",
    },
    legacy: {
      title: "LEGACY",
      icon: <Landmark className="w-5 h-5" />,
      items: [
        "Frederick Douglass National Historic Site in Washington, D.C.",
        "Recognized as the father of the civil rights movement",
        "His autobiographies remain essential American literature",
        "Statues erected across the U.S. and in Ireland",
      ],
      detail: "Douglass proved that the pen and the voice were as mighty as any weapon in the fight for justice.",
    },
    philosophy: {
      title: "PHILOSOPHY",
      icon: <BookOpen className="w-5 h-5" />,
      items: [
        "Self-education as liberation — taught himself to read",
        "Political action over moral suasion (split with Garrison)",
        "Advocated for women's suffrage alongside abolition",
        "Believed in the Constitution as an anti-slavery document",
      ],
      detail: "Douglass evolved from a protégé of Garrison into an independent thinker who believed in political engagement.",
    },
    allies: {
      title: "ALLIES & NETWORK",
      icon: <Users className="w-5 h-5" />,
      items: [
        "Harriet Tubman — mutual respect, sheltered freedom seekers",
        "Abraham Lincoln — advised on emancipation and recruitment",
        "William Lloyd Garrison — early mentor and publisher",
        "Anna Murray Douglass — his wife, supported his escape and career",
      ],
      detail: "Douglass built alliances across racial and political lines to advance the cause of freedom.",
    },
  },
  "Rosa Parks": {
    keyEvents: {
      title: "KEY EVENTS",
      icon: <Calendar className="w-5 h-5" />,
      items: [
        "1955 — Refused to give up her bus seat in Montgomery, Alabama",
        "1955–56 — Montgomery Bus Boycott lasted 381 days",
        "1957 — Moved to Detroit, continued activism",
        "1996 — Awarded the Presidential Medal of Freedom",
      ],
      detail: "Parks's quiet act of defiance set off a chain reaction that dismantled legal segregation in public transit.",
    },
    achievements: {
      title: "ACHIEVEMENTS",
      icon: <Award className="w-5 h-5" />,
      items: [
        "Sparked the Montgomery Bus Boycott",
        "Congressional Gold Medal recipient (1999)",
        "Co-founded the Rosa and Raymond Parks Institute",
        "Her arrest became a legal test case that reached the Supreme Court",
      ],
      detail: "Parks's courage transformed a local incident into a national movement.",
    },
    quotes: {
      title: "NOTABLE WORDS",
      icon: <Quote className="w-5 h-5" />,
      items: [
        "\"I have learned over the years that one's mind is made up, this diminishes fear.\"",
        "\"Each person must live their life as a model for others.\"",
        "\"I knew someone had to take the first step and I made up my mind not to move.\"",
      ],
      detail: "Parks spoke softly but her words carried the weight of an entire movement.",
    },
    legacy: {
      title: "LEGACY",
      icon: <Landmark className="w-5 h-5" />,
      items: [
        "Rosa Parks Day celebrated on February 4 and December 1",
        "Bus she rode on is displayed at the Henry Ford Museum",
        "First woman to lie in honor in the U.S. Capitol",
        "Statues and memorials across the United States",
      ],
      detail: "Parks is remembered as 'the mother of the civil rights movement' — her legacy endures as a call to stand firm.",
    },
    challenges: {
      title: "CHALLENGES",
      icon: <Flame className="w-5 h-5" />,
      items: [
        "Lost her job after the boycott and faced constant threats",
        "Struggled financially for years after her arrest",
        "Faced ongoing harassment and had to leave Montgomery",
        "Often reduced to a single moment despite a lifetime of activism",
      ],
      detail: "Parks paid a steep personal price for her stand — her courage was not a single moment but a lifelong commitment.",
    },
    allies: {
      title: "ALLIES & NETWORK",
      icon: <Users className="w-5 h-5" />,
      items: [
        "Martin Luther King Jr. — led the boycott her arrest sparked",
        "E.D. Nixon — recognized her case as the ideal test",
        "Septima Clark — trained Parks at the Highlander Folk School",
        "Claudette Colvin — preceded Parks in refusing to move",
      ],
      detail: "Parks was part of a strategic network of activists who carefully chose their battles.",
    },
  },
  "W.E.B. Du Bois": {
    keyEvents: {
      title: "KEY EVENTS",
      icon: <Calendar className="w-5 h-5" />,
      items: [
        "1895 — First African American to earn a PhD from Harvard",
        "1903 — Published 'The Souls of Black Folk'",
        "1909 — Co-founded the NAACP",
        "1961 — Moved to Ghana, became a citizen before his death",
      ],
      detail: "Du Bois's intellectual journey spanned seven decades and two continents in the fight for racial justice.",
    },
    achievements: {
      title: "ACHIEVEMENTS",
      icon: <Award className="w-5 h-5" />,
      items: [
        "Founded 'The Crisis' magazine — voice of the NAACP",
        "Pioneered sociology as a discipline at Atlanta University",
        "Organized the first Pan-African Congresses",
        "Published over 20 books on race, history, and politics",
      ],
      detail: "Du Bois combined scholarship with activism, creating the intellectual foundation for the modern civil rights movement.",
    },
    quotes: {
      title: "NOTABLE WORDS",
      icon: <Quote className="w-5 h-5" />,
      items: [
        "\"The problem of the twentieth century is the problem of the color line.\"",
        "\"Education is that whole system of human training within and without the school house walls.\"",
        "\"To be a poor man is hard, but to be a poor race in a land of dollars is the very bottom of hardships.\"",
      ],
      detail: "Du Bois's writings remain prophetic — his concept of 'double consciousness' still defines the Black American experience.",
    },
    legacy: {
      title: "LEGACY",
      icon: <Landmark className="w-5 h-5" />,
      items: [
        "The NAACP remains the largest civil rights organization",
        "His scholarship shaped African American studies as a field",
        "Pan-Africanism influenced independence movements across Africa",
        "W.E.B. Du Bois National Historic Site in Great Barrington, MA",
      ],
      detail: "Du Bois proved that intellectual rigor and activism are not just compatible — they are inseparable.",
    },
    philosophy: {
      title: "PHILOSOPHY",
      icon: <BookOpen className="w-5 h-5" />,
      items: [
        "The 'Talented Tenth' — an educated Black elite to lead progress",
        "Double consciousness — living as both Black and American",
        "Rejected Booker T. Washington's accommodationism",
        "Evolved from reform to Pan-Africanism and socialism",
      ],
      detail: "Du Bois's thinking evolved over decades, moving from integrationism to Pan-Africanism as he grew disillusioned with American progress.",
    },
    allies: {
      title: "ALLIES & NETWORK",
      icon: <Users className="w-5 h-5" />,
      items: [
        "Ida B. Wells — co-founded the NAACP, anti-lynching crusader",
        "Langston Hughes — Du Bois published his early work in 'The Crisis'",
        "Marcus Garvey — Pan-African counterpart, though they clashed",
        "Kwame Nkrumah — hosted Du Bois in Ghana in his final years",
      ],
      detail: "Du Bois built bridges between Black intellectuals, artists, and political leaders across the globe.",
    },
  },
};

interface FigureLayoutProps {
  figureName: string;
  onClose: () => void;
}

const FigureLayout = ({ figureName, onClose }: FigureLayoutProps) => {
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const layoutData = figureLayouts[figureName];

  if (!layoutData) return null;

  const keys = Object.keys(layoutData);
  const selected = selectedCell ? layoutData[selectedCell] : null;

  // Split into grid rows similar to Underground Railroad
  const topRow = keys.slice(0, 3);
  const bottomRow = keys.slice(3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background/90 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto animate-fade-up">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-20 p-2 rounded-full bg-card border border-border hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <p className="text-primary font-body text-xs uppercase tracking-[0.3em] mb-2">
            Historical Layout
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            {figureName}
          </h2>
          <p className="text-muted-foreground font-body text-sm mt-2">
            Tap any section to explore
          </p>
        </div>

        <div className="border border-border rounded-2xl bg-card p-3 md:p-5 shadow-gold">
          {/* Top row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            {topRow.map((key, i) => (
              <LayoutCell
                key={key}
                id={key}
                data={layoutData[key]}
                selected={selectedCell}
                onSelect={setSelectedCell}
                className={i === 1 ? "md:row-span-2" : ""}
              />
            ))}
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {bottomRow.map((key) => (
              <LayoutCell
                key={key}
                id={key}
                data={layoutData[key]}
                selected={selectedCell}
                onSelect={setSelectedCell}
              />
            ))}
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
    </div>
  );
};

interface LayoutCellProps {
  id: string;
  data: CellData;
  selected: string | null;
  onSelect: (id: string | null) => void;
  className?: string;
}

const LayoutCell = ({ id, data, selected, onSelect, className = "" }: LayoutCellProps) => {
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

export default FigureLayout;
