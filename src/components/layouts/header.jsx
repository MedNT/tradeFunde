import { Box, HStack, Text, Flex } from 'native-base';
import { StyleSheet, Image } from 'react-native';
import { COLORS } from '../../utils/theme';
import { useSelector } from 'react-redux';
import { commaSeparateNumber } from '../../helpers';

export default function Header() {
    
    const balance = useSelector((state) => state.main.balance);

    return (
        <Box style={styles.container} bgColor="trueGray.100" safeArea>
            <Flex direction="row" justifyContent="space-between" alignItems="center" width="100%">
                <Image source={require("../../../assets/imgs/app-logo.png")} alt='app-logo' style={{ width: 30, height: 30 }} />
                <Text fontWeight={600} fontSize={20} color="white">
                    {`$${commaSeparateNumber(Number.parseFloat(balance).toFixed(2))}`}
                </Text>
            </Flex>
        </Box>
    );
}



const styles = StyleSheet.create({
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "stretch",
        backgroundColor: COLORS.primary,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 20,
        paddingRight: 20,
    }
});