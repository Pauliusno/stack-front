import React from "react";
import styles from "./styles.module.css";
import Question from "../Question/Question";

type QuestionsType = {
  questions: Array<any> | null;
};

const Questions: React.FC<QuestionsType> = ({ questions }) => {
  return (
    //Questions gauna propsa questions lygu Array<any> | null;, questions ismapina
    <div className={styles.wrapper}>
      {questions &&
        questions.map((question) => (
          // questions array kievienam question sukuria div  ir mapina
          <div key={question._id}>
            <Question question={question} />
            {/* rendirinam Question komponenta ir question komponenta, kuris turi data  */}
          </div>
        ))}
    </div>
  );
};

export default Questions;
