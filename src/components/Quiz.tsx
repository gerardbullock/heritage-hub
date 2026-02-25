import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";

const questions = [
  {
    question: "Who led hundreds of enslaved people to freedom via the Underground Railroad?",
    options: ["Sojourner Truth", "Harriet Tubman", "Frederick Douglass", "Ida B. Wells"],
    correct: 1,
    fact: "Harriet Tubman made 13 missions and rescued approximately 70 enslaved people, earning her the name 'Moses.'",
    moreFacts: [
      { label: "What is the Underground Railroad?", detail: "The Underground Railroad was a secret network of routes, safe houses, and allies used by enslaved African Americans to escape to free states and Canada between the late 1700s and the Civil War. It wasn't an actual railroad — the name was code. 'Conductors' guided escapees, 'stations' were safe houses, and 'passengers' were those seeking freedom." },
      { label: "What is an abolitionist?", detail: "An abolitionist was someone who fought to end slavery. Abolitionists included formerly enslaved people, free Black Americans, and white allies who used speeches, newspapers, legal challenges, and direct action to dismantle the institution of slavery." },
      { label: "Who was John Brown?", detail: "John Brown (1800–1859) was a white abolitionist who believed armed insurrection was the only way to end slavery. He led the famous raid on Harpers Ferry, Virginia in 1859, attempting to seize weapons and start a slave revolt. He was captured and executed, but his actions galvanized the anti-slavery movement and deepened the divide leading to the Civil War." },
      { label: "Other notable abolitionists", detail: "Frederick Douglass escaped slavery and became the most prominent Black abolitionist through powerful speeches and his autobiography. Sojourner Truth advocated for both abolition and women's rights. William Lloyd Garrison published 'The Liberator,' a leading anti-slavery newspaper. Harriet Beecher Stowe wrote 'Uncle Tom's Cabin,' which turned public opinion against slavery." },
    ],
  },
  {
    question: "In what year did the March on Washington take place, where Dr. King gave his 'I Have a Dream' speech?",
    options: ["1955", "1960", "1963", "1968"],
    correct: 2,
    fact: "Over 250,000 people gathered at the Lincoln Memorial on August 28, 1963.",
    moreFacts: [
      { label: "Who organized the March?", detail: "A. Philip Randolph and Bayard Rustin were the chief organizers. Randolph, a labor leader, first proposed a march in 1941. Rustin, a brilliant strategist and openly gay activist, handled the logistics of bringing 250,000+ people to Washington in just two months." },
      { label: "What did the March demand?", detail: "The official name was the 'March on Washington for Jobs and Freedom.' It demanded civil rights legislation, desegregation of schools, an end to police brutality, a federal works program, and a $2 minimum wage (about $20 today)." },
      { label: "What impact did it have?", detail: "The March helped build momentum for the Civil Rights Act of 1964 and the Voting Rights Act of 1965. It demonstrated the power of peaceful mass protest and remains one of the largest political rallies in American history." },
    ],
  },
  {
    question: "Who was the first Black woman to win an Academy Award for Best Actress?",
    options: ["Viola Davis", "Halle Berry", "Whoopi Goldberg", "Cicely Tyson"],
    correct: 1,
    fact: "Halle Berry won the Oscar in 2002 for her role in 'Monster's Ball.'",
    moreFacts: [
      { label: "Why was this historic?", detail: "It took 74 years of Academy Award history before a Black woman won Best Actress. Hattie McDaniel was the first Black person to win any Oscar in 1940 for 'Gone with the Wind,' but she had to sit at a segregated table at the ceremony." },
      { label: "Who else broke barriers?", detail: "Sidney Poitier became the first Black man to win Best Actor in 1964. Whoopi Goldberg won Best Supporting Actress in 1991. Viola Davis won Best Supporting Actress in 2017 and has won the 'Triple Crown of Acting' (Oscar, Emmy, Tony)." },
    ],
  },
  {
    question: "Which organization did W.E.B. Du Bois co-found in 1909?",
    options: ["SCLC", "SNCC", "NAACP", "Urban League"],
    correct: 2,
    fact: "The NAACP (National Association for the Advancement of Colored People) remains one of the oldest civil rights organizations in the U.S.",
    moreFacts: [
      { label: "Who was W.E.B. Du Bois?", detail: "William Edward Burghardt Du Bois (1868–1963) was a sociologist, historian, and activist. He was the first African American to earn a Ph.D. from Harvard. He championed the 'Talented Tenth' philosophy — that educated Black leaders would uplift the race — and clashed with Booker T. Washington's more accommodationist approach." },
      { label: "What does the NAACP do?", detail: "The NAACP uses legal action, lobbying, and public education to fight racial discrimination. Its Legal Defense Fund, led by Thurgood Marshall, won the landmark Brown v. Board of Education case in 1954. Today it continues to advocate for voting rights, criminal justice reform, and economic equality." },
      { label: "Other civil rights organizations", detail: "SCLC (1957) was founded by Dr. King to coordinate nonviolent protests. SNCC (1960) was a student-led organization behind sit-ins and Freedom Rides. The National Urban League (1910) focused on economic empowerment and job opportunities for Black Americans." },
    ],
  },
  {
    question: "Rosa Parks' refusal to give up her bus seat sparked which historic event?",
    options: ["Selma March", "Montgomery Bus Boycott", "Freedom Rides", "Sit-in Movement"],
    correct: 1,
    fact: "Nine months before Rosa Parks, 15-year-old Claudette Colvin was the first person to refuse to give up her seat on a Montgomery bus. The subsequent Montgomery Bus Boycott lasted 381 days and ended with a Supreme Court ruling that bus segregation was unconstitutional.",
    moreFacts: [
      { label: "Who was Claudette Colvin?", detail: "Claudette Colvin was just 15 years old when she refused to give up her seat on March 2, 1955 — nine months before Rosa Parks. Civil rights leaders initially didn't rally around her case because she was a teenager and became pregnant. She was one of four plaintiffs in Browder v. Gayle, the case that ultimately ended bus segregation." },
      { label: "How did the boycott work?", detail: "Black residents of Montgomery organized carpools, walked miles to work, and used Black-owned taxis that charged bus fare prices. Churches coordinated transportation. The boycott cost the bus system significant revenue and lasted 381 days until the Supreme Court ruled segregated buses unconstitutional." },
      { label: "What were Freedom Rides?", detail: "In 1961, interracial groups rode buses into the segregated South to challenge non-enforcement of desegregation rulings. Riders faced violent mobs, firebombed buses, and beatings. Their courage forced the federal government to enforce desegregation of interstate travel." },
    ],
  },
  {
    question: "Who wrote the autobiography 'I Know Why the Caged Bird Sings'?",
    options: ["Toni Morrison", "Alice Walker", "Maya Angelou", "Zora Neale Hurston"],
    correct: 2,
    fact: "Published in 1969, it was the first nonfiction bestseller by an African American woman.",
    moreFacts: [
      { label: "Who was Maya Angelou?", detail: "Maya Angelou (1928–2014) was a poet, memoirist, actress, and civil rights activist. She worked with both Malcolm X and Dr. Martin Luther King Jr. In 1993, she became the first Black woman to read a poem at a presidential inauguration, delivering 'On the Pulse of Morning' for Bill Clinton." },
      { label: "Other groundbreaking Black authors", detail: "Toni Morrison won the Nobel Prize in Literature in 1993 — the first Black woman to do so. Zora Neale Hurston's 'Their Eyes Were Watching God' (1937) is a masterpiece of the Harlem Renaissance. James Baldwin's essays and novels powerfully explored race and identity in America. Langston Hughes became a leading voice of the Harlem Renaissance through poetry and prose." },
    ],
  },
  {
    question: "What was the name of the 1954 Supreme Court case that declared school segregation unconstitutional?",
    options: ["Plessy v. Ferguson", "Brown v. Board of Education", "Dred Scott v. Sandford", "Loving v. Virginia"],
    correct: 1,
    fact: "Thurgood Marshall, who later became the first Black Supreme Court Justice, argued the case.",
    moreFacts: [
      { label: "What did Plessy v. Ferguson establish?", detail: "In 1896, the Supreme Court ruled in Plessy v. Ferguson that 'separate but equal' facilities were constitutional, legalizing segregation for nearly 60 years. In practice, facilities for Black Americans were always inferior. Brown v. Board overturned this doctrine." },
      { label: "Who was Thurgood Marshall?", detail: "Thurgood Marshall (1908–1993) was the lead attorney for the NAACP Legal Defense Fund and argued 32 cases before the Supreme Court, winning 29. In 1967, President Lyndon B. Johnson appointed him as the first African American Supreme Court Justice, where he served until 1991." },
      { label: "What happened after the ruling?", detail: "Despite the ruling, many states resisted desegregation for years. In 1957, nine Black students (the 'Little Rock Nine') needed federal troops to escort them into Central High School in Arkansas. Full desegregation took decades and remains an ongoing issue in American education." },
    ],
  },
  {
    question: "Who was the first African American president of the United States?",
    options: ["Colin Powell", "Barack Obama", "Jesse Jackson", "Shirley Chisholm"],
    correct: 1,
    fact: "Barack Obama served two terms from 2009 to 2017, making history as the 44th president.",
    moreFacts: [
      { label: "Who paved the way?", detail: "Shirley Chisholm became the first Black woman elected to Congress in 1968 and the first Black candidate for a major party's presidential nomination in 1972. Jesse Jackson ran strong presidential campaigns in 1984 and 1988, winning several primaries and proving a Black candidate could compete nationally." },
      { label: "Key achievements of Obama's presidency", detail: "The Affordable Care Act expanded healthcare to millions. He ordered the operation that found Osama bin Laden. He appointed Sonia Sotomayor and Elena Kagan to the Supreme Court. His election inspired a generation and his presidency navigated the Great Recession recovery." },
    ],
  },
];

const Quiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);
  const [showMoreFacts, setShowMoreFacts] = useState(false);
  const [expandedFact, setExpandedFact] = useState<number | null>(null);

  const q = questions[currentQ];

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    if (index === q.correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (currentQ + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setAnswered(false);
      setShowMoreFacts(false);
      setExpandedFact(null);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setAnswered(false);
    setFinished(false);
  };

  const getOptionClass = (index: number) => {
    const base =
      "w-full text-left px-5 py-4 rounded-lg border font-body text-sm transition-all duration-300 ";
    if (!answered) {
      return (
        base +
        "border-border bg-card hover:border-primary/50 hover:bg-secondary/50 text-foreground cursor-pointer"
      );
    }
    if (index === q.correct) {
      return base + "border-green-500/60 bg-green-500/10 text-green-300";
    }
    if (index === selected && index !== q.correct) {
      return base + "border-destructive/60 bg-destructive/10 text-red-300";
    }
    return base + "border-border/50 bg-card/50 text-muted-foreground opacity-50";
  };

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <section id="quiz" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <p className="text-primary font-body text-sm uppercase tracking-[0.3em] mb-3">
            Quiz Complete
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-8">
            Your <span className="text-gold-gradient">Results</span>
          </h2>

          <div className="bg-card border border-border rounded-xl p-10">
            <div className="text-6xl font-display font-bold text-gold-gradient mb-2">
              {score}/{questions.length}
            </div>
            <p className="text-muted-foreground font-body mb-2">{percentage}% Correct</p>
            <p className="text-secondary-foreground font-body text-sm mb-8">
              {percentage >= 80
                ? "Outstanding! You're a true scholar of Black history. 🏆"
                : percentage >= 50
                ? "Great effort! Keep exploring and learning. 📖"
                : "Every journey starts somewhere. Keep discovering these powerful stories! ✊"}
            </p>

            <div className="w-full bg-muted rounded-full h-3 mb-8 overflow-hidden">
              <div
                className="h-full bg-gold-gradient rounded-full transition-all duration-1000"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <Button
              onClick={handleRestart}
              className="bg-gold-gradient text-primary-foreground font-body font-semibold hover:opacity-90"
            >
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quiz" className="py-24">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="text-center mb-12">
          <p className="text-primary font-body text-sm uppercase tracking-[0.3em] mb-3">
            Test Your Knowledge
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            History <span className="text-gold-gradient">Quiz</span>
          </h2>
        </div>

        <div className="bg-card border border-border rounded-xl p-8">
          {/* Progress */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-muted-foreground font-body text-xs uppercase tracking-wider">
              Question {currentQ + 1} of {questions.length}
            </span>
            <span className="text-primary font-body text-sm font-semibold">
              Score: {score}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5 mb-8 overflow-hidden">
            <div
              className="h-full bg-gold-gradient rounded-full transition-all duration-500"
              style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question */}
          <h3 className="text-lg md:text-xl font-display font-semibold text-foreground mb-6">
            {q.question}
          </h3>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={answered}
                className={getOptionClass(i)}
              >
                <span className="text-muted-foreground mr-3 font-semibold">
                  {String.fromCharCode(65 + i)}.
                </span>
                {opt}
              </button>
            ))}
          </div>

          {/* Fact & Next */}
          {answered && (
            <div className="animate-fade-up">
              <div className="bg-secondary/50 border border-border rounded-lg p-4 mb-4">
                <p className="text-primary text-xs uppercase tracking-wider font-body mb-1">
                  📖 Did You Know?
                </p>
                <p className="text-secondary-foreground font-body text-sm leading-relaxed">
                  {q.fact}
                </p>

                {/* More Facts Button */}
                {q.moreFacts && q.moreFacts.length > 0 && (
                  <div className="mt-3">
                    <button
                      onClick={() => {
                        setShowMoreFacts(!showMoreFacts);
                        setExpandedFact(null);
                      }}
                      className="flex items-center gap-1.5 text-primary font-body text-xs uppercase tracking-wider font-semibold hover:opacity-80 transition-opacity"
                    >
                      {showMoreFacts ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                      More Facts
                    </button>

                    {showMoreFacts && (
                      <div className="mt-3 space-y-2 animate-fade-up">
                        {q.moreFacts.map((mf, i) => (
                          <div key={i} className="border border-border/50 rounded-lg overflow-hidden">
                            <button
                              onClick={() => setExpandedFact(expandedFact === i ? null : i)}
                              className="w-full flex items-center gap-2 px-3 py-2.5 text-left hover:bg-secondary/30 transition-colors"
                            >
                              {expandedFact === i ? (
                                <ChevronDown className="w-3.5 h-3.5 text-primary shrink-0" />
                              ) : (
                                <ChevronRight className="w-3.5 h-3.5 text-primary shrink-0" />
                              )}
                              <span className="text-foreground font-body text-sm font-medium">
                                {mf.label}
                              </span>
                            </button>
                            {expandedFact === i && (
                              <div className="px-3 pb-3 pl-8 animate-fade-up">
                                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                                  {mf.detail}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="text-right">
                <Button
                  onClick={handleNext}
                  className="bg-gold-gradient text-primary-foreground font-body font-semibold hover:opacity-90"
                >
                  {currentQ + 1 >= questions.length ? "See Results" : "Next Question →"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Quiz;
