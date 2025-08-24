/* eslint-disable @typescript-eslint/no-explicit-any */
import type {SchemaObject} from "../../use-cases";
import {getInputComponent} from "../../use-cases/getInputComponent.ts";
import {type State, useHookstate} from "@hookstate/core";
import {snakeToDisplayString} from "../../utils/snakeToDisplayString.ts";
import type {ChangeEvent} from "react";

type Props = {
    schemaObject: SchemaObject; state: State<any>; errorState: State<string>;
}

export const ComponentSpawner = (props: Props) => {
    const {schemaObject, state, errorState} = props
    const scopedState = useHookstate(state);
    const { type, field } = schemaObject;
    const label = snakeToDisplayString(field);
    const Component = getInputComponent(type);

    const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e?.target?.value;
       scopedState.set(value);
    };

    return (<>
            <Component
                {...schemaObject}
                label={label}
                value={scopedState.get()}
                onChange={changeHandler}
                helperText={errorState.get()}
                {...schemaObject} />
        </>);
}