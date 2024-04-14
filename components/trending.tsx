import { useState } from "react";
import * as Animatable from "react-native-animatable";
import {
  FlatList,
  Image,
  ImageBackground, TouchableOpacity,
  View,
  ViewToken
} from "react-native";

import { icons } from "../constants";
import { ResizeMode, Video } from "expo-av";

const zoomIn = {
  0: {
    scaleX: 0.9,
    scaleY: 0.9,
  },
  1: {
    scaleX: 1,
    scaleY: 1,
  },
};

const zoomOut = {
  0: {
    scaleX: 1,
    scaleY: 1,
  },
  1: {
    scaleX: 0.9,
    scaleY: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }:{activeItem: any, item: any}) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-3"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={250}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          className="w-52 h-80 rounded-[33px] mt-3 bg-black-100"
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.isLoaded && status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative flex justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{
              uri: item.thumbnail,
            }}
            className="w-52 h-80 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const TrendingScroll = ({ activeItem, item }:{activeItem: any, item: any}) => {
  return (
    <Animatable.View
      className="h-full"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={250}
    >
      <View className={`h-1.5 w-2.5 ${activeItem === item.$id ? `bg-secondary` : `bg-gray-100/30`} mr-0.5 rounded-full`}></View>
    </Animatable.View>
  );
}

const Trending = ({ posts }: {posts: any}) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChanged = ({ viewableItems } : {viewableItems : ViewToken[]}) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <>
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 85,
      }}
      contentOffset={{ x: 170, y: 0 }}
      showsHorizontalScrollIndicator={false}
      />
      <FlatList
        data={posts}
        horizontal
        className="mx-auto mt-3"
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <TrendingScroll activeItem={activeItem} item={item} />
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 85,
        }}
        contentOffset={{ x: 170, y: 0 }}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

export default Trending;