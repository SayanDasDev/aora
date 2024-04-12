import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import CustomButton from "@/components/custom-button";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

export default function Ap() {
  return(
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="justify-center items-center w-full min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="w-[380px] h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-white text-center text-3xl font-pbold">
              Discover Endless Possibilities with{' '} 
              <Text className="text-secondary">
                Aora
              </Text>
            </Text>
            <Image
              source={images.path}
              resizeMode="contain"
              className="absolute w-[136px] h-[15px] -bottom-1 -right-8"
            />
          </View>
          <Text className="text-sm text-gray-100 mt-7 font-pregular text-center">
            Where creativity meets innovation: Embark on a journey of limitless exploration with Aora.
          </Text>
          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push('/sign-in')}
            containerStyles="w-full mt-7"
          />
          <StatusBar backgroundColor="#161622" style="light" />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}