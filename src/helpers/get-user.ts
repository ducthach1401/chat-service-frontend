import Cookies from "js-cookie";
import { API_URL, CallApi, METHOD } from "./call-api";

export async function GetUser() {
  const response = await CallApi(
    `${API_URL}/api/user/v1/me`,
    METHOD.Get,
    undefined,
    Cookies.get("access_token")
  );

  if (response.status !== 200) {
    return;
  }

  return response.data;
}
