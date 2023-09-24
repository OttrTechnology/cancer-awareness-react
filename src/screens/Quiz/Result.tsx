import { useEffect } from "react";
import { clsx } from "clsx";
import { useGameContext } from "hooks";

import CorrectEmoji from "assets/resultEmoji/right.png";
import WrongEmoji from "assets/resultEmoji/wrong.png";
import GameOverEmoji from "assets/resultEmoji/game-over.svg";
import CongratulationEmoji from "assets/resultEmoji/congratulations.svg";

import styles from "./Result.module.scss";

export const Result = () => {
  const { currentQuestion, userAnswer, nextQuestion, remainingLives } =
    useGameContext();

  const isUserCorrect = Boolean(currentQuestion.fact === userAnswer);

  useEffect(() => {
    // Preloading next quiz image if lives are remaining and next question exists
    if (remainingLives > 0 && nextQuestion) {
      const nextImg = new Image();
      nextImg.src = `${import.meta.env.VITE_ILLUSTRATIONS_BASE_URL}/${
        nextQuestion.imgSrc
      }`;
    }
    // Preloading congratulation image when win condition has been reached
    else if (remainingLives > 0 && nextQuestion === undefined) {
      const congratulationEmoji = new Image();
      congratulationEmoji.src = CongratulationEmoji;
    }
  }, [nextQuestion, remainingLives]);

  useEffect(() => {
    // Preloading game over image when all lives have been lost
    if (remainingLives === 0) {
      const gameOverEmoji = new Image();
      gameOverEmoji.src = GameOverEmoji;
    }
  }, [remainingLives]);

  const handleLearnMore = () => {
    if (
      import.meta.env.PROD &&
      import.meta.env.VITE_ENABLE_GOOGLE_ANALYTICS === "true"
    )
      window.gtag("event", "unlock_achievement", {
        achievement_id: "Curiosity-Spark",
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.body}>
          <img
            className={styles.image}
            src={isUserCorrect ? CorrectEmoji : WrongEmoji}
          />

          <div className="flex flex-col">
            <div className="ca-mb--8">
              <div
                className={clsx(
                  isUserCorrect ? styles.correctAnswer : styles.wrongAnswer
                )}
              >
                {isUserCorrect ? "Correct Answer" : "Wrong Answer"}
              </div>
            </div>

            <div className="ca-mb--24">
              <div className="ca-body--sm ca-text--black-70">
                {isUserCorrect
                  ? `That${"\u2019"}s great. Keep going`
                  : `It${"\u2019"}s not the end. Try again.`}
              </div>
            </div>

            <div className="ca-mb--32">
              <p className="ca-body--md ca-text--black-80">
                {currentQuestion.explanation}
              </p>
            </div>

            <a
              className="ca-misc--link"
              target="_blank"
              href={currentQuestion.source}
              rel="noreferrer"
              onClick={handleLearnMore}
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
