import { useEffect, useRef } from "react";
import gsap from "gsap";
import gameOver from "assets/resultEmoji/gameover.svg";
import { useGameContext } from "hooks";
import styles from "./index.module.scss";
import clsx from "clsx";

export const GameOverAnimation = () => {
  const { remainingLives } = useGameContext();

  const gameOverRef = useRef(null);
  const gameOverEmojiRef = useRef(null);
  const gameOverTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(gameOverRef.current, { autoAlpha: 0, duration: 2.5 });
      gsap.fromTo(
        gameOverEmojiRef.current,
        { y: -150 },
        { y: 0, duration: 0.3, ease: "bounce.out" }
      );
      gsap.fromTo(
        gameOverTextRef.current,
        { y: 150 },
        { y: 0, duration: 0.3, ease: "bounce.out" }
      );
    });

    return () => ctx.revert();
  }, [remainingLives]);

  return (
    <>
      <div className={styles.wrapper} ref={gameOverRef}>
        <img className={styles.img} src={gameOver} ref={gameOverEmojiRef} />
        <div
          className={clsx("ca-heading--one", styles.gameOverText)}
          ref={gameOverTextRef}
        >
          Game Over!
        </div>
      </div>
    </>
  );
};
