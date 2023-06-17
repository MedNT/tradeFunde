import { Box, Spinner } from 'native-base';

/**
 * Used on page load (waiting...)
 * @returns Circular spinner
 */
export default function CenterSpinner() {
    return (
        <Box flex={1} justifyContent="center" alignItems="center" safeArea>
            <Spinner size="lg" />
        </Box>
    );
}