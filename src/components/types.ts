export interface InputFieldProps<T = string | number | Record<string, string>> {
  label?: string;
  value?: T;
  onChange?: (event: { target: { value: T } }) => void;
  helperText?: string;
}
