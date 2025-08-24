import { KeyValueInputField } from "../components/KeyValueInputField.tsx";
import { NumberInputField } from "../components/NumberInputField.tsx";
import { TextInputField } from "../components/TextInputField.tsx";

export type ComponentType = "text" | "number" | "keyValue" | "media" | "financial";

export const getInputComponent = (type: ComponentType) => {
  switch (type) {
    case "text":
      return TextInputField;
    case "number":
      return NumberInputField;
    case "keyValue":
      return KeyValueInputField;
    case "media":
      return TextInputField;
    case "financial":
      return NumberInputField;
    default:
      return TextInputField;
  }
};
