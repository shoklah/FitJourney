import React from "react";
import { InputForm, InputFieldConfig, InputFormProps } from "./input-form";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";
import { useRouter } from "expo-router";

export type GeneralLoginFormProps = InputFormProps & {
    title: string;
};



export default function LoginForm(props: GeneralLoginFormProps) {
    const router = useRouter();

    return (
        <ThemedView>
            <ThemedText>
                {props.title}
            </ThemedText>
            <InputForm
                fields={props.fields}
                onSubmit={props.onSubmit}
            />
        </ThemedView>
    );
}