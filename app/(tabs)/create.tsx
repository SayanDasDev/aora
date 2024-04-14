import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/form-field";
import { ResizeMode, Video } from "expo-av";
import { Image } from "react-native-animatable";
import { icons } from "@/constants";
import CustomButton from "@/components/custom-button";
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import { createVideo } from "@/lib/appwrite";

export type TCreateForm = {
  title: string;
  video: ImagePicker.ImagePickerAsset | null;
  thumbnail: ImagePicker.ImagePickerAsset | null;
  prompt: string;
  userId: string;
}

const Create = () => {

  const [uploading, setUploading] = useState<boolean>(false);

  const { user } = useGlobalContext();

  const [form, setForm] = useState<TCreateForm>({
    title: '',
    video: null,
    thumbnail: null,
    prompt: '',
    userId: user.$id
  });

  const submit = async () => {
if (!form.title) {
  return Alert.alert('Title required', 'You have left the title field empty.');
}

if (!form.video) {
  return Alert.alert('Video required', 'You have left the video field empty.');
}

if (!form.thumbnail) {
  return Alert.alert('Thumbnail required', 'You have left the thumbnail field empty.');
}

if (!form.prompt) {
  return Alert.alert('Prompt required', 'You have left the prompt field empty.');
}

if (!form.userId) {
  return Alert.alert('User ID required', 'Could not fetch UserID.');
}

    setUploading(true);

    try {
      await createVideo(form);

      Alert.alert(
        'Success', 
        'Video post uploaded successfully!',
        [
          {
            text: 'OK',
            onPress: () => router.navigate('/home')
          }
        ]
      );
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
        userId: form.userId
      });
    } catch (error : any) {
      Alert.alert('Error', error.message)
    } finally {
      setForm({
        title: form.title,
        video: form.video,
        thumbnail: form.thumbnail,
        prompt: form.prompt,
        userId: form.userId
      });
      setUploading(false);
    }
  }

  const openPicker = async (selectType: string | string[] | undefined) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === "image" ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });

    if(!result.canceled){
      if(selectType === 'image'){
        setForm({...form, thumbnail: result.assets[0]})
      } 
      if(selectType === 'video'){
        setForm({...form, video: result.assets[0]})
      }
    }
  }

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView className="px-4 py-6">
        <Text className="text-2xl text-white font-psemibold">Create Video Post</Text>
        <FormField
          title="Caption"
          placeholder="Give a catchy caption..."
          value={form.title}
          otherStyles="mt-7"
          handleChangeText={(e) => {setForm({...form, title: e})}}
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">Video</Text>
          <TouchableOpacity
            onPress={() => openPicker('video')}
            activeOpacity={0.7}
          >
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="w-full h-64 px-4 bg-black-100 justify-center items-center rounded-2xl border-2 border-black-200">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    className="w-1/2 h-1/2"
                    resizeMode="contain"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">Thumbnail</Text>
          <TouchableOpacity
            onPress={() => openPicker('image')}
            activeOpacity={0.7}
          >
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode="contain"
              />
            ) : (
              <View className="w-full h-16 flex-row space-x-2 px-4 bg-black-100 justify-center items-center rounded-2xl border-2 border-black-200">
                <Image
                  source={icons.upload}
                  className="w-5 h-5"
                  resizeMode="contain"
                />
                <Text className="text-sm text-[#7b7b8b] font-pmedium">Choose an image</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title="Prompt"
          placeholder="The prompt you used to create this video"
          value={form.prompt}
          otherStyles="mt-7"
          handleChangeText={(e) => {setForm({...form, prompt: e})}}
        />
        <CustomButton
          title="Submit and Publish"
          handlePress={submit}
          isLoading={uploading}
          containerStyles="mt-7 mb-10"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
