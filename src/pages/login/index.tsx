// Login.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { useRouter } from "next/router";

import styles from "./styles.module.css";
import PageTemplate from "@/PageTemplate/PageTempate";
import InputField from "@/Components/InputField/InputField";
import ValidationMessage from "@/ValidationMessage/ValidationMessage"; // Adjust the path based on your project structure
import CustomButton from "@/Components/CustomButton/CustomButton"; // Adjust the path based on your project structure

const Login: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const validateInputs = (): boolean => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return false;
    }
    return true;
  };

  const onLogin = async (): Promise<void> => {
    if (!validateInputs()) {
      return;
    }

    const body = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post("http://localhost:4000/login", body);

      if (response.status === 200) {
        setError(null); // Clear any previous errors
        setSuccess(true);
        setCountdown(3);

        setTimeout(() => {
          cookie.set("jwt_token", response.data.token);
          router.push("/");
        }, 3000);
      }

      console.log("response", response);
    } catch (error) {
      console.error("Error during login:", error);
      setError("Invalid credentials. Please try again.");
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (success && countdown !== null) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [success, countdown]);

  return (
    <PageTemplate>
      <div className={styles.form}>
        <InputField
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <CustomButton
          onClick={onLogin}
          disabled={success}
          success={success}
          countdown={countdown}
          buttonText="Login"
          redirectingText="Logging successful..redirectering" // Customize the redirecting text here
        />
        {error && <ValidationMessage message={error} />}
      </div>
    </PageTemplate>
  );
};

export default Login;
