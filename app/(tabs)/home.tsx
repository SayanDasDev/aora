import { FlatList, Image, RefreshControl, Text, View } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import SearchInput from '@/components/search-input'
import Trending from '@/components/trending'
import EmptyState from '@/components/empty-state'
import { getAllPosts } from '@/lib/appwrite'
import { useAppwrite } from '@/lib/useAppwrite'
import VideoCard from '@/components/video-card'

const Home = () => {

  const { data: posts, refetch } = useAppwrite(getAllPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }

  return (
    <SafeAreaView>
      <FlatList
        className=' bg-primary h-full'
        data={posts}
        keyExtractor={(item: any) => item.$id}
        renderItem={({ item }: {item: any}) => (
          <VideoCard posts={item} />
        )}
        ListHeaderComponent={() => (
          <View className='my-6 px-4 space-y-6'>
            <View className='justify-between items-start flex-row mb-6'>
              <View>
                <Text className='text-gray-100 text-sm font-pmedium'>
                  Welcome!
                </Text>
                <Text className='text-2xl text-white font-psemibold'>
                  SayanDasDev
                </Text>
              </View>
              <View className='mt-1.5'>
                <Image
                  className='w-9 h-10'
                  source={images.logoSmall}
                  resizeMode='contain'
                />
              </View>
            </View>
            <SearchInput 
              value=''
              placeholder='Search for a video topic'
              handleChangeText={() => {}}
            />
            <View className='w-full flex-1 pt-5 pb-8'>
              <Text className='text-gray-100 text-lg font-pregular mb-3'>
                Latest Videos
              </Text>
              <Trending posts={[{id: 1}, {id: 2}, {id: 3}] ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No videos found'
            subtitle='Be the first to upload a video!'
            withButton
            buttonTitle='Upload a Video'
            buttonHref='/create'
          />
        )}
        refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }
      />
    </SafeAreaView>
  )
}

export default Home
