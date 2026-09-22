import { CATEGORY } from "@/utils/constants";
import { SymbolView } from "expo-symbols";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
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
          <TextInput
            className="relative bg-white border border-gray-300 h-14 rounded-full p-4 w-full"
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
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
