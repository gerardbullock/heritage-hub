import { X } from "lucide-react";
import { useState } from "react";

interface Connection {
  name: string;
  relationship: string;
  detail: string;
  children?: Connection[];
}

interface ConnectionTreeData {
  [key: string]: Connection[];
}

const connectionData: ConnectionTreeData = {
  "Harriet Tubman": [
    {
      name: "Frederick Douglass",
      relationship: "Fellow Abolitionist & Ally",
      detail: "Douglass sheltered freedom seekers Tubman brought north and publicly praised her courage, calling her 'one of the bravest persons on this continent.'",
      children: [
        {
          name: "John Brown",
          relationship: "Radical Abolitionist",
          detail: "Brown sought Tubman's help recruiting for his raid on Harpers Ferry. She admired his commitment but was unable to join due to illness.",
        },
        {
          name: "William Lloyd Garrison",
          relationship: "Publisher & Abolitionist",
          detail: "Garrison's newspaper 'The Liberator' amplified Douglass's voice and the abolitionist cause Tubman fought for on the ground.",
        },
      ],
    },
    {
      name: "John Brown",
      relationship: "Revolutionary Ally",
      detail: "Brown called Tubman 'General Tubman' and consulted her for his planned uprising at Harpers Ferry in 1859.",
    },
    {
      name: "Sojourner Truth",
      relationship: "Fellow Freedom Fighter",
      detail: "Both formerly enslaved women who became powerful advocates for abolition and women's rights, often speaking at the same gatherings.",
    },
    {
      name: "William Still",
      relationship: "Underground Railroad Partner",
      detail: "Known as the 'Father of the Underground Railroad,' Still documented the journeys of freedom seekers Tubman guided to safety.",
    },
  ],
  "Martin Luther King Jr.": [
    {
      name: "Rosa Parks",
      relationship: "Catalyst for the Movement",
      detail: "Parks's arrest and the Montgomery Bus Boycott thrust King into national leadership of the civil rights movement.",
      children: [
        {
          name: "Claudette Colvin",
          relationship: "First to Resist",
          detail: "Nine months before Parks, 15-year-old Colvin refused to give up her seat. Her case was used in Browder v. Gayle.",
        },
      ],
    },
    {
      name: "Mahatma Gandhi",
      relationship: "Philosophical Inspiration",
      detail: "King adopted Gandhi's philosophy of nonviolent resistance after visiting India in 1959, shaping the entire civil rights strategy.",
    },
    {
      name: "Bayard Rustin",
      relationship: "Chief Strategist",
      detail: "Rustin organized the 1963 March on Washington and mentored King in nonviolent direct action techniques.",
    },
    {
      name: "Malcolm X",
      relationship: "Ideological Counterpart",
      detail: "Though they disagreed on methods, Malcolm X's advocacy pushed the conversation on Black rights forward alongside King's movement.",
    },
  ],
  "Maya Angelou": [
    {
      name: "Martin Luther King Jr.",
      relationship: "Close Friend & Collaborator",
      detail: "Angelou served as Northern Coordinator for King's Southern Christian Leadership Conference and was deeply affected by his assassination.",
    },
    {
      name: "Malcolm X",
      relationship: "Friend & Ally",
      detail: "Angelou worked closely with Malcolm X in the Organization of Afro-American Unity before his assassination in 1965.",
    },
    {
      name: "James Baldwin",
      relationship: "Literary Kindred Spirit",
      detail: "Baldwin and Angelou shared a deep friendship and mutual admiration, both using literature to confront racial injustice.",
    },
    {
      name: "Langston Hughes",
      relationship: "Poetic Inspiration",
      detail: "Hughes's celebration of Black life and culture in poetry deeply influenced Angelou's own literary voice and themes.",
    },
  ],
  "Frederick Douglass": [
    {
      name: "Harriet Tubman",
      relationship: "Fellow Abolitionist",
      detail: "Douglass provided shelter for freedom seekers Tubman brought north, and the two shared a mutual deep respect.",
    },
    {
      name: "Abraham Lincoln",
      relationship: "Presidential Ally",
      detail: "Douglass met with Lincoln multiple times, advising on the recruitment of Black soldiers and the course of the Civil War.",
      children: [
        {
          name: "54th Massachusetts Regiment",
          relationship: "Historic Black Regiment",
          detail: "Douglass helped recruit soldiers for this regiment, including his own sons, proving Black men's valor in battle.",
        },
      ],
    },
    {
      name: "John Brown",
      relationship: "Radical Ally",
      detail: "Brown tried to recruit Douglass for the Harpers Ferry raid. Douglass declined, believing it would fail, but respected Brown's conviction.",
    },
    {
      name: "William Lloyd Garrison",
      relationship: "Early Mentor",
      detail: "Garrison mentored Douglass early in his career, though they later split over strategy—Douglass embraced political action while Garrison favored moral suasion.",
    },
  ],
  "Rosa Parks": [
    {
      name: "Martin Luther King Jr.",
      relationship: "Movement Partner",
      detail: "Parks's arrest led to the Montgomery Bus Boycott, which King led, launching both into the national spotlight.",
    },
    {
      name: "Claudette Colvin",
      relationship: "Predecessor in Resistance",
      detail: "Colvin refused to give up her seat nine months before Parks. NAACP leaders chose Parks's case for its strategic legal challenge.",
    },
    {
      name: "E.D. Nixon",
      relationship: "NAACP Mentor",
      detail: "Nixon, head of the local NAACP, recognized Parks's arrest as the ideal test case and organized the boycott response.",
    },
    {
      name: "Septima Clark",
      relationship: "Education Activist",
      detail: "Clark's Citizenship Schools trained activists like Parks at the Highlander Folk School, where Parks studied weeks before her arrest.",
    },
  ],
  "W.E.B. Du Bois": [
    {
      name: "Booker T. Washington",
      relationship: "Ideological Rival",
      detail: "Du Bois challenged Washington's accommodationist approach, arguing for immediate full civil rights and higher education for Black Americans.",
    },
    {
      name: "Ida B. Wells",
      relationship: "Co-founder of NAACP",
      detail: "Wells and Du Bois co-founded the NAACP. Her anti-lynching crusade aligned with Du Bois's fight against systemic racism.",
      children: [
        {
          name: "Mary Church Terrell",
          relationship: "Activist & Educator",
          detail: "Terrell co-founded the National Association of Colored Women and worked alongside Wells and Du Bois in the early NAACP.",
        },
      ],
    },
    {
      name: "Marcus Garvey",
      relationship: "Pan-African Counterpart",
      detail: "Though they clashed on strategy, both championed Pan-Africanism. Garvey's mass movement and Du Bois's intellectual leadership shaped Black identity.",
    },
    {
      name: "Langston Hughes",
      relationship: "Harlem Renaissance Voice",
      detail: "Du Bois published Hughes's early work in 'The Crisis' magazine, nurturing the Harlem Renaissance movement.",
    },
  ],
};

