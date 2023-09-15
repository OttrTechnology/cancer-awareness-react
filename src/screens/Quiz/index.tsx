import { Header, GameActions } from "./components";
import { useGameContext } from "hooks";
import { useEffect, useRef } from "react";
import { Question } from "screens/Quiz/Question";
import { Result } from "screens/Quiz/Result";
import gsap from "gsap";

export const Quiz = () => {
  const { activeQuizIndex, activeScreen } = useGameContext();
  const quizRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (activeScreen === "TRANSITIONING_FROM_QUIZ") {
        gsap.to(quizRef.current, { autoAlpha: 0, duration: 1 });
      } else if (activeScreen === "QUIZ") {
        gsap.to(quizRef.current, { autoAlpha: 1, duration: 1 });
      }
    });

    return () => ctx.revert();
  }, [activeScreen]);

  return (
    <div
      className="ca-min-h-screen flex flex-col justify-between content-center flex-wrap ca-gap--16"
      ref={quizRef}
    >
      <Header />
      {activeQuizIndex === "QUESTION" ? <Question /> : <Result />}
      <GameActions />
    </div>
  );
};
