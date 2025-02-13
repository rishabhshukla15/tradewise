import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

export default function AppLayout() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#58CC02',
            tabBarInactiveTintColor: '#777777',
            tabBarStyle: {
              borderTopWidth: 1,
              borderTopColor: '#E5E7EB',
              height: 60,
              paddingBottom: 8,
              paddingTop: 8,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '500',
            },
          }}
        >
          <Tabs.Screen
            name="home"
            options={{
              title: 'Home',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="home" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="search"
            options={{
              title: 'Search',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="search" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="news"
            options={{
              title: 'News',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="article" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="person" size={size} color={color} />
              ),
            }}
          />
        </Tabs>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    maxWidth: 1200,
    marginHorizontal: 'auto',
    width: '100%',
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
}); 