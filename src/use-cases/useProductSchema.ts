import type { ChangeEvent } from "react";
import type { ComponentType } from "./getInputComponent.ts";

export type SchemaObject = {
  field: string;
  type: ComponentType;
  defaultValue?: string | number | undefined;
  onChange?: (event: ChangeEvent<HTMLElement>) => void;
  pattern?: RegExp;
  placeholder?: string;
  min?: number;
  max?: number;
};

const schema = [
  {
    field: "product_code",
    type: "text",
    pattern: /^[a-z0-9A-Z]+$/,
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
    defaultValue: 10,
  },
  {
    field: "price_yen",
    type: "financial",
    min: 10,
    max: 20,
    defaultValue: 10,
  },
  {
    field: "metadata",
    type: "keyValue",
  },
  {
    field: "search_result_image",
    type: "media",
    mediaType: "image",
    multiple: false,
  },
];

export const useProductSchema = (): SchemaObject[] => {
  return schema as SchemaObject[];
};
