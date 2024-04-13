import { View, TextInput, KeyboardTypeOptions, TouchableOpacity, Image } from "react-native";
import React from "react";
import { icons } from "@/constants";

const SearchInput = ({
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  keyboardType,
}: {
  value: string;
  placeholder?: string;
  handleChangeText: (value: string) => void;
  otherStyles?: string;
  keyboardType?: KeyboardTypeOptions;
}) => {
  return (
    <View className={`w-full flex-row h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 items-center focus:border-secondary space-x-4 ${otherStyles}`}>
      <TextInput
        className="flex-1 text-white mt-0.5 font-pregular text-base"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        keyboardType={keyboardType}
      />
      <TouchableOpacity>
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
