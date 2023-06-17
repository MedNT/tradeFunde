import { Box, Divider, FlatList, Flex, Image, Skeleton, Text, VStack } from 'native-base';
import {Alert, Linking, Pressable, StyleSheet, Image as Img, Dimensions} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useApp } from '../../../context/appContext';
import Toastify from '../../../hooks/toast';
import { useDispatch, useSelector } from 'react-redux';
import { addNewsBookmark } from '../../../store/features/main';


export default function News({route, navigation}) {
    
    const { news } = useApp();
    // toast 
    const { showToast } = Toastify();
    // dispatcher
    const dispatch = useDispatch();
    // bookmarks lis
    const newsBookmarks = useSelector((state) => state.main.newsBookmarks)


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

    /**
     * Saving news to bookmark list for faster check
     * @param {object} article 
     */
    function bookmarkHanlder(article) {
        // test if already exists
        if(newsBookmarks.find(e => e.title == article.title)) {
            showToast("This article already in your bookmarks!", "danger");
        } else {
            // prepare object to save
            const articleToSave = {
                url: article.url,
                title: article.title,
                body: article.body,
                imageurl: article.imageurl,
                published_on: article.published_on,
                source_info: {
                    name: article.source_info.name
                }
            }
            // save it to local store
            try {
                dispatch(addNewsBookmark(articleToSave));
                showToast("Article Saved Successfully! Check Bookmarks Section.", "success")
            } catch(err) {
                showToast("Error Ocurred! Please try later.", "danger")
            }
        }
    }

    return (
        <Box style={styles.container}>
            {/* Section 1 */}
            <Text fontSize={18} fontWeight={600} ml={2}>Recent Trending Market News</Text>
            <Text fontSize={12} fontWeight={400} fontStyle='italic' ml={2}>
                Immerse yourself in the world of cryptocurrency news and watch your balance grow as rewards, 
                simply by reading the latest cryptocurrency news and expanding your knowledge.
            </Text>
            <Box height={200}>
                {news.length == 0 ? (
                    <Skeleton borderRadius={15} h="200" w="full"  />
                ): (
                    <FlatList
                        h={20}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        data={news.slice(0, 5)}
                        renderItem={({item}) => (
                            <VStack style={styles.newsBoxOne} space={3} marginBottom="3">
                                <Pressable onPress={() => openURLHandler(item.url) }>
                                    <Flex direction='row' justifyContent="space-between" alignItems="center" gap={1}>
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
                                    <Pressable android_ripple={{borderless: true}} onPress={() => bookmarkHanlder(item)}>
                                        <Feather name="bookmark" size={24} color="black" />
                                    </Pressable>
                                </Flex>
                            </VStack>
                        )}
                        keyExtractor={item => item.id}
                    />
                )}
            </Box>
            {/* Section 2 */}
            <Text fontSize={18} fontWeight={600} ml={2}>Popular</Text>
            <Box flex={1}>
                {news.length == 0 ? (
                    <Skeleton borderRadius={15} h="full" w="full"  />
                ): (
                    <FlatList
                        h={20}
                        showsVerticalScrollIndicator={false}
                        horizontal={false}
                        data={news.slice(5)}
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
                                    <Pressable android_ripple={{borderless: true}} onPress={() => bookmarkHanlder(item)}>
                                        <Feather name="bookmark" size={24} color="black" />
                                    </Pressable>
                                </Flex>
                            </VStack>
                        )}
                        keyExtractor={item => item.id}
                    />
                )}
            </Box>
        </Box>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        gap: 10,
        padding: 0,
        paddingBottom: 100,
        backgroundColor: "#fff",
    },
    newsBoxOne: {
        width: Dimensions.get("window").width - 60,
        margin: 3,
        padding: 15,
        backgroundColor: "#FFF",
        borderRadius: 20,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 1, height: 0},
        shadowRadius: 10,
        elevation: 4,
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
    newsList: {
        display: 'flex',
        flexDirection: 'column'
    }
});