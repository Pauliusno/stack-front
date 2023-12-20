// ValidationMessage.tsx
import React from "react";

type ValidationMessageProps = {
  message: string;
};

const ValidationMessage: React.FC<ValidationMessageProps> = ({ message }) => (
  <p style={{ color: "red" }}>{message}</p>
);

export default ValidationMessage;
