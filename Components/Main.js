import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

// import the different screens
import MissingPeopleList from './MissingPeopleList'
import Settings from './Settings'

const HomeStack = createStackNavigator({
  Desaparecidos: MissingPeopleList
});

const TabNavigator = createBottomTabNavigator({
  Desaparecidos: HomeStack,
  Settings: Settings,
});

export default createAppContainer(TabNavigator);
