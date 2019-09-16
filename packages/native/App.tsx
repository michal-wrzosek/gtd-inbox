import React from 'react';
import { StyleSheet, SafeAreaView, Platform, View } from 'react-native';
import Constants from 'expo-constants';

import { Inbox } from './src/components/Inbox/Inbox';
import { InboxContextProvider } from './src/context/InboxContext';
import { Menu } from './src/components/Menu/Menu';

export default function App() {
  return (
    <InboxContextProvider>
      <SafeAreaView style={styles.container}>
        <Inbox />
        <View style={styles.menu}>
          <Menu />
        </View>
      </SafeAreaView>
    </InboxContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
  },
  menu: { position: 'absolute', bottom: 0, width: '100%' },
});
