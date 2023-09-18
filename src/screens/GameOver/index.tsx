import { useBoolean, useWindowSize } from "usehooks-ts";
import { useGameContext } from "hooks";
import { Button } from "components";
import trophy from "assets/trophy.svg";
import Confetti from "react-confetti";
import { useEffect, useRef } from "react";
import { gsap, Cubic } from "gsap";
import {
  Share,
  GameOverAnimation,
  CongratulationsAnimation,
} from "./components";
import styles from "./index.module.scss";

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
        delay: 1.2,
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
        numberOfPieces={currentScore * 3}
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
                className={styles.image}
                src={trophy}
                alt={trophy}
                ref={trophyRef}
              />

              <div className="flex flex-col ca-gap--32 lg:ca-gap--40">
                <div className="flex flex-col">
                  <div className="ca-mb--8">
                    <div className="ca-heading--three ">
                      Appreciate your effort
                    </div>
                  </div>
                  <div className="ca-body--sm ca-text--black-70">
                    Try again! Beat your high score.
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
                onClick={toggle}
                label="Share Your Score"
                color="primary"
                size="fixed-width"
              />

              <Button
                size="fixed-width"
                onClick={handlePlayAgain}
                label="Try Again"
              />
            </div>
          </div>
        </div>
        {share && <Share toggleShare={toggle} />}
      </div>
    </div>
  );
};
