import { TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 p-4 bg-alabaster">
      <View className="flex-1">
        <TextInput className="bg-white border border-gray-300 h-14 rounded-full p-4 w-full" />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
