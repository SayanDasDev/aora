import { Image, ImageSourcePropType, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

import { icons } from '../../constants'
import { StatusBar } from 'expo-status-bar'

const TabIcon = ({icon, name, color, focused}:{
  icon: ImageSourcePropType,
  color: string,
  name: string,
  focused: boolean
}) => {
  return (
    <View className='items-center justify-center gap-2 pt-px'>
      <Image
        source={icon}
        tintColor={color}
        className='w-5 h-5'
        resizeMode='contain'
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs pl-[2px]`} style={{ color: color }}>{name}</Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{ 
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#FFA001',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 1,
            borderTopColor: '#232533',
            height: 84,
          }
         }}
      >
        <Tabs.Screen name='home' options={{ 
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon icon={icons.home} color={color} name='Home' focused={focused} />
            )
          }} />
        <Tabs.Screen name='bookmark' options={{ 
            title: 'Bookmark',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon icon={icons.bookmark} color={color} name='Bookmark' focused={focused} />
            )
          }} />
        <Tabs.Screen name='create' options={{ 
            title: 'Create',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon icon={icons.plus} color={color} name='Create' focused={focused} />
            )
          }} />
        <Tabs.Screen name='profile' options={{ 
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon icon={icons.profile} color={color} name='Profile' focused={focused} />
            )
          }} />
      </Tabs>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  )
}

export default TabsLayout
