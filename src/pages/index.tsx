import React, { useEffect, useState } from "react";
import axios from "axios";
import PageTemplate from "@/PageTemplate/PageTempate";
import Questions from "../Components/Questions/Questions";
import cookie from "js-cookie";

export default function Home() {
  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/questions`);
      setQuestions(response.data.questions);
    } catch (err) {
      console.error("Error fetching questions:", err);
      if (err.response && err.response.status === 401) {
        console.log("Unauthorized access");
      }
    }
  };

  const handleDelete = async (questionId: string) => {
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
        // Reload the questions after successful deletion
        fetchQuestions();
      }
    } catch (err) {
      console.error("Error deleting question:", err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const [questions, setQuestions] = useState<Array<any> | null>(null);

  return (
    <PageTemplate>
      <Questions questions={questions} onDelete={handleDelete} />
    </PageTemplate>
  );
}
