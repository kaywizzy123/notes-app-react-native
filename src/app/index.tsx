import NoteCard from "@/components/NoteCard";
import useNotesStore from "@/store/useNotes";
import { CATEGORY } from "@/utils/constants";
import { formatDate, getDueStatus } from "@/utils/date";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useColorScheme } from "nativewind";
import { useMemo, useState } from "react";

import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SortOrder = "asc" | "desc" | null;

const SORT_OPTIONS: { label: string; value: SortOrder }[] = [
  { label: "Latest due date", value: "desc" },
  { label: "Earliest due date", value: "asc" },
];

const HomeScreen = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const [showOverdueOnly, setShowOverdueOnly] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const { notes } = useNotesStore();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const isFilterActive = Boolean(sortOrder) || showOverdueOnly;

  const filteredNotes = useMemo(() => {
    let result = notes;

    if (selectedCategory) {
      result = result.filter((note) => note.category === selectedCategory);
    }

    if (searchText.trim()) {
      const query = searchText.toLocaleLowerCase();
      result = result.filter(
        (note) =>
          note.title.toLocaleLowerCase().includes(query) ||
          formatDate(new Date(note.dueDate))
            .toLocaleLowerCase()
            .includes(query),
      );
    }

    if (showOverdueOnly) {
      result = result.filter(
        (note) => getDueStatus(note.dueDate) === "overdue",
      );
    }

    if (sortOrder) {
      result = [...result].sort((a, b) => {
        const diff = a.dueDate - b.dueDate;
        return sortOrder === "asc" ? diff : -diff;
      });
    }

    return result;
  }, [notes, searchText, selectedCategory, sortOrder, showOverdueOnly]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? "" : category));
  };

  return (
    <SafeAreaView
      className="flex-1 p-4 bg-alabaster dark:bg-neutral-900"
      edges={["top", "left", "right"]}
    >
      <View className="flex-1 relative">
        <View className="flex-row items-center gap-2">
          <View className="flex-1 relative">
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
                tintColor={isDark ? "#9ca3af" : "#393e46"}
              />
            </View>
            <TextInput
              className="relative bg-white border border-gray-300 h-14 rounded-full py-0 px-4 pl-12 w-full dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
              style={{ textAlignVertical: "center" }}
              placeholder="Search your thoughts..."
              placeholderTextColor={isDark ? "#737373" : "#393e46"}
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
                  name={{
                    ios: "xmark.circle",
                    android: "cancel",
                    web: "cancel",
                  }}
                  size={20}
                  tintColor={isDark ? "#818cf8" : "#3830a3"}
                />
              </Pressable>
            )}
          </View>
          <Pressable
            onPress={() => setShowSortMenu(true)}
            accessibilityRole="button"
            accessibilityLabel="Filter by due date"
            className={`h-14 w-14 items-center justify-center rounded-full border ${
              isFilterActive
                ? "bg-governor-bay border-governor-bay"
                : "bg-white border-gray-300 dark:bg-neutral-800 dark:border-neutral-700"
            }`}
          >
            <SymbolView
              name={{
                ios: "line.3.horizontal.decrease.circle",
                android: "filter_list",
                web: "filter_list",
              }}
              size={20}
              tintColor={
                isFilterActive ? "#ffffff" : isDark ? "#9ca3af" : "#393e46"
              }
            />
          </Pressable>
        </View>

        <Modal
          visible={showSortMenu}
          transparent
          animationType="fade"
          onRequestClose={() => setShowSortMenu(false)}
        >
          <Pressable style={{ flex: 1 }} onPress={() => setShowSortMenu(false)}>
            <View
              className="absolute bg-white rounded-2xl border border-gray-300 dark:bg-neutral-800 dark:border-neutral-700"
              style={{ top: 130, right: 20, width: 200, overflow: "hidden" }}
            >
              <Pressable
                onPress={() => {
                  setShowOverdueOnly((prev) => !prev);
                  setShowSortMenu(false);
                }}
                className="px-4 py-3 flex-row justify-between items-center"
              >
                <Text
                  className={
                    showOverdueOnly
                      ? "text-governor-bay dark:text-governor-bay-light font-semibold"
                      : "text-gray-700 dark:text-neutral-300"
                  }
                >
                  Overdue only
                </Text>
                {showOverdueOnly && (
                  <Ionicons
                    name="checkmark"
                    size={18}
                    color={isDark ? "#818cf8" : "#3830a3"}
                  />
                )}
              </Pressable>
              {SORT_OPTIONS.map((option) => {
                const isSelected = sortOrder === option.value;
                return (
                  <Pressable
                    key={option.value}
                    onPress={() => {
                      setSortOrder((prev) =>
                        prev === option.value ? null : option.value,
                      );
                      setShowSortMenu(false);
                    }}
                    className="px-4 py-3 flex-row justify-between items-center border-t border-gray-200 dark:border-neutral-700"
                  >
                    <Text
                      className={
                        isSelected
                          ? "text-governor-bay dark:text-governor-bay-light font-semibold"
                          : "text-gray-700 dark:text-neutral-300"
                      }
                    >
                      {option.label}
                    </Text>
                    {isSelected && (
                      <Ionicons
                        name="checkmark"
                        size={18}
                        color={isDark ? "#818cf8" : "#3830a3"}
                      />
                    )}
                  </Pressable>
                );
              })}
              {isFilterActive && (
                <Pressable
                  onPress={() => {
                    setSortOrder(null);
                    setShowOverdueOnly(false);
                    setShowSortMenu(false);
                  }}
                  className="px-4 py-3 border-t border-gray-200 dark:border-neutral-700"
                >
                  <Text className="text-red-600 dark:text-red-400">
                    Clear filters
                  </Text>
                </Pressable>
              )}
            </View>
          </Pressable>
        </Modal>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="min-h-12 max-h-12 mt-4 mb-1"
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
                  backgroundColor: isSelected
                    ? "#3830a3"
                    : isDark
                      ? "#262626"
                      : "#fff",
                  borderWidth: 0.5,
                  borderColor: isSelected
                    ? "#3830a3"
                    : isDark
                      ? "#404040"
                      : "#d1d5db",
                }}
              >
                <Text
                  className={`text-sm ${
                    isSelected
                      ? "text-white"
                      : "text-gray-600 dark:text-neutral-300"
                  }`}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {filteredNotes.length === 0 ? (
          <View className="w-full items-center mt-16 justify-center">
            <Text className="text-gray-500 dark:text-neutral-400 font-medium text-2xl">
              No notes yet
            </Text>
            <Text className="text-gray-400 dark:text-neutral-500 text-lg mt-2">
              Tap + to capture your thought
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredNotes}
            keyExtractor={(note) => note.id}
            renderItem={({ item }) => <NoteCard note={item} />}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          />
        )}

        <Pressable
          onPress={() => router.push("/add")}
          className="absolute bottom-4 right-5 bg-governor-bay p-5 rounded-full shadow-2xl z-50"
        >
          <AntDesign name="plus" size={30} color="white" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
