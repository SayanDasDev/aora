import { View, Text } from 'react-native'
import React from 'react'

const InfoBox = ({
  title,
  subtitle,
  containerStyles,
  titleStyles
}:{
  title: string,
  subtitle?: string,
  containerStyles?: string,
  titleStyles?: string
}) => {
  return (
    <View className={`${containerStyles}`}>
      <Text className={`${titleStyles} text-white font-psemibold text-center`}>{title}</Text>
      {subtitle && <Text className="text-gray-100 font-pregular text-sm">{subtitle}</Text> }
    </View>
  )
}

export default InfoBox