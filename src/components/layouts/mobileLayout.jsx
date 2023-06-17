import { Box } from "native-base";
import Header from "./header";

export default function MobileLayout({children}) {
    return (
        <Box flex={1} safeArea>
            {/* Header */}
            <Header/>
            {/* Body */}
            <Box flex={1} padding={3}>
                {children}
            </Box>
        </Box>
    );
}