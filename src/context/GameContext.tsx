import { createContext, useState } from "react";
import { Question } from "screens/Quiz/Question";
import { Result } from "screens/Quiz/Result";
import { GameOver, Landing, Quiz } from "screens";
import mockData from "screens/Quiz/cancer-findings-data.json";

interface IQuiz {
  fact: boolean;
  claim: string;
  explanation: string;
  imgSrc: string;
}

interface GameContextProps {
  currentQuestion: IQuiz;
  currentScreen: object;
  mainScreens: object;
  screens: JSX.Element[];
  currentScore: number;
  highScore: number;
  activeIndex: number;
  activeScreen: number;
  remainingLives: number;
  answer: boolean;
  handleNext: (currentScore: number) => void;
  handlePlayAgain: () => void;
  handleAnswer: (newAnswer: boolean) => void;
}

export const GameContext = createContext<GameContextProps | undefined>(
  undefined
);

export const GameContextProvider = (props: { children: React.ReactNode }) => {
  const data = mockData;

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const currentQuestion = data[activeQuestionIndex];

  const [answer, setAnswer] = useState(true);

  const [activeIndex, setActiveIndex] = useState(0);

  const [currentScore, setCurrentScore] = useState(0);

  const initialHighScore = parseInt(localStorage.getItem("highScore") ?? "0");

  const [highScore, setHighScore] = useState(initialHighScore);

  const [remainingLives, setRemainingLives] = useState(3);

  const screens = [
    <Question key={1} />,
    <Result key={2} isCorrect={data[activeQuestionIndex].fact} />,
  ];

  enum currentScreen {
    Landing,
    Quiz,
    GameOver,
  }

  const mainScreens = {
    [currentScreen.Landing]: <Landing />,
    [currentScreen.Quiz]: <Quiz />,
    [currentScreen.GameOver]: <GameOver />,
  };

  const [activeScreen, setActiveScreen] = useState(currentScreen.Quiz);

  const handleNext = (currentScore: number) => {
    let index = activeIndex;

    if (index === screens.length - 1) index = 0;
    else index++;

    const newIndex = activeQuestionIndex + 1;

    setActiveQuestionIndex(newIndex);
    setActiveIndex(index);

    if (currentScore > highScore) {
      setHighScore(currentScore);
      localStorage.setItem("highScore", currentScore.toString());
    }
  };

  const handlePlayAgain = () => {
    setActiveScreen(1);
    setRemainingLives(3);
    setCurrentScore(0);
    setActiveQuestionIndex(0);
    setActiveIndex(0);
  };

  const handleAnswer = (newAnswer: boolean) => {
    let index = activeIndex;

    if (index === screens.length - 1) index = 0;
    else index++;

    if (newAnswer !== currentQuestion.fact) {
      setRemainingLives((prevLive) => prevLive - 1);
    } else {
      setCurrentScore((prevScore) => prevScore + 1);
    }

    if (remainingLives === 1 && newAnswer !== currentQuestion.fact) {
      setActiveScreen(currentScreen.GameOver);
    } else {
      setActiveIndex(index);
    }

    setAnswer(newAnswer);
  };

  const value: GameContextProps = {
    screens,
    currentScore,
    highScore,
    activeIndex,
    remainingLives,
    handleNext,
    handlePlayAgain,
    handleAnswer,
    currentScreen,
    activeScreen,
    currentQuestion,
    answer,
    mainScreens,
  };

  return (
    <GameContext.Provider value={value}>{props.children}</GameContext.Provider>
  );
};
