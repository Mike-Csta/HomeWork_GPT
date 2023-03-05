import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import { Button, Image, View, Text, TouchableOpacity } from "react-native";

import { Camera, CameraType } from "expo-camera";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import ScrollPicker from "react-native-wheel-scrollview-picker";

function ImagePickerComponent({ onSubmit, imageToText }) {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [7, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setText("...Wczytywanko...");
      const responseData = await onSubmit(result.base64);
      await AsyncStorage.setItem("content", responseData.text);
      imageToText(responseData.text);
      // setText(responseData.text);
    }
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      {image ? (
        <View
          style={{
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            overflow: "hidden",
            width: "100%",
            height: 320,
            backgroundColor: "red",
          }}
        >
          <Image
            source={{ uri: image }}
            style={{
              height: 320,
              width: "100%",
              resizeMode: "cover",
            }}
          />
        </View>
      ) : (
        <View
          style={{
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            overflow: "hidden",
            width: "100%",
            height: 320,
            backgroundColor: "red",
          }}
        >
          <Camera style={{ width: "100%", aspectRatio: 3 / 4 }}></Camera>
        </View>
      )}

      {/* <Text>{text}</Text> */}
      <TouchableOpacity
        title="Wykonaj Fotografię"
        onPress={takePicture}
        style={{
          width: 70,
          height: 70,
          backgroundColor: "#000000bc",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 1000,
          opacity: 0.5,
          position: "absolute",
          top: 240,
        }}
      >
        {/* <AntDesign name="search1" size={30} color="white" /> */}
      </TouchableOpacity>
    </View>
  );
}

export default ImagePickerComponent;
