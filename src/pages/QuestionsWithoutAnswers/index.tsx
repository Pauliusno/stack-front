import { useEffect, useState } from "react";
import axios from "axios";
import PageTemplate from "@/PageTemplate/PageTempate";
import Questions from "@/Components/Questions/Questions";

export default function Home() {
  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/unanswered`);
      setQuestions(response.data.questions); // Log the response data
    } catch (err) {
      console.error("Error fetching questions:", err);
      if (err.response && err.response.status === 401) {
        console.log("Unauthorized access");
      }
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);
  const [questions, setQuestions] = useState<Array<any> | null>(null);
  return (
    <>
      <PageTemplate>
        <Questions questions={questions} />
        {/* tam kad iskviest question komponenta jam reikia paduoti propsa su reiksmem question */}
      </PageTemplate>
    </>
  );
}
