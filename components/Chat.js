import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  withTiming,
} from "react-native-reanimated";
import { ScrollView } from "react-native";

function Box() {
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value * 255 }],
    };
  });

  return (
    <>
      <Animated.View style={[styles.box, animatedStyles]} />
      <Button onPress={() => (offset.value = Math.random())} title="Move" />
    </>
  );
}
import {
  GiftedChat,
  IMessage,
  InputToolbar,
  Actions,
  MessageContainer,
  Bubble,
  Message,
} from "react-native-gifted-chat";
import { useChatGpt } from "react-native-chatgpt";
import { Snackbar } from "react-native-paper";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Button,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ImagePickerComponent from "./ImagePickerComponent";
import callGoogleVisionAsync from "./helperFunctions";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const CHAT_GPT_THUMBNAIL_URL =
  "https://styles.redditmedia.com/t5_7hqomg/styles/communityIcon_yyc98alroh5a1.jpg?width=256&s=cb48e1046acd79d1cc52b59b34ae56b0c1a9b4b8";
const CHAT_GPT_ID = "CHAT_GPT_ID";

const createBotMessage = (text) => {
  return {
    _id: String(Date.now()),
    text,
    createdAt: new Date(),
    user: {
      _id: CHAT_GPT_ID,
      name: "react-native-chatgpt",
      avatar: CHAT_GPT_THUMBNAIL_URL,
    },
  };
};

const Chat = () => {
  const { sendMessage } = useChatGpt();
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const messageId = useRef("");
  const conversationId = useRef("");

  useEffect(() => {
    setMessages([createBotMessage("Witaj, w czym mogę pomóc?")]);
  }, []);

  useEffect(() => {
    if (messages.length) {
      const lastMessage = messages[0];
      if (!lastMessage || lastMessage.user._id === CHAT_GPT_ID) return;

      setMessages((prevMessages) => [createBotMessage("..."), ...prevMessages]);
    }
  }, [messages]);

  useEffect(() => {
    const lastMessage = messages[0];
    if (
      lastMessage &&
      lastMessage.user._id === CHAT_GPT_ID &&
      lastMessage.text === "..."
    ) {
      sendMessage({
        message: messages[1]?.text,
        options:
          messageId.current && conversationId.current
            ? {
                messageId: messageId.current,
                conversationId: conversationId.current,
              }
            : undefined,
        onAccumulatedResponse: (accumulatedResponse) => {
          messageId.current = accumulatedResponse.messageId;
          conversationId.current = accumulatedResponse.conversationId;
          // Attach to last message
          setMessages((previousMessages) => {
            const newMessages = [...previousMessages];
            newMessages[0] = {
              ...previousMessages[0],
              text: accumulatedResponse.message,
            };
            return newMessages;
          });
        },
        onError: (e) => {
          setErrorMessage(e.message);
          setMessages((previousMessages) => {
            const newMessages = [...previousMessages];
            newMessages[0] = {
              ...previousMessages[0],
              text: "Sorry, I couldn't process your request",
            };
            return newMessages;
          });
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const onSend = useCallback((t = "") => {
    let hmm = [
      {
        _id: String(Date.now()),
        createdAt: String(Date.now()),
        text: t?.toString().replace(/\n/g, " "),
        user: { _id: 1 },
      },
    ];
    setMessages((previousMessages) => GiftedChat.append(previousMessages, hmm));
  }, []);

  const onSendText = useCallback((t = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, t));
  }, []);

  const imageToText = (t) => {
    onSend(t);
  };

  const renderBubble = (props) => {
    console.log(props);
    return (
      <Bubble
        {...props}
        textStyle={{
          left: {
            color: "#cad1e8",
            fontSize: 20,
            lineHeight: 28,
            fontWeight: "500",
          },
          right: {
            color: "#9095a3",
            fontSize: 20,
            lineHeight: 28,
            fontWeight: "500",
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: "#272c3b",
            padding: 7,
            paddingTop: 10,
            paddingLeft: 0,
            borderRadius: 20,
            marginLeft: "auto",

            marginRight: "auto",
            width: "95%",
            left: -7,
          },
          right: {
            marginTop: 1,
            backgroundColor: "#1f232e",
            padding: 7,
            paddingTop: 10,
            paddingLeft: 0,
            borderRadius: 20,
            marginLeft: "auto",
            marginRight: "auto",
            width: "85%",
            left: -7,
          },
        }}
      />
    );
  };

  const renderInputToolbar = (props) => {
    //Add the extra styles via containerStyle
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          // backgroundColor: "#335",
          // position: "absolute",
          // bottom: 20,
          // marginLeft: "5%",
          // marginRight: "5%",
          // alignItems: "center",
          // borderRadius: 10,
          display: "none",
        }}
        placeholder="Siema"
      />
    );
  };

  ////
  const OPTIONS = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"];
  ////

  return (
    <View style={styles.container}>
      <View
        style={{
          position: "absolute",
          zIndex: 10,
          // backgroundColor: "yellow",
          height: "50%",
          width: "100%",
        }}
      >
        <ImagePickerComponent
          onSubmit={callGoogleVisionAsync}
          imageToText={(t) => imageToText(t)}
        />
      </View>

      <View
        tyle={{
          position: "absolute",
          zIndex: 20,
          height: 10,
          width: "100%",
        }}
      >
        <ScrollView
          snapToInterval={screenHeight}
          decelerationRate="fast"
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
          }}
        >
          <View
            style={{
              backgroundColor: "transparent",
              height: screenHeight,
              width: screenWidth,
            }}
          />
          <View
            style={{
              backgroundColor: "blue",
              borderRadius: 20,
              height: screenHeight / 1.3,
              width: screenWidth,
            }}
          >
            <MessageContainer
              messages={messages}
              onSend={onSendText}
              renderMessage={(props) => (
                <Message
                  {...props}
                  // containerStyle={styles.messageContainer}
                  textStyle={{ display: "none" }}
                />
              )}
              showAvatarForEveryMessage={true}
              renderAvatar={() => null}
              timeTextStyle={{
                left: { display: "none" },
                right: { display: "none" },
              }}
              user={{
                _id: 1,
              }}
              renderBubble={renderBubble}
            />
          </View>
          <Snackbar
            visible={!!errorMessage}
            onDismiss={() => setErrorMessage("")}
            style={[
              styles.snackbar,
              { top: -Dimensions.get("window").height + insets.top + 32 },
            ]}
            duration={3000}
          >
            {errorMessage}
          </Snackbar>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f232e",

    width: "100%",
  },
  snackbar: {
    backgroundColor: "red",
    position: "absolute",
    left: 0,
    right: 0,
  },
});

export default Chat;
