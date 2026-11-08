import AsyncStorage from '@react-native-async-storage/async-storage';

import { useCharactersStore } from './characters';

jest.mock('@react-native-async-storage/async-storage', () =>
  jest.requireActual('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

const luke = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  homeworld: 'https://swapi.info/api/planets/1',
  films: [],
  species: [],
  vehicles: [],
  starships: [],
  url: 'https://swapi.info/api/people/1',
};

function mockFetch(response: Partial<Response> | Error) {
  globalThis.fetch = jest.fn(() =>
    response instanceof Error ? Promise.reject(response) : Promise.resolve(response as Response),
  );
}

beforeEach(async () => {
  await AsyncStorage.clear();
  useCharactersStore.setState({ characters: [], lastUpdated: null, status: 'idle' });
});

it('stores and caches characters after a successful fetch', async () => {
  mockFetch({ ok: true, json: async () => [luke] });

  await useCharactersStore.getState().loadCharacters();

  const state = useCharactersStore.getState();
  expect(state.status).toBe('success');
  expect(state.characters).toEqual([{ ...luke, id: '1' }]);
  expect(state.lastUpdated).toEqual(expect.any(Number));

  const cached = JSON.parse((await AsyncStorage.getItem('characters')) ?? '{}');
  expect(cached.state).toEqual({ characters: state.characters, lastUpdated: state.lastUpdated });
});

it('keeps cached characters when a refresh fails', async () => {
  const cachedLuke = { ...luke, id: '1' };
  useCharactersStore.setState({ characters: [cachedLuke], lastUpdated: 123, status: 'success' });
  mockFetch(new TypeError('Network request failed'));

  await useCharactersStore.getState().loadCharacters();

  const state = useCharactersStore.getState();
  expect(state.status).toBe('error');
  expect(state.characters).toEqual([cachedLuke]);
  expect(state.lastUpdated).toBe(123);
});

it('ends in the error state when there is no cache and the request fails', async () => {
  mockFetch({ ok: false, status: 500 });

  await useCharactersStore.getState().loadCharacters();

  const state = useCharactersStore.getState();
  expect(state.status).toBe('error');
  expect(state.characters).toEqual([]);
});
