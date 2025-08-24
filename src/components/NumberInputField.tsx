import type { ChangeEvent } from "react";
import type { InputFieldProps } from "./types.ts";

export const NumberInputField = (props: InputFieldProps<number>) => {
  const { label, helperText, value, onChange, ...rest } = props;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Convert the string value to a number before passing it to the onChange handler
    const numericValue = event.target.value === "" ? 0 : parseFloat(event.target.value);

    // Create a new event with the numeric value
    const newEvent = {
      ...event,
      target: {
        ...event.target,
        value: numericValue,
      },
    } as unknown as ChangeEvent<HTMLInputElement>;

    onChange?.(newEvent);
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
      <input
        {...rest}
        type="number"
        style={{ width: "100%", padding: "10px 5px", border: "grey 1px solid" }}
        value={value}
        onChange={handleChange}
      />
      {helperText && (
        <div style={{ color: "red", fontSize: "0.7rem", paddingTop: "-2px" }}>{helperText}</div>
      )}
    </div>
  );
};
