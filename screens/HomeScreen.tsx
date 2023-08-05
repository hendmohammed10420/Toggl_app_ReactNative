/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CreationPage from './CreationPage';
import TasksList from './TasksList';
import {Icon} from '@rneui/base';
const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator initialRouteName="Create Task">
      <Tab.Screen
        name="Tasks List"
        component={TasksList}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="list" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Creat task"
        component={CreationPage}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="add" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
