import { useEffect, useRef } from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import {
  BiLogoTwitter,
  BiLogoFacebook,
  BiLink,
  BiLogoLinkedin,
} from "react-icons/bi";
import {
  Bodies,
  Composite,
  Engine,
  Mouse,
  MouseConstraint,
  Render,
  Runner,
} from "matter-js";
import { useWindowSize } from "usehooks-ts";
import { gsap } from "gsap";
import clsx from "clsx";

import { useGameContext } from "hooks";

import LandingPageArrow from "assets/homepageArrow.svg";
import LandingLogo from "assets/homeLogo.svg";
import RightEmoji from "assets/resultEmoji/right.png";
import WrongEmoji from "assets/resultEmoji/wrong.png";

import data from "context/cancer-findings-data.json";
import styles from "./index.module.scss";

const { fillStyle, strokeStyle } = styles;

export const Landing = () => {
  const { activeScreen, setActiveScreen, handleCopyLink, copied } =
    useGameContext();

  const { width, height } = useWindowSize();

  const mainRef = useRef<HTMLDivElement>(null);

  const canvasRef = useRef(null);
  const engineRef = useRef(Engine.create());
  const sceneRef = useRef(null);

  const startQuiz = () => {
    // preloading emoji for result
    const resultEmojiRight = new Image();
    resultEmojiRight.src = RightEmoji;

    const resultEmojiWrong = new Image();
    resultEmojiWrong.src = WrongEmoji;

    setActiveScreen({
      location: "QUIZ",
      transition: "TRANSITION_FROM_LANDING",
      duration: 0.3,
    });
  };

  useEffect(() => {
    const render = Render.create({
      element: sceneRef.current || undefined,
      engine: engineRef.current,
      canvas: canvasRef.current || undefined,
      options: { width, height, wireframes: false, background: "transparent" },
    });

    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: document.body.offsetWidth, y: document.body.offsetHeight },
    });

    Composite.add(engineRef.current.world, [
      Bodies.rectangle(-120, height / 2, 20 + 180, height + 10, {
        isStatic: true,
        render: { fillStyle, strokeStyle, lineWidth: 3 },
      }),
      Bodies.rectangle(width / 2, height + 40, width + 120, 90, {
        isStatic: true,
        render: { fillStyle, strokeStyle, lineWidth: 3 },
      }),
      Bodies.rectangle(width + 80, height / 2, 120, height, {
        isStatic: true,
        render: { fillStyle, strokeStyle, lineWidth: 3 },
      }),
    ]);

    data
      .sort(() => 0.5 - Math.random())
      .slice(0, width / 90)
      .forEach((quizItem, index) => {
        Composite.add(engineRef.current.world, [
          Bodies.circle(width / 2, -100 * index, 60, {
            density: 0.001,
            frictionAir: 0.02,
            frictionStatic: 0.5,
            restitution: 0.6,
            friction: 0.1,
            render: {
              sprite: {
                texture: `${import.meta.env.VITE_ILLUSTRATIONS_BASE_URL}/${
                  quizItem.imgSrc
                }`,
                xScale: 0.5,
                yScale: 0.5,
              },
            },
          }),
        ]);
      });

    const mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engineRef.current, {
        mouse,
        constraint: { stiffness: 0.2, render: { visible: false } },
      });
    Composite.add(engineRef.current.world, mouseConstraint);
    render.mouse = mouse;

    Runner.run(engineRef.current);
    Render.run(render);

    if (activeScreen === "TRANSITIONING_FROM_LANDING") {
      Composite.clear(engineRef.current.world, false);
    }

    return () => {
      Render.stop(render);
      Composite.clear(engineRef.current.world, false);
      Engine.clear(engineRef.current);

      render.canvas.remove();
      render.textures = {};
    };
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (activeScreen === "TRANSITIONING_FROM_LANDING") {
        gsap.to(mainRef.current, { autoAlpha: 0, duration: 0.3 });
      } else if (activeScreen === "LANDING") {
        gsap.to(mainRef.current, { autoAlpha: 1, duration: 0.3 });
      }
    });

    return () => ctx.revert();
  }, [activeScreen]);

  return (
    <div ref={mainRef}>
      {window.innerWidth > 640 && (
        <div ref={sceneRef} className="fixed w-full h-full">
          <canvas ref={canvasRef} />
        </div>
      )}

      <div className={styles.wrapper}>
        <div className="flex justify-center items-center h-screen lg:block relative mx-auto lg:ca-pt--120 pointer-events-none">
          <div className="lg:grid lg:grid-cols-10 ca-gap--24">
            <div className="lg:col-span-6 relative">
              <div className="flex items-end lg:ca-gap--8 ca-gap--4 ca-mb--24 lg:ca-mb--32 select-none">
                <img
                  src={LandingLogo}
                  alt="Ottr Logo"
                  className={styles.logo}
                />

                <span className={clsx(styles.logoTitle, "ca-text--black-80")}>
                  Presents
                </span>
              </div>

              <div className="ca-mb--16 select-none lg:ca-mb--24">
                <h1 className="ca-heading--one">Cancer Insights Challenge</h1>
              </div>

              <div className="ca-mb--48 lg:ca-mb--64 select-none max-w-[27.625em]">
                <p className="ca-body--md ca-text--black-80">
                  Test your cancer knowledge and elevate your understanding of
                  the disease
                </p>
              </div>

              <div className="flex items-center ca-gap--24 lg:ca-gap--16 pointer-events-auto select-none">
                <span className="ca-body--sm">Share</span>

                <div className="flex ca-gap--24 lg:ca-gap--12">
                  <button onClick={handleCopyLink} className="relative">
                    {copied && (
                      <div className={styles.copiedText}>Link copied</div>
                    )}

                    <BiLink className={styles.social} />
                  </button>

                  <LinkedinShareButton url={import.meta.env.VITE_BASE_URL}>
                    <BiLogoLinkedin className={styles.social} />
                  </LinkedinShareButton>

                  <FacebookShareButton url={import.meta.env.VITE_BASE_URL}>
                    <BiLogoFacebook className={styles.social} />
                  </FacebookShareButton>

                  <TwitterShareButton url={import.meta.env.VITE_BASE_URL}>
                    <BiLogoTwitter className={styles.social} />
                  </TwitterShareButton>
                </div>
              </div>
            </div>

            <div className="relative flex justify-end md:mr-32 lg:mr-0 col-start-7 mr-2 lg:col-start-8 col-span-3 mt-14 md:mt-4 lg:mt-auto pointer-events-auto">
              <button className={styles.primaryButton} onClick={startQuiz}>
                Take the quiz
              </button>

              <div className={styles.arrow}>
                <img
                  src={LandingPageArrow}
                  className={styles.arrow__img}
                  alt="arrow"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
