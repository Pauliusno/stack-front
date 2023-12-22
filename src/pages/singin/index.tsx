import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import styles from "./styles.module.css";
import PageTemplate from "@/PageTemplate/PageTempate";
import InputField from "@/Components/InputField/InputField";
import ValidationMessage from "@/ValidationMessage/ValidationMessage";
import CustomButton from "@/Components/CustomButton/CustomButton";

const SignIn: React.FC = () => {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const validateInputs = (): boolean => {
    const validationErrors: string[] = [];

    if (name.length < 3) {
      validationErrors.push("Name must be at least 3 characters long");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      validationErrors.push("Please enter a valid email address");
    }

    if (password.length < 6 || !/\d/.test(password)) {
      validationErrors.push(
        "Password must be at least 6 characters long and include a number"
      );
    }

    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  const onSignIn = async (): Promise<void> => {
    if (!validateInputs()) {
      return;
    }

    const body = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post("http://localhost:4000/register", body);

      if (response.status === 201) {
        setSuccess(true);
        setCountdown(3);

        setTimeout(() => {
          setSuccess(false);
          setCountdown(null);
          router.push("/login");
        }, 3000);
      }

      console.log("response", response);
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };

  return (
    <PageTemplate>
      <div className={styles.form}>
        <InputField
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          onClick={onSignIn}
          disabled={success} //disablinan buttona, kad nesidubliuotu answer,kai redirectina
          success={success} // kai pavyksta prisijungti perduodam success
          buttonText="Sign In"
          redirectingText="Redirecting to Login..."
          countdown={countdown}
        />

        {errors.length > 0 && (
          <div>
            {errors.map((error, index) => (
              <ValidationMessage key={index} message={error} />
            ))}
          </div>
        )}
      </div>
    </PageTemplate>
  );
};

export default SignIn;
