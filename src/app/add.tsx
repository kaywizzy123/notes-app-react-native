import useNotesStore from "@/store/useNotes";
import { CATEGORY } from "@/utils/constants";
import { formatDate } from "@/utils/date";
import { DateTimePicker } from "@expo/ui/community/datetime-picker";
import { Feather, FontAwesome } from "@expo/vector-icons";
import * as Crypto from "expo-crypto";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Add() {
  const router = useRouter();
  const { addNote } = useNotesStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(() => new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleAddNote = () => {
    if (!title.trim()) return;

    if (!selectedCategory) {
      Alert.alert("Category Required", "Please select a category for your note.");
      return;
    }

    addNote({
      id: Crypto.randomUUID(),
      title,
      description,
      category: selectedCategory,
      date: formatDate(date),
      isCompleted: false,
    });
    Alert.alert("Success", "Note Added Successfully.", [
      { text: "Done", style: "cancel", onPress: () => router.back() },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 p-4 bg-alabaster">
      <Pressable
        onPress={() => router.back()}
        className="flex-row items-center gap-2"
      >
        <FontAwesome name="chevron-left" size={18} color="black" />
        <Text>Back</Text>
      </Pressable>
      <TextInput
        placeholder="Note Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#3830a35e"
        className="text-4xl font-semibold mt-4"
      />
      <TextInput
        placeholder="Enter your thought"
        value={description}
        onChangeText={setDescription}
        placeholderTextColor="#3830a35e"
        multiline
        textAlignVertical="top"
        className="text-2xl font-semibold mt-6"
      />
      <View className="mt-64 flex-row items-center gap-2">
        <Feather name="calendar" size={18} className="text-governor-bay" />
        <Text className="text-base font-semibold text-gray-500">Date:</Text>
        {Platform.OS === "ios" ? (
          <DateTimePicker
            value={date}
            mode="date"
            display="compact"
            style={{ width: 140, height: 32 }}
            onValueChange={(_, selectedDate) => setDate(selectedDate)}
          />
        ) : (
          <>
            <Pressable
              onPress={() => setShowDatePicker(true)}
              className="rounded-3xl h-14 px-4 justify-center bg-white shadow"
            >
              <Text className="text-xl text-black">{formatDate(date)}</Text>
            </Pressable>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                onValueChange={(_, selectedDate) => {
                  setShowDatePicker(false);
                  setDate(selectedDate);
                }}
                onDismiss={() => setShowDatePicker(false)}
              />
            )}
          </>
        )}
      </View>

      <View className="mt-8 rounded-xl p-5">
        <Text className="text-gray-400 font-semibold">CATEGORY</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2 mt-4 flex-wrap">
            {CATEGORY.map((category) => {
              const bgClass =
                selectedCategory === category ? "bg-governor-bay" : "";
              const textClass =
                selectedCategory === category ? "text-white" : "text-gray-600";

              return (
                <Pressable
                  key={category}
                  className={`border border-gray-300 rounded-full px-8 py-3 ${bgClass}`}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text className={textClass}>{category}</Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <View className="flex justify-center items-center">
        <Pressable
          className="bg-governor-bay w-3/4 h-16 rounded-full mt-4 flex items-center justify-center"
          onPress={handleAddNote}
        >
          <Text className="text-white text-xl font-medium">Add Note</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
