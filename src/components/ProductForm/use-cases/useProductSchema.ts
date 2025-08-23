import type { ChangeEvent } from "react";
import type { ComponentType } from "./getInputComponent";

type SchemaObject = {
  field: string;
  type: ComponentType;
  default?: string | number | undefined;
  onChange?: (event: ChangeEvent<HTMLElement>) => void;
  pattern?: RegExp;
  placeholder?: string;
  min?: number;
  max?: number;
};

export const useProductSchema = (): SchemaObject[] => {
  return [
    {
      field: "product_code",
      type: "text",
      default: 10,
      pattern: /^[a-z0-9A-Z]+$/g,
      placeholder: "ex: s000101",
    },
    {
      field: "product_name",
      type: "text",
      placeholder: "ex: Racer Shim",
    },
    {
      field: "quantity",
      type: "number",
      min: 10,
      max: 20,
      default: 10,
    },
    {
      field: "price_yen",
      type: "financial",
      min: 10,
      max: 20,
      default: 10,
    },
  ];
};
