import * as React from "react";
import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Button, Headline } from "react-native-paper";
import { useChatGpt } from "react-native-chatgpt";

const Login: React.FC = () => {
  const { login } = useChatGpt();
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/chatgpt-logo.jpeg")}
      />
      <Headline
        style={{ fontWeight: "bold", alignSelf: "center", marginBottom: 128 }}
      >
        👿 Złowieszczy Chat 👿
      </Headline>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#45ad84",
          height: 60,
          borderRadius: 7,
        }}
        onPress={login}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          We się Zaloguj
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 32,
  },
  image: {
    alignSelf: "center",
    width: 128,
    height: 128,
    resizeMode: "contain",
    borderRadius: 64,
    marginBottom: 32,
  },
});

export default Login;
