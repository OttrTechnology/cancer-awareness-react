import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGameContext } from "hooks";

import { Question } from "screens/Quiz/Question";
import { Result } from "screens/Quiz/Result";

import { Header, GameActions } from "./components";

export const Quiz = () => {
  const { activeQuizScreen, activeScreen } = useGameContext();

  const quizRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (activeScreen === "TRANSITIONING_FROM_QUIZ") {
        gsap.to(quizRef.current, { autoAlpha: 0, duration: 0.7 });
      } else if (activeScreen === "QUIZ") {
        gsap.to(quizRef.current, { autoAlpha: 1, duration: 0.7 });
      }
    });

    return () => ctx.revert();
  }, [activeScreen]);

  return (
    <div
      ref={quizRef}
      className="ca-min-h-screen flex flex-col justify-between content-center flex-wrap ca-gap--16"
    >
      <Header />

      {activeQuizScreen === "QUESTION" ? <Question /> : <Result />}

      <GameActions />
    </div>
  );
};
