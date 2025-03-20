import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../components/SignInScreen';
import SignUpScreen from '../components/SignUpScreen'; // Create this screen similarly

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName="SignIn">
            <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Sign In' }} />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }} />
        </Stack.Navigator>
    );
};

export default AuthStack;