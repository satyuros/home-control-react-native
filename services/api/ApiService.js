import { Text, View } from "react-native";
import React, { Component } from "react";

export class ApiService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: {
        Accept: "application/json",
      },
    };
  }

  get(resource, urlParams) {
    console.log(`${resource} ${urlParams}`);
    if (urlParams && !Array.isArray(urlParams)) {
      throw Error("INVALID TYPE: urlParams should be an array.");
    }

    const baseUrl = "http://192.168.0.203:8200/";
    let url = baseUrl + resource;
    if (urlParams) {
      url += "/" + urlParams.join("/");
    }
    console.log(url);
    const request = fetch(url, {
      method: "GET",
      headers: this.state.headers,
    });
    return request;
  }

  setToken(token) {
    if (!token) {
      token = getCookie("ACCESS_TOKEN");
    }

    if (token) {
      this.setState({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }

  getFiles() {
    return this.get("files");
  }

  getFiles(folderId) {
    return this.get("files", [folderId]);
  }

  getFolders() {
    return this.get("folders");
  }
}

export default ApiService;
