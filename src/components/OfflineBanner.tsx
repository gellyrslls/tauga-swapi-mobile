import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  isOffline: boolean;
  lastUpdated: number | null;
  onRetry: () => void;
};

export function OfflineBanner({ isOffline, lastUpdated, onRetry }: Props) {
  const reason = isOffline ? "You're offline." : "Couldn't refresh.";
  const since = lastUpdated ? ` Showing data from ${new Date(lastUpdated).toLocaleString()}.` : '';

  return (
    <View style={styles.banner}>
      <Text style={styles.text}>
        {reason}
        {since}
      </Text>
      <Pressable onPress={onRetry} hitSlop={8}>
        <Text style={styles.retry}>Retry</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff4d6',
  },
  text: {
    flex: 1,
    fontSize: 14,
    color: '#5c4400',
  },
  retry: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5c4400',
  },
});
