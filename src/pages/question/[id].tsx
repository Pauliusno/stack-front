// SingleQuestionPage.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import PageTemplate from "@/PageTemplate/PageTempate";
import QuestionComponent from "@/Components/Question/Question";
import Answers from "@/Components/Answers/Answers";
import AddAnswer from "@/Components/AddAnswer/Answer";
import Modal from "@/Components/Modal/Modal";

type AnswerType = {
  id: string;
  answer_text: string;
  date: string;
  gained_likes: number;
};

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
  const [showDeleteQuestionModal, setShowDeleteQuestionModal] = useState(false);
  const [showDeleteAnswerModal, setShowDeleteAnswerModal] = useState(false);
  const [answerIdToDelete, setAnswerIdToDelete] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [unauthorizedMessage, setUnauthorizedMessage] = useState(""); // New state for unauthorized message
  const router = useRouter();

  const fetchQuestion = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:4000/question/${id}`);
      setQuestion(response.data.questionWithAnswers as QuestionType);
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  const checkAuthorization = () => {
    const jwtToken = cookie.get("jwt_token");
    setIsAuthorized(!!jwtToken);
  };

  const handleDeleteQuestion = async () => {
    if (!isAuthorized) {
      // Set unauthorized message
      setUnauthorizedMessage("Unauthorized access. Please log in.");
      return;
    }

    const questionId = router.query.id as string;
    try {
      const headers = {
        authorization: cookie.get("jwt_token"),
      };

      const response = await axios.delete(
        `http://localhost:4000/question/${questionId}`,
        {
          headers,
        }
      );

      if (response.status === 200) {
        router.push("/");
      }
    } catch (err) {
      console.error("Error deleting question:", err);
    } finally {
      setShowDeleteQuestionModal(false);
    }
  };

  const handleDeleteAnswer = async () => {
    if (!isAuthorized || !answerIdToDelete) {
      // Set unauthorized message
      setUnauthorizedMessage("Unauthorized access or missing answerId.");
      return;
    }

    try {
      const headers = {
        authorization: cookie.get("jwt_token"),
      };

      const response = await axios.delete(
        `http://localhost:4000/answers/${answerIdToDelete}`,
        {
          headers,
        }
      );

      if (response.status === 200) {
        fetchQuestion(router.query.id as string);
        setShowDeleteAnswerModal(false);
      }
    } catch (err) {
      console.error("Error deleting answer:", err);
    } finally {
      setAnswerIdToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteQuestionModal(false);
    setShowDeleteAnswerModal(false);
    setAnswerIdToDelete(null);
    setUnauthorizedMessage(""); // Clear unauthorized message when cancelling
  };

  useEffect(() => {
    checkAuthorization();
    router.query.id && fetchQuestion(router.query.id as string);
  }, [router.query.id]);

  return (
    <PageTemplate>
      {unauthorizedMessage && <div>{unauthorizedMessage}</div>}

      {question && (
        <>
          <QuestionComponent
            question={question}
            onDelete={() => setShowDeleteQuestionModal(true)}
          />
          <AddAnswer />
          <Answers
            answers={question.question_answers}
            onAnswerDelete={(answerId) => {
              setAnswerIdToDelete(answerId);
              setShowDeleteAnswerModal(true);
            }}
          />
        </>
      )}

      {/* Delete Question Modal */}
      <Modal
        isOpen={showDeleteQuestionModal}
        onCancel={handleCancelDelete}
        onConfirm={handleDeleteQuestion}
      >
        <p>Are you sure you want to delete this question?</p>
      </Modal>

      {/* Delete Answer Modal */}
      <Modal
        isOpen={showDeleteAnswerModal}
        onCancel={handleCancelDelete}
        onConfirm={handleDeleteAnswer}
      >
        <p>Are you sure you want to delete this answer?</p>
      </Modal>
    </PageTemplate>
  );
};

export default SingleQuestionPage;
