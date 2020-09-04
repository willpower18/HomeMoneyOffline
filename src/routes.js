import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/home';
import Receitas from './pages/receitas';
import Despesas from './pages/despesas';
import Busca from './pages/busca';
import NovaReceita from './pages/novareceita';
import NovaDespesa from './pages/novadespesa';

const AppStack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator
                initialRouteName="Home"
                screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="Receitas" component={Receitas} />
                <AppStack.Screen name="Despesas" component={Despesas} />
                <AppStack.Screen name="Busca" component={Busca} />
                <AppStack.Screen name="NovaReceita" component={NovaReceita} />
                <AppStack.Screen name="NovaDespesa" component={NovaDespesa} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}
