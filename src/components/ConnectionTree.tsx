import { X } from "lucide-react";

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

const TreeNode = ({
  node,
  depth = 0,
}: {
  node: Connection;
  depth?: number;
}) => {
  return (
    <div className="relative">
      {/* Connector line */}
      {depth > 0 && (
        <div className="absolute -left-6 top-0 bottom-0 w-px bg-border" />
      )}

      <div
        className={`relative group/node ml-${depth > 0 ? "6" : "0"} mb-3`}
        style={{ marginLeft: depth > 0 ? `${depth * 1.5}rem` : 0 }}
      >
        {/* Horizontal connector */}
        {depth > 0 && (
          <div className="absolute -left-6 top-5 w-6 h-px bg-primary/40" />
        )}

        {/* Node card */}
        <div className="bg-card border border-border rounded-lg p-4 hover:border-primary/40 transition-all duration-300">
          <div className="flex items-start gap-3">
            {/* Node indicator */}
            <div
              className={`mt-1 w-3 h-3 rounded-full shrink-0 ${
                depth === 0
                  ? "bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.5)]"
                  : "bg-muted-foreground/50"
              }`}
            />
            <div className="min-w-0">
              <h4 className="font-display font-bold text-foreground text-sm">
                {node.name}
              </h4>
              <p className="text-primary text-xs font-body mt-0.5">
                {node.relationship}
              </p>
              <p className="text-muted-foreground text-xs font-body mt-2 leading-relaxed">
                {node.detail}
              </p>
            </div>
          </div>
        </div>

        {/* Children */}
        {node.children && node.children.length > 0 && (
          <div className="relative mt-2 pl-4 border-l border-primary/20 ml-1.5">
            {node.children.map((child) => (
              <TreeNode key={child.name} node={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface ConnectionTreeProps {
  figureName: string;
  onClose: () => void;
}

const ConnectionTree = ({ figureName, onClose }: ConnectionTreeProps) => {
  const connections = connectionData[figureName] || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-2xl max-h-[85vh] bg-card border border-border rounded-2xl shadow-gold overflow-hidden animate-fade-up">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-primary font-body text-xs uppercase tracking-[0.2em]">
              Connection Tree
            </p>
            <h3 className="font-display font-bold text-foreground text-xl mt-1">
              {figureName}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tree content */}
        <div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)]">
          {connections.length > 0 ? (
            <div className="space-y-1">
              {connections.map((connection) => (
                <TreeNode key={connection.name} node={connection} depth={0} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8 font-body">
              Connection data coming soon.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConnectionTree;
