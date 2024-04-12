import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function Ap() {
  return(
    <View className="flex-1 items-center justify-center">
      <Text className="text-3xl font-pblack">
        Hello, World!
      </Text>
      <Link href={"/profile"} className="text-blue-400"> go to profile</Link>
      <StatusBar style="auto" />
    </View>
  )
}