import { Pressable, StyleSheet } from 'react-native';
import { Box, Text, VStack } from 'native-base';
import { Ionicons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { navigationList } from '../../utils/statics';
import { COLORS } from '../../utils/theme';
import { useState } from 'react';

export default function NavBar() {

    const [activeItem, setActiveItem] = useState(0);
    const navigation = useNavigation();

    function switchTabHandler(tabNum) {
        // activate the tab focus highligth
        setActiveItem(tabNum);
        // navigate to it
        navigation.navigate(navigationList[tabNum]);
    }

    return (
        <Box style={styles.container}>
            <Pressable android_ripple={{borderless: true}} onPress={()=> { switchTabHandler(0) }}>
                <VStack style={activeItem==0? styles.active: {}} alignItems="center">
                    <Ionicons name="newspaper" size={22} color={activeItem==0? COLORS.primary: "#808080"} />
                    <Text color={activeItem==0? COLORS.primary: "#808080"} fontWeight={400} fontSize={12}>News</Text>
                </VStack>
            </Pressable>
            
            <Pressable android_ripple={{borderless: true}} onPress={()=> { switchTabHandler(1) }}>
                <VStack style={activeItem==1? styles.active: {}} alignItems="center">
                    <FontAwesome5 name="bitcoin" size={22} color={activeItem==1? COLORS.primary: "#808080"} />
                    <Text color={activeItem==1? COLORS.primary: "#808080"} fontWeight={400} fontSize={12}>Trade</Text>
                </VStack>
            </Pressable>
            
            <Pressable android_ripple={{borderless: true}} onPress={()=> { switchTabHandler(2) }}>
                <VStack style={activeItem==2? styles.active: {}} alignItems="center">
                    <FontAwesome5 name="brain" size={24} color={activeItem==2? COLORS.primary: "#808080"} />
                    <Text color={activeItem==2? COLORS.primary: "#808080"}fontWeight={400} fontSize={12}>Advisor</Text>
                </VStack>
            </Pressable>
            
            <Pressable android_ripple={{borderless: true}} onPress={()=> { switchTabHandler(3) }}>
                <VStack style={activeItem==3? styles.active: {}} alignItems="center">
                    <FontAwesome name="pie-chart" size={24} color={activeItem==3? COLORS.primary: "#808080"} />
                    <Text color={activeItem==3? COLORS.primary: "#808080"} fontWeight={400} fontSize={12}>Portfolio</Text>
                </VStack>
            </Pressable>

            <Pressable android_ripple={{borderless: true}} onPress={()=> { switchTabHandler(4) }}>
                <VStack style={activeItem==4? styles.active: {}} alignItems="center">
                    <FontAwesome name="bookmark" size={24} color={activeItem==4? COLORS.primary: "#808080"} />
                    <Text color={activeItem==4? COLORS.primary: "#808080"} fontWeight={400} fontSize={12}>Bookmarks</Text>
                </VStack>
            </Pressable>
        </Box>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        left: 15,
        right: 15,
        bottom: 20,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#eee",
        paddingTop: 5,
        paddingBottom: 5,
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowOffset: { width: 1, height: 2},
        shadowRadius: 10,
        elevation: 10,
        opacity: 0.9
    },
    active: {
        borderBottomWidth: 3,
        borderBottomColor: COLORS.primary,
        padding: 5,
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
    }
});
