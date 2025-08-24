/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useRef } from "react";
import "./App.css";
import { ProductForm, type ProductFormType } from "./components/ProductForm";
import {useProductSchema} from "./use-cases";

function App() {
    const schema = useProductSchema();
  const formRef = useRef<ProductFormType>(null);

  return (
    <>
      {/* @ts-ignore */}
      <ProductForm
        ref={(r) => {
          formRef.current = r;
        }}
        onSubmit={(formState) => {
          console.log("formState", formState);
        }}
        schema={schema}
      />
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button
          type="button"
          onClick={() => formRef?.current?.submit()}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => formRef?.current?.reset()}
          style={{
            padding: "10px 20px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>
    </>
  );
}

export default App;
