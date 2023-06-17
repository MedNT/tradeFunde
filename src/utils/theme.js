import { extendTheme } from "native-base";

/**
 * Custom theme used globally on the app
 */
export const theme = extendTheme({
    fontConfig: {
        Lato: {
            100: {
                normal: "Lato-Light",
                italic: "Lato-LightItalic",
            },
            200: {
                normal: "Lato-Light",
                italic: "Lato-LightItalic",
            },
            300: {
                normal: "Lato-Light",
                italic: "Lato-LightItalic",
            },
            400: {
                normal: "Lato-Regular",
                italic: "Lato-Italic",
            },
            500: {
                normal: "Lato-Black",
                italic: "Lato-BlackItalic",
            },
            600: {
                normal: "Lato-Black",
                italic: "Lato-BlackItalic",
            },            
            700: {
                normal: 'Lato-Bold',
                italic: 'Lato-BoldItalic',
            },
            800: {
                normal: 'Lato-Bold',
                italic: 'Lato-BoldItalic',
            },
            900: {
                normal: 'Lato-Bold',
                italic: 'Lato-BoldItalic',
            },
        }
    },
    fonts: {
        heading: "Lato",
        body: "Lato",
        mono: "Lato",
    },
});



// Purple & Pink color pallete
export const COLORS = {
    primary: "#0079FF"
}