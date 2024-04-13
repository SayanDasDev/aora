import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants";
import CustomButton from "./custom-button";
import { router } from "expo-router";

const EmptyState = ({
  title,
  subtitle,
  withButton = false,
  buttonTitle,
  buttonHref,
}:{
  title: string;
  subtitle: string;
  withButton?: boolean;
  buttonTitle?: string;
  buttonHref?: string;
}) => {
  return (
    <View className="justify-center items-center p-4">
      <Image
        source={images.empty}
        resizeMode="contain"
        className="w-[270px] h-[215px]"
      />
      <Text className="text-xl mt-2 text-white font-psemibold">{title}</Text>
      <Text className="text-gray-100 text-sm font-pmedium">{subtitle}</Text>
      {withButton && buttonTitle && buttonHref && 
        <CustomButton
          title={buttonTitle}
          handlePress={() => {router.push(buttonHref)}}
          containerStyles="mt-4 px-6"
        />
      }
    </View>
  );
};

export default EmptyState;
