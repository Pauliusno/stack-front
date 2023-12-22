import React from "react";
import Link from "next/link";
import styles from "./question.module.css";

type QuestionType = {
  _id: string;
  title: string;
  date: string;
  text: string;
  answered: string[];
};

type QuestionComponentType = {
  question: QuestionType;
  onDelete: () => void; // Add onDelete prop
};

const Question: React.FC<QuestionComponentType> = ({ question, onDelete }) => {
  return (
    <div className={styles.wrapper}>
      <Link className={styles.link} href={`/question/${question._id}`}>
        <h2>{question.title}</h2>
        <div className={styles.cardTextContents}>
          <h3>{question.text}</h3>
          <div className={styles.amount}>Posted: {question.date}</div>
          <div className={styles.answerCount}>
            {question.answered.length} Answers
          </div>
        </div>
      </Link>
      <button onClick={onDelete} className={styles.button}>
        Delete
      </button>
    </div>
  );
};

export default Question;
