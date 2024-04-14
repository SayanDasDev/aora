import { View, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({
  placeholder,
  otherStyles,
  initialQuery
}: {
  placeholder?: string;
  otherStyles?: string;
  initialQuery?: string;
}) => {

  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  const handleSearch = () => {
    if(!query) return;
    if(pathname.startsWith("/search")) {
      router.setParams({ query });
    } else {
      router.push(`/search/${query}`)
    }
  }

  return (
    <View className={`w-full flex-row h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 items-center focus:border-secondary space-x-4 ${otherStyles}`}>
      <TextInput
        className="flex-1 text-white mt-0.5 font-pregular text-base"
        value={query}
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={(e)=>setQuery(e)}
        onSubmitEditing={handleSearch}
      />
      <TouchableOpacity
        onPress={handleSearch}
      >
        <Image
          source={icons.search}
          className="w-5 h-5"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
