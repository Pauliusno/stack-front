import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";

type QuestionType = {
  _id: string;
  title: string;
  date: string;
  text: string;
  answered: string[];
};

type QuestionComponentType = {
  question: QuestionType;
};

const Question: React.FC<QuestionComponentType> = ({ question }) => {
  return (
    <Link className={styles.link} href={`/question/${question._id}`}>
      <div className={styles.wrapper}>
        <h2>{question.title}</h2>
        <div className={styles.cardTextContents}>
          <h3>{question.text}</h3>
          <div className={styles.amount}>Posted : {question.date}</div>
          <div className={styles.answerCount}>
            {question.answered.length} Answers
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Question;
