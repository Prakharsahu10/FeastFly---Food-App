import { images } from "@/constants";
import useAuthStore from "@/store/auth.store";
import { Redirect, Slot } from "expo-router";
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function AuthLayout() {
  const { isAuthenticated, isLoading } = useAuthStore();

  // Show loading while checking authentication state
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-lg">Loading...</Text>
      </View>
    );
  }

  if (isAuthenticated) return <Redirect href="/(tabs)" />;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        className="bg-white h-full"
        keyboardShouldPersistTaps="handled"
      >
        <View
          className="w-full relative"
          style={{ height: Dimensions.get("screen").height / 2.25 }}
        >
          <ImageBackground
            source={images.loginGraphic}
            className="size-full rounded-b-lg"
            resizeMode="stretch"
          />
          <Image
            source={images.logo}
            className="self-center size-48 absolute -bottom-16 z-10"
          />
        </View>
        <Slot />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
