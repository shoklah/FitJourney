import * as FileSystem from 'expo-file-system/legacy';

const GOALS_FILE_URI = FileSystem.documentDirectory + 'data.json';

export type Data = {
  goals: {
    weight?: {
      currentWeight: number | null;
      goalWeight: number | null;
      // startingWeight: number | null;
    },
    calories?: {
      goalCalories: number | null;
      proteinIntake: number | null;
      fatIntake: number | null;
      carbIntake: number | null;
    },
    workouts?: {
      workoutsFrequency: number | null;
    }
  }
};

async function ensureFile(): Promise<void> {
  const info = await FileSystem.getInfoAsync(GOALS_FILE_URI);
  if (!info.exists) {
    const defaults: Data = {
      goals: {
        weight: {
          currentWeight: null,
          goalWeight: null,
          // startingWeight: null,
        },
        calories: {
          goalCalories: null,
          proteinIntake: null,
          fatIntake: null,
          carbIntake: null,
        },
        workouts: {
          workoutsFrequency: null,
        }
      }
    };
    await FileSystem.writeAsStringAsync(
      GOALS_FILE_URI, 
      JSON.stringify(defaults), 
      { encoding: FileSystem.EncodingType.UTF8 }
    );
  }
}

export async function getGoals(): Promise<Data> {
  await ensureFile();
  const raw = await FileSystem.readAsStringAsync(GOALS_FILE_URI, {
    encoding: FileSystem.EncodingType.UTF8,
  });
  return JSON.parse(raw) as Data;
}

export async function saveGoals(goals: Data): Promise<void> {
  await FileSystem.writeAsStringAsync(
    GOALS_FILE_URI,
    JSON.stringify(goals, null, 2),
    { encoding: FileSystem.EncodingType.UTF8 }
  );
}

export async function clearGoals(): Promise<void> {
  const defaults: Data = {
    goals: {
      weight: {
        currentWeight: null,
        goalWeight: null,
        // startingWeight: null,
      },
      calories: {
        goalCalories: null,
        proteinIntake: null,
        fatIntake: null,
        carbIntake: null,
      },
      workouts: {
        workoutsFrequency: null,
      }
    }
  };
  await FileSystem.writeAsStringAsync(
    GOALS_FILE_URI,
    JSON.stringify(defaults, null, 2),
    { encoding: FileSystem.EncodingType.UTF8 }
  );
}