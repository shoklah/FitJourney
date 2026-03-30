import { getAuth, signOut } from '@react-native-firebase/auth';
import { ThemedView } from './themed-view';
import { Button, type ButtonProps } from 'react-native';

export default function LogoutButton() {
    const handleLogout = () => {
        signOut(getAuth()).then(() => console.log('User signed out!'));
    };

    return (
        <ThemedView>
            <Button 
                onPress={handleLogout} 
                title="Logout" 
            />
        </ThemedView>
    );
}