import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
const screenWidth = Dimensions.get("window").width;
import { Camera, CameraType } from "expo-camera";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import ScrollPicker from "react-native-wheel-scrollview-picker";
import WheelPicker from "react-native-wheely";
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
    console.log("dadas");
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      const base64 = await FileSystem.readAsStringAsync(photo.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      console.log(base64);
      let result = base64;

      if (!result.cancelled) {
        setImage(result.uri);
        setText("...Wczytywanko...");
        const responseData = await onSubmit(result.base64);
        await AsyncStorage.setItem("content", responseData.text);
        imageToText(responseData.text);
        // setText(responseData.text);
      }
    }
  };

  const takePicture2 = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [7, 3],
      quality: 1,
      base64: true,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
      setText("...Wczytywanko...");
      const responseData = await onSubmit(result.base64);
      await AsyncStorage.setItem("content", responseData.text);
      imageToText(responseData.text);
      // setText(responseData.text);
    }
  };
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      {image ? (
        <View
          style={{
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            // overflow: "hidden",
            width: "100%",
            height: "100%",
            backgroundColor: "red",
          }}
        >
          <Image
            source={{ uri: image }}
            style={{
              height: "100%",
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
            // overflow: "hidden",
            width: "100%",
            height: "100%",
            backgroundColor: "red",
          }}
        >
          <Camera
            ref={(ref) => {
              cameraRef = ref;
            }}
            style={{ height: "100%", aspectRatio: 3 / 4 }}
          ></Camera>
        </View>
      )}
      {/* <WheelPicker
        selectedIndex={selectedIndex}
        options={["Berlin", "London", "Amsterdam"]}
        onChange={(index) => setSelectedIndex(index)}
        itemHeight={screenWidth / 3}
        containerStyle={{
          transform: "rotate(90deg)",
          // width: 40,
          // height: screenWidth,
          // whiteSpace: "nowrap",
          backgroundColor: "transparent",
        }}
        selectedIndicatorStyle={{ backgroundColor: "transparent" }}
        itemTextStyle={{
          transform: "rotate(-90deg)",
          // width: screenWidth / 5,
          // padding: 0,
          whiteSpace: "nowrap",
        }}
      /> */}
      {/* <Text>{text}</Text> */}
      <TouchableOpacity
        title="Wykonaj Fotografię"
        onPress={() => takePicture()}
        style={{
          width: 70,
          height: 70,
          backgroundColor: "#aaa",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 1000,
          opacity: 0.5,
          position: "absolute",
          top: 240,
        }}
      ></TouchableOpacity>
    </View>
  );
}

export default ImagePickerComponent;
