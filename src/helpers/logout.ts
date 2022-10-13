import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { API_URL, CallApi, METHOD } from "./call-api";

export async function Logout() {
  const response = await CallApi(
    `${API_URL}/api/v1/auth/logout`,
    METHOD.Delete,
    undefined,
    Cookies.get("access_token")
  );
  if (response.status !== 200) {
    await Swal.fire({
      title: response.data.error_message,
      icon: "error",
      timer: 1000,
    });
    return (window.location.href = "/");
  }
  Cookies.remove("access_token");
  window.location.href = "/";
}
