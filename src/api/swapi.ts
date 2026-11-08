import type { Character } from '../types/character';

const PEOPLE_URL = 'https://swapi.info/api/people';
const TIMEOUT_MS = 10_000;

// SWAPI has no id field, and ids have gaps (there is no 17), so the id comes from the url.
export function getCharacterId(url: string): string {
  return url.split('/').filter(Boolean).pop() ?? url;
}

export function isKnown(value: string): boolean {
  return value !== 'unknown' && value !== 'n/a';
}

export async function fetchCharacters(): Promise<Character[]> {
  const controller = new AbortController();
  // fetch in React Native has no default timeout, so a stalled request would spin forever.
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(PEOPLE_URL, { signal: controller.signal });
    if (!res.ok) throw new Error(`SWAPI responded with ${res.status}`);

    const data: unknown = await res.json();
    if (!Array.isArray(data)) throw new Error('Unexpected response from SWAPI');

    return data.map((raw: Omit<Character, 'id'>) => ({ ...raw, id: getCharacterId(raw.url) }));
  } finally {
    clearTimeout(timeout);
  }
}
