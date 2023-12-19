import React from "react";
import styles from "./styles.module.css";

type AnswerType = {
  _id: string;
  answer_text: string;
  date: string;
  gained_likes: number;
};

type AnswerComponentType = {
  answer: AnswerType;
};

const Answer: React.FC<AnswerComponentType> = ({ answer }) => {
  return (
    <div className={styles.wrapper}>
      <h2>Answer</h2>
      <div className={styles.cardTextContents}>
        <p>{answer.answer_text}</p>
        <div className={styles.amount}>Posted: {answer.date}</div>
        <div className={styles.likeCount}>Likes: {answer.gained_likes}</div>
      </div>
    </div>
  );
};

export default Answer;