// Color palette for bubbles using HSL values from the design system theme
const bubbleColors = [
  "hsl(42 85% 55%)",    // gold/primary
  "hsl(25 60% 40%)",    // accent/warm
  "hsl(200 60% 45%)",   // blue
  "hsl(140 45% 40%)",   // green
  "hsl(15 70% 50%)",    // orange
  "hsl(280 40% 50%)",   // purple
  "hsl(340 50% 45%)",   // rose
  "hsl(180 45% 40%)",   // teal
];

const childBubbleColors = [
  "hsl(42 70% 45%)",
  "hsl(200 50% 38%)",
  "hsl(140 35% 35%)",
  "hsl(15 55% 42%)",
];

interface BubbleNodeProps {
  node: Connection;
  color: string;
  size: "lg" | "md" | "sm";
  selected: Connection | null;
  onSelect: (node: Connection | null) => void;
}

const sizeClasses = {
  lg: "w-28 h-28 md:w-36 md:h-36",
  md: "w-20 h-20 md:w-24 md:h-24",
  sm: "w-16 h-16 md:w-20 md:h-20",
};

const textSizeClasses = {
  lg: "text-xs md:text-sm",
  md: "text-[10px] md:text-xs",
  sm: "text-[9px] md:text-[10px]",
};

const BubbleNode = ({ node, color, size, selected, onSelect }: BubbleNodeProps) => {
  const isSelected = selected?.name === node.name;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onSelect(isSelected ? null : node);
      }}
      className={`rounded-full flex items-center justify-center text-center font-display font-bold leading-tight transition-all duration-500 cursor-pointer ${sizeClasses[size]} ${textSizeClasses[size]}`}
      style={{
        backgroundColor: color,
        color: "hsl(40 30% 95%)",
        boxShadow: isSelected
          ? `0 0 0 3px hsl(42 85% 55%), 0 0 30px ${color}80`
          : `0 4px 15px ${color}40`,
        transform: isSelected ? "scale(1.15)" : "scale(1)",
      }}
    >
      <span className="px-2 drop-shadow-md">{node.name}</span>
    </button>
  );
};

interface ConnectionTreeProps {
  figureName: string;
  onClose: () => void;
}

