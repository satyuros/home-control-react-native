import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

import { FolderCard, HomeHeader, FocusedStatusBar } from "../components";
import { COLORS, NFTData } from "../constants";
import ApiService from "../services/api/ApiService";

const Home = () => {
  const [nftData, setNftData] = useState(NFTData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [folders, setFolders] = useState();

  useEffect(() => {
    const api = new ApiService();
    api
      .getFolders()
      .then((response) => response.json())
      .then((result) => {
        setIsLoading(false);
        setFolders(result.folders);
        //console.log(result);
      })
      .catch((error) => {
        console.log("Error get files", error);
        setIsLoading(false);
        setError(error);
      });
  }, []);

  const handleSearch = (value) => {
    if (value.length === 0) {
      setNftData(NFTData);
    }

    const filteredData = NFTData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredData.length === 0) {
      setNftData(NFTData);
    } else {
      setNftData(filteredData);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <FocusedStatusBar backgroundColor={COLORS.primary} />
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={{ flex: 1 }}>
          <View style={{ zIndex: 0 }}>
            <FlatList
              data={folders}
              renderItem={({ item }) => <FolderCard data={item} />}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={<HomeHeader onSearch={handleSearch} />}
            ></FlatList>

            <View
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                zIndex: -1,
              }}
            >
              <View style={{ height: 300, backgroundColor: Colors.primary }} />
              <View style={{ flex: 1, backgroundColor: Colors.white }} />
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
