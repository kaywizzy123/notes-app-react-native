import useNotesStore from "@/store/useNotes";
import { INote } from "@/types/app.types";
import { Entypo, Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { cssInterop } from "nativewind";
import { Pressable, Text, View } from "react-native";

cssInterop(Ionicons, { className: "style" });
cssInterop(Entypo, { className: "style" });
cssInterop(Feather, { className: "style" });
cssInterop(MaterialIcons, { className: "style" });

export default function NoteCard({ note }: { note: INote }) {
  const { deleteNote, markCompleted } = useNotesStore();

  return (
    <View className="border border-gray-300 mt-8 rounded-3xl p-8">
      <View className="flex-row justify-between">
        <Text className="bg-governor-bay/15 text-governor-bay/90 font-semibold rounded-xl px-4 py-2">
          {note.category.toUpperCase()}
        </Text>
        {note.isCompleted ? (
          <Ionicons
            name="checkmark-circle-sharp"
            size={28}
            className="text-governor-bay/60"
          />
        ) : (
          <Pressable onPress={() => markCompleted(note.id)}>
            <Entypo name="circle" size={24} className="text-gray-400" />
          </Pressable>
        )}
      </View>
      <Text className="mt-6 text-2xl">{note.title}</Text>
      <Text className="mt-6 text-xl text-gray-700">{note.description}</Text>
      <View className="mt-8 flex-row justify-between">
        <View className="flex-row gap-2">
          <Feather name="calendar" size={16} className="text-gray-400" />
          <Text className="text-gray-400 font-medium">{note.date}</Text>
        </View>
        <View className="flex-row gap-8">
          <Pressable>
            <MaterialIcons
              name="edit"
              size={24}
              className="text-governor-bay/40"
            />
          </Pressable>
          <Pressable onPress={() => deleteNote(note.id)}>
            <MaterialIcons
              name="delete-outline"
              size={24}
              className="text-red-700/40"
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
