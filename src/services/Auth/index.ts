import { AppAPIInstance } from "src/services/apiConfiguration";
import { API } from "src/config/constants";
import { FormLogin } from "src/models/Auth";

export const login = async (data: FormLogin): Promise<any> => {
  return AppAPIInstance.post(API.AUTH_USER.LOGIN, data);
};
