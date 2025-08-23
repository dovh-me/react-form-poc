/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { ChangeEvent } from "react";
import type { InputFieldProps } from "./types.ts";

interface TextInputFieldProps extends InputFieldProps<string> {
  pattern?: RegExp;
  placeholder?: string;
}

export const TextInputField = (props: TextInputFieldProps) => {
  const { label, helperText, value, onChange, placeholder, pattern } = props;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event?.target?.value;
    if (pattern) {
      const isValid = !value || (pattern && pattern?.test(value));
      if (!isValid) return;
    }

    onChange?.(event);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        alignItems: "flex-start",
      }}
    >
      {label && <div style={{ fontSize: "0.8rem" }}>{label}</div>}
      {/* @ts-ignore */}
      <input
        {...props}
        style={{ width: "100%", padding: "10px 5px", border: "grey 1px solid" }}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {helperText && (
        <div style={{ color: "red", fontSize: "0.7rem", paddingTop: "-2px" }}>{helperText}</div>
      )}
    </div>
  );
};
