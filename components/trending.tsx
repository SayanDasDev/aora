import { View, Text, FlatList } from "react-native";
import React from "react";

const Trending = ({ posts }: { posts: any[] }) => {
  return (
    <FlatList
      className="w-full"
      horizontal
      data={posts}
      keyExtractor={(item : any) => item.id}
      renderItem={({ item }) => (
        <View className="">
          <Text className="text-3xl text-white">{item.id}</Text>
        </View>
      )}
    />
  );
};

export default Trending;
