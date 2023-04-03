import React from "react";
import MainScreen from './components/MainScreen';
import NoteScreen from './components/NoteScreen';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function Navigate() {
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen 
                name="Main"
                component={MainScreen}
                options={
                    {
                        title:'Notes',
                        headerStyle: 
                        { 
                            backgroundColor: '#3385ff'
                        }                        
                    }
                }
            />
            <Stack.Screen 
                name="Note"
                component={NoteScreen}
                options={
                    {
                        headerStyle: { backgroundColor: '#3385ff' },
                        headerTitleStyle: { fontWeight: '100'}
                    }
                } 
            />            
        </Stack.Navigator>
    </NavigationContainer>;
}