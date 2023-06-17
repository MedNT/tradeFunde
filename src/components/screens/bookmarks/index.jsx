import { Linking, Pressable, StyleSheet } from 'react-native';
import { Box, Text, Flex, FlatList, VStack, Divider, Skeleton, Image, HStack } from 'native-base';
import { Feather, AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCoinBookmark, clearNewsBookmark, updateCoinBookmark, updateNewsBookmark } from '../../../store/features/main';
import EmptyList from '../../shared/EmptyList';
import Toastify from '../../../hooks/toast';
import { commaSeparateNumber } from '../../../helpers';
import { COLORS } from '../../../utils/theme';


export function Item2(props) {
    
    const {id, name, symbol, price, changeRate} = props;

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
                <VStack space={1} alignItems="flex-end">
                    <Text fontSize={18} fontWeight={700}>${commaSeparateNumber(Number.parseFloat(price).toFixed(2))}</Text>
                    <Text fontSize={18} fontWeight={700} color={COLORS.primary}>+{changeRate}%</Text>
                    <Divider/>
                    <Pressable android_ripple={{borderless: true}} onPress={() => props.deleteCryptoBookmark(id)}>
                        <AntDesign name="delete" size={24} color="black" />
                    </Pressable>  
                </VStack>             
            </Flex>
        </Box>
    )
}

export default function Bookmarks({route, navigation}) {

    const { showToast } = Toastify();
    // dispatch
    const dispatch = useDispatch();
    // Switch tabs
    const [active, setActive] = useState(0);
    // list of bookmarks
    const newsBookmarks = useSelector((state) => state.main.newsBookmarks);
    const cryptoBookmarks = useSelector((state) => state.main.cryptoBookmarks);

    async function openURLHandler(url) {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);
    
        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }

    function deleteNewsBookmark(item) {
        const DATA = [];
        for (let i = 0; i < newsBookmarks.length; i++) {
            if(newsBookmarks[i].title != item.title) {
                DATA.push(newsBookmarks[i]);
            }
        }
        try {
            dispatch(updateNewsBookmark(DATA));
            showToast("Bookmark deleted successfully!", "success");
        } catch(err) {
            showToast("Error Occured! Please Try Later !", "danger");
        }
    }

    function deleteCryptoBookmark(id) {
        const DATA = [];
        for (let i = 0; i < cryptoBookmarks.length; i++) {
            if(cryptoBookmarks[i].id != id) {
                DATA.push(cryptoBookmarks[i]);
            }
        }
        try {
            dispatch(updateCoinBookmark(DATA));
            showToast("Bookmark deleted successfully!", "success");
        } catch(err) {
            showToast("Error Occured! Please Try Later !", "danger");
        }
    }

    
    return (
        <Box style={styles.container}>
            <Text fontSize={18} fontWeight={500} ml={2}>
                Bookmarked Insights
            </Text>
            <Text fontSize={12} fontWeight={400} fontStyle='italic' ml={2}>
                Effortlessly access and organize your saved bookmarks for quick and easy retrieval
                of news and crypto-related information.
            </Text>
            <Flex style={styles.switch} mb={2}>
                <Text onPress={() => setActive(0)} style={active==0? styles.activeItem: styles.item} fontSize={18} fontWeight={600}>News</Text>                
                <Text onPress={() => setActive(1)} style={active==1? styles.activeItem: styles.item} fontSize={18} fontWeight={600}>Crypto</Text>
            </Flex>
            
            {active==0 ?
            <Box flex={1}>
                {newsBookmarks.length == 0 ? (
                    <EmptyList msg={"No bookmarks found!"}/>
                ): (
                    <FlatList
                        h={20}
                        showsVerticalScrollIndicator={false}
                        horizontal={false}
                        data={newsBookmarks}
                        renderItem={({item}) => (
                            <VStack style={styles.newsBoxTwo} space={3} marginBottom="3">
                                <Pressable onPress={() => openURLHandler(item.url) }>
                                    <Flex direction='row' justifyContent="space-between" alignItems="center">
                                        <VStack space={2} width="70%">
                                            <Text fontSize={13} fontWeight={600}>{item.title}</Text>
                                            <Text fontSize={10} fontWeight={400}>
                                                {item.body.slice(0, 200)}...
                                            </Text>
                                        </VStack>
                                        <Image borderRadius={10} w={100} h={100} source={{ uri: item.imageurl}} alt={item.title} />
                                    </Flex>
                                </Pressable>
                                <Divider />
                                <Flex direction='row' justifyContent="space-between" alignItems="center">
                                    <VStack space={1}>
                                        <Text fontSize={11} fontWeight={400}>Published at: {new Date(item.published_on*1000).toISOString().split('T')[0]}</Text>
                                        <Text fontSize={11} fontWeight={400}>{item.source_info.name}</Text>
                                    </VStack>
                                    <Pressable android_ripple={{borderless: true}} onPress={() => deleteNewsBookmark(item)}>
                                        <AntDesign name="delete" size={24} color="black" />
                                    </Pressable>
                                </Flex>
                            </VStack>
                        )}
                        keyExtractor={item => item.id}
                    />
                )}
            </Box> 
            :
            <Box flex={1}>
                {cryptoBookmarks.length == 0 ? (
                    <EmptyList msg={"No crptocurrencies found!"}/>
                ): (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        horizontal={false}
                        data={cryptoBookmarks}
                        renderItem={({item}) => (
                            <Item2 
                                id={item.id}
                                symbol={item.symbol} 
                                name={item.name} 
                                price={Number(item.priceUsd)} 
                                changeRate={Math.abs(Number(item.changePercent24Hr).toFixed(2))}
                                deleteCryptoBookmark={deleteCryptoBookmark}
                            />
                        )}
                        keyExtractor={item => item.id}
                    />
                )}
            </Box> 
            }

        </Box>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF",
      gap: 4
    },
    switch: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
        padding: 4,
        borderRadius: 10,
        backgroundColor: "#eee",
    },
    item: {
        flex: 1,
        padding: 5,
        paddingLeft: 50,
        paddingRight: 50,
        color: "black",
        textAlign: "center"
    },
    activeItem: {
        flex: 1,
        padding: 5,
        paddingLeft: 50,
        paddingRight: 50,
        borderWidth: 1,
        borderColor: "#EEE",
        borderRadius: 10,
        backgroundColor: "black",
        color: "white",
        textAlign: "center"
    },
    newsBoxTwo: {
        margin: 2,
        padding: 15,
        backgroundColor: "#FFF",
        borderRadius: 20,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 1, height: 0},
        shadowRadius: 10,
        elevation: 4,
    },
});