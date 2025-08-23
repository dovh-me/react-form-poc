import type { ChangeEvent } from "react";
import type { InputFieldProps } from "./types.ts";

export const KeyValueInputField = (props: InputFieldProps<Record<string, string>>) => {
    const { label, helperText, value = {}, onChange } = props;
    const entries = Object.entries(value || {});
    
    const handleKeyChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const newKey = event.target.value;
        const oldKey = entries[index][0];
        const oldValue = entries[index][1];
        
        // Create a new object with the updated key
        const newValue = { ...value };
        delete newValue[oldKey];
        newValue[newKey] = oldValue;
        
        // Create a new event with the updated value
        const newEvent = {
            ...event,
            target: {
                ...event.target,
                value: newValue
            }
        } as ChangeEvent<HTMLInputElement>;
        
        onChange?.(newEvent);
    };
    
    const handleValueChange = (key: string, event: ChangeEvent<HTMLInputElement>) => {
        const newValue = {
            ...value,
            [key]: event.target.value
        };
        
        // Create a new event with the updated value
        const newEvent = {
            ...event,
            target: {
                ...event.target,
                value: newValue
            }
        } as ChangeEvent<HTMLInputElement>;
        
        onChange?.(newEvent);
    };
    
    const addKeyValuePair = () => {
        const newKey = `key${Object.keys(value).length + 1}`;
        const newValue = {
            ...value,
            [newKey]: ""
        };
        
        // Create a synthetic event with the updated value
        const newEvent = {
            target: {
                value: newValue
            }
        } as unknown as ChangeEvent<HTMLInputElement>;
        
        onChange?.(newEvent);
    };
    
    const removeKeyValuePair = (key: string) => {
        const newValue = { ...value };
        delete newValue[key];
        
        // Create a synthetic event with the updated value
        const newEvent = {
            target: {
                value: newValue
            }
        } as unknown as ChangeEvent<HTMLInputElement>;
        
        onChange?.(newEvent);
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                alignItems: "flex-start",
                width: "100%"
            }}
        >
            {label && <div style={{ fontSize: "0.8rem" }}>{label}</div>}
            
            {entries.length === 0 ? (
                <div style={{ fontStyle: "italic", fontSize: "0.8rem" }}>No key-value pairs</div>
            ) : (
                entries.map(([key, val], index) => (
                    <div 
                        key={index} 
                        style={{ 
                            display: "flex", 
                            width: "100%", 
                            gap: "10px",
                            marginBottom: "5px"
                        }}
                    >
                        <input
                            placeholder="Key"
                            style={{ flex: 1, padding: "10px 5px", border: "grey 1px solid" }}
                            value={key}
                            onChange={(e) => handleKeyChange(index, e)}
                        />
                        <input
                            placeholder="Value"
                            style={{ flex: 1, padding: "10px 5px", border: "grey 1px solid" }}
                            value={val}
                            onChange={(e) => handleValueChange(key, e)}
                        />
                        <button 
                            onClick={() => removeKeyValuePair(key)}
                            style={{ 
                                padding: "5px 10px", 
                                backgroundColor: "#f44336", 
                                color: "white", 
                                border: "none", 
                                cursor: "pointer" 
                            }}
                        >
                            X
                        </button>
                    </div>
                ))
            )}
            
            <button 
                onClick={(e) => {
                    addKeyValuePair();
                    e.preventDefault()
                }}
                style={{ 
                    padding: "5px 10px", 
                    backgroundColor: "#4CAF50", 
                    color: "white", 
                    border: "none", 
                    cursor: "pointer",
                    marginTop: "5px"
                }}
            >
                Add Key-Value Pair
            </button>
            
            {helperText && (
                <div style={{ color: "red", fontSize: "0.7rem", paddingTop: "-2px" }}>
                    {helperText}
                </div>
            )}
        </div>
    );
};