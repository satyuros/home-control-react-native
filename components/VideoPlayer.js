import { View, Text } from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES } from "../constants";
import { Icon } from "@rneui/themed";
import { useStateContext } from "../context/StateContext";
import { ICONS } from "../constants/icons";

const VideoPlayer = () => {
  const { isPlaying, setIsPlaying, currentVideo } = useStateContext();
  console.log("isPlaying: " + isPlaying);
  return (
    // <View
    //   style={{
    //     width: "100%",
    //     flexDirection: "row",
    //     justifyContent: "space-between",
    //     alignItems: "center",
    //     backgroundColor: isSelected ? COLORS.lightPrimary : null,
    //     marginVertical: SIZES.base,
    //     paddingHorizontal: SIZES.base,
    //   }}
    //   key={file.id}
    // >

    <View
      style={{
        width: "100%",
        flexDirection: "row",
        backgroundColor: COLORS.accent,
        padding: SIZES.font,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          fontSize: SIZES.small,
          color: COLORS.textIcons,
        }}
      >
        {currentVideo?.id}
      </Text>
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          fontSize: SIZES.small,
          color: COLORS.textIcons,
        }}
      >
        {currentVideo?.title}
      </Text>

      <Icon
        name={isPlaying ? ICONS.pause : ICONS.play}
        color="white"
        size={50}
        type="material"
        onPress={() => setIsPlaying(!isPlaying)}
      />
    </View>
  );
};

export default VideoPlayer;
