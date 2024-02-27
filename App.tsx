import { SafeAreaView } from 'react-native';
import { SignInStack } from './src/navigation/sign-in-stack';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1,}}>
      <SignInStack />
    </SafeAreaView>
  );
}
