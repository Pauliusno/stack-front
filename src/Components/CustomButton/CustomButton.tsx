import React, { useEffect, useState } from "react";

type CustomButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  success?: boolean;
  countdown?: number | null;
  buttonText?: string;
  redirectingText?: string;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  disabled,
  success,
  countdown,
  buttonText = "Submit",
  redirectingText = "Redirecting...",
}) => {
  const [displayText, setDisplayText] = useState<string>(buttonText);

  useEffect(() => {
    if (success && countdown !== null) {
      let currentCountdown: number | undefined = countdown;

      const timer = setInterval(() => {
        if (currentCountdown !== undefined) {
          setDisplayText(`${redirectingText} in ${currentCountdown}...`);
          currentCountdown -= 1;
        }
      }, 1000);

      // Clear the interval when countdown reaches 0
      setTimeout(() => {
        clearInterval(timer);
        setDisplayText(redirectingText); // Display the final redirecting text
      }, countdown * 1000);

      return () => {
        clearInterval(timer);
      };
    } else {
      setDisplayText(buttonText);
    }
  }, [success, countdown, redirectingText, buttonText]);

  return (
    <button onClick={onClick} disabled={disabled}>
      {displayText}
    </button>
  );
};

export default CustomButton;
