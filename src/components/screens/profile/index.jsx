import { Box, Divider, Flex, HStack, FlatList, Text, VStack, Image, Button, Skeleton, useToast } from 'native-base';
import { Pressable, StyleSheet } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useApp } from '../../../context/appContext';
import { COLORS } from '../../../utils/theme';
import { augmentBalance, editeProfile, reduceBalance, setBalance, updateCoins } from '../../../store/features/main';
import { commaSeparateNumber } from '../../../helpers';
import Toastify from '../../../hooks/toast';


function Item(props) {

    const {userAssetId, name, symbol, qte, price, marketPrice} = props;
    // the difference between the price of buying and current market value
    const difference = (Number.parseFloat(marketPrice).toFixed(2) - Number.parseFloat(price).toFixed(2)).toFixed(2);

    return (
        <Box display={"flex"} flexDir={"column"} borderWidth={1} padding={2} borderRadius={10} borderColor="#eee" mb={2}>
            <Flex direction='row' justifyContent="space-between" alignItems="center" marginBottom="2" marginTop="3">
                <HStack space={3} alignItems="center">
                    <Image source={{ uri: `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png` }} alt={name} size="48px" />
                    <VStack>
                        <Text fontSize={18} fontWeight={500}>{name}</Text>
                        <Text fontSize={12} fontWeight={500}>{qte} coins of {symbol}</Text>
                    </VStack>
                </HStack>
                <VStack alignItems="flex-end">
                    <Text fontSize={18} fontWeight={500}>${commaSeparateNumber(Number.parseFloat(price*qte).toFixed(2))}</Text>
                    <Text fontSize={12} fontWeight={500}>Purchased at: ${commaSeparateNumber(Number.parseFloat(price).toFixed(2))}</Text>
                </VStack>
            </Flex>
            <Divider/>
            <Flex direction='row' justifyContent="flex-start" alignItems="center">
                <Foundation name="lightbulb" size={28} color={COLORS.primary} />
                <Flex direction='row' justifyContent="space-between" alignItems="center" gap={2} padding="5" borderRadius={20} mb={3}>
                    <Flex flex={4} direction='column' justifyContent="flex-start" alignItems="flex-start" >
                        <Text fontSize={12} fontWeight={500}>Worth now
                            <Text fontSize={12} fontWeight={800} textDecorationLine="underline"> ${commaSeparateNumber(Number.parseFloat(marketPrice).toFixed(2))}</Text> for each {name}.
                        </Text>
                        <Text fontSize={12} fontWeight={500}>If you sell now
                            {difference>0 ? (
                                <Text fontSize={13} fontWeight={800} color="green.500" textDecorationLine="underline"> you will gain ${difference} </Text>
                            ): difference<0? (
                                <Text fontSize={13} fontWeight={800} color="red.500" textDecorationLine="underline"> you will lose ${Math.abs(difference)} </Text>
                            ): (
                                <Text fontSize={13} fontWeight={800} color="gray.500" textDecorationLine="underline"> you will still draw </Text>
                            )}
                            for each {name}.
                        </Text>
                    </Flex>
                    {difference>0 ? (
                        <Button backgroundColor={COLORS.primary} flex={1} onPress={()=> props.sellAssetHandler(userAssetId, difference, qte, price)}>Sell Now</Button>
                    ): difference<0? (
                        <Button backgroundColor={"red.500"} flex={1} onPress={()=> props.sellAssetHandler(userAssetId, difference, qte, Number.parseFloat(price).toFixed(2))}>Sell Now</Button>
                    ): (<Box></Box>)}
                </Flex>
            </Flex>
            
        </Box>
    )
}

export function Profile({route, navigation}) {

    const { showToast } = Toastify();
    const dispatch = useDispatch();
    // global state data
    const coins = useSelector((state) => state.main.coins);
    const balance = useSelector((state) => state.main.balance);
    const { assets } = useApp();


    function sellAssetHandler(userAssetId, difference, qte, price) {
        // removing the asset from wallet
        let newCoinsList = [];
        for (let i = 0; i < coins.length; i++) {
            if(coins[i].id != userAssetId) {
                newCoinsList.push(coins[i])
            }
        }
        dispatch(updateCoins(newCoinsList));
        // updating the balance
        if(difference>0) {
            dispatch(augmentBalance(price*qte));
        } else {
            dispatch(reduceBalance(price*qte));
        }
        showToast("You transactions has been made successfuly!", "success");
    }


    return (
        <Box style={styles.container}>
            {/* List of assets */}
            <Flex flex={1} style={styles.details}>
                <Text fontSize={18} fontWeight={500}>My Portfolio</Text>
                <Text fontSize={12} fontWeight={400} fontStyle="italic">
                    Effortlessly track all your owned coins, receive expert instructions, 
                    and make informed decisions on buying or selling, ensuring you stay in control of your cryptocurrency portfolio.
                </Text>
                <Box flex={1}>
                    {coins.length == 0 || assets.length == 0 ? (
                        <Skeleton borderRadius={15} h="full" w="full"  />
                    ): (
                        <FlatList
                            h={20}
                            showsVerticalScrollIndicator={false}
                            horizontal={false}
                            data={coins}
                            renderItem={({item}) => (
                                <Item 
                                    userAssetId={item.id}
                                    symbol={item.symbol} 
                                    name={item.name} 
                                    qte={item.quantity}
                                    price={Number(item.priceUsd)} 
                                    marketPrice={assets.find( e => e.id == item.assetId ).priceUsd}
                                    sellAssetHandler={sellAssetHandler}
                                />
                            )}
                            keyExtractor={item => item.id}
                        />
                    )}
                </Box>
            </Flex>
        </Box>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    details: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "#fff",
    },
});