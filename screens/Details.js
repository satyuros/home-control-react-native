import React, { useEffect, useState } from "react";
import GoogleCast, {
  CastButton,
  CastState,
  useCastState,
  useRemoteMediaClient,
} from "react-native-google-cast";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  FlatList,
} from "react-native";

import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";
import {
  CircleButton,
  RectButton,
  SubInfo,
  DetailsDesc,
  DetailsBid,
  FocusedStatusBar,
  DetailsVideoItem,
} from "../components";
import ApiService from "../services/api/ApiService";
import { useStateContext } from "../context/StateContext";
import VideoPlayer from "../components/VideoPlayer";

const DetailsHeader = ({ data, navigation }) => (
  <View style={{ width: "100%", height: 173 }}>
    <Image
      source={assets.nft04}
      resizeMode="cover"
      style={{ width: "100%", height: "100%" }}
    />

    <CircleButton
      imgUrl={assets.left}
      handlePress={() => navigation.goBack()}
      position="absolute"
      left={15}
      top={StatusBar.currentHeight + 10}
    />

    <CastButton
      style={{
        position: "absolute",
        width: 24,
        height: 24,
        right: 15,
        top: StatusBar.currentHeight + 10,
        tintColor: "white",
      }}
    />

    <CircleButton
      imgUrl={assets.heart}
      right={15}
      position="absolute"
      top={StatusBar.currentHeight + 74}
    />
  </View>
);

const Details = ({ route, navigation }) => {
  const { data } = route.params;
  const [files, setFiles] = useState();
  const client = useRemoteMediaClient();
  const { currentVideo, playVideo } = useStateContext();

  const handleShowPress = () => {
    GoogleCast.showExpandedControls();
  };

  const handleItemPress = (itemPressed) => {
    // if (!client) return;

    // client.loadMedia({
    //   mediaInfo: {
    //     contentUrl: "http://192.168.0.203:8200/MediaItems/" + itemPressed.id,
    //     contentType: "video/mp4",
    //   },
    // });
    playVideo(itemPressed);
  };

  useEffect(() => {
    const api = new ApiService();
    api
      .getFiles(data.id)
      .then((response) => response.json())
      .then((response) => {
        setFiles(
          response.files.map((item) => {
            return {
              duration: item.duration,
              id: item.id,
              mime: item.mime,
              resolution: item.resolution,
              size: parseInt(item.size),
              title: item.title,
            };
          })
        );
      })
      .catch((error) => console.log("Error get files", error))
      .done();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />

      <View
        style={{
          width: "100%",
          position: "absolute",
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: "rgba(255,255,0,0.5)",
          zIndex: 1,
        }}
      >
        {/* <RectButton
          text="Show controls"
          minWidth={170}
          fontSize={SIZES.large}
          {...SHADOWS.dark}
          handlePress={handleShowPress}
        /> */}
        <VideoPlayer />
      </View>

      <FlatList
        data={files}
        renderItem={({ item }) => (
          <DetailsVideoItem
            file={item}
            isSelected={item.id === currentVideo?.id}
            handlePress={handleItemPress}
          />
        )}
        extraData={currentVideo}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: SIZES.extraLarge * 3 }}
        ListHeaderComponent={() => (
          <React.Fragment>
            <DetailsHeader data={{ data }} navigation={navigation} />
            <SubInfo />
            <View style={{ padding: SIZES.font }}>
              <DetailsDesc data={data} />
            </View>
          </React.Fragment>
        )}
      />
    </SafeAreaView>
  );
};

export default Details;
