/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, useImperativeHandle } from "react";
import { useHookstate } from "@hookstate/core";
// import { useProductSchema } from "./use-cases";
import { TextInputField } from "../TextInputField";
import { NumberInputField } from "../NumberInputField";
import { KeyValueInputField } from "../KeyValueInputField";

type Props = Record<string, never>;
type ProductFormType = {
    submit: () => void;
    reset: () => void;
};

export const ProductForm = forwardRef<ProductFormType, Props>((props, ref) => {
    const formState = useHookstate<any>({
        textValue: "",
        numberValue: 0,
        keyValuePairs: {}
    });
    // const schema = useProductSchema();
    // const staticFields = schema.static;
    // const dynamicFields = schema.dynamic;
    // const mediaFields = schema.media;

    useImperativeHandle(
        ref,
        () => {
            return {
                submit: () => {
                    console.log("Form values:", {
                        textValue: formState.nested("textValue").get(),
                        numberValue: formState.nested("numberValue").get(),
                        keyValuePairs: formState.nested("keyValuePairs").get()
                    });
                },
                reset: () => {
                    formState.set({
                        textValue: "",
                        numberValue: 0,
                        keyValuePairs: {}
                    });
                },
            };
        },
        [formState]
    );

    return (
        <form style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
            <h2>Product Form</h2>

            <div>
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

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <button 
                    type="button" 
                    onClick={() => ref.current?.submit()}
                    style={{ 
                        padding: "10px 20px", 
                        backgroundColor: "#4CAF50", 
                        color: "white", 
                        border: "none", 
                        cursor: "pointer" 
                    }}
                >
                    Submit
                </button>
                <button 
                    type="button" 
                    onClick={() => ref.current?.reset()}
                    style={{ 
                        padding: "10px 20px", 
                        backgroundColor: "#f44336", 
                        color: "white", 
                        border: "none", 
                        cursor: "pointer" 
                    }}
                >
                    Reset
                </button>
            </div>
        </form>
    );
});
