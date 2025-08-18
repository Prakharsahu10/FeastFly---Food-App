import cn from "clsx";
import { Fragment, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CartButton from "@/components/CartButton";
import { images, offers } from "@/constants";
import seed from "@/lib/seed";

export default function Index() {
  const [isSeeding, setIsSeeding] = useState(false);

  const handleSeedDatabase = async () => {
    Alert.alert(
      "Seed Database",
      "This will clear all existing data and add sample menu items. Continue?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Seed",
          onPress: async () => {
            setIsSeeding(true);
            try {
              await seed();
              Alert.alert("Success", "Database seeded successfully!");
            } catch (error: any) {
              Alert.alert("Error", `Failed to seed database: ${error.message}`);
            } finally {
              setIsSeeding(false);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={offers}
        renderItem={({ item, index }) => {
          const isEven = index % 2 === 0;

          return (
            <View>
              <Pressable
                className={cn(
                  "offer-card",
                  isEven ? "flex-row-reverse" : "flex-row"
                )}
                style={{ backgroundColor: item.color }}
                android_ripple={{ color: "#fffff22" }}
              >
                {({ pressed }) => (
                  <Fragment>
                    <View className={"h-full w-1/2"}>
                      <Image
                        source={item.image}
                        className={"size-full"}
                        resizeMode={"contain"}
                      />
                    </View>

                    <View
                      className={cn(
                        "offer-card__info",
                        isEven ? "pl-10" : "pr-10"
                      )}
                    >
                      <Text className="h1-bold text-white leading-tight">
                        {item.title}
                      </Text>
                      <Image
                        source={images.arrowRight}
                        className="size-10"
                        resizeMode="contain"
                        tintColor="#ffffff"
                      />
                    </View>
                  </Fragment>
                )}
              </Pressable>
            </View>
          );
        }}
        contentContainerClassName="pb-28 px-5"
        ListHeaderComponent={() => (
          <View>
            {/* Temporary Seed Button for Development */}
            <TouchableOpacity
              onPress={handleSeedDatabase}
              disabled={isSeeding}
              className="bg-primary p-3 rounded-lg mb-4"
            >
              <Text className="text-white text-center font-bold">
                {isSeeding ? "Seeding Database..." : "🌱 Seed Database (Dev)"}
              </Text>
            </TouchableOpacity>

            <View className="flex-between flex-row w-full my-5">
              <View className="flex-start">
                <Text className="small-bold text-primary">DELIVER TO</Text>
                <TouchableOpacity className="flex-center flex-row gap-x-1 mt-0.5">
                  <Text className="paragraph-bold text-dark-100">India</Text>
                  <Image
                    source={images.arrowDown}
                    className="size-3"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

              <CartButton />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
