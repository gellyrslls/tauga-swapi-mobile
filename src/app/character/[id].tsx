import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { isKnown } from '../../api/swapi';
import { useCharactersStore } from '../../store/characters';

function format(value: string, unit?: string): string {
  if (!isKnown(value)) return 'Unknown';
  if (unit) return `${value} ${unit}`;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function CharacterDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const character = useCharactersStore((s) => s.characters.find((c) => c.id === id));

  if (!character) {
    return <Text style={styles.notFound}>Character not found.</Text>;
  }

  const rows: [label: string, value: string][] = [
    ['Height', format(character.height, 'cm')],
    ['Mass', format(character.mass, 'kg')],
    ['Hair color', format(character.hair_color)],
    ['Skin color', format(character.skin_color)],
    ['Eye color', format(character.eye_color)],
    ['Birth year', format(character.birth_year)],
    ['Gender', format(character.gender)],
    ['Films', String(character.films.length)],
    ['Vehicles', String(character.vehicles.length)],
    ['Starships', String(character.starships.length)],
  ];

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: character.name }} />
      {rows.map(([label, value]) => (
        <View key={label} style={styles.row}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  notFound: {
    padding: 24,
    textAlign: 'center',
    color: '#666',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    color: '#111',
  },
});
