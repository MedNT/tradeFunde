import { Box, Button, Divider, Flex, HStack, Image, Input, Text, VStack } from 'native-base';
import { Pressable, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { commaSeparateNumber } from '../../../helpers';
import { COLORS } from '../../../utils/theme';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Toastify from '../../../hooks/toast';
import { addCoin, reduceBalance } from '../../../store/features/main';


export default function BuyCrypto({route, navigation}) {

    // toast hook
    const { showToast } = Toastify();
    // Dispatcher
    const dispatch = useDispatch();
    // parent data
    const { data } = route.params;
    // balance
    const balance = useSelector((state) => state.main.balance);
    // quantity state
    const [qte, setQte] = useState(0);

    // quntity state handling
    function changeQteHandler(symbol) {
        if(symbol == "+") setQte(p => p+1);
        else {
            if(qte > 0) setQte(p => p-1);
        }
    }

    // buy the coins with the corresponding quantity
    function buyNowHandler() {
        // cost
        const cost = qte*Number.parseFloat(data.priceUsd).toFixed(2);
        // buy coins
        if(cost > balance) {
            showToast("Insufficient balance !", "danger");
            alert("Insufficient balance !");
        } else {
            // reduce balance
            dispatch(reduceBalance(cost));
            // store coin
            const newCoin = {
                id: Number(new Date()),
                assetId: data.id,
                symbol: data.symbol,
                name: data.name,
                priceUsd: data.priceUsd,
                quantity: qte
            };
            dispatch(addCoin(newCoin));
            //success message
            showToast("You have successfully invested in "+data.name+" !", "success");
        }
    }

    return (
        <Box style={styles.container} paddingBottom={100}>
            <Flex direction='row' justifyContent='space-between' alignItems='center'>
                <Pressable onPress={()=> navigation.navigate("crypto-list")}>
                    <AntDesign name="arrowleft" size={20} color="black" />
                </Pressable>
                <HStack space={2}>
                    <Image source={{ uri: `https://assets.coincap.io/assets/icons/${data.symbol.toLowerCase()}@2x.png` }} alt={data.name} size="28px" />
                    <Text fontWeight={700} fontSize={20}>{data.name}</Text>
                </HStack>
                <Text fontWeight={700} fontSize={18}>{data.symbol}</Text>
            </Flex>
            {/* Cuurent Price */}
            <Flex flex={1} direction='column' justifyContent='flex-start' alignItems='center' gap={4} borderWidth={1} borderColor="#ddd" borderRadius={20} padding={5}>
                <Text fontWeight={700} fontSize={20} color="black">
                    How many coins do want to buy ?
                </Text>
                <Flex direction='row' justifyContent="center" width="full" gap={2}>
                    <Button android_ripple={{borderless: false}} onPress={() => changeQteHandler("+")} flex={1} backgroundColor="black" borderRadius="lg">
                        <Text fontWeight={700} fontSize={24} color="white">+</Text>
                    </Button>
                    <Input value={""+qte} fontSize={30} textAlign="center" flex={4} isDisabled={true} />
                    <Button android_ripple={{borderless: false}} onPress={() => changeQteHandler("-")} flex={1} backgroundColor="black" borderRadius="lg">
                        <Text fontWeight={700} fontSize={24} color="white">-</Text>
                    </Button>
                </Flex>
                <Text fontWeight={400} fontSize={16} color="black">
                    One coin of {data.name} costs ${commaSeparateNumber(Number.parseFloat(data.priceUsd).toFixed(2))}
                </Text>
                <Divider/>
                <VStack space={6} alignItems="center">
                    <Text fontWeight={400} fontSize={24} color="black">
                        You need to pay:
                    </Text>
                    <Text fontWeight={400} fontSize={43} color="black">
                        ${commaSeparateNumber( (Number(data.priceUsd)*qte).toFixed(2) )}
                    </Text>
                </VStack>
                
            </Flex>
            <Button isDisabled={qte==0} android_ripple={{borderless: false}} onPress={() => buyNowHandler()} backgroundColor={COLORS.primary} borderRadius="lg">
                <Text fontWeight={700} fontSize={24} color="white">
                    Pay Now
                </Text>
            </Button>
        </Box>
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