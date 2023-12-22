// Home.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import PageTemplate from "@/PageTemplate/PageTempate";
import Questions from "../Components/Questions/Questions";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import Modal from "../Components/Modal/Modal"; // Import your Modal component

export default function Home() {
  const router = useRouter();

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/questions`);
      setQuestions(response.data.questions);
    } catch (err) {
      console.error("Error fetching questions:", err);
      if (err.response && err.response.status === 401) {
        setUnauthorized(true); // Set unauthorized state to true
      }
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [questionIdToDelete, setQuestionIdToDelete] = useState("");
  const [unauthorized, setUnauthorized] = useState(false); // New state for unauthorized message

  const handleDeleteClick = (questionId: string) => {
    const jwtToken = cookie.get("jwt_token");

    if (!jwtToken) {
      // If there is no token, set unauthorized state to true
      setUnauthorized(true);
      return;
    }

    setQuestionIdToDelete(questionId);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    setShowModal(false);

    try {
      const headers = {
        authorization: cookie.get("jwt_token"),
      };

      const response = await axios.delete(
        `http://localhost:4000/question/${questionIdToDelete}`,
        {
          headers,
        }
      );

      if (response.status === 200) {
        // Reload the questions after successful deletion
        fetchQuestions();
      }
    } catch (err) {
      console.error("Error deleting question:", err);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const [questions, setQuestions] = useState<Array<any> | null>(null);

  return (
    <PageTemplate>
      <Questions
        questions={questions}
        onDelete={handleDeleteClick}
        unauthorized={unauthorized} // Pass unauthorized state as a prop
        className="custom-styles"
      />

      <Modal
        isOpen={showModal}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      >
        <p>Are you sure you want to delete thi question?</p>
      </Modal>
    </PageTemplate>
  );
}
