import useNotesStore from "@/store/useNotes";
import { INote } from "@/types/app.types";
import { formatDate, getDueStatus } from "@/utils/date";
import { Entypo, Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { cssInterop } from "nativewind";
import { Alert, Pressable, Text, View } from "react-native";

cssInterop(Ionicons, { className: "style" });
cssInterop(Entypo, { className: "style" });
cssInterop(Feather, { className: "style" });
cssInterop(MaterialIcons, { className: "style" });

const DUE_STATUS_CLASSES = {
  overdue: "text-red-600 dark:text-red-400",
  today: "text-yellow-600 dark:text-yellow-400",
  upcoming: "text-gray-400",
} as const;

export default function NoteCard({ note }: { note: INote }) {
  const router = useRouter();
  const { deleteNote, toggleCompleted } = useNotesStore();
  const dueStatus = getDueStatus(note.dueDate);
  const dueStatusClass = DUE_STATUS_CLASSES[dueStatus];
  const dueLabel =
    dueStatus === "overdue" ? "Overdue" : dueStatus === "today" ? "Due Today" : "Due";

  const handleDelete = () => {
    Alert.alert(
      "Delete note",
      `Are you sure you want to delete "${note.title}"? This can't be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteNote(note.id),
        },
      ]
    );
  };

  return (
    <View className="border border-gray-300 dark:border-neutral-700 dark:bg-neutral-800 mt-8 rounded-3xl p-8">
      <View className="flex-row justify-between">
        <Text className="bg-governor-bay/15 text-governor-bay/90 dark:bg-governor-bay-light/15 dark:text-governor-bay-light font-semibold rounded-xl px-4 py-2">
          {note.category.toUpperCase()}
        </Text>
        <Pressable onPress={() => toggleCompleted(note.id)}>
          {note.isCompleted ? (
            <Ionicons
              name="checkmark-circle-sharp"
              size={28}
              className="text-governor-bay/60 dark:text-governor-bay-light/70"
            />
          ) : (
            <Entypo name="circle" size={24} className="text-gray-400" />
          )}
        </Pressable>
      </View>
      <Text className="mt-6 text-2xl text-black dark:text-white">
        {note.title}
      </Text>
      <Text className="mt-6 text-xl text-gray-700 dark:text-neutral-300">
        {note.description}
      </Text>
      <View className="mt-8 flex-row justify-between">
        <View className="flex-row gap-2">
          <Feather name="calendar" size={16} className={dueStatusClass} />
          <Text className={`font-medium ${dueStatusClass}`}>
            {dueStatus === "today"
              ? dueLabel
              : `${dueLabel}: ${formatDate(new Date(note.dueDate))}`}
          </Text>
        </View>
        <View className="flex-row gap-4">
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/edit/[id]",
                params: { id: note.id },
              })
            }
          >
            <MaterialIcons
              name="edit"
              size={24}
              className="text-governor-bay/40 dark:text-governor-bay-light/50"
            />
          </Pressable>
          <Pressable onPress={handleDelete}>
            <MaterialIcons
              name="delete-outline"
              size={24}
              className="text-red-700/40 dark:text-red-400/50"
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
