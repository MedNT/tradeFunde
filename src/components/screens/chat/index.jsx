import { StyleSheet } from 'react-native';
import { Box, Text } from 'native-base';

export default function Chat() {
    return (
        <Box style={styles.container}>
            <Text>Chat</Text>
        </Box>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
});