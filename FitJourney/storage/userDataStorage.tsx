import * as FileSystem from 'expo-file-system/legacy';

const USER_DATA_FILE_URI = FileSystem.documentDirectory + 'userdata.json';

export type UserData = {
    firstTimeUser: boolean;
};

async function ensureFile(): Promise<void> {
  const userInfo = await FileSystem.getInfoAsync(USER_DATA_FILE_URI);
  if (!userInfo.exists) {
    const defaults: UserData = {
        firstTimeUser: true,
    };
    await FileSystem.writeAsStringAsync(
      USER_DATA_FILE_URI, 
      JSON.stringify(defaults), 
      { encoding: FileSystem.EncodingType.UTF8 }
    );
  }
}

export async function getUserData(): Promise<UserData> {
  await ensureFile();
  const raw = await FileSystem.readAsStringAsync(USER_DATA_FILE_URI, {
    encoding: FileSystem.EncodingType.UTF8,
  });
  return JSON.parse(raw) as UserData;
}

export async function saveUserData(userData: UserData): Promise<void> {
  await FileSystem.writeAsStringAsync(
    USER_DATA_FILE_URI,
    JSON.stringify(userData, null, 2),
    { encoding: FileSystem.EncodingType.UTF8 }
  );
}
