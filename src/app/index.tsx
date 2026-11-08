import { useEffect } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';

import { CharacterRow } from '../components/CharacterRow';
import { ErrorState } from '../components/ErrorState';
import { OfflineBanner } from '../components/OfflineBanner';
import { useCharactersStore } from '../store/characters';

export default function CharacterListScreen() {
  const characters = useCharactersStore((s) => s.characters);
  const lastUpdated = useCharactersStore((s) => s.lastUpdated);
  const status = useCharactersStore((s) => s.status);
  const isOffline = useCharactersStore((s) => s.isOffline);
  const hasHydrated = useCharactersStore((s) => s.hasHydrated);
  const loadCharacters = useCharactersStore((s) => s.loadCharacters);

  useEffect(() => {
    if (hasHydrated) loadCharacters();
  }, [hasHydrated, loadCharacters]);

  if (characters.length === 0) {
    if (status === 'error') return <ErrorState onRetry={loadCharacters} />;
    if (status === 'success') return <Text style={styles.empty}>No characters found.</Text>;
    return <ActivityIndicator style={styles.loading} size="large" />;
  }

  return (
    <View style={styles.container}>
      {(isOffline || status === 'error') && (
        <OfflineBanner isOffline={isOffline} lastUpdated={lastUpdated} onRetry={loadCharacters} />
      )}
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CharacterRow character={item} />}
        ItemSeparatorComponent={Separator}
        refreshControl={
          <RefreshControl refreshing={status === 'loading'} onRefresh={loadCharacters} />
        }
      />
    </View>
  );
}

function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading: {
    flex: 1,
  },
  empty: {
    padding: 24,
    textAlign: 'center',
    color: '#666',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 16,
    backgroundColor: '#ddd',
  },
});
