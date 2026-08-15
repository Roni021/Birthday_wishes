"use client";

import { useState } from "react";
import { birthdayData } from "@/lib/birthdayData";
import Reveal from "@/components/Reveal";
import { launchConfetti } from "@/lib/effectsBus";

const RESULT_TITLES = ["Aww, Keep Guessing 💭", "Getting There! 🌸", "Pretty Close! 💫", "Birthday Expert! 🏆❤️"];

export default function Quiz() {
  const quizData = birthdayData.quiz;
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const item = quizData[index];

  const handleAnswer = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    const correct = i === item.correct;
    if (correct) setScore((s) => s + 1);
    setTimeout(() => {
      if (index + 1 < quizData.length) {
        setIndex((idx) => idx + 1);
        setSelected(null);
      } else {
        setFinished(true);
        const finalScore = correct ? score + 1 : score;
        launchConfetti(finalScore >= 4 ? 100 : 50);
      }
    }, 900);
  };

  const resultIdx = Math.min(Math.floor((score / quizData.length) * 4), 3);

  return (
    <section id="quiz-section" className="section">
      <div className="container center">
        <Reveal as="p" className="eyebrow">
          Just For Fun
        </Reveal>
        <Reveal as="h2" className="section-title">
          How Well Do You Know Your Birthday Story?
        </Reveal>

        {!finished ? (
          <Reveal as="div" className="quiz-box glass" threshold={0.15} id="quiz-box">
            <p className="quiz-progress" id="quiz-progress">
              Question {index + 1} of {quizData.length}
            </p>
            <p className="quiz-q" id="quiz-q">
              {item.q}
            </p>
            <div className="quiz-opts" id="quiz-opts">
              {item.opts.map((opt, i) => {
                let cls = "quiz-opt";
                if (selected !== null) {
                  if (i === item.correct) cls += " correct";
                  else if (i === selected) cls += " wrong";
                }
                return (
                  <button key={opt} className={cls} disabled={selected !== null} onClick={() => handleAnswer(i)}>
                    {opt}
                  </button>
                );
              })}
            </div>
          </Reveal>
        ) : (
          <div
            className="quiz-result glass show"
            id="quiz-result"
            style={{ maxWidth: 560, margin: "0 auto", padding: 34, borderRadius: 18 }}
          >
            <p className="eyebrow">Your Result</p>
            <h3 id="quiz-score-title">{RESULT_TITLES[resultIdx]}</h3>
            <p id="quiz-score-sub" style={{ color: "#E4D6F0", fontWeight: 300 }}>
              You scored {score} out of {quizData.length}.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
