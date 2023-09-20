import { createContext, useCallback, useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { useLocalStorageAvailable, useStorage } from "hooks";
import data from "./cancer-findings-data.json";

const TOTAL_LIVES = 3;

interface IQuiz {
  fact: boolean;
  claim: string;
  explanation: string;
  imgSrc: string;
  source: string;
}

enum Screens {
  LANDING = "LANDING",
  QUIZ = "QUIZ",
  GAME_OVER = "GAME_OVER",
}
export type ScreensType = keyof typeof Screens;

enum Location {
  LANDING = "LANDING",
  TRANSITIONING_FROM_LANDING = "TRANSITIONING_FROM_LANDING",
  QUIZ = "QUIZ",
  TRANSITIONING_FROM_QUIZ = "TRANSITIONING_FROM_QUIZ",
  GAME_OVER = "GAME_OVER",
  TRANSITIONING_FROM_GAME_OVER = "TRANSITIONING_FROM_GAME_OVER",
}
export type LocationType = keyof typeof Location;

enum Transitions {
  TRANSITION_FROM_LANDING = "TRANSITION_FROM_LANDING",
  TRANSITION_FROM_QUIZ = "TRANSITION_FROM_QUIZ",
  TRANSITION_FROM_GAME_OVER = "TRANSITION_FROM_GAME_OVER",
}
export type TransitionsType = keyof typeof Transitions;

enum QuizScreen {
  QUESTION = "QUESTION",
  RESULT = "RESULT",
}
export type QuizScreenType = keyof typeof QuizScreen;

interface CustomNavigation {
  location: LocationType;
  transition?: TransitionsType;
}

interface CustomNavigationSetter extends CustomNavigation {
  location: ScreensType;
  duration?: number;
}

interface QuestionWeight {
  weight: number;
}

interface GameContextProps {
  activeScreen: LocationType;
  setActiveScreen: (navigateData: CustomNavigationSetter) => void;
  activeQuizScreen: QuizScreenType;

  currentQuestion: IQuiz;
  nextQuestion?: IQuiz;

  totalLives: number;
  remainingLives: number;
  currentScore: number;
  highScore: number;
  userAnswer: boolean;

  handleAnswer: (newAnswer: boolean) => () => void;
  handleNext: () => void;
  handlePlayAgain: () => void;
}

export const GameContext = createContext<GameContextProps | undefined>(
  undefined
);

export const GameContextProvider = (props: { children: React.ReactNode }) => {
  const localStorageAvailable = useLocalStorageAvailable();

  const [weightedArray, setWeightedArray] = useLocalStorage<QuestionWeight[]>(
    "q-weights",
    Array(data.length).fill({
      weight: 1,
    }) as QuestionWeight[]
  );

  const [shuffledData, setShuffledData] = useState<IQuiz[]>([]);

  const [activeScreen, activeScreenSetter] = useState<LocationType>("LANDING");

  /**
   * Sets transition state before making the actual navigation according to a given duration
   */
  const setActiveScreen = (navigateData: CustomNavigationSetter) => {
    switch (navigateData.transition) {
      case "TRANSITION_FROM_LANDING":
        activeScreenSetter("TRANSITIONING_FROM_LANDING");
        break;
      case "TRANSITION_FROM_QUIZ":
        activeScreenSetter("TRANSITIONING_FROM_QUIZ");
        break;
      case "TRANSITION_FROM_GAME_OVER":
        activeScreenSetter("TRANSITIONING_FROM_GAME_OVER");
        break;
    }

    setTimeout(() => {
      activeScreenSetter(navigateData.location);
    }, (navigateData.duration ?? 0) * 1000);
  };

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const currentQuestion = shuffledData[activeQuestionIndex];

  const [activeQuizScreen, setActiveQuizScreen] =
    useState<QuizScreenType>("QUESTION");

  const [remainingLives, setRemainingLives] = useState(TOTAL_LIVES);

  const [highScore, setHighScore] = useStorage("highScore", 0);

  const [currentScore, setCurrentScore] = useState(0);

  const [userAnswer, setUserAnswer] = useState(true);

  /**
   * Increments the weight of a specific question by 1.
   * @description Higher the weight, lower the probability of the question to re-appear
   */
  const incrementQuestionWeight = (): void => {
    if (localStorageAvailable && currentQuestion) {
      const questionIndex = data.findIndex(
        (current) => currentQuestion.imgSrc === current.imgSrc
      );

      setWeightedArray((prev) => [
        ...prev.slice(0, questionIndex),
        { weight: prev[questionIndex].weight + 1 },
        ...prev.slice(questionIndex + 1),
      ]);
    }
  };

  const shuffle = useCallback(
    (array: IQuiz[]) => {
      return array
        .map((value, index) => ({
          sort: Math.random() + weightedArray[index].weight,
          value,
        }))
        .sort((a, b) => a.sort - b.sort)
        .map((item) => item.value);
    },
    [weightedArray]
  );

  useEffect(() => {
    const shuffledArray = shuffle(data);
    setShuffledData(shuffledArray);
  }, [shuffle]);

  const handleAnswer = (newAnswer: boolean) => () => {
    setUserAnswer(newAnswer);

    incrementQuestionWeight();

    if (newAnswer !== currentQuestion.fact) {
      setRemainingLives((prevLife) => prevLife - 1);
    } else {
      setCurrentScore((prevScore) => prevScore + 1);
    }

    setActiveQuizScreen("RESULT");
  };

  const handleNext = () => {
    if (currentScore > highScore) setHighScore(currentScore);

    if (remainingLives === 0 || activeQuestionIndex === data.length - 1) {
      setActiveScreen({
        location: "GAME_OVER",
        transition: "TRANSITION_FROM_QUIZ",
        duration: 0.6,
      });
    } else {
      setActiveQuestionIndex((questionNum) => questionNum + 1);
      setActiveQuizScreen("QUESTION");
    }
  };

  const handlePlayAgain = () => {
    setShuffledData(shuffle(data));

    setCurrentScore(0);
    setRemainingLives(TOTAL_LIVES);

    setActiveQuestionIndex(0);

    setActiveQuizScreen("QUESTION");
    setActiveScreen({
      location: "QUIZ",
      transition: "TRANSITION_FROM_GAME_OVER",
    });
  };

  const value: GameContextProps = {
    activeScreen,
    setActiveScreen,
    activeQuizScreen,

    currentQuestion,
    nextQuestion: shuffledData[activeQuestionIndex + 1],

    totalLives: TOTAL_LIVES,
    remainingLives,
    currentScore,
    highScore,
    userAnswer,

    handleAnswer,
    handleNext,
    handlePlayAgain,
  };

  return (
    <GameContext.Provider value={value}>{props.children}</GameContext.Provider>
  );
};
