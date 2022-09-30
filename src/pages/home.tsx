import React from "react";
import Cookies from "js-cookie";
import { SOCKET_URL } from "../helpers/web-socket";
import io, { Socket } from "socket.io-client";
import $ from "jquery";
import { API_URL, CallApi, METHOD } from "../helpers/call-api";
import Swal from "sweetalert2";
import "../css/home.css";

export class Home extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      socket: "",
    };
  }

  componentDidMount(): void {
    document.title = "Home";

    if (!Cookies.get("access_token")) {
      window.location.href = "/login";
    }
    const socket = this.setupSocket();

    socket.on("receive_message", (message: any) => {
      $("#messages").append(`<div>${message}</div>`);
    });

    this.getUsers().then(() => this.getMessage());
    this.setState({ socket: socket });
  }

  setupSocket() {
    const socket = io(SOCKET_URL, {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        },
      },
    });
    socket.on("connect", () => {
      console.log("Connected");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });

    return socket;
  }

  send() {
    const socket: Socket = this.state.socket;
    const body = {
      to: $("input[name=user]:checked", "#user").val(),
      content: $("#message").val(),
    };
    if (!body.content || !body.to) {
      return;
    }
    $("#message").val("");
    socket.emit("private", body);
    $("#messages").append(`<div>${body.content}</div>`);
    $("#messages").animate({ scrollTop: 20000000 }, "slow");
  }

  async getUsers() {
    const response = await CallApi(
      `${API_URL}/api/user/v1/users`,
      METHOD.Get,
      undefined,
      Cookies.get("access_token")
    );
    if (response.status !== 200) {
      await Swal.fire({
        title: response.data.error_message,
        icon: "error",
        timer: 1000,
      });
      Cookies.remove("access_token");
      return (window.location.href = "/");
    }
    const users = response.data;
    let first = false;
    for (let user of users) {
      if (!first) {
        first = true;
        $("#user").append(
          `<input type="radio" name="user" id=${user.id} value=${user.id} checked>
                <label for=${user.id}>${user.name}</label>`
        );
      } else {
        $("#user").append(
          `<input type="radio" name="user" id=${user.id} value=${user.id} >
        <label for=${user.id}>${user.name}</label>`
        );
      }
    }
  }

  async getMessage() {
    $("#messages").text("");
    const response = await CallApi(
      `${API_URL}/api/v1/message/id/${$(
        "input[name=user]:checked",
        "#user"
      ).val()}`,
      METHOD.Get,
      undefined,
      Cookies.get("access_token")
    );
    if (response.status !== 200) {
      await Swal.fire({
        title: response.data.error_message,
        icon: "error",
        timer: 1000,
      });
      return;
    }
    const messages = response.data;
    for (const message of messages) {
      $("#messages").append(`<div>${message.data}</div>`);
    }
    $("#messages").animate({ scrollTop: 20000000 }, "slow");
  }

  render(): React.ReactNode {
    return (
      <div>
        <div
          id="user"
          onClick={() => {
            this.getMessage();
          }}
        ></div>
        <div id="messages"></div>
        <div>
          <input
            type="text"
            id="message"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                this.send();
              }
            }}
          />
          <input type="button" value="Send" onClick={() => this.send()} />
        </div>
      </div>
    );
  }
}
