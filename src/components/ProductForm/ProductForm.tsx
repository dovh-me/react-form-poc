/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, useImperativeHandle, type ChangeEvent } from "react";
import { useHookstate } from "@hookstate/core";
// import { useProductSchema } from "./use-cases";
import { TextInputField } from "../TextInputField";
import { NumberInputField } from "../NumberInputField";
import { KeyValueInputField } from "../KeyValueInputField";
import { useProductSchema } from "./use-cases";
import { getInputComponent } from "./use-cases/getInputComponent";
import { snakeToDisplayString } from "../../utils/snakeToDisplayString";

type Props = {
  onSubmit?: (formState: any) => void;
};
export type ProductFormType = {
  submit: () => void;
  reset: () => void;
};

export const ProductForm = forwardRef<ProductFormType, Props>((props, ref) => {
  const { onSubmit } = props;
  const formState = useHookstate<any>({});
  const schema = useProductSchema();
  // const staticFields = schema.static;
  // const dynamicFields = schema.dynamic;
  // const mediaFields = schema.media;

  useImperativeHandle(
    ref,
    () => {
      return {
        submit: () => {
          onSubmit?.(formState.get({ stealth: true }) as any);
        },
        reset: () => {
          formState.set({});
        },
      };
    },
    []
  );

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        maxWidth: "500px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h2>Product Form</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {schema.map((schemaObject) => {
          const { type, field } = schemaObject;
          const label = snakeToDisplayString(field);
          const Component = getInputComponent(type);

          const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = e?.target?.value;

            formState.nested(field).set(value);
          };

          return (
            <Component
              {...schemaObject}
              label={label}
              value={formState.nested(field).get()}
              onChange={changeHandler}
            />
          );
        })}
        <h3>Text Input Example</h3>
        <TextInputField
          label="Product Name"
          helperText="Enter the name of the product"
          value={formState.nested("textValue").get()}
          onChange={(event) => {
            formState.nested("textValue").set(event?.target?.value);
          }}
        />
      </div>

      <div>
        <h3>Number Input Example</h3>
        <NumberInputField
          label="Product Price"
          helperText="Enter the price of the product"
          value={formState.nested("numberValue").get()}
          onChange={(event) => {
            formState.nested("numberValue").set(event?.target?.value);
          }}
        />
      </div>

      <div>
        <h3>Key-Value Input Example</h3>
        <KeyValueInputField
          label="Product Attributes"
          helperText="Add key-value pairs for product attributes"
          value={formState.nested("keyValuePairs").get()}
          onChange={(event) => {
            formState.nested("keyValuePairs").set(event?.target?.value);
          }}
        />
      </div>
    </form>
  );
});

ProductForm.displayName = "ProductForm";
