import { Box } from 'native-base';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import CryptoList from './cryptoList';
import CryptoDetails from './cryptoDetails';
import BuyCrypto from './buyCrypto';

const Stack = createStackNavigator();

export default function Portfolio({route, navigation}) {

    return (
        <Box style={styles.container}>
            <Stack.Navigator screenOptions={{ headerShown: false}}>
                <Stack.Screen name="crypto-list" component={CryptoList} />
                <Stack.Screen name="crypto-details" component={CryptoDetails} />
                <Stack.Screen name="buy-crypto" component={BuyCrypto} />
            </Stack.Navigator>
        </Box>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});