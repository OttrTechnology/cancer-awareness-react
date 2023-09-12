import { useEffect, useRef } from "react";

import LandingpageArrow from "assets/homepageArrow.svg";
import LandingLogo from "assets/homeLogo.svg";

import styles from "./index.module.scss";

import {
  BiLogoDiscordAlt,
  BiLogoFacebook,
  BiLink,
  BiLogoLinkedin,
} from "react-icons/bi";

import data from "../Quiz/cancer-findings-data.json";

import {
  Bodies,
  Composite,
  Engine,
  Mouse,
  MouseConstraint,
  Render,
  Runner,
} from "matter-js";

import { useGameContext } from "hooks";
import clsx from "clsx";

export const Landing = () => {
  const { setActiveScreen } = useGameContext();

  const canvasRef = useRef(null);
  const engine = useRef(Engine.create());
  const scene = useRef(null);

  const startQuiz = () => {
    setActiveScreen("QUIZ");
  };

  useEffect(() => {
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    const render = Render.create({
      element: scene.current || undefined,
      engine: engine.current,
      canvas: canvasRef.current || undefined,
      options: {
        width: canvasWidth,
        height: canvasHeight,
        wireframes: false,
        background: "transparent",
      },
    });

    // engine.current.gravity.scale = 0.001;

    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: document.body.offsetWidth, y: document.body.offsetHeight },
    });

    Composite.add(engine.current.world, [
      Bodies.rectangle(-120, canvasHeight / 2, 20 + 180, canvasHeight + 10, {
        isStatic: true,
      }),
      Bodies.rectangle(
        canvasWidth / 2,
        canvasHeight + 40,
        canvasWidth + 120,
        90,
        {
          isStatic: true,
          render: {
            fillStyle: "#FFDA91",
            strokeStyle: "#FFDA91",
            lineWidth: 3,
          },
        }
      ),
      Bodies.rectangle(canvasWidth + 80, canvasHeight / 2, 120, canvasHeight, {
        isStatic: true,
      }),
    ]);

    data
      .sort(() => 0.5 - Math.random())
      .slice(0, canvasWidth / 90)
      .forEach((App, index) => {
        Composite.add(engine.current.world, [
          Bodies.circle(canvasWidth / 2, -100 * index, 60, {
            density: 0.001,
            frictionAir: 0.02,
            frictionStatic: 0.5,
            restitution: 0.6,
            friction: 0.1,
            render: {
              sprite: {
                texture: `/questionImg/${App.imgSrc}`,
                xScale: 0.5,
                yScale: 0.5,
              },
            },
          }),
        ]);
      });

    const mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine.current, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false,
          },
        },
      });

    Composite.add(engine.current.world, mouseConstraint);

    render.mouse = mouse;

    Runner.run(engine.current);
    Render.run(render);

    return () => {
      Render.stop(render);
      Composite.clear(engine.current.world, true);
      Engine.clear(engine.current);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return (
    <>
      {window.innerWidth > 640 && (
        <div
          ref={scene}
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
          }}
        >
          <canvas ref={canvasRef} />
        </div>
      )}
      <div className={styles.wrapper}>
        <div className="flex justify-center items-center h-screen lg:block relative mx-auto ca-pt--home lg:pointer-events-none">
          <div className="grid lg:grid-cols-10 ca-gap--24">
            <div className="col-span-10 lg:col-span-6 relative">
              <div className="flex items-end ca-gap--12 ca-mb--32 select-none">
                <img
                  src={LandingLogo}
                  alt="Ottr Logo"
                  className={styles.logo}
                />

                <span className={clsx(styles.logoTitle, "ca-text--black-80")}>
                  Presents
                </span>
              </div>

              <div className="ca-mb--24 select-none">
                <h1 className="ca-heading--one">Cancer Insights Challenge</h1>
              </div>

              <div className="ca-mb--48 select-none max-w-[27.625em]">
                <p className="ca-body--md ca-text--black-80">
                  Test your cancer knowledge and elevate your understanding of
                  the disease
                </p>
              </div>

              <div className="flex align-center ca-gap--16 pointer-events-auto select-none">
                <span className="ca-body--sm">Share</span>

                <div className="flex ca-gap--12">
                  <a className="cursor-pointer" href="https://www.google.com">
                    <BiLink className={styles.social} />
                  </a>

                  <a className="cursor-pointer" href="https://www.linkedin.com">
                    <BiLogoLinkedin className={styles.social} />
                  </a>

                  <a className="cursor-pointer" href="https://www.facebook.com">
                    <BiLogoFacebook className={styles.social} />
                  </a>

                  <a className="cursor-pointer" href="https://www.discord.com">
                    <BiLogoDiscordAlt className={styles.social} />
                  </a>
                </div>
              </div>
              <div className={styles.arrow}>
                <img
                  src={LandingpageArrow}
                  className={styles.arrow__img}
                  alt="arrow"
                />
              </div>
            </div>

            <div className="col-start-8 col-span-3 mt-14 lg:mt-auto pointer-events-auto">
              <button className={styles.primaryButton} onClick={startQuiz}>
                Take the quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
