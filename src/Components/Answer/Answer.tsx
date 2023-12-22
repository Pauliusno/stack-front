import React from "react";
import styles from "./styles.module.css";

type AnswerType = {
  id: string; // Change _id to id
  answer_text: string;
  date: string;
  gained_likes: number;
};

type AnswerComponentType = {
  answer: AnswerType;
  onDelete: () => void; // Add onDelete prop
};

const Answer: React.FC<AnswerComponentType> = ({ answer, onDelete }) => {
  return (
    <div className={styles.wrapper}>
      <h2>Answer</h2>
      <div>
        <p>{answer.answer_text}</p>
        <div>Posted: {answer.date}</div>
        <div className={styles.likeCount}>Likes: {answer.gained_likes}</div>
      </div>
      <button onClick={onDelete} className={styles.button}>
        Delete Answer
      </button>
    </div>
  );
};

export default Answer;
