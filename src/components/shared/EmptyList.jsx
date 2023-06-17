import { Flex, Text } from "native-base";
import { Image } from "react-native";

function EmptyList({msg}) {
    return (
        <Flex flex={1} justifyContent="center" direction="column" alignItems="center" gap={5}>
            <Text fontSize={18} fontWeight={600} textAlign="center">
                {msg}
            </Text>
            <Image style={{width: 150, height: 150 }} source={require(`../../../assets/imgs/empty.png`)} />
        </Flex>
    );
}

export default EmptyList;