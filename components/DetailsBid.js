import React from "react";
import { View, Text, Image } from "react-native";

import { EthPrice } from "./SubInfo";
import { COLORS, SIZES, FONTS, assets } from "../constants";
import { CircleButton } from "./Button";

const DetailsBid = ({ file, handlePress }) => {
  //TODO: move to common library
  const bytesToSize = (bytes) => {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes == 0) return "0 Byte";
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
  };

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: SIZES.base,
        paddingHorizontal: SIZES.base,
      }}
      key={file.id}
    >
      {/* <Image
        source={assets.person02}
        resizeMode="contain"
        style={{ width: 48, height: 48 }}
      /> */}
      <CircleButton imgUrl={assets.play} handlePress={handlePress} />

      <View
        style={{
          flex: 1,
          alignItems: "center",
          paddingHorizontal: SIZES.base,
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.semiBold,
            fontSize: SIZES.small,
            color: COLORS.primary,
          }}
        >
          {file.title}
        </Text>
        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: SIZES.small - 2,
            color: COLORS.secondary,
            marginTop: 3,
          }}
        >
          {bytesToSize(file.size)} | {file.resolution} | {file.mime}
        </Text>
      </View>

      <EthPrice price={file.duration} />
    </View>
  );
};

export default DetailsBid;
