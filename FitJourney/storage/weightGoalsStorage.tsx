import * as FileSystem from 'expo-file-system/legacy';

const GOALS_FILE_URI = FileSystem.documentDirectory + 'goals.json';

export type Goals = {
  startingWeight: number | null;
  goalWeight: number | null;
};

async function ensureFile(): Promise<void> {
  const info = await FileSystem.getInfoAsync(GOALS_FILE_URI);
  if (!info.exists) {
    const defaults: Goals = {
      startingWeight: null,
      goalWeight: null
    };
    await FileSystem.writeAsStringAsync(
      GOALS_FILE_URI, 
      JSON.stringify(defaults), 
      { encoding: FileSystem.EncodingType.UTF8 }
    );
  }
}

export async function getGoals(): Promise<Goals> {
  await ensureFile();
  const raw = await FileSystem.readAsStringAsync(GOALS_FILE_URI, {
    encoding: FileSystem.EncodingType.UTF8,
  });
  return JSON.parse(raw) as Goals;
}

export async function saveGoals(goals: Goals): Promise<void> {
  await FileSystem.writeAsStringAsync(
    GOALS_FILE_URI,
    JSON.stringify(goals, null, 2),
    { encoding: FileSystem.EncodingType.UTF8 }
  );
}

export async function clearGoals(): Promise<void> {
  const defaults: Goals = {
    startingWeight: null,
    goalWeight: null
  };
  await FileSystem.writeAsStringAsync(
    GOALS_FILE_URI,
    JSON.stringify(defaults, null, 2),
    { encoding: FileSystem.EncodingType.UTF8 }
  );
}