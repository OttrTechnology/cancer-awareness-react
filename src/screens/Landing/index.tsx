import { useEffect, useRef, useState } from "react";
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
  Body,
  Composite,
  Engine,
  Mouse,
  MouseConstraint,
  Render,
  Runner,
} from "matter-js";
import { useCountdown, useWindowSize } from "usehooks-ts";
import { gsap, Cubic } from "gsap";

import { useGameContext } from "hooks";

import LandingPageArrow from "assets/homepageArrow.svg";
import LandingLogo from "assets/homeLogo.svg";
import RightEmoji from "assets/resultEmoji/right.png";
import WrongEmoji from "assets/resultEmoji/wrong.png";

import data from "context/cancer-findings-data.json";
import styles from "./index.module.scss";
import { LoadingScreen } from "./components/LoadingScreen";

const { fillStyle, strokeStyle } = styles;

const randomQuizIllustrations = data
  .sort(() => 0.5 - Math.random())
  .slice(0, window.innerWidth / 90);

const getFibonacciSeries = (numOfTerms: number = 17) => {
  let fn1 = 0,
    fn2 = 1,
    nextFibonacci,
    series: number[] = [];

  for (let i = 1; i <= numOfTerms; i++) {
    series.push(fn1);
    nextFibonacci = fn1 + fn2;
    fn1 = fn2;
    fn2 = nextFibonacci;
  }

  return series;
};

export const Landing = () => {
  const {
    activeScreen,
    setActiveScreen,
    copied,
    handleCopyLink,
    registerShareEvent,
  } = useGameContext();

  const { width, height } = useWindowSize();

  const [count, { startCountdown }] = useCountdown({
    countStart: 2,
  });

  const [preloadedImageCounter, setPreloadedImageCounter] = useState(1);
  const [preloadedImagePercentage, setPreloadedImagePercentage] = useState(0);

  const mainRef = useRef<HTMLDivElement>(null);
  const landingPageRef = useRef(null);

  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef(Engine.create());
  const [scene, setScene] = useState<Render>();

  useEffect(() => {
    startCountdown();
  }, [startCountdown]);

  useEffect(() => {
    if (window.innerWidth > 640) {
      randomQuizIllustrations.forEach(({ imgSrc }) => {
        const randomQuizIllustrations = new Image();
        randomQuizIllustrations.src = `${
          import.meta.env.VITE_ILLUSTRATIONS_BASE_URL
        }/${imgSrc}`;

        randomQuizIllustrations.onload = () => {
          setPreloadedImageCounter((prev) => prev + 1);
        };
      });
    }
  }, []);

  /**
   * faking percentage for mobile
   */
  useEffect(() => {
    if (window.innerWidth < 640) {
      const timers: number[] = [];
      Array(4)
        .fill(0)
        .forEach((_, index) => {
          const timer = setTimeout(() => {
            setPreloadedImagePercentage((prev) => prev + 25);
          }, index * 100);
          timers.push(timer);
        });

      return () => {
        timers.forEach((timer) => clearTimeout(timer));
      };
    }
  }, []);

  /**
   * changing percentage according to images preloaded
   */
  useEffect(() => {
    if (window.innerWidth > 640) {
      // ? making sure the percentage is not above 100
      if (randomQuizIllustrations.length > preloadedImageCounter) {
        setPreloadedImagePercentage(
          (preloadedImageCounter / randomQuizIllustrations.length) * 100
        );
      } else {
        setPreloadedImagePercentage(100);
      }
    }
  }, [preloadedImageCounter]);

  /**
   * fading in landing page
   */
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: "(max-width: 639px)",
        isDesktop: "(min-width: 640px)",
      },
      (context) => {
        if (context.conditions) {
          const { isDesktop } = context.conditions;

          if (preloadedImagePercentage === 100 && count === 0) {
            gsap.fromTo(
              landingPageRef.current,
              { autoAlpha: 0 },
              {
                autoAlpha: 1,
                duration: 0.4,
                delay: isDesktop ? 3 : 0.3,
                ease: Cubic.easeOut,
              }
            );
          }
        }
      }
    );

    return () => mm.kill();
  }, [count, preloadedImagePercentage]);

  useEffect(() => {
    const engine = engineRef.current;

    const render = Render.create({
      element: boxRef.current ?? undefined,
      engine,
      canvas: canvasRef.current ?? undefined,
      options: { wireframes: false, background: "transparent" },
    });

    // ? see https://youtu.be/dbPixrR9mSw?si=zrOWfbUiN1xRQtHD&t=101
    const wallThickness = 60,
      wallOffset = wallThickness / 2;
    Composite.add(engineRef.current.world, [
      Bodies.rectangle(
        -wallOffset, // ? position wall offscreen
        window.innerHeight / 2,
        wallThickness,
        window.innerHeight,
        {
          label: "leftWall",
          isStatic: true,
          render: { fillStyle, strokeStyle, lineWidth: 1 },
        }
      ),
      Bodies.rectangle(
        window.innerWidth / 2,
        window.innerHeight + wallOffset,
        window.innerWidth,
        wallThickness,
        {
          label: "floor",
          isStatic: true,
          render: { fillStyle, strokeStyle, lineWidth: 1 },
        }
      ),
      Bodies.rectangle(
        window.innerWidth + wallOffset,
        window.innerHeight / 2,
        wallThickness,
        window.innerHeight,
        {
          label: "rightWall",
          isStatic: true,
          render: { fillStyle, strokeStyle, lineWidth: 1 },
        }
      ),
    ]);

    // add mouse interaction
    const mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engineRef.current, {
        mouse,
        constraint: { stiffness: 0.2, render: { visible: false } },
      });
    Composite.add(engineRef.current.world, mouseConstraint);
    render.mouse = mouse;

    Runner.run(engineRef.current); // run physics engine
    Render.run(render); // run renderer

    setScene(render);

    return () => {
      Render.stop(render);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, []);

  // add random quiz illustration circles
  useEffect(() => {
    const engine = engineRef.current;

    const timer = setTimeout(() => {
      let radius = 60;
      if (window.innerWidth > 1600) {
        radius = 70;
      } else if (window.innerWidth < 1200) {
        radius = 50;
      }

      const fibonacciSeries = getFibonacciSeries(
        randomQuizIllustrations.length > 17
          ? 17
          : randomQuizIllustrations.length
      );

      randomQuizIllustrations.forEach((quizItem, index) => {
        Composite.add(
          engine.world,
          Bodies.circle(
            window.innerWidth / (Math.random() * (4 - 1.333) + 1.333), // ? inner width divide by range 25% to 75%, see https://stackoverflow.com/a/1527820/10753343
            -(
              200 *
              (index + (index > 17 ? 610 : fibonacciSeries[index]) * 0.008)
            ),
            radius,
            {
              label: "quiz-item",
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
                  xScale: (radius * 2) / 240,
                  yScale: (radius * 2) / 240,
                },
              },
            }
          )
        );
      });
    }, 2800);
    return () => {
      clearInterval(timer);
      Composite.clear(engine.world, true);
    };
  }, []);

  useEffect(() => {
    if (scene) {
      const prevWallHeight = scene.canvas.height;
      const prevFloorLength = scene.canvas.width;

      scene.bounds.max.x = width;
      scene.bounds.max.y = height;
      scene.options.width = width;
      scene.options.height = height;
      scene.canvas.width = width;
      scene.canvas.height = height;

      const leftWallIndex = engineRef.current.detector.bodies.findIndex(
        (body) => body.label === "leftWall"
      );
      const floorIndex = engineRef.current.detector.bodies.findIndex(
        (body) => body.label === "floor"
      );
      const rightWallIndex = engineRef.current.detector.bodies.findIndex(
        (body) => body.label === "rightWall"
      );

      // resize and reposition leftWall
      if (leftWallIndex !== -1) {
        Body.setPosition(engineRef.current.detector.bodies[leftWallIndex], {
          x: -30,
          y: height / 2,
        });
        Body.scale(
          engineRef.current.detector.bodies[leftWallIndex],
          1,
          height / prevWallHeight
        );
      }

      // resize and reposition floor
      if (floorIndex !== -1) {
        Body.setPosition(engineRef.current.detector.bodies[floorIndex], {
          x: width / 2,
          y: height + 30,
        });
        Body.scale(
          engineRef.current.detector.bodies[floorIndex],
          width / prevFloorLength,
          1
        );
      }

      // resize and reposition rightWall
      if (rightWallIndex !== -1) {
        Body.setPosition(engineRef.current.detector.bodies[rightWallIndex], {
          x: width + 30,
          y: height / 2,
        });
        Body.scale(
          engineRef.current.detector.bodies[rightWallIndex],
          1,
          height / prevWallHeight
        );
      }
    }
  }, [scene, width, height]);

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

  /**
   * Reload window to conditionally render canvas for mobile
   */
  useEffect(() => {
    const handleResize = (event: UIEvent) => {
      const { innerWidth } = event.target as Window;
      if (innerWidth <= 640) window.location.reload();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const startQuiz = () => {
    // preloading emoji for result
    const resultEmojiRight = new Image();
    resultEmojiRight.src = RightEmoji;

    const resultEmojiWrong = new Image();
    resultEmojiWrong.src = WrongEmoji;

    if (scene) {
      const floorIndex = engineRef.current.detector.bodies.findIndex(
        (body) => body.label === "floor"
      );

      Composite.remove(
        engineRef.current.world,
        engineRef.current.detector.bodies[floorIndex]
      );
    }

    setActiveScreen({
      location: "QUIZ",
      transition: "TRANSITION_FROM_LANDING",
      duration: 0.3,
    });
  };

  return (
    <div ref={mainRef}>
      <LoadingScreen
        preloadedImagePercentage={preloadedImagePercentage}
        count={count}
      />

      {window.innerWidth > 640 && (
        <div ref={boxRef} className="fixed w-full h-full">
          <canvas ref={canvasRef} />
        </div>
      )}

      <div className={styles.wrapper} ref={landingPageRef}>
        <div className="flex justify-center items-center h-screen relative mx-auto pointer-events-none">
          <div className="lg:grid lg:ca-pb--180 lg:grid-cols-10 ca-gap--24">
            <div className="lg:col-span-6 relative">
              <div className="flex items-end lg:ca-gap--8 ca-gap--4 ca-mb--24 lg:ca-mb--32 select-none">
                <img
                  src={LandingLogo}
                  alt="Ottr Logo"
                  className={styles.logo}
                />
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

                  <LinkedinShareButton
                    url={import.meta.env.VITE_BASE_URL}
                    onClick={registerShareEvent("LinkedIn")}
                  >
                    <BiLogoLinkedin className={styles.social} />
                  </LinkedinShareButton>

                  <FacebookShareButton
                    url={import.meta.env.VITE_BASE_URL}
                    hashtag="#CancerAwareness"
                    onClick={registerShareEvent("Facebook")}
                  >
                    <BiLogoFacebook className={styles.social} />
                  </FacebookShareButton>

                  <TwitterShareButton
                    url={import.meta.env.VITE_BASE_URL}
                    title="Check out this fun cancer quiz game and test your cancer knowledge. You can play for free here:"
                    hashtags={[
                      "CancerAwareness",
                      "CancerResearch",
                      "CancerAwarenessQuiz",
                      "Ottr",
                    ]}
                    related={["@CR_UK", "@YLvsCancer", "@BreastCancerNDX"]}
                    onClick={registerShareEvent("Twitter")}
                  >
                    <BiLogoTwitter className={styles.social} />
                  </TwitterShareButton>
                </div>
              </div>
            </div>

            <div className="relative flex justify-end md:mr-32 lg:mr-0 col-start-7 mr-2 lg:col-start-8 col-span-3 mt-14 md:mt-4 lg:mt-auto pointer-events-auto">
              <button className={styles.primaryButton} onClick={startQuiz}>
                Start the quiz
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
