import { images } from "@/constants";
import { signOut } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";
import { router } from "expo-router";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileField = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: any;
}) => (
  <View className="flex-row items-center bg-gray-50 p-4 rounded-lg mb-3">
    <Image source={icon} className="w-5 h-5 mr-3" tintColor="#6B7280" />
    <View className="flex-1">
      <Text className="text-gray-500 text-sm">{label}</Text>
      <Text className="text-gray-900 font-semibold">{value}</Text>
    </View>
  </View>
);

const Profile = () => {
  const { user, setUser, setIsAuthenticated } = useAuthStore();

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      setIsAuthenticated(false);
      router.replace("/sign-in");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const confirmSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign Out", style: "destructive", onPress: handleSignOut },
    ]);
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="px-5 py-6">
        {/* Header */}
        <View className="items-center mb-8">
          <Image
            source={user?.avatar ? { uri: user.avatar } : images.avatar}
            className="w-24 h-24 rounded-full mb-4"
          />
          <Text className="text-2xl font-bold text-gray-900">
            {user?.name || "User"}
          </Text>
          <Text className="text-gray-500">
            {user?.email || "user@example.com"}
          </Text>
        </View>

        {/* Profile Information */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Profile Information
          </Text>

          <ProfileField
            label="Full Name"
            value={user?.name || "User"}
            icon={images.person}
          />

          <ProfileField
            label="Email"
            value={user?.email || "user@example.com"}
            icon={images.envelope}
          />
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity
          onPress={confirmSignOut}
          className="bg-red-500 p-4 rounded-lg flex-row items-center justify-center"
        >
          <Image
            source={images.logout}
            className="w-5 h-5 mr-3"
            tintColor="white"
          />
          <Text className="text-white font-semibold text-lg">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
