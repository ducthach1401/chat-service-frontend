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
      userId: "",
      meId: "",
    };
  }

  componentDidMount(): void {
    document.title = "Home";
    this.getMe().then((user) => {
      this.setState({ meId: user.id });
    });

    if (!Cookies.get("access_token")) {
      window.location.href = "/login";
    }
    const socket = this.setupSocket();

    socket.on("receive_message", (message: any) => {
      if (
        (this.state.meId === message.send_user_id &&
          this.state.userId === message.receive_user_id) ||
        (this.state.userId === message.send_user_id &&
          this.state.meId === message.receive_user_id)
      ) {
        this.renderMessage(message.data, message.is_me);
      }
      $("#messages").animate({ scrollTop: 20000000 }, "slow");
    });

    this.getUsers().then((users) => {
      if (users.length > 0) {
        this.getMessage(users[0].id);
      }
    });
    this.setState({ socket: socket });
  }

  async getMe() {
    const response = await CallApi(
      `${API_URL}/api/user/v1/me`,
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
    const user = response.data;
    return user;
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

  renderMessage(message: string, myMessage: boolean) {
    if (myMessage) {
      $("#messages").append(`<div class="my-message"><p>${message}</p></div>`);
    } else {
      $("#messages").append(
        `<div class="your-message"><p>${message}</p></div>`
      );
    }
  }

  send() {
    const socket: Socket = this.state.socket;
    const body = {
      to: this.state.userId,
      content: $("#message").val()?.toString(),
    };
    if (!body.content || !body.to) {
      return;
    }
    socket.emit("private", body);
    $("#message").val("");
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
    $("user").text("");
    for (let user of users) {
      $("#user").append(`<div id=${user.id}></div>`);
      if (!user.avatarUrl) {
        $(`#${user.id}`).append(
          `<img class="avatar" src="../../avatar.png" alt="avatar" />`
        );
      }
      $(`#${user.id}`).append(user.name);
      $(`#${user.id}`).on("click", () => {
        this.getMessage(user.id);
      });
    }
    return users;
  }

  async getMessage(id: string) {
    $("#messages").text("");
    this.setState({ userId: id });
    const response = await CallApi(
      `${API_URL}/api/v1/message/id/${id}?page=1&limit=20`,
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
    const user = await this.getMe();
    messages.map((message: any) => {
      return this.renderMessage(message.data, message.send_user_id === user.id);
    });
    $("#messages").animate({ scrollTop: 20000000 }, "slow");
  }

  render(): React.ReactNode {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 p-0">
            <div id="user"></div>
          </div>
          <div className="col-9 p-0">
            <div id="messages"></div>
            <div id="input-message">
              <textarea
                name="message"
                id="message"
                autoComplete="off"
                rows={1}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    this.send();
                  }
                }}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
