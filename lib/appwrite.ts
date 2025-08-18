import { CreateUserParams, GetMenuParams, SignInParams } from "@/type";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  platform: "com.jsm.foodordering",
  databaseId: "689f744f000ee7af7078",
  bucketId: "68a1ad51000764dd913b",
  userCollectionId: "689f74730001ef030bca",
  categoriesCollectionId: "68a1a8360034ca521ce0",
  menuCollectionId: "68a1a90a003d1fb9eb6a",
  customizationsCollectionId: "68a1ab2e0026f4d3566a",
  menuCustomizationsCollectionId: "68a1ac4800141ed473b6",
};

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);

// Helper function to handle rate limiting with retry logic
const withRetry = async (
  fn: () => Promise<any>,
  maxRetries = 3,
  delay = 1000
): Promise<any> => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      const isRateLimit =
        error.message?.includes("rate limit") ||
        error.message?.includes("Rate limit") ||
        error.code === 429;

      if (isRateLimit && i < maxRetries - 1) {
        // Wait before retrying, with exponential backoff
        const waitTime = delay * Math.pow(2, i);
        console.log(`Rate limit hit, retrying in ${waitTime}ms...`);
        await new Promise((resolve) => setTimeout(resolve, waitTime));
        continue;
      }

      // If it's a rate limit error on the last retry, provide a user-friendly message
      if (isRateLimit) {
        throw new Error(
          "Too many login attempts. Please wait a few minutes before trying again."
        );
      }

      throw error;
    }
  }
};

export const createUser = async ({
  email,
  password,
  name,
}: CreateUserParams) => {
  try {
    return await withRetry(async () => {
      // Check if there's an active session and delete it before creating new account
      try {
        await account.deleteSession("current");
      } catch {
        // No active session, which is fine
      }

      const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (!newAccount) throw Error;

      await signIn({ email, password });

      const avatarUrl = avatars.getInitialsURL(name);

      return await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        { email, name, accountId: newAccount.$id, avatar: avatarUrl }
      );
    });
  } catch (e: any) {
    throw new Error(e.message || (e as string));
  }
};

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    return await withRetry(async () => {
      // Check if there's an active session and delete it
      try {
        await account.deleteSession("current");
      } catch {
        // No active session, which is fine
      }

      await account.createEmailPasswordSession(email, password);
    });
  } catch (e: any) {
    throw new Error(e.message || (e as string));
  }
};

export const signOut = async () => {
  try {
    await account.deleteSession("current");
  } catch (e) {
    throw new Error(e as string);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (e) {
    console.log(e);
    throw new Error(e as string);
  }
};

export const getMenu = async ({ category, query }: GetMenuParams) => {
  try {
    const queries: string[] = [];

    if (category) queries.push(Query.equal("categories", category));
    if (query) queries.push(Query.search("name", query));

    const menus = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.menuCollectionId,
      queries
    );

    return menus.documents;
  } catch (e) {
    throw new Error(e as string);
  }
};

export const getCategories = async () => {
  try {
    const categories = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.categoriesCollectionId
    );

    return categories.documents;
  } catch (e) {
    throw new Error(e as string);
  }
};
