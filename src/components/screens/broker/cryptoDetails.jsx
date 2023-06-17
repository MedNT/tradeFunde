import { Box, Button, Divider, Flex, HStack, Image, ScrollView, Skeleton, Text, VStack } from 'native-base';
import { Dimensions, Pressable, StyleSheet } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { COLORS } from '../../../utils/theme';
import { LineChart } from 'react-native-chart-kit';
import { commaSeparateNumber } from '../../../helpers';
import { getAssetHistory } from '../../../services/cryptoService';
import { useEffect } from 'react';
import { useState } from 'react';
import { addCoinBookmark } from '../../../store/features/main';
import Toastify from '../../../hooks/toast';
import { useDispatch, useSelector } from 'react-redux';


export default function CryptoDetails({route, navigation}) {

    // toast
    const { showToast } = Toastify()
    // bookmarks lis
    const cryptoBookmarks = useSelector((state) => state.main.cryptoBookmarks)
    // dispatch
    const dispatch = useDispatch();
    // parent data
    const { data } = route.params;
    // Chart data
    const [chartData, setChartData] = useState([]);

    useEffect(()=> {
        getAssetHistory(data.id)
        .then(res => {
            setChartData(res.data.slice(0, 100).map((e)=> e.priceUsd));
        })
        .catch(err => console.log(err));
    }, [data.id]);

    /**
     * Saving coin to bookmark list for faster check
     * @param {object} coin 
     */
    function bookmarkHanlder() {
        // test if already exists
        if(cryptoBookmarks.find(e => e.id == data.id)) {
            showToast("This coin is already in your bookmarks! Remove it and bookmarked it again!", "danger");
        } else {
            // prepare object to save
            const coinToSave = {
                id: data.id,
                name: data.name,
                symbol: data.symbol,
                priceUsd: data.priceUsd,
                changePercent24Hr: data.changePercent24Hr
            }
            // save it to local store
            try {
                dispatch(addCoinBookmark(coinToSave));
                showToast("Coin Saved Successfully! Check Bookmarks Section.", "success")
            } catch(err) {
                showToast("Error occured, please try later!", "danger")
            }        
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} horizontal={false} >
            <Box style={styles.container} paddingBottom={100}>
                <Flex direction='row' justifyContent='space-between' alignItems='center'>
                    <Pressable android_ripple={{borderless: true}} onPress={()=> navigation.navigate("crypto-list")}>
                        <AntDesign name="arrowleft" size={30} color="black" />
                    </Pressable>
                    <HStack space={2}>
                        <Image source={{ uri: `https://assets.coincap.io/assets/icons/${data.symbol.toLowerCase()}@2x.png` }} alt={data.name} size="28px" />
                        <Text fontWeight={700} fontSize={20}>{data.name}/{data.symbol}</Text>
                        <Text fontWeight={700} fontSize={18}></Text>
                    </HStack>
                    <Pressable android_ripple={{borderless: true}} onPress={() => bookmarkHanlder()}>
                        <Feather name="bookmark" size={24} color="black" />
                    </Pressable>
                </Flex>
                {/* Cuurent Price */}
                <Flex direction='row' justifyContent='center' alignItems='center'>
                    <Text fontWeight={600} fontSize={34} color="black">
                        $ {commaSeparateNumber(Number.parseFloat(data.priceUsd).toFixed(2))}
                    </Text>
                </Flex>
                {/* Buyn now */}
                <Flex direction='row' justifyContent='center' alignItems='center'>
                    <Button onPress={() => navigation.navigate("buy-crypto", {data})} backgroundColor="green.600" size="xs" borderRadius='3xl' paddingLeft="10" paddingRight="10">
                        <Text fontWeight={700} fontSize={16} color="white">Buy {data.symbol}</Text>
                    </Button>
                </Flex>
                {/* Detailled Data */}
                <Divider />
                <Flex direction='column' alignItems='flex-start' gap={2}>
                    <Flex direction='row' justifyContent='space-between' alignItems='center' width="full">
                        <Text fontWeight={700} fontSize={20}>Supply</Text>
                        <Text fontWeight={400} fontSize={20}>${commaSeparateNumber(Number.parseFloat(data.supply).toFixed(2))}</Text>
                    </Flex>
                    <Flex direction='row' justifyContent='space-between' alignItems='center' width="full">
                        <Text fontWeight={700} fontSize={20}>Max Supply</Text>
                        <Text fontWeight={400} fontSize={20}>${commaSeparateNumber(Number.parseFloat(data.maxSupply).toFixed(2))}</Text>
                    </Flex>
                    <Flex direction='row' justifyContent='space-between' alignItems='center' width="full">
                        <Text fontWeight={700} fontSize={20}>Market Cap</Text>
                        <Text fontWeight={400} fontSize={20}>${commaSeparateNumber(Number.parseFloat(data.marketCapUsd).toFixed(2))}</Text>
                    </Flex>
                    <Flex direction='row' justifyContent='space-between' alignItems='center' width="full">
                        <Text fontWeight={700} fontSize={20}>Change Rate</Text>
                        <Text fontWeight={400} fontSize={20}>{commaSeparateNumber(Number.parseFloat(data.changePercent24Hr).toFixed(2))} %</Text>
                    </Flex>
                </Flex>

                {/* Chart Data */}
                <Divider />
                <Text fontWeight={700} fontSize={20}>Historical Chart Data</Text>
                <Flex flex={1} flexDirection="column" justifyContent="center">
                    {chartData.length == 0? (
                        <Skeleton borderRadius={15} h="300" w="full" mb={10}/>
                    ):(
                        <LineChart
                            data={{
                                datasets: [
                                    {
                                        data: chartData
                                    }
                                ]
                            }}
                            width={Dimensions.get('window').width - 80} // from react-native
                            height={Dimensions.get('window').height / 2}
                            yAxisLabel="$"
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                            backgroundColor: '#FFF',
                            backgroundGradientFrom: '#FFF',
                            backgroundGradientTo: '#FFF',
                            decimalPlaces: 1, // optional, defaults to 2dp
                            color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                            propsForDots: {
                                r: "0",
                                strokeWidth: "10",
                            }
                            }}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16,
                            }}
                        />
                    )}
                </Flex>
            </Box>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    display: 'flex',
    flexDirection: "column",
    gap: 20,
    backgroundColor: "#FFF"
  },
});