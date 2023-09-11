import { useEffect, useRef } from "react";

import homepageArrow from "assets/homepageArrow.svg";
import homeLogo from "assets/homeLogo.svg";

import styles from "./index.module.scss";

import {
  BiLogoDiscordAlt,
  BiLogoFacebook,
  BiLink,
  BiLogoLinkedin,
} from "react-icons/bi";

import datas from "../Quiz/cancer-findings-data.json";

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

export const Home = () => {
  const { setActiveScreen } = useGameContext();

  const canvasRef = useRef(null);
  const engine = useRef(Engine.create());
  const scene = useRef(null);

  const changePage = () => {
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

    let numberOfBalls = 0;
    if (canvasWidth > 640) {
      numberOfBalls = canvasWidth / 144;
    } else {
      numberOfBalls = 0;
    }

    datas
      .sort(() => 0.5 - Math.random())
      .splice(0, numberOfBalls)
      .forEach((App, index) => {
        Composite.add(engine.current.world, [
          Bodies.circle(canvasWidth / 2, -90 * index, 70, {
            density: 1,
            frictionAir: 0.02,
            restitution: 0.3,
            friction: 0.9,
            speed: 1,
            render: {
              sprite: {
                texture: `/questionImg/${App.imgSrc}`,
                xScale: 0.583333,
                yScale: 0.583333,
              },
            },
          }),
        ]);
      });

    const mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine.current, {
        mouse: mouse,
        constraint: {
          stiffness: 0.6,
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

      <div className="flex justify-center items-center h-[100vh] lg:block relative container mx-auto sm:pt-[7.5rem] lg:pointer-events-none">
        <div className="grid lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-start-2 col-span-12 lg:col-span-6 relative">
            <div className="flex items-center gap-2 mb-6 lg:mb-8">
              <img src={homeLogo} alt="Ottr Logo" className={styles.logo} />
              <span className={styles.logoTitle}>Presents</span>
            </div>

            <div className="mb-4 lg:mb-6">
              <h1 className={styles.Heading}>Cancer Insights Challenge</h1>
            </div>

            <div className="mb-12 lg:mb-16">
              <p className={styles.description}>
                Test your cancer knowledge and elevate your understanding of the
                disease
              </p>
            </div>

            <div className="flex align-center gap-4 pointer-events-auto">
              <span className="text-base tracking-[0.01rem] leading-[140%] font-medium lg:ca-body--sm">
                Share
              </span>
              <div className="flex gap-6 lg:gap-3">
                <a className="cursor-pointer" href="https://www.google.com">
                  <BiLink color={"#470FF4"} size={24} />
                </a>
                <a className="cursor-pointer" href="https://www.linkedin.com">
                  <BiLogoLinkedin color={"#470FF4"} size={24} />
                </a>
                <a className="cursor-pointer" href="https://www.facebook.com">
                  <BiLogoFacebook color={"#470FF4"} size={24} />
                </a>
                <a className="cursor-pointer" href="https://www.discord.com">
                  <BiLogoDiscordAlt color={"#470FF4"} size={24} />
                </a>
              </div>
            </div>
            <div className={styles.arrow}>
              <img src={homepageArrow} alt="arrow" />
            </div>
          </div>

          <div className="col-start-9 col-span-3 mt-14 lg:mt-36 pointer-events-auto">
            <button className={styles.primaryButton} onClick={changePage}>
              Take the quiz
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
