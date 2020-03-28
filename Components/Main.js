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
import Detail from './Detail'
import Settings from './Settings'
import MyEntries from './MyEntries'

const HomeStack = createStackNavigator({
  Desaparecidos: MissingPeopleList,
  Detail: Detail
});

const Homeless = createStackNavigator({
  "Situação de rua": HomelessPeopleList,
  Detail: Detail
});

const AddStack = createStackNavigator({
  Adicionar: AddPeople,
  Detail: Detail
});

const SettingsStack = createStackNavigator({
  Settings: Settings,
  MyEntries: MyEntries,
  Detail: Detail
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
      screen: AddStack,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name='camera' size={28} color={tintColor} />
        )
      })
    },
  Settings: {
      screen: SettingsStack,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name='cog' size={30} color={tintColor} />
        )
      })
    },
});


export default createAppContainer(TabNavigator);