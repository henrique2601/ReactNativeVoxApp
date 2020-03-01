import React from 'react';
import { Text, View, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/FontAwesome'

// import the different screens
import MissingPeopleList from './MissingPeopleList'
import HomelessPeopleList from './HomelessPeopleList'
import AddPeople from './AddPeople'
import Settings from './Settings'

const HomeStack = createStackNavigator({
  Desaparecidos: MissingPeopleList
});

const Homeless = createStackNavigator({
  "Situação de rua": HomelessPeopleList
});

const SettingsStack = createStackNavigator({
  Settings: Settings
});

const TabNavigator = createBottomTabNavigator({
  Desaparecidos: {
      screen: HomeStack,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name='question' size={30} color={tintColor} />
        )
      })
    },
  "Situação de rua": {
      screen: Homeless,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name='road' size={30} color={tintColor} />
        )
      })
    },
  "Adicionar": {
      screen: AddPeople,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name='camera' size={28} color={tintColor} />
        )
      })
    },
  Settings: {
      screen: Settings,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name='cog' size={30} color={tintColor} />
        )
      })
    },
});


export default createAppContainer(TabNavigator);