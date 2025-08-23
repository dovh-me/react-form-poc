import type { ChangeEvent } from "react";

export interface InputFieldProps<T = string | number | Record<string, string>> {
  label?: string;
  value?: T;
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  helperText?: string;
}
