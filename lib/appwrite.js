import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.PharwaX.pharwaX',
  projectId: '669804d800239f793539',
  databaseId: '6698099a0017a03bf9ae',
  userCollectionId: '669809cf0019a70aab76',
  storageId: '66980c7b002f06065332'
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export async function createUser(email, password, username) {
  try {
      const newAccount = await account.create(
          ID.unique(),
          email,
          password,
          username
      );

      const avatarUrl = avatars.getInitials(username).href;

      await signIn(email, password);

      const newUser = await databases.createDocument(
          config.databaseId,
          config.userCollectionId,
          ID.unique(),
          {
              accountId: newAccount.$id,
              email: email,
              username: username,
              avatar: avatarUrl,
          }
      );

      return newUser;
  } catch (error) {
      throw new Error(error.message);
  }
}

// Sign In
export async function signIn(email, password) {
  try {
      const session = await account.createEmailSession(email, password);
      return session;
  } catch (error) {
      throw new Error(error.message);
  }
}

// Get Account
export async function getAccount() {
  try {
      const currentAccount = await account.get();
      return currentAccount;
  } catch (error) {
      throw new Error(error.message);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
      const currentAccount = await getAccount();
      if (!currentAccount) throw new Error("No current account found");

      const currentUser = await databases.listDocuments(
          config.databaseId,
          config.userCollectionId,
          [Query.equal("accountId", currentAccount.$id)]
      );

      if (!currentUser.total) throw new Error("No user found for the current account");

      return currentUser.documents[0];
  } catch (error) {
      console.log(error.message);
      return null;
  }
}

// Sign Out
export async function signOut() {
  try {
      const session = await account.deleteSession("current");
      return session;
  } catch (error) {
      throw new Error(error.message);
  }
}
