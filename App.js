import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Colors } from './data/Colors';
import { Provider } from 'react-redux';
import Store from './Store'; 
import StackNavigator from "./StackNavigator";

export default function App() {
  return (  
      <Provider store={Store}> 
          <StackNavigator />
          <StatusBar style="auto" backgroundColor={Colors.primary} />
      </Provider>
  );
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
  },
});



