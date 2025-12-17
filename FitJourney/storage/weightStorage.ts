import * as FileSystem from 'expo-file-system/legacy';
import { Data } from './storage';

const FILE_URI = FileSystem.documentDirectory + 'data.json';
console.log("WEIGHT STORAGE FILE URI:", FILE_URI);

export type WeightEntry = {
  weight: number;
  date: string;
};

async function ensureFile(): Promise<void> {
  const info = await FileSystem.getInfoAsync(FILE_URI);
  if (!info.exists) {
    await FileSystem.writeAsStringAsync(FILE_URI, '[]', {
      encoding: FileSystem.EncodingType.UTF8,
    });
  }
}

export async function readEntries(): Promise<Data> {
  await ensureFile();
  const raw = await FileSystem.readAsStringAsync(FILE_URI, {
    encoding: FileSystem.EncodingType.UTF8,
  });
  console.log("RAW WEIGHT DATA:", raw);

  try {
    const arr = JSON.parse(raw) as Data;
    console.log("PARSED WEIGHT DATA:", arr);
    return arr;
  } catch {
    await FileSystem.writeAsStringAsync(FILE_URI, '[]', {
      encoding: FileSystem.EncodingType.UTF8,
    });
    return { goals: { } };
  }
}

export async function appendEntry(entry: WeightEntry): Promise<void> {
  const all = await readEntries();
  all.push(entry);
  all.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  await FileSystem.writeAsStringAsync(FILE_URI, JSON.stringify(all, null, 2), {
    encoding: FileSystem.EncodingType.UTF8,
  });
}

export async function clearEntries(): Promise<void> {
  await ensureFile();
  await FileSystem.writeAsStringAsync(FILE_URI, '[]', {
    encoding: FileSystem.EncodingType.UTF8,
  });
}

export function getFileUri(): string {
  return FILE_URI;
}
