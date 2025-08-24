import { useState, type ChangeEvent, useEffect } from "react";
import type { InputFieldProps } from "./types.ts";

export const KeyValueInputField = (props: InputFieldProps<Record<string, string>>) => {
  const { label, helperText, value = {}, onChange,  } = props;
  const entries = Object.entries(value || {});
  const [keyErrors, setKeyErrors] = useState<Record<number, string>>({});
  const [hasKeyErrors, setHasKeyErrors] = useState<boolean>(false);
  const [activeEditIndex, setActiveEditIndex] = useState<number | null>(null);

  // Check if there are any empty or duplicate keys
  useEffect(() => {
    const hasErrors = Object.keys(keyErrors).length > 0;
    setHasKeyErrors(hasErrors);
  }, [keyErrors]);

  const handleKeyChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const newKey = event.target.value;
    const oldKey = entries[index][0];
    const oldValue = entries[index][1];

    // If the new key is empty, set an error but still update the state
    if (newKey.trim() === '') {
      setKeyErrors(prev => ({ ...prev, [index]: "Key cannot be empty" }));
      setActiveEditIndex(index);
    } else {
      // Check for duplicate keys
      const isDuplicate = entries.some(
        ([k], i) => 
          i !== index && 
          k !== oldKey && 
          !k.startsWith('__empty_key_') && 
          k === newKey
      );

      if (isDuplicate) {
        setKeyErrors(prev => ({ ...prev, [index]: "Duplicate key is not allowed" }));
      } else {
        // Clear error if key is valid
        setKeyErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[index];
          return newErrors;
        });

        // If this was the active edit index, clear it
        if (activeEditIndex === index) {
          setActiveEditIndex(null);
        }
      }
    }

    // Create a new object with the updated key
    const newValue = { ...value };
    delete newValue[oldKey];
    if (newKey.trim() !== '') {
      newValue[newKey] = oldValue;
    } else {
      // For empty keys, store them with a temporary key that includes the index
      // This allows the user to clear the field while maintaining the value
      newValue[`__empty_key_${index}`] = oldValue;
    }

    // Create a new event with the updated value
    const newEvent = {
      ...event,
      target: {
        ...event.target,
        value: newValue,
      },
    } as unknown as ChangeEvent<HTMLInputElement>;

    onChange?.(newEvent);
  };

  const handleValueChange = (key: string, event: ChangeEvent<HTMLInputElement>) => {
    // Skip value changes for temporary empty keys
    if (key.startsWith('__empty_key_')) {
      return;
    }

    const newValue = {
      ...value,
      [key]: event.target.value,
    };

    // Create a new event with the updated value
    const newEvent = {
      ...event,
      target: {
        ...event.target,
        value: newValue,
      },
    } as unknown as ChangeEvent<HTMLInputElement>;

    onChange?.(newEvent);
  };

  const addKeyValuePair = () => {
    const newKey = `key${Object.keys(value).length + 1}`;
    const newValue = {
      ...value,
      [newKey]: "",
    };

    // Create a synthetic event with the updated value
    const newEvent = {
      target: {
        value: newValue,
      },
    } as unknown as ChangeEvent<HTMLInputElement>;

    onChange?.(newEvent);
  };

  const removeKeyValuePair = (key: string) => {
    const newValue = { ...value };
    delete newValue[key];

    // If we're removing a key-value pair with an empty key, also clear the error
    if (key.startsWith('__empty_key_')) {
      // Extract the index from the temporary key
      const indexStr = key.replace('__empty_key_', '');
      const index = parseInt(indexStr, 10);

      if (!isNaN(index)) {
        setKeyErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[index];
          return newErrors;
        });

        // If this was the active edit index, clear it
        if (activeEditIndex === index) {
          setActiveEditIndex(null);
        }
      }
    }

    // Create a synthetic event with the updated value
    const newEvent = {
      target: {
        value: newValue,
      },
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
        width: "100%",
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
              marginBottom: "5px",
            }}
          >
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <input
                placeholder="Key"
                style={{ 
                  width: "100%", 
                  padding: "10px 5px", 
                  border: keyErrors[index] ? "orange 1px solid" : "grey 1px solid",
                  backgroundColor: activeEditIndex !== null && activeEditIndex !== index ? "black" : "grey"
                }}
                value={key.startsWith('__empty_key_') ? '' : key}
                onChange={(e) => handleKeyChange(index, e)}
                disabled={activeEditIndex !== null && activeEditIndex !== index}
              />
              {keyErrors[index] && (
                <div style={{ color: "orange", fontSize: "0.7rem" }}>
                  {keyErrors[index] === "Duplicate key is not allowed" 
                    ? "Duplicate key is not allowed. Please use a unique key name."
                    : "Key cannot be empty. You can edit this field, but you must provide a unique key before adding new pairs."}
                </div>
              )}
            </div>
            <input
              placeholder="Value"
              style={{ 
                flex: 1, 
                padding: "10px 5px", 
                border: "grey 1px solid",
                backgroundColor: hasKeyErrors || key.startsWith('__empty_key_') ? "black" : "grey"
              }}
              value={val}
              onChange={(e) => handleValueChange(key, e)}
              disabled={hasKeyErrors || key.startsWith('__empty_key_')}
            />
            <button
              onClick={() => removeKeyValuePair(key)}
              style={{
                padding: "5px 10px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                cursor: "pointer",
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
          e.preventDefault();
        }}
        disabled={hasKeyErrors}
        style={{
          padding: "5px 10px",
          backgroundColor: hasKeyErrors ? "#cccccc" : "#4CAF50",
          color: "white",
          border: "none",
          cursor: hasKeyErrors ? "not-allowed" : "pointer",
          marginTop: "5px",
        }}
      >
        Add Key-Value Pair
      </button>

      {hasKeyErrors && (
        <div style={{ color: "orange", fontSize: "0.8rem", marginTop: "5px" }}>
          Please fix all key errors before adding new pairs
        </div>
      )}

      {helperText && (
        <div style={{ color: "red", fontSize: "0.7rem", paddingTop: "-2px" }}>{helperText}</div>
      )}
    </div>
  );
};
