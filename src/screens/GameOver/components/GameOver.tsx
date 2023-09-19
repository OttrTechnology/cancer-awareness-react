import { useEffect, useRef } from "react";
import { gsap, Cubic } from "gsap";
import clsx from "clsx";
import { useGameContext } from "hooks";

import GameOverEmoji from "assets/resultEmoji/game-over.svg";

import styles from "./index.module.scss";

export const GameOverAnimation = () => {
  const { remainingLives } = useGameContext();

  const gameOverRef = useRef(null);
  const gameOverEmojiRef = useRef(null);
  const gameOverTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        gameOverEmojiRef.current,
        { y: "-50px" },
        { y: 0, duration: 0.6, ease: "bounce.out" }
      )
        .fromTo(
          gameOverEmojiRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1 },
          "<"
        )
        .fromTo(
          gameOverTextRef.current,
          { y: 30 },
          { y: 0, duration: 0.6, ease: "bounce.out" },
          "<"
        )
        .fromTo(
          gameOverTextRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1 },
          "<"
        )
        .to(
          gameOverEmojiRef.current,
          { y: 30, delay: 0.8, autoAlpha: 0, ease: Cubic.easeOut },
          ">"
        )
        .to(
          gameOverTextRef.current,
          { y: 30, autoAlpha: 0, ease: Cubic.easeOut },
          "<"
        )
        .to(
          gameOverRef.current,
          {
            autoAlpha: 0,
            duration: 0,
          },
          ">"
        );
    });

    return () => ctx.revert();
  }, [remainingLives]);

  return (
    <div className={styles.wrapper} ref={gameOverRef}>
      <img className={styles.img} src={GameOverEmoji} ref={gameOverEmojiRef} />

      <div
        className={clsx("ca-heading--one", styles.gameOverText)}
        ref={gameOverTextRef}
      >
        Game Over!
      </div>
    </div>
  );
};
