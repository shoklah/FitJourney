import React from 'react';
import { Button, type ButtonProps } from 'react-native';
import { StyleSheet, View } from 'react-native';

export type HomePageButtonProps = ButtonProps & {
  title: string;
  onPress: () => void;
};

export function HomePageButton({title, onPress}: HomePageButtonProps) {
    return (
        <View style={styles.container}>
            <Button
                title={title}
                onPress={onPress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A1CEDC',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#1D3D47'
    },
});
