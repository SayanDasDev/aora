import { Alert, Image, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormField from "@/components/form-field";
import CustomButton from "@/components/custom-button";
import { Link, router } from "expo-router";
import { createUser } from "@/lib/appwrite";
import { AppwriteException } from "react-native-appwrite/src";

const SignIn = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password || !form.username) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      //TODO: Set it to global state
      router.replace("/home");
    } catch (error: any) {
      if (error instanceof AppwriteException) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full min-h-[85vh] justify-center px-4 py-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl font-psemibold text-white mt-10">
            Sign up to Aura
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(username: string) =>
              setForm({ ...form, username })
            }
            otherStyles="mt-7"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(email: string) => setForm({ ...form, email })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(password: string) =>
              setForm({ ...form, password })
            }
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign Up"
            containerStyles="mt-10"
            handlePress={submit}
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 gap-2 flex-row font-pregular">
            <Text className="text-gray-100 text-lg text-center mt-4">
              Already have an account?
              <Link href={"/sign-in"}>
                <Text className="text-secondary font-psemibold"> Sign In</Text>
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
