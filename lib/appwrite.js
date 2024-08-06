import {
  Account,
  
  Client,

  ID,


} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.med.pharwax",
  projectId: "669966b6002f7a8c058b",
  storageId: "66996793003d7bee9e14",
  databaseId: "6699674c002d4643e4ff",
  userCollectionId: "6699675b000b670e1f9d",
  
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);


// Register User
export const createUser=()=>{
  account.create(ID.unique(), 'me@example.com', 'password', 'JohnDoe')
    .then(function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });

}
