import type { ChangeEvent } from "react";
import type { InputFieldProps } from "./types.ts";

export const TextInputField = (props: InputFieldProps<string>) => {
    const { label, helperText, value, onChange } = props;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
            <input
                style={{ width: "100%", padding: "10px 5px", border: "grey 1px solid" }}
                value={value}
                onChange={handleChange}
            />
            {helperText && (
                <div style={{ color: "red", fontSize: "0.7rem", paddingTop: "-2px" }}>
                    {helperText}
                </div>
            )}
        </div>
    );
};
