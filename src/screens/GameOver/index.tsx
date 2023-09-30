import { useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { gsap, Cubic } from "gsap";
import { useBoolean, useWindowSize } from "usehooks-ts";
import { useGameContext } from "hooks";
import { Button } from "components";

import TrophyImg from "assets/trophy.svg";

import {
  Share,
  GameOverAnimation,
  CongratulationsAnimation,
} from "./components";
import styles from "./index.module.scss";

/**
 * Calculates the amount of confetti to show when score meets certain thresholds.
 * Reduces the amount by half for mobile views.
 */
const getConfettiPieces = (currentScore: number, isMobile: boolean) => {
  if (currentScore === 0) {
    return 0;
  } else if (currentScore <= 40) {
    return isMobile ? 20 / 2 : 20;
  } else if (currentScore > 40 && currentScore <= 80) {
    return isMobile ? 70 / 2 : 70;
  } else if (currentScore > 80 && currentScore <= 120) {
    return isMobile ? 120 / 2 : 120;
  } else if (currentScore > 120 && currentScore <= 160) {
    return isMobile ? 170 / 2 : 170;
  } else if (currentScore > 160 && currentScore <= 200) {
    return isMobile ? 220 / 2 : 220;
  } else if (currentScore > 200 && currentScore <= 240) {
    return isMobile ? 270 / 2 : 270;
  } else if (currentScore > 240 && currentScore <= 280) {
    return isMobile ? 320 / 2 : 320;
  } else if (currentScore > 280 && currentScore <= 320) {
    return isMobile ? 370 / 2 : 370;
  } else if (currentScore > 320 && currentScore <= 360) {
    return isMobile ? 420 / 2 : 420;
  } else {
    return isMobile ? 500 / 2 : 500;
  }
};

export const GameOver = () => {
  const { currentScore, highScore, handlePlayAgain, remainingLives } =
    useGameContext();

  const { width, height } = useWindowSize();

  const { value: share, toggle } = useBoolean(false);

  const gameOverRef = useRef(null);
  const trophyRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(gameOverRef.current, {
        autoAlpha: 0,
        delay: 1.7,
        duration: 0.6,
        ease: Cubic.easeOut,
      })
        .fromTo(trophyRef.current, { y: 30 }, { y: 0 }, "<")
        .fromTo(buttonRef.current, { y: 30 }, { y: 0 }, "<");
    });

    return () => ctx.revert();
  }, [remainingLives]);

  return (
    <div>
      <Confetti
        width={width}
        height={height}
        numberOfPieces={getConfettiPieces(currentScore, width <= 640)}
      />

      <div className="relative ca-min-h-screen flex flex-col justify-center overflow-hidden">
        {remainingLives === 0 ? (
          <GameOverAnimation />
        ) : (
          <CongratulationsAnimation />
        )}

        <div className="flex justify-center" ref={gameOverRef}>
          <div className={styles.container}>
            <div className={styles.innerContainer}>
              <img
                ref={trophyRef}
                src={TrophyImg}
                alt="Trophy"
                className={styles.image}
              />

              <div className="flex flex-col ca-gap--32 lg:ca-gap--40">
                <div className="flex flex-col">
                  <div className="ca-mb--8">
                    <div className="ca-heading--three ">
                      {currentScore === highScore ? "You've just set a new record!" : "Appreciate your effort"}
                    </div>
                  </div>
                  <div className="ca-body--sm ca-text--black-70">
                    {currentScore === highScore
                      ? "Appreciate your effort."
                      : "Keep going! Beat your high score."}
                  </div>
                </div>

                <div className="flex justify-center ca-gap--48 lg:ca-gap--80">
                  <div className="flex flex-col ca-gap--6 lg:ca-gap--4">
                    <div className={styles.score}>{currentScore}</div>
                    <div className="ca-body--md ca-text--black-80">
                      Your Score
                    </div>
                  </div>

                  <div className="flex flex-col ca-gap--6 lg:ca-gap--4">
                    <div className={styles.score}>{highScore}</div>
                    <div className="ca-body--md ca-text--black-80">
                      High Score
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="flex flex-col md:flex-row items-center justify-center ca-gap--16 md:ca-gap--32"
              ref={buttonRef}
            >
              <Button
                label="Share Your Score"
                color="primary"
                size="fixed-width"
                onClick={toggle}
              />

              <Button
                label="Try Again"
                size="fixed-width"
                onClick={handlePlayAgain}
              />
            </div>
          </div>
        </div>
        {share && <Share toggleShare={toggle} />}
      </div>
    </div>
  );
};
