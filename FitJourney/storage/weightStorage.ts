import * as FileSystem from 'expo-file-system/legacy';

const FILE_URI = FileSystem.documentDirectory + 'weights.json';

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

export async function readEntries(): Promise<WeightEntry[]> {
  await ensureFile();
  const raw = await FileSystem.readAsStringAsync(FILE_URI, {
    encoding: FileSystem.EncodingType.UTF8,
  });

  try {
    const arr = JSON.parse(raw) as WeightEntry[];
    return arr.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  } catch {
    await FileSystem.writeAsStringAsync(FILE_URI, '[]', {
      encoding: FileSystem.EncodingType.UTF8,
    });
    return [];
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
