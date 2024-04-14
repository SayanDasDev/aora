import { FlatList, Image, Text, View } from "react-native";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import SearchInput from "@/components/search-input";
import EmptyState from "@/components/empty-state";
import { searchPosts } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import VideoCard from "@/components/video-card";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();

  let searchQuery = "";
  const { data: posts, refetch } = useAppwrite(() => {
    if (typeof query === "string") {
      searchQuery = query;
      return searchPosts(query);
    } else if (Array.isArray(query)) {
      return searchPosts(query[0]);
    } else {
      return searchPosts("");
    }
  });

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView>
      <FlatList
        className=" bg-primary h-full"
        data={posts}
        keyExtractor={(item: any) => item.$id}
        renderItem={({ item }: { item: any }) => <VideoCard posts={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="text-gray-100 text-sm font-pmedium">
              Search results for
            </Text>
            <Text className="text-2xl text-white font-psemibold">{query}</Text>
            <View className="mt-6 mb-8">
              <SearchInput
                initialQuery={searchQuery}
                placeholder="Search for a video topic"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="No videos found matching your search!"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
