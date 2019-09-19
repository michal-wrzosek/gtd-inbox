import React from 'react';
import { StyleSheet, SafeAreaView, Platform, View } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
  },
});

export const Layout: React.FC = ({ children }) => <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
