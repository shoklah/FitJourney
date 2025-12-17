import React from "react";
import { InputForm, InputFieldConfig, InputFormProps } from "./input-form";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";
import { getGoals } from "@/storage/storage";
import { saveGoals } from "@/storage/storage";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

export type GeneralGoalField = InputFieldConfig & {
    category: 'workouts' | 'weight' | 'calories';
    key: string;
}

export type GeneralGoalConfig = {
    title: string;
    fields: GeneralGoalField[];
};

export type GeneralGoalFormProps = {
    goals: GeneralGoalConfig;
    onSubmit?: InputFormProps["onSubmit"];
    onCancel?: InputFormProps["onCancel"];
    submitButtonText?: string;
    showCancelButton?: boolean;
};



export default function GeneralGoalForm(props: GeneralGoalFormProps) {
    const router = useRouter();
    const handleSubmit = async (values: Record<string, any>) => {
        var data = await getGoals();
        props.goals.fields.forEach(field => {
            if (!data.goals[field.category]) {
                data.goals[field.category] = {
                    [field.key]: null,
                };
            }
            data.goals[field.category][field.key] = values[field.name];
        })

        console.log("Saving goals:", data);
    
        await saveGoals(data);
        Alert.alert("Success", "Goals updated!");
        router.back();
    };
    
    return (
        <ThemedView>
            <ThemedText>
                {props.goals.title}
            </ThemedText>
            <InputForm
                fields={props.goals.fields}
                onSubmit={handleSubmit}
                onCancel={props.onCancel}
                submitButtonText={props.submitButtonText}
                showCancelButton={props.showCancelButton}
            />
        </ThemedView>
    );
}