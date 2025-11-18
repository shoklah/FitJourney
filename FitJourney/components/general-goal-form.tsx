import React from "react";
import { View } from "react-native/Libraries/Components/View/View";
import { InputForm, InputFieldConfig, InputFormProps } from "./input-form";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";


export type GeneralGoalConfig = {
    label: string;
    fields: InputFieldConfig[];
};

export type GeneralGoalFormProps = {
    goals: GeneralGoalConfig;
    onSubmit?: InputFormProps["onSubmit"];
    onCancel?: InputFormProps["onCancel"];
    submitButtonText?: string;
    showCancelButton?: boolean;
};



export default function GeneralGoalForm(props: GeneralGoalFormProps) {

    return (
        <ThemedView>
            <ThemedText>
                {props.goals.label}
            </ThemedText>
            <InputForm
                fields={props.goals.fields}
                onSubmit={props.onSubmit}
                onCancel={props.onCancel}
                submitButtonText={props.submitButtonText}
                showCancelButton={props.showCancelButton}
            />
        </ThemedView>
    );
}