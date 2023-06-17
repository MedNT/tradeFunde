import { useFonts } from 'expo-font';
import { NativeBaseProvider } from 'native-base';

// Components
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { theme } from './src/utils/theme';
import { AppProvider } from './src/context/appContext';
import MobileLayout from './src/components/layouts/mobileLayout';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { navigationList } from './src/utils/statics';
import News from './src/components/screens/news';
import Broker from './src/components/screens/broker';
import Chat from './src/components/screens/chat';
import Bookmarks from './src/components/screens/bookmarks';
import NavBar from './src/components/layouts/navBar';
import CenterSpinner from './src/components/shared/CenterSpinner';
import { store } from './src/store';
import { Profile } from './src/components/screens/profile';

const Tab = createBottomTabNavigator();

export default function App() {

  // loading local fonts on App load
  const [fontsLoaded] = useFonts({
    'Lato-Light': require('./assets/fonts/Lato-Light.ttf'),
    'Lato-LightItalic': require('./assets/fonts/Lato-LightItalic.ttf'),
    'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
    'Lato-Italic': require('./assets/fonts/Lato-Italic.ttf'),
    'Lato-Black': require('./assets/fonts/Lato-Black.ttf'),
    'Lato-BlackItalic': require('./assets/fonts/Lato-BlackItalic.ttf'),
    'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
    'Lato-BoldItalic': require('./assets/fonts/Lato-BoldItalic.ttf'),
  });

  // Return a Circular Spinner while waiting for the fonts to Load
  if (!fontsLoaded) {
    return ( 
      <NativeBaseProvider>
          <CenterSpinner />
      </NativeBaseProvider>
    );
  }


  return (
    <Provider store={store}>
    {/* Navigation Container */}
      <NavigationContainer>
        {/* Native base provider */}
        <NativeBaseProvider theme={theme}>
          <AppProvider>
            {/* Mobile layout wrapper component */}
            <MobileLayout>
              {/* Tabs organizer for navigation */}
              <Tab.Navigator tabBar={props => <NavBar {...props} />} screenOptions={{ headerShown: false}}>
                <Tab.Screen name={navigationList[0]} component={News} />
                <Tab.Screen name={navigationList[1]} component={Broker} />
                <Tab.Screen name={navigationList[2]} component={Chat} />
                <Tab.Screen name={navigationList[3]} component={Profile} />
                <Tab.Screen name={navigationList[4]} component={Bookmarks} />
              </Tab.Navigator>
            </MobileLayout>
          </AppProvider>
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
}
