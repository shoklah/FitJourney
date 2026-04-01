import firestore from "@react-native-firebase/firestore";

const usersCollection = firestore().collection("Goals");

export async function getUserGoals(userId: string): Promise<any> {
    console.log("Fetching goals for user:", userId);
    const goalsDoc = await usersCollection.where("userUID", "==", userId).get();
    const goalsData = goalsDoc.docs.map(doc => doc.data());
    console.log("Fetched goals data:", goalsData);
    return goalsData;
}

export async function getUserGoalsByType(userId: string, goalType: string): Promise<any> {
    console.log(`Fetching ${goalType} goals for user:`, userId);
    const goalsDoc = await usersCollection
        .where("userUID", "==", userId)
        .get();
    const goalsData = goalsDoc.docs.map(doc => doc.data());
    console.log(`Fetched ${goalType} goals data:`, goalsData);
    return goalsData;
}