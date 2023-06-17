import { Box, Divider, FlatList, Flex, HStack, Image, Skeleton, Text, VStack } from 'native-base';
import { Pressable, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useApp } from '../../../context/appContext';
import { commaSeparateNumber } from '../../../helpers';
import { COLORS } from '../../../utils/theme';

function Item1({name, symbol, price}) {
    
    return (
        <VStack marginRight={3} backgroundColor="white" padding={2} borderRadius={20} alignItems="center" borderWidth={1} borderColor="#ddd">
            <Image source={{ uri: `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png` }} alt={name} size="48px" />
            <Text fontSize={18} fontWeight={500}>{symbol}</Text>
            <Text fontSize={12} fontWeight={400}>{name}</Text>
        </VStack>
    )
}

export function Item2({name, symbol, price, changeRate}) {
    
    return (
      <Box borderWidth={1} borderRadius={20} borderColor="#eee" padding={4} mb={2} display="flex" flexDir="column" gap={1}>
        <Flex direction='row' justifyContent="space-between" alignItems="center">
          <HStack space={3} alignItems="center">
            <Image source={{ uri: `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png` }} alt={name} size="54px" />
            <VStack>
                <Text fontSize={18} fontWeight={700}>{symbol}</Text>
                <Text fontSize={12} fontWeight={400}>{name}</Text>
            </VStack>
          </HStack>
          <VStack space={0} alignItems="flex-end">
            <Text fontSize={18} fontWeight={700}>${commaSeparateNumber(Number.parseFloat(price).toFixed(2))}</Text>
            <Text fontSize={18} fontWeight={700} color={COLORS.primary}>+{changeRate}%</Text>
          </VStack>               
        </Flex>
      </Box>
    )
}

export default function CryptoList({route, navigation}) {

    const { assets } = useApp();

    return (
        <Box style={styles.container}>
            {/* Section Title */}
            <VStack space={1}>
                <Text fontSize={18} fontWeight={600} ml={2}>Trending Cryptocurrencies</Text>
                <Text fontSize={12} fontWeight={400} fontStyle='italic' ml={2}>
                    Stay on top of the crypto market with real-time prices, 
                    comprehensive historical price charts, 
                    and seamless buying and selling capabilities, 
                    empowering you to navigate the world of cryptocurrencies with confidence.
                </Text>
            </VStack>
            {/* List of assets */}
            <Flex flex={1} style={styles.secondHalf}>
                <HStack space={2}>
                    <Text fontSize={18} fontWeight={500}>Top 10 coins</Text>
                    <Entypo name="medal" size={24} color="black" />
                </HStack>
                {assets.length == 0 ? (
                    <Skeleton borderRadius={15} h="full" w="full"  />
                ): (
                    <FlatList
                        h={40}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        data={assets.slice(0, 10)}
                        renderItem={({item}) => (
                            <Pressable onPress={ () => navigation.navigate("crypto-details", {data: item})}>
                                <Item1 symbol={item.symbol} name={item.name} price={Number(item.priceUsd)} />
                            </Pressable>
                        )}
                        keyExtractor={item => item.id}
                    />
                )}
                <HStack space={2}>
                    <Text fontSize={18} fontWeight={500}>On their way up</Text>
                    <Entypo name="arrow-bold-up" size={24} color="black" />
                </HStack>
                
                {assets.length == 0 ? (
                    <Skeleton borderRadius={15} h="full" w="full"  />
                ): (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        horizontal={false}
                        data={assets.slice(10)}
                        renderItem={({item}) => (
                            <Pressable onPress={ () => navigation.navigate("crypto-details", {data: item})}>
                                <Item2 
                                    symbol={item.symbol} 
                                    name={item.name} 
                                    price={Number(item.priceUsd)} 
                                    changeRate={Math.abs(Number(item.changePercent24Hr).toFixed(2))}  
                                />
                            </Pressable>
                        )}
                        keyExtractor={item => item.id}
                    />
                )}
            </Flex>
        </Box>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FFF",
        gap: 10
    },
    firstHalf: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
    },
    secondHalf: {
        display: "flex",
        flexDirection: "column",
        gap: 20,
        padding: 25,
        backgroundColor: "#fff",
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: { width: 2, height: 6},
        shadowRadius: 10,
        elevation: 4,
    }
});