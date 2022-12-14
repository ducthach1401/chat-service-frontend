import React from "react";
import Cookies from "js-cookie";
import { SOCKET_URL } from "../helpers/web-socket";
import io, { Socket } from "socket.io-client";
import $ from "jquery";
import { API_URL, CallApi, METHOD } from "../helpers/call-api";
import Swal from "sweetalert2";
import "../css/home.css";
import { Logout } from "../helpers/logout";

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
      if (!user.avatar_url) {
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
      const pre_id = this.getSession().user_id;
      $("#messages").text("");
      if (pre_id) {
        $(`#${pre_id}`).removeClass("press");
      }
      $(`#${id}`).addClass("press");
      this.renderAvatar(id);
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
        B???n ch??a c?? tin nh???n! \n H??y b???t ?????u tr?? chuy???n vui v???. </div>`
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

  async renderAvatar(id: string) {
    const response = await CallApi(
      `${API_URL}/api/user/v1/users/id/${id}`,
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
    const user = response.data;
    $(`#message_avatar`).html("");
    if (!user.avatar_url) {
      $(`#message_avatar`).append(
        `<img src="../../avatar.png" alt="message avatar" id="message_avatar_status"></img>`
      );
    }

    if (user.is_online) {
      $(`#message_avatar`).append(
        `<img src="../../online.png" alt="online" id="message_status"></img>`
      );
    } else {
      $(`#message_avatar`).append(
        `<img src="../../offline.png" alt="offline" id="message_status"></img>`
      );
    }

    $(`#message_avatar`).append(`<span>${user.name}</span>`);
  }

  render(): React.ReactNode {
    let init = 0;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 p-0">
            <div id="user"></div>
          </div>
          <div className="col-9 p-0" id="background-status">
            <div className="row m-0">
              <div className="col-9" id="message_avatar"></div>
              <div className="col-2" id="setting_row">
                <div className="dropleft" id="setting">
                  <button
                    className="btn dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    id="setting-button"
                  >
                    <img src="../../setting.png" alt="setting-button" />
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item">Change Name</a>
                    </li>
                    <li>
                      <a className="dropdown-item">Change Password</a>
                    </li>
                    <li>
                      <a className="dropdown-item">Update Avatar</a>
                    </li>

                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" onClick={Logout}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div
              className="col-12"
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
              <img
                src="../../send-message.png"
                alt="send message"
                id="send-message"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
