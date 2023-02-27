import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import { Button, Image, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

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
    <View>
      <Button title="Wykonaj Fotografię" onPress={takePicture} />
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 400, height: 300, resizeMode: "contain" }}
        />
      )}
      {/* <Text>{text}</Text> */}
    </View>
  );
}

export default ImagePickerComponent;
