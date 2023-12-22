import React from "react";
import styles from "./styles.module.css";
import Answer from "../Answer/Answer";

type AnswerType = {
  id: string; // Change _id to id
  answer_text: string;
  date: string;
  gained_likes: number;
  onDelete: () => void; // Add onDelete prop
};

type AnswersType = {
  answers: AnswerType[];
  onAnswerDelete: (answerId: string) => void; // Add onAnswerDelete prop
};

const Answers: React.FC<AnswersType> = ({ answers, onAnswerDelete }) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Answers</h2>

      {answers.map((answer) => (
        <div key={answer.id}>
          {" "}
          {/* Change _id to id */}
          <Answer answer={answer} onDelete={() => onAnswerDelete(answer.id)} />
        </div>
      ))}
    </div>
  );
};

export default Answers;
