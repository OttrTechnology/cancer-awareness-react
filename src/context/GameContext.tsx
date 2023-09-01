// TODO: implement Game Logic
// Remove this and create context
import { createContext, useState } from "react";
import { Question } from "screens/Quiz/Question";
import { Result } from "screens/Quiz/Result";
import { GameOver } from "screens";
import mockData from "../screens/Quiz/cancer-findings-data.json";

interface GameContextProps {
  actualAnswer: boolean;
  screens: JSX.Element[];
  answer: boolean;
  activeIndex: number;
  remainingLives: number;
  question: string;
  explanation: string;
  src: string;
  handleOnClick: () => void;
  handleAnswer: (newAnswer: boolean) => void;
}

export const GameContext = createContext<GameContextProps | undefined>(
  undefined
);

export const GameContextProvider = (props: { children: React.ReactNode }) => {
  const data = mockData;
  //   const totalQuestions = data.length;
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const question = data[activeQuestionIndex].claim;
  const actualAnswer = data[activeQuestionIndex].fact;
  const explanation = data[activeQuestionIndex].explanation;
  const src = data[activeQuestionIndex].imgSrc;
  const screens = [
    <Question key={1} />,
    <Result key={2} isCorrect={data[activeQuestionIndex].fact} />,
    <GameOver key={3} />,
  ];

  const [answer, setAnswer] = useState(true);

  const [activeIndex, setActiveIndex] = useState(0);

  const [remainingLives, setRemainingLives] = useState(3);

  const handleOnClick = () => {
    let index = activeIndex;

    if (index === screens.length - 2) index = 0;
    else index++;

    const newIndex = activeQuestionIndex + 1;
    setActiveQuestionIndex(newIndex);
    setActiveIndex(index);
  };

  const handleAnswer = (newAnswer: boolean) => {
    let index = activeIndex;

    if (index === screens.length - 1) index = 0;
    else index++;

    if (newAnswer !== actualAnswer) {
      setRemainingLives((prevLive) => prevLive - 1);
    }

    setActiveIndex(index);
    setAnswer(newAnswer);

    if (remainingLives === 1) {
      setActiveIndex(2);
    }
  };

  const value: GameContextProps = {
    actualAnswer,
    screens,
    answer,
    activeIndex,
    remainingLives,
    question,
    explanation,
    src,
    handleOnClick,
    handleAnswer,
  };

  return (
    <GameContext.Provider value={value}>{props.children}</GameContext.Provider>
  );
};
