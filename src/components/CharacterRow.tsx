import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { isKnown } from '../api/swapi';
import type { Character } from '../types/character';

type Props = {
  character: Character;
};

export function CharacterRow({ character }: Props) {
  const subtitle = [character.gender, character.birth_year].filter(isKnown).join(', ');

  return (
    <Link href={{ pathname: '/character/[id]', params: { id: character.id } }} asChild>
      <Pressable style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
        <View style={styles.text}>
          <Text style={styles.name}>{character.name}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        <Text style={styles.chevron}>›</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#fff',
  },
  pressed: {
    backgroundColor: '#f2f2f2',
  },
  text: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    color: '#111',
  },
  subtitle: {
    marginTop: 2,
    fontSize: 14,
    color: '#666',
    textTransform: 'capitalize',
  },
  chevron: {
    fontSize: 24,
    color: '#bbb',
  },
});
