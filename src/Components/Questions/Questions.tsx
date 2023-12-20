import React from "react";
import Question from "../Question/Question";

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
};

const Questions: React.FC<QuestionsType> = ({ questions, onDelete }) => {
  return (
    <div>
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
