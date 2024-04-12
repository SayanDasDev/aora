import {
  Account,
  AppwriteException,
  Avatars,
  Client,
  Databases,
  // Databases,
  ID,
  Query,
  // Query,
  // Storage,
} from "react-native-appwrite/src";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.sayandasdev.aora",
  projectId: "6619a069996755ffb823",
  databaseId: "sayandasdev_aora",
  userCollectionId: "users",
  videoCollectionId: "videos",
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email: string, password: string, username: string) => {   
	try {
		const newAccount = await account.create(
			ID.unique(),
			email,
			password,
			username,
		);

		if(!newAccount) throw new Error;

		const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    )

    if(!newUser) throw new Error;

    return newUser;

	} catch (error: any) {
    if(error instanceof AppwriteException){
      console.error(error);
      throw error;
    }else{
      console.error(error);
      throw new Error(error);
    }
	}

};

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailSession(email, password);
    return session;
  } catch (error: any) {
    if(error instanceof AppwriteException){
      console.error(error);
      throw error;
    }else{
      console.error(error);
      throw new Error(error);
    }
  }
}

export const getAccount = async () => {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error: any) {
    if(error instanceof AppwriteException){
      console.error(error);
      throw error;
    }else{
      console.error(error);
      throw new Error(error);
    }
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await getAccount();
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if(!currentUser) throw new Error;

    return currentUser.documents[0];
  } catch (error: any) {
    if(error instanceof AppwriteException){
      console.error(error);
      throw error;
    }else{
      console.error(error);
      throw new Error(error);
    }
  }
}