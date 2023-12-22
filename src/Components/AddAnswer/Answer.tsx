import React, { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import CustomButton from "@/Components/CustomButton/CustomButton";
import cookie from "js-cookie";

import InputField from "@/Components/InputField/InputField";
import ValidationMessage from "@/ValidationMessage/ValidationMessage";

const AddAnswer: React.FC = () => {
  const [answerText, setAnswerText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const router = useRouter();
  const { id } = router.query; // Get the question ID from the route parameters

  const validateInputs = (): boolean => {
    if (!answerText) {
      setError("Please fill in the answer field");
      return false;
    }
    return true;
  };

  const onAddAnswer = async (): Promise<void> => {
    if (!validateInputs()) {
      return;
    }

    const authToken = cookie.get("jwt_token");

    if (!authToken) {
      setError("Unauthorized. Please login.");
      return;
    }

    try {
      const body = {
        answer_text: answerText,
      };

      const headers = {
        authorization: authToken,
      };

      const response = await axios.post(
        `http://localhost:4000/${id}/answers`,
        body,
        {
          headers,
        }
      );

      if (response.status === 200) {
        setSuccess(true);
        setCountdown(3);

        setTimeout(() => {
          setSuccess(false);
          setCountdown(null);

          window.location.reload();
        }, 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h1 className={styles.title}>Add Answer</h1>

      <div className={styles.form}>
        <InputField
          placeholder="Your answer..."
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
        />
        <CustomButton
          onClick={onAddAnswer}
          disabled={success}
          success={success}
          countdown={countdown}
          buttonText="Add Answer"
          redirectingText="Adding answer... Redirecting"
        />
        {error && <ValidationMessage message={error} />}
      </div>
    </div>
  );
};

export default AddAnswer;
