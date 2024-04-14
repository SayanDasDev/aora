import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { ResizeMode, Video } from "expo-av";

const VideoCard = ({ posts }: { posts: any }) => {
  const {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  } = posts;

  const [play, setPlay] = useState(false);

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="items-center justify-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              className="w-full h-full rounded-lg"
              source={{ uri: avatar }}
              resizeMode="cover"
            />
          </View>
          <View className="flex-1 ml-3 justify-center">
            <Text className="text-white font-psemibold text-base" numberOfLines={1}>{title}</Text>
            <Text className="text-gray-100 font-pregular text-xs" numberOfLines={1}>{username}</Text>
          </View>
        </View>
        <View className="pt-2">
          <Image
            className="w-5 h-5"
            source={icons.menu}
            resizeMode="contain"
          />
        </View>
      </View>
      {play ? (
        <Video
        source={{ uri: video }}
        className="w-full h-60 rounded-xl mt-3 bg-black-100"
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay
        onPlaybackStatusUpdate={(status) => {
          if (status.isLoaded && status.didJustFinish) {
            setPlay(false);
          }
        }}
      />
    ) : 
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setPlay(true)}
        className="w-full h-60 relative rounded-xl mt-3 justify-center items-center"
      >
        <Image
          source={{ uri: thumbnail }}
          className="w-full h-full rounded-xl mt-3"
          resizeMode="cover"
        />
        <Image
          className="absolute w-12 h-12"
          source={icons.play}
          resizeMode="contain"
        />
      </TouchableOpacity>}
    </View>
  );
};

export default VideoCard;
