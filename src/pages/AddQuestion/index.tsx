import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import CustomButton from "@/Components/CustomButton/CustomButton";
import cookie from "js-cookie";
import PageTemplate from "@/PageTemplate/PageTempate";
import InputField from "@/Components/InputField/InputField";
import ValidationMessage from "@/ValidationMessage/ValidationMessage";

const AddQuestion: React.FC = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    console.log("AddQuestion component rendered");
    return () => {
      console.log("AddQuestion component unmounted");
    };
  }, []); // Empty dependency array means this effect runs once on mount

  const validateInputs = (): boolean => {
    if (!title || !text) {
      setError("Please fill in all fields");
      return false;
    }
    return true;
  };

  const onAddQuestion = async (): Promise<void> => {
    if (!validateInputs()) {
      return;
    }

    try {
      const body = {
        title: title,
        text: text,
      };

      const headers = {
        authorization: cookie.get("jwt_token"),
      };

      const response = await axios.post(
        `http://localhost:4000/questions`,
        body,
        {
          headers,
        }
      );

      if (response.status === 201) {
        setSuccess(true);
        setCountdown(3);

        setTimeout(() => {
          setSuccess(false);
          setCountdown(null);
          router.push("/");
        }, 4000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <PageTemplate>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Add question</h1>

        <div className={styles.form}>
          <InputField
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <InputField
            placeholder="Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <CustomButton
            onClick={onAddQuestion}
            disabled={success}
            success={success}
            countdown={countdown}
            buttonText="Add Question"
            redirectingText="Adding question... Redirecting"
          />
          {error && <ValidationMessage message={error} />}
        </div>
      </div>
    </PageTemplate>
  );
};

export default AddQuestion;
