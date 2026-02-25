import { useState } from "react";
import { Button } from "@/components/ui/button";

const questions = [
  {
    question: "Who led hundreds of enslaved people to freedom via the Underground Railroad?",
    options: ["Sojourner Truth", "Harriet Tubman", "Frederick Douglass", "Ida B. Wells"],
    correct: 1,
    fact: "Harriet Tubman made 13 missions and rescued approximately 70 enslaved people, earning her the name 'Moses.'",
  },
  {
    question: "In what year did the March on Washington take place, where Dr. King gave his 'I Have a Dream' speech?",
    options: ["1955", "1960", "1963", "1968"],
    correct: 2,
    fact: "Over 250,000 people gathered at the Lincoln Memorial on August 28, 1963.",
  },
  {
    question: "Who was the first Black woman to win an Academy Award for Best Actress?",
    options: ["Viola Davis", "Halle Berry", "Whoopi Goldberg", "Cicely Tyson"],
    correct: 1,
    fact: "Halle Berry won the Oscar in 2002 for her role in 'Monster's Ball.'",
  },
  {
    question: "Which organization did W.E.B. Du Bois co-found in 1909?",
    options: ["SCLC", "SNCC", "NAACP", "Urban League"],
    correct: 2,
    fact: "The NAACP (National Association for the Advancement of Colored People) remains one of the oldest civil rights organizations in the U.S.",
  },
  {
    question: "Rosa Parks' refusal to give up her bus seat sparked which historic event?",
    options: ["Selma March", "Montgomery Bus Boycott", "Freedom Rides", "Sit-in Movement"],
    correct: 1,
    fact: "The Montgomery Bus Boycott lasted 381 days and ended with a Supreme Court ruling that bus segregation was unconstitutional.",
  },
  {
    question: "Who wrote the autobiography 'I Know Why the Caged Bird Sings'?",
    options: ["Toni Morrison", "Alice Walker", "Maya Angelou", "Zora Neale Hurston"],
    correct: 2,
    fact: "Published in 1969, it was the first nonfiction bestseller by an African American woman.",
  },
  {
    question: "What was the name of the 1954 Supreme Court case that declared school segregation unconstitutional?",
    options: ["Plessy v. Ferguson", "Brown v. Board of Education", "Dred Scott v. Sandford", "Loving v. Virginia"],
    correct: 1,
    fact: "Thurgood Marshall, who later became the first Black Supreme Court Justice, argued the case.",
  },
  {
    question: "Who was the first African American president of the United States?",
    options: ["Colin Powell", "Barack Obama", "Jesse Jackson", "Shirley Chisholm"],
    correct: 1,
    fact: "Barack Obama served two terms from 2009 to 2017, making history as the 44th president.",
  },
];

const Quiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

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
              <div className="bg-secondary/50 border border-border rounded-lg p-4 mb-6">
                <p className="text-primary text-xs uppercase tracking-wider font-body mb-1">
                  📖 Did You Know?
                </p>
                <p className="text-secondary-foreground font-body text-sm leading-relaxed">
                  {q.fact}
                </p>
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
