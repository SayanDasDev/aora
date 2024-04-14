import { FlatList, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "@/components/empty-state";
import { getUserPosts, signOut } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import VideoCard from "@/components/video-card";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Image } from "react-native-animatable";
import { icons } from "@/constants";
import InfoBox from "@/components/info-box";
import { router } from "expo-router";

const Profile = () => {

  const {user, setUser, setIsLoggedIn} = useGlobalContext();

  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/sign-in");
  }

  return (
    <SafeAreaView>
      <FlatList
        className=" bg-primary h-full"
        data={posts}
        keyExtractor={(item: any) => item.$id}
        renderItem={({ item }: { item: any }) => <VideoCard posts={item} />}
        ListHeaderComponent={() => (
          <View className="w-full mt-6 mb-12 px-4 items-center justify-center">
            <TouchableOpacity
              className="w-full items-end mb-10 px-2"
              onPress={logout}
            >
              <Image
                source={icons.logout}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary justify-center items-center rounded-lg">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>
            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />
            <View className="mt-5 flex-row">
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                containerStyles="mr-10"
                titleStyles="text-xl"
              />
              <InfoBox 
                title="22.5 k" 
                subtitle="Followers" 
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="You haven't uploaded any videos yet."
            withButton
            buttonTitle="Upload Video"
            buttonHref="/create"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
