// InputField.tsx
import React, { ChangeEvent } from "react";

type InputFieldProps = {
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
};

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  value,
  onChange,
  type = "text",
}) => (
  <input
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    type={type}
  />
);

export default InputField;
