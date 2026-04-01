import firestore from "@react-native-firebase/firestore";

const usersCollection = firestore().collection("Users");

export async function isFirstTimeUser(userId: string): Promise<boolean> {
    console.log("Checking if user is first time:", userId);
    const userDoc = await usersCollection.doc(userId).get();
    const isFirstTime = userDoc.data()?.isFirstTimeUser ?? true;
    console.log("Is first time user:", isFirstTime);
    return isFirstTime;
}

export async function setReturningUser(userId: string): Promise<void> {
    console.log("Setting user as returning:", userId);
    await usersCollection.doc(userId).update({ isFirstTimeUser: false });
    console.log("User set as returning:", userId);
}