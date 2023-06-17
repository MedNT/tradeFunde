import { useToast, Box, Text } from 'native-base'

export default function Toastify() {

    const toast = useToast();

    function showToast(message, status) {
        toast.show({
            placement: "top",
            render: () => {
                return (
                    <Box bg={status=="success"? "green.500": "red.500"} px="3" py="3" rounded="md" mb={10} textAlign="center">
                        <Text fontSize={16} textAlign="center" color="white">
                            {message}
                        </Text>
                    </Box>
                );
            }
        })
    }

    return {
        showToast
    }
}