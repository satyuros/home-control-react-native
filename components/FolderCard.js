import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image, Text } from "react-native";

import { COLORS, SIZES, SHADOWS, assets } from "../constants";
import { SubInfo, EthPrice, NFTTitle } from "./SubInfo";
import { RectButton, CircleButton } from "./Button";

const FolderCard = ({ data }) => {
  const navigation = useNavigation();

  //TODO: move to common
  function getTitle(data) {
    return data.parentFolderName === "(null)" ||
      data.name.includes(data.parentFolderName)
      ? data.name
      : `${data.parentFolderName} - ${data.name}`;
  }

  return (
    <View
      style={{
        backgroundColor: COLORS.textIcons,
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.base,
        ...SHADOWS.dark,
      }}
    >
      <View style={{ width: "100%", height: 250 }}>
        <Image
          source={assets.nft03}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
            borderTopLeftRadius: SIZES.font,
            borderTopRightRadius: SIZES.font,
          }}
        />
      </View>

      <CircleButton imgUrl={assets.heart} right={10} top={10} />
      <SubInfo />
      <View style={{ width: "100%", padding: SIZES.font }}>
        <NFTTitle
          title={getTitle(data)}
          //subTitle={data.creator}
          titleSize={SIZES.large}
          subTitleSize={SIZES.small}
        />

        <View
          style={{
            marginTop: SIZES.font,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <EthPrice price={/*data.price*/ 100} />
          <RectButton
            text="Open folder"
            minWidth={120}
            fontSize={SIZES.font}
            handlePress={() => navigation.navigate("Details", { data })}
          />
        </View>
      </View>
    </View>
  );
};

export default FolderCard;