const ConnectionTree = ({ figureName, onClose }: ConnectionTreeProps) => {
  const connections = connectionData[figureName] || [];
  const [selectedNode, setSelectedNode] = useState<Connection | null>(null);

  // Split connections into left and right branches
  const mid = Math.ceil(connections.length / 2);
  const leftBranch = connections.slice(0, mid);
  const rightBranch = connections.slice(mid);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background/90 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto animate-fade-up">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-20 p-2 rounded-full bg-card border border-border hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center mb-6">
          <p className="text-primary font-body text-xs uppercase tracking-[0.2em]">
            Connection Tree
          </p>
        </div>

        {/* Tree layout */}
        <div className="relative flex flex-col items-center">
          {/* Trunk line */}
          <div className="absolute left-1/2 top-[140px] md:top-[170px] w-1 bg-gradient-to-b from-primary/60 to-primary/10 -translate-x-1/2"
            style={{ height: "calc(100% - 170px)" }}
          />

          {/* Root node */}
          <div
            className="relative z-10 w-32 h-32 md:w-44 md:h-44 rounded-full flex items-center justify-center text-center font-display font-bold shadow-gold"
            style={{
              background: "linear-gradient(135deg, hsl(42 85% 55%), hsl(42 90% 65%))",
              color: "hsl(30 10% 8%)",
            }}
          >
            <span className="px-3 text-sm md:text-lg leading-tight">{figureName}</span>
          </div>

          {/* Branches container */}
          <div className="relative w-full mt-8">
            {/* Branch lines (SVG) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 0 }}
            >
              {/* Left branches */}
              {leftBranch.map((_, i) => {
                const totalLeft = leftBranch.length;
                const xEnd = 15 + (i / Math.max(totalLeft - 1, 1)) * 25;
                const yEnd = 20 + i * (60 / Math.max(totalLeft, 1));
                return (
                  <line
                    key={`left-${i}`}
                    x1="50%"
                    y1="0"
                    x2={`${xEnd}%`}
                    y2={`${yEnd}%`}
                    stroke="hsl(42 85% 55% / 0.3)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                );
              })}
              {/* Right branches */}
              {rightBranch.map((_, i) => {
                const totalRight = rightBranch.length;
                const xEnd = 60 + (i / Math.max(totalRight - 1, 1)) * 25;
                const yEnd = 20 + i * (60 / Math.max(totalRight, 1));
                return (
                  <line
                    key={`right-${i}`}
                    x1="50%"
                    y1="0"
                    x2={`${xEnd}%`}
                    y2={`${yEnd}%`}
                    stroke="hsl(42 85% 55% / 0.3)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                );
              })}
            </svg>

            {/* Bubble grid */}
            <div className="relative z-10 grid grid-cols-2 gap-y-6">
              {/* Left side */}
              <div className="flex flex-col items-center gap-4 pr-4">
                {leftBranch.map((conn, i) => (
                  <div key={conn.name} className="flex flex-col items-center gap-3">
                    <BubbleNode
                      node={conn}
                      color={bubbleColors[i % bubbleColors.length]}
                      size="lg"
                      selected={selectedNode}
                      onSelect={setSelectedNode}
                    />
                    {/* Child bubbles */}
                    {conn.children && conn.children.length > 0 && (
                      <div className="flex gap-3 flex-wrap justify-center">
                        {conn.children.map((child, ci) => (
                          <BubbleNode
                            key={child.name}
                            node={child}
                            color={childBubbleColors[ci % childBubbleColors.length]}
                            size="sm"
                            selected={selectedNode}
                            onSelect={setSelectedNode}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Right side */}
              <div className="flex flex-col items-center gap-4 pl-4">
                {rightBranch.map((conn, i) => (
                  <div key={conn.name} className="flex flex-col items-center gap-3">
                    <BubbleNode
                      node={conn}
                      color={bubbleColors[(i + mid) % bubbleColors.length]}
                      size="md"
                      selected={selectedNode}
                      onSelect={setSelectedNode}
                    />
                    {conn.children && conn.children.length > 0 && (
                      <div className="flex gap-3 flex-wrap justify-center">
                        {conn.children.map((child, ci) => (
                          <BubbleNode
                            key={child.name}
                            node={child}
                            color={childBubbleColors[(ci + 2) % childBubbleColors.length]}
                            size="sm"
                            selected={selectedNode}
                            onSelect={setSelectedNode}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detail panel */}
          {selectedNode && (
            <div className="mt-8 w-full max-w-lg mx-auto bg-card border border-border rounded-xl p-6 animate-fade-up shadow-gold">
              <h4 className="font-display font-bold text-foreground text-lg">
                {selectedNode.name}
              </h4>
              <p className="text-primary text-sm font-body mt-1">
                {selectedNode.relationship}
              </p>
              <p className="text-muted-foreground font-body text-sm mt-3 leading-relaxed">
                {selectedNode.detail}
              </p>
            </div>
          )}

          {/* Ground / base */}
          <div className="w-full mt-8 h-3 rounded-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default ConnectionTree;
