import React, { useEffect, useState } from 'react'
import {
	SafeAreaView, StatusBar, Text,
} from 'react-native'



import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TutorialScreen from './src/screens/tutorial'


import useGlobal from './src/common/ApiManager/global'
import LoginScreen from './src/screens/login'
import BottomTabNavigation from './src/navigations/bottom-tab-navigator'
import MessagesScreen from './src/screens/message/Message'
import WelcomeScreen from './src/screens/welcome'
import SignUpScreen from './src/screens/signup'
import ImageViewer from './src/screens/message/ImageDownload'


const LightTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: 'white'
	}
}


const Stack = createNativeStackNavigator()


function App() {
	const initialized = true//useGlobal(state => state.initialized)
	const authenticated = useGlobal(state => state.authenticated)

	const init = useGlobal(state => state.init)

	useEffect(() => {
		init()
	}, [])

	return (
		<NavigationContainer theme={LightTheme} >
			<StatusBar barStyle='default' backgroundColor={"#2D2C33"}/>
			
			<Stack.Navigator 
				screenOptions={{
					headerStyle: {
					  backgroundColor: "#2D2C33", 
					},
					headerTintColor: "white",
					headerTitleStyle: {
					  fontWeight: "bold",
					},
				  }}
			>
				{!initialized ? (
					<>
						<Stack.Screen name="tutoiral" component={TutorialScreen} options={{ headerShown: false }} />
					</>
				) : !authenticated ? (
					<>
						<Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
						<Stack.Screen name="Signup" component={SignUpScreen} options={{ headerShown: false }} />
						<Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
					</>
				) : (
					<>
						<Stack.Screen name="home" component={BottomTabNavigation} options={{ headerShown: false }} />
						<Stack.Screen name="Messages" component={MessagesScreen} />
						<Stack.Screen name="View" component={ImageViewer} options={{headerShown:true}}/>

					</>
				)
				}
			</Stack.Navigator>
		</NavigationContainer>
	)
}


export default App
