import { createContext, useState } from "react";
import mockData from "screens/Quiz/cancer-findings-data.json";

interface IQuiz {
  fact: boolean;
  claim: string;
  explanation: string;
  imgSrc: string;
  source: string;
}

enum CurrentScreen {
  LANDING = "LANDING",
  QUIZ = "QUIZ",
  GAME_OVER = "GAME_OVER",
}

enum QuizScreen {
  QUESTION = "QUESTION",
  RESULT = "RESULT",
}

export type CurrentScreenType = keyof typeof CurrentScreen;

export type QuizScreenType = keyof typeof QuizScreen;

interface GameContextProps {
  currentQuestion: IQuiz;
  currentScore: number;
  highScore: number;
  activeQuizIndex: QuizScreenType;
  activeScreen: CurrentScreenType;
  remainingLives: number;
  answer: boolean;
  setActiveScreen: React.Dispatch<
    React.SetStateAction<"LANDING" | "QUIZ" | "GAME_OVER">
  >;

  handleNext: (currentScore: number) => void;
  handlePlayAgain: () => void;
  handleAnswer: (newAnswer: boolean) => void;
}

export const GameContext = createContext<GameContextProps | undefined>(
  undefined
);

export const GameContextProvider = (props: { children: React.ReactNode }) => {
  const data = mockData;

  const [usedIndices, setUsedIndices] = useState<number[]>([]);

  const [activeScreen, setActiveScreen] =
    useState<CurrentScreenType>("LANDING");

  const getRandomUniqueIndex = () => {
    // ? Set game over if all questions have been used up
    if (usedIndices.length === data.length) {
      setActiveScreen(CurrentScreen.GAME_OVER);
    }

    let randomIndex: number;

    // ? get random index that isn't used already
    do {
      randomIndex = Math.floor(Math.random() * data.length);
    } while (usedIndices.includes(randomIndex));

    setUsedIndices((prevIndices) => [...prevIndices, randomIndex]);

    return randomIndex;
  };

  const [activeQuestionIndex, setActiveQuestionIndex] =
    useState(getRandomUniqueIndex);

  const currentQuestion = data[activeQuestionIndex];
  console.log("active", activeQuestionIndex);

  const [answer, setAnswer] = useState(true);

  const [activeQuizIndex, setActiveQuizIndex] =
    useState<QuizScreenType>("QUESTION");

  const [currentScore, setCurrentScore] = useState(0);

  const initialHighScore = parseInt(localStorage.getItem("highScore") ?? "0");

  const [highScore, setHighScore] = useState(initialHighScore);

  const [remainingLives, setRemainingLives] = useState(3);

  const handleNext = (currentScore: number) => {
    let index = activeQuizIndex;

    if (index === "RESULT") index = "QUESTION";
    else index = "RESULT";
    setActiveQuestionIndex(getRandomUniqueIndex());
    setActiveQuizIndex(index);

    if (currentScore > highScore) {
      setHighScore(currentScore);
      localStorage.setItem("highScore", currentScore.toString());
    }
    if (remainingLives === 0) {
      setActiveScreen(CurrentScreen.GAME_OVER);
    } else {
      setActiveQuizIndex(index);
    }
  };

  const handlePlayAgain = () => {
    setActiveScreen(CurrentScreen.QUIZ);
    setRemainingLives(3);
    setCurrentScore(0);
    setActiveQuestionIndex(getRandomUniqueIndex());
    setActiveQuizIndex("QUESTION");
  };

  const handleAnswer = (newAnswer: boolean) => {
    let index = activeQuizIndex;

    if (index === "RESULT") index = "QUESTION";
    else index = "RESULT";

    if (newAnswer !== currentQuestion.fact) {
      setRemainingLives((prevLive) => prevLive - 1);
    } else {
      setCurrentScore((prevScore) => prevScore + 1);
    }

    setActiveQuizIndex(index);
    setAnswer(newAnswer);
  };

  const value: GameContextProps = {
    currentScore,
    highScore,
    activeQuizIndex,
    remainingLives,
    handleNext,
    handlePlayAgain,
    handleAnswer,
    setActiveScreen,
    activeScreen,
    currentQuestion,
    answer,
  };

  return (
    <GameContext.Provider value={value}>{props.children}</GameContext.Provider>
  );
};
