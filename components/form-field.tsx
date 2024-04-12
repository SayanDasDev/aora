import { View, Text, TextInput, TouchableOpacity, Image, KeyboardTypeOptions } from 'react-native'
import React from 'react'
import { icons } from '@/constants'

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  keyboardType
}:{
  title: string,
  value: string,
  placeholder?: string,
  handleChangeText: (value: string) => void,
  otherStyles?: string,
  keyboardType?: KeyboardTypeOptions,
}) => {

  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base font-pmedium text-gray-100'>{title}</Text>
      <View className='w-full flex-row h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 items-center focus:border-secondary'>
        <TextInput 
          className='flex-1 text-white font-psemibold text-base' 
          value={value}
          placeholder={placeholder}
          placeholderTextColor='#7b7b8b'
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
          keyboardType={keyboardType}
        />
        {
          title === 'Password' && (
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
            >
              <Image 
                source={showPassword ? icons.eyeHide : icons.eye}
                resizeMode='contain'
                className='w-6 h-6 ml-2'
              />
            </TouchableOpacity>
          )
        }
      </View>
    </View>
  )
}

export default FormField