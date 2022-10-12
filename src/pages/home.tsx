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
        this.renderMessage(message.data, message.is_me, false);
      }
      $("#messages").animate({ scrollTop: 20000000 }, "slow");
    });

    socket.on("status", (message: any) => {
      const check = document.getElementById(message.id);
      if (check) {
        if (message.is_online) {
          $(`#${message.id} .online`).attr("src", "../../online.png");
        } else {
          $(`#${message.id} .online`).attr("src", "../../offline.png");
        }
      }
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

  renderMessage(message: string, myMessage: boolean, isFirst: boolean) {
    if (isFirst) {
      if (myMessage) {
        $("#messages").prepend(
          `<div class="my-message"><p>${message}</p></div>`
        );
      } else {
        $("#messages").prepend(
          `<div class="your-message"><p>${message}</p></div>`
        );
      }
    } else {
      if (myMessage) {
        $("#messages").append(
          `<div class="my-message"><p>${message}</p></div>`
        );
      } else {
        $("#messages").append(
          `<div class="your-message"><p>${message}</p></div>`
        );
      }
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

    if ($("#empty").html()) {
      $("#messages").html("");
    }
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
      if (user.is_online) {
        $(`#${user.id}`).append(
          `<img class="online" src="../../online.png" alt="online" />`
        );
      } else {
        $(`#${user.id}`).append(
          `<img class="online" src="../../offline.png" alt="online" />`
        );
      }

      $(`#${user.id}`).append(`<span>${user.name}</span>`);
      $(`#${user.id}`).on("click", () => {
        this.getMessage(user.id);
      });
    }
    return users;
  }

  setSession(id: string, page: number, limit: number) {
    sessionStorage.setItem("user_id", id);
    sessionStorage.setItem("page", String(page));
    sessionStorage.setItem("limit", String(limit));
  }

  getSession() {
    return {
      user_id: sessionStorage.getItem("user_id") ?? "",
      page: Number(sessionStorage.getItem("page")),
      limit: Number(sessionStorage.getItem("limit")),
    };
  }

  async getMessage(
    id: string,
    page: number = 1,
    limit: number = 20,
    scroll: boolean = false
  ) {
    if (!scroll) {
      $("#messages").text("");
    }

    this.setState({ userId: id });

    this.setSession(id, page, limit);

    const response = await CallApi(
      `${API_URL}/api/v1/message/id/${id}?page=${page}&limit=${limit}`,
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
    if (messages.length < 1 && !scroll) {
      $("#messages").append(
        `<div id="empty"><img src="../../message.png" alt="empty" /> 
        Bạn chưa có tin nhắn! \n Hãy bắt đầu trò chuyện vui vẻ. </div>`
      );
    }
    messages.map((message: any) => {
      return this.renderMessage(
        message.data,
        message.send_user_id === user.id,
        true
      );
    });
    if (!scroll) {
      $("#messages").animate({ scrollTop: 20000000 }, "slow");
    }
  }

  async loadMore() {
    const scroll = document.getElementById("messages")?.scrollTop;
    if (scroll! < 100) {
      const data = this.getSession();
      await this.getMessage(data.user_id, data.page + 1, data.limit, true);
    }
  }

  render(): React.ReactNode {
    let init = 0;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 p-0">
            <div id="user"></div>
          </div>
          <div className="col-9 p-0">
            <div
              id="messages"
              onScroll={() => {
                if (init) {
                  this.loadMore();
                }
                init++;
              }}
            ></div>
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
