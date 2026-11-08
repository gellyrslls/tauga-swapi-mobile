import { Button, StyleSheet, Text, View } from 'react-native';

type Props = {
  onRetry: () => void;
};

export function ErrorState({ onRetry }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{"Couldn't load characters"}</Text>
      <Text style={styles.message}>Check your connection and try again.</Text>
      <Button title="Retry" onPress={onRetry} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },
  message: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
});
