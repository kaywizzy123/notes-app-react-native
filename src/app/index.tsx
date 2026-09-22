import NoteCard from "@/components/NoteCard";
import { CATEGORY } from "@/utils/constants";
import { AntDesign } from "@expo/vector-icons";
import { SymbolView } from "expo-symbols";
import { useState } from "react";

import {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <SafeAreaView className="flex-1 p-4 bg-alabaster">
      <View className="flex-1 relative">
        <View>
          <View
            pointerEvents="none"
            style={{ position: "absolute", left: 16, top: 17, zIndex: 1 }}
          >
            <SymbolView
              name={{
                ios: "magnifyingglass",
                android: "search",
                web: "search",
              }}
              size={20}
              tintColor="#393e46"
            />
          </View>
          <TextInput
            className="relative bg-white border border-gray-300 h-14 rounded-full p-4 pl-12 w-full"
            placeholder="Search your thoughts..."
            placeholderTextColor="#393e46"
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText !== "" && (
            <Pressable
              onPress={() => setSearchText("")}
              accessibilityRole="button"
              accessibilityLabel="Cancel"
              style={{ position: "absolute", right: 16, top: 17 }}
            >
              <SymbolView
                name={{ ios: "xmark.circle", android: "cancel", web: "cancel" }}
                size={20}
                tintColor="#3830a3"
              />
            </Pressable>
          )}
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="min-h-12 max-h-12 mt-4"
          contentContainerStyle={{
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
            paddingHorizontal: 4,
          }}
        >
          {CATEGORY.map((item) => {
            const isSelected = selectedCategory === item;
            return (
              <Pressable
                key={item}
                onPress={() => handleCategoryClick(item)}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 28,
                  borderRadius: 999,
                  backgroundColor: isSelected ? "#3830a3" : "#fff",
                  borderWidth: 0.5,
                  borderColor: isSelected ? "#3830a3" : "#d1d5db",
                }}
              >
                <Text
                  className={`text-sm ${isSelected ? "text-white" : "#4b5563"}`}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
        <FlatList
          data={[
            {
              id: "1",
              title: "First Note",
              description: "This is the first note",
              date: new Date().toDateString(),
              category: CATEGORY[2],
              isCompleted: true,
            },
            {
              id: "2",
              title: "Second Note",
              description: "This is the second note",
              date: new Date().toDateString(),
              category: CATEGORY[0],
              isCompleted: false,
            },
          ]}
          keyExtractor={(note) => note.id}
          renderItem={({ item }) => <NoteCard note={item} />}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
        <Pressable className="absolute -bottom-4 right-5 bg-governor-bay p-5 rounded-full shadow-2xl z-50">
          <AntDesign name="plus" size={30} color="white" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
