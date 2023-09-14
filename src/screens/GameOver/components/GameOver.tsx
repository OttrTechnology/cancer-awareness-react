import { useEffect, useRef } from "react";
import gsap from "gsap";
import gameOver from "assets/resultEmoji/gameover.svg";
import { useGameContext } from "hooks";
import styles from "./GameOver.module.scss";

export const GameOverAnimation = () => {
  const { remainingLives } = useGameContext();

  const gameOverRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gameOverRef.current,
        { autoAlpha: 1 },
        { autoAlpha: 0, duration: 1, delay: 2 }
      );
    });

    return () => ctx.revert();
  }, [remainingLives]);

  return (
    <>
      <div className={styles.gameOver} ref={gameOverRef}>
        <img className={styles.gameOverImg} src={gameOver} />
        <div className="ca-heading--one">Game Over !</div>
      </div>
    </>
  );
};
