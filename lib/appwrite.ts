import { TCreateForm } from "@/app/(tabs)/create";
import { ImagePickerAsset } from "expo-image-picker";
import {
  Account,
  AppwriteException,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite/src";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.sayandasdev.aora",
  projectId: "6619a069996755ffb823",
  databaseId: "sayandasdev_aora",
  userCollectionId: "users",
  videoCollectionId: "videos",
  storageId: "files"
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = appwriteConfig;

const client = new Client();

client
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setPlatform(platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

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
      databaseId,
      userCollectionId,
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
      databaseId,
      userCollectionId,
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

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId, 
      videoCollectionId,
      [Query.orderDesc('$createdAt')]
    );
    return posts.documents;
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

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId, 
      videoCollectionId,
      [Query.orderDesc('$createdAt'), Query.limit(7)]
    );
    return posts.documents;
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

export const searchPosts = async (query: string) => {
  try {
    const posts = await databases.listDocuments(
      databaseId, 
      videoCollectionId,
      [Query.search('title', query)]
    );
    return posts.documents;
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

export const getUserPosts = async (userId: string) => {
  try {
    const posts = await databases.listDocuments(
      databaseId, 
      videoCollectionId,
      [Query.equal('creator', userId)]
    );
    return posts.documents;
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

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");

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

export const getFilePreview = async (fileId: string, type: string) => {
  let fileUrl;

  try {
    if(type === "image"){
      fileUrl = await storage.getFilePreview(storageId, fileId, 2000, 2000, 'top', 100);
    }else if(type === "video"){
      fileUrl = await storage.getFileView(storageId, fileId);
    }else{
      throw new Error('Invalid file type')
    }

    if(!fileUrl) throw Error;

    return fileUrl;
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

export const uploadFile = async (file: ImagePickerAsset | null, type: string) => {

  //@ts-expect-error
  if(!file || !file.fileName || !file.mimeType || !file.filesize) {
    console.log(file);
    throw new Error("File not found")
  };
  
  const asset = {
    name: file.fileName,
    type: file.mimeType,
    //@ts-expect-error
    size: file.filesize,
    uri: file.uri,
}

  try {
    const uploadFile = await storage.createFile(
      storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadFile.$id, type);

    return fileUrl;
  } catch (error) {
    if(error instanceof AppwriteException){
      console.error(error);
      throw error;
    }else{
      console.error(error);
      throw new Error("Upload failed");
    }  
  }
}

export const createVideo = async (form : TCreateForm) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);
  
    const newPost = await databases.createDocument(
      databaseId,
      videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        prompt: form.prompt,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        creator: form.userId,
      }
    );
    
    return newPost;
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