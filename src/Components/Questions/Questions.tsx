import React from "react";
import Question from "../Question/Question";
import styles from "./styles.module.css"; // Import your CSS module

type QuestionType = {
  _id: string;
  title: string;
  date: string;
  text: string;
  answered: string[];
};

type QuestionsType = {
  questions: Array<QuestionType> | null;
  onDelete: (questionId: string) => Promise<void>;
  className?: string; // Add className prop
  unauthorized?: boolean; // Add unauthorized prop
};

const Questions: React.FC<QuestionsType> = ({
  questions,
  onDelete,
  className,
  unauthorized, // Include unauthorized prop in destructuring
}) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      {unauthorized && (
        <div className="unauthorized-message">
          Unauthorized access. Please log in.
        </div>
      )}

      {questions &&
        questions.map((question) => (
          <div key={question._id}>
            <Question
              question={question}
              onDelete={() => onDelete(question._id)}
            />
          </div>
        ))}
    </div>
  );
};

export default Questions;
