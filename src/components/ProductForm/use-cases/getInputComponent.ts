import { KeyValueInputField } from "../../KeyValueInputField";
import { NumberInputField } from "../../NumberInputField";
import { TextInputField } from "../../TextInputField";

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
