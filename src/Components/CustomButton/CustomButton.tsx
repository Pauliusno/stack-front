import React, { useEffect, useState } from "react";

type CustomButtonType = {
  onClick: () => void;
  disabled?: boolean;
  success?: boolean;
  countdown?: number | null;
  buttonText?: string;
  redirectingText?: string;
};

const CustomButton: React.FC<CustomButtonType> = ({
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

      setTimeout(() => {
        clearInterval(timer);
        setDisplayText(redirectingText);
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
