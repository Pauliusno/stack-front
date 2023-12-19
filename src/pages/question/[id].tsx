// [id].tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import styles from "./styles.module.css";
import PageTemplate from "@/PageTemplate/PageTempate";
import QuestionComponent from "@/Components/Question/Question";
import Answers from "@/Components/Answers/Answers";

type QuestionType = {
  _id: string;
  title: string;
  date: string;
  text: string;
  answered: string[];
  question_answers: AnswerType[];
};

const SingleQuestionPage = () => {
  const [question, setQuestion] = useState<QuestionType | null>(null);
  const router = useRouter();

  const fetchQuestion = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:4000/question/${id}`);
      setQuestion(response.data.questionWithAnswers);
      console.log(response.data.questionWithAnswers);
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  useEffect(() => {
    router.query.id && fetchQuestion(router.query.id as string);
  }, [router.query.id]);

  return (
    <PageTemplate>
      {question && (
        <>
          <QuestionComponent question={question} />
          <Answers answers={question.question_answers} />
        </>
      )}
    </PageTemplate>
  );
};

export default SingleQuestionPage;
