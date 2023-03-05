import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  withTiming,
} from "react-native-reanimated";

const { width: screenWidth } = Dimensions.get("window");

const MenuItem = ({ label, isActive, width }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    width: withTiming(width),
  }));

  return (
    <View style={{ alignItems: "center" }}>
      <Animated.View
        style={[
          { height: 3, backgroundColor: isActive ? "black" : "transparent" },
          animatedStyle,
        ]}
      />
      <Text
        style={{
          color: isActive ? "black" : "gray",
          fontSize: 16,
          marginHorizontal: 8,
          marginVertical: 12,
        }}
      >
        {label}
      </Text>
    </View>
  );
};

const ScrollableMenu = ({ data }) => {
  const scrollViewRef = useRef(null);
  const activeIndex = useSharedValue(0);
  const width = useSharedValue(screenWidth / data.length);

  const onLayout = ({
    nativeEvent: {
      layout: { width: containerWidth },
    },
  }) => {
    width.value = containerWidth / data.length;
  };

  const onItemPress = (index) => {
    activeIndex.value = index;
    scrollViewRef.current?.scrollTo({ x: index * width.value, animated: true });
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      activeIndex.value = Math.round(event.contentOffset.x / width.value);
    },
  });

  const backgroundStyle = useAnimatedStyle(() => ({
    width: withTiming(width.value * 1.5),
    transform: [
      { translateX: activeIndex.value * width.value - width.value / 2 },
    ],
  }));

  return (
    <View style={{ flexDirection: "row" }}>
      <ScrollView
        horizontal
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <View
          style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
          onLayout={onLayout}
        >
          <View style={{ width: screenWidth / 2 - width.value / 2 }} />
          {data.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => onItemPress(index)}>
              <MenuItem
                label={item.label}
                isActive={activeIndex.value === index}
                width={width.value}
              />
            </TouchableOpacity>
          ))}
          <View style={{ width: screenWidth / 2 - width.value / 2 }} />
          <Animated.View
            style={[
              {
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 3,
                backgroundColor: "black",
              },
              backgroundStyle,
            ]}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default function MennuItem() {
  const data = [
    { label: "Option 1" },
    { label: "Option 2" },
    { label: "Option 3" },
    { label: "Option 4" },
    { label: "Option 5" },
    { label: "Option 6" },
    { label: "Option 7" },
  ];

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ScrollableMenu data={data} />
    </View>
  );
}
