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

  get(resource) {
    const baseUrl = "http://192.168.0.203:8200/";
    const request = fetch(baseUrl + resource, {
      method: "GET",
      headers: this.state.headers,
    });
    console.log(this.state.headers);
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
}

export default ApiService;
