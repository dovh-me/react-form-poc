/* eslint-disable @typescript-eslint/no-explicit-any */
import {forwardRef, useEffect, useImperativeHandle} from "react";
import {useHookstate} from "@hookstate/core";
import {type SchemaObject} from "../../use-cases";
import {ComponentSpawner} from "./ComponentSpawner.tsx";

type Props = {
    onSubmit?: (formState: any) => void;
    schema: SchemaObject[];
};

export type ProductFormType = {
    submit: () => void; reset: () => void; updateErrors: (errors: Record<string, string>) => void;
};

export const ProductForm = forwardRef<ProductFormType, Props>((props, ref) => {
    const {onSubmit, schema} = props;
    const formState = useHookstate<any>({});
    const defaultState = useHookstate<Record<string, any>>({});
    const errorState = useHookstate<Record<string, string>>({});

    useImperativeHandle(ref, () => {
        return {
            submit: () => {
                onSubmit?.(formState);
            }, reset: () => {
                console.log('resetting form state')
                formState.set(defaultState.get({noproxy: true}));
            }, updateErrors: (errors: Record<string, string>) => {
                errorState.set(errors);
            }
        };
    }, []);

    useEffect(() => {
        console.log('Schema revalidated');
        const defaults: Record<string, any> = {};

        schema.forEach((field) => {
            const defaultValue = field?.defaultValue ?? (() => {
                switch (field.type) {
                    case 'number':
                        return 0;
                    case 'text':
                        return '';
                    case 'keyValue':
                        return {};
                    default:
                        return '';
                }
            })();
            defaults[field.field] = defaultValue;
        });

        defaultState.set(defaults);
        formState.set(defaults);
    }, [schema]);

    return (<form
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

            <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                {schema.map((schemaObject) => {
                    const {field, type} = schemaObject;
                    const key = `${field}-${type}`

                    return (<ComponentSpawner key={key} schemaObject={schemaObject}
                                              state={formState.nested(schemaObject.field)}
                                              errorState={errorState.nested(schemaObject.field)}/>)
                })}
            </div>
        </form>);
});

ProductForm.displayName = "ProductForm";
