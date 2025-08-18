import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { signIn } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";
import * as Sentry from "@sentry/react-native";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignIn = () => {
  const { fetchAuthenticatedUser } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [statusMessage, setStatusMessage] = useState("");

  const submit = async () => {
    const { email, password } = form;

    if (!email || !password)
      return Alert.alert(
        "Error",
        "Please enter valid email address & password."
      );

    setIsSubmitting(true);
    setStatusMessage("");

    try {
      await signIn({ email, password });

      // Fetch the authenticated user to update the auth state
      await fetchAuthenticatedUser();

      router.replace("/(tabs)");
    } catch (error: any) {
      // Check if it's a rate limit error to provide specific guidance
      if (error.message?.includes("Too many login attempts")) {
        setStatusMessage(
          "Rate limit reached. Please wait a few minutes before trying again."
        );
        Alert.alert(
          "Rate Limited",
          "Too many login attempts. Please wait a few minutes before trying again."
        );
      } else {
        Alert.alert("Error", error.message);
      }
      Sentry.captureEvent(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        label="Email"
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, password: text }))
        }
        label="Password"
        secureTextEntry={true}
      />

      {statusMessage ? (
        <Text className="text-orange-500 text-sm text-center bg-orange-50 p-3 rounded">
          {statusMessage}
        </Text>
      ) : null}

      <CustomButton title="Sign In" isLoading={isSubmitting} onPress={submit} />

      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          Don&apos;t have an account?
        </Text>
        <Link href="/sign-up" className="base-bold text-primary">
          Sign Up
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
