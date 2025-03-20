import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { supabase } from '../lib/supabaseClient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the type for the navigation stack parameters
type AuthStackParamList = {
    SignIn: undefined;
    SignUp: undefined;
};

// Define the navigation prop type for the SignInScreen
type SignInScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'SignIn'>;

export default function SignInScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation<SignInScreenNavigationProp>();

    const handleSignIn = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            Alert.alert('Error', error.message);
        } else {
            Alert.alert('Success', 'Signed in successfully!');
            //navigation.navigate('Home'); // Navigate to the home screen (if applicable)
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <Button title="Sign In" onPress={handleSignIn} />
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signUpText}>Don’t have an account? Sign up</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5', // Light gray background
    },
    input: {
        marginBottom: 15,
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff', // White background for inputs
    },
    button: {
        marginTop: 10,
        backgroundColor: '#007bff', // Blue background for the button
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff', // White text for the button
        fontSize: 16,
    },
    signUpText: {
        marginTop: 15,
        color: '#007bff', // Blue text for the sign-up link
        textAlign: 'center',
        fontSize: 14,
    },
    errorText: {
        color: 'red', // Red text for error messages
        textAlign: 'center',
        marginBottom: 10,
    },
});