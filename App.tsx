import { View, Text } from 'react-native'
import React,{useEffect} from 'react';
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./app/navigations/auth/AuthNavigation";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import store, { persistor } from "./app/redux/index";

const AppWrapper = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <App />
    </PersistGate>
  </Provider>
);
const App = () => {
  return (
    <NavigationContainer>
      <AuthNavigation />    
    </NavigationContainer>
  );
};
export default AppWrapper;


// export default function App() {
//   return (
//     <NavigationContainer>
//       <AuthNavigation />
//     </NavigationContainer>

//   )
// }