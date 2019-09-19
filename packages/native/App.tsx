import React from 'react';
import { createAppContainer, NavigationScreenProps } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AntDesign } from '@expo/vector-icons';

import { Inbox } from './src/components/Inbox/Inbox';
import { Task } from './src/components/Task/Task';
import { InboxContextProvider } from './src/context/InboxContext';

const InboxNavigator = createStackNavigator(
  {
    Inbox,
    Task: Task as React.FC,
  },
  {
    initialRouteName: 'Inbox',
    navigationOptions: {
      tabBarLabel: 'Inbox',
      tabBarIcon: ({ tintColor }) => <AntDesign name="inbox" color={tintColor} size={24} />,
    },
  },
);

const Tabs = createBottomTabNavigator({ InboxNavigator });

const AppContainer = createAppContainer(Tabs);

export const App = () => {
  return (
    <InboxContextProvider>
      <AppContainer />
    </InboxContextProvider>
  );
};

export default App;
