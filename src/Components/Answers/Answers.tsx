import React from "react";
import styles from "./styles.module.css";
import Answer from "../Answer/Answer";

type AnswerType = {
  _id: string;
  answer_text: string;
  date: string;
  gained_likes: number;
};

type AnswersType = {
  answers: AnswerType[];
};

const Answers: React.FC<AnswersType> = ({ answers }) => {
  return (
    <div className={styles.wrapper}>
      <h2>Answers</h2>
      {answers.map((answer) => (
        <div key={answer._id}>
          <Answer answer={answer} />
        </div>
      ))}
    </div>
  );
};

export default Answers;
