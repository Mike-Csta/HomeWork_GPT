import * as React from 'react';
import Navigator from './components/Navigator';
import { ChatGptProvider } from 'react-native-chatgpt';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <ChatGptProvider>
          <Navigator />
        </ChatGptProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
