import React from "react";
import $ from "jquery";
import { API_URL, CallApi, METHOD } from "../helpers/call-api";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

export class Register extends React.Component {
  componentDidMount(): void {
    document.title = "Register";
  }

  async register() {
    if (
      !$("#name").val() ||
      !$("#username").val() ||
      !$("#password").val() ||
      !$("#confirm_password").val()
    ) {
      return $("#notification").text("Please fill information.");
    }

    if ($("#password").val() !== $("#confirm_password").val()) {
      return $("#notification").text("Password not match.");
    }
    const body = {
      name: $("#name").val(),
      username: $("#username").val(),
      password: $("#password").val(),
    };
    const response = await CallApi(
      `${API_URL}/api/v1/user/register`,
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
    await Swal.fire({
      title: "Success",
      icon: "success",
      timer: 1000,
    });
    window.location.href = "/login";
  }

  render(): React.ReactNode {
    if (Cookies.get("access_token")) {
      window.location.href = "/";
    }

    return (
      <div>
        <div>Register</div>
        <input type="text" id="name" placeholder="Name" />
        <input type="text" id="username" placeholder="Username" />
        <input type="password" id="password" placeholder="Password" />
        <input
          type="password"
          id="confirm_password"
          placeholder="Confirm Password"
        />
        <input type="button" value="Register" onClick={this.register} />
        <div id="notification"></div>
      </div>
    );
  }
}
