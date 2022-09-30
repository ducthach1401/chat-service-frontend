import React from "react";
import $ from "jquery";
import { API_URL, CallApi, METHOD } from "../helpers/call-api";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

export class Login extends React.Component {
  componentDidMount(): void {
    document.title = "Login";
  }

  async login() {
    const body = {
      username: $("#username").val(),
      password: $("#password").val(),
    };
    if (!body.username || !body.password) {
      return $("#notification").text("Username or password must be fill");
    }
    const response = await CallApi(
      `${API_URL}/api/v1/auth/login`,
      METHOD.Post,
      body,
      undefined
    );
    if (response.status !== 200) {
      return await Swal.fire({
        title: response.data.error_message,
        icon: "error",
        timer: 1000,
      });
    }
    Cookies.set("access_token", response.data.access_token);
    await Swal.fire({
      title: "Success",
      icon: "success",
      timer: 1000,
    });
    window.location.href = "/";
  }

  render(): React.ReactNode {
    if (Cookies.get("access_token")) {
      window.location.href = "/";
    }

    return (
      <div>
        <div>Login</div>
        <input type="text" id="username" placeholder="Username" />
        <input type="password" id="password" placeholder="Password" />
        <input type="button" value="Login" onClick={this.login} />
        <div id="notification"></div>
      </div>
    );
  }
}
