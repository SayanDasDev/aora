import { Alert, Image, ScrollView, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import FormField from '@/components/form-field'
import CustomButton from '@/components/custom-button'
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '@/lib/appwrite'
import { AppwriteException } from 'react-native-appwrite/src'
import { useGlobalContext } from '@/context/GlobalProvider'

const SignIn = () => {

  const {setUser, setIsLoggedIn} = useGlobalContext();

  const [form, setForm] = useState(
    {
      email: '',
      password: ''
    }
  )

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    setIsSubmitting(true);
    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);
      router.replace("/home");
    } catch (error: any) {
      if (error instanceof AppwriteException) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className='w-full min-h-[85vh] justify-center px-4 py-6'>
          <Image 
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[35px]'
          />
          <Text className='text-2xl font-psemibold text-white mt-10'>
            Log in to Aura
          </Text>
          <FormField
            title='Email'
            value={form.email}
            handleChangeText={(email: string) => setForm({ ...form, email })}
            otherStyles='mt-7'
            keyboardType='email-address'
          />
          <FormField
            title='Password'
            value={form.password}
            handleChangeText={(password: string) => setForm({ ...form, password })}
            otherStyles='mt-7'
          />
          <CustomButton 
            title='Sign In'
            containerStyles='mt-10'
            handlePress={submit}
            isLoading={isSubmitting}
          />
          <View className='justify-center pt-5 gap-2 flex-row font-pregular'>
            <Text className='text-gray-100 text-lg text-center mt-4'>
              Don't have an account? 
              <Link href={'/sign-up'}>
                <Text className='text-secondary font-psemibold'> Sign Up</Text>
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
