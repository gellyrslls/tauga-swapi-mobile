import NetInfo from '@react-native-community/netinfo';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { useCharactersStore } from '../store/characters';

export default function RootLayout() {
  useEffect(() => {
    return NetInfo.addEventListener((state) => {
      // isConnected is null while unknown, so only an explicit false counts as offline.
      const isOffline = state.isConnected === false;
      const { isOffline: wasOffline, setOffline, loadCharacters } = useCharactersStore.getState();

      setOffline(isOffline);
      if (wasOffline && !isOffline) loadCharacters();
    });
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Characters' }} />
        <Stack.Screen name="character/[id]" options={{ title: '' }} />
      </Stack>
    </>
  );
}
