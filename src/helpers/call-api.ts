export async function CallApi(
  url: string,
  method: METHOD,
  body: any,
  token: string | undefined
) {
  const headers: any = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = "Bearer " + token;
  }

  const response = await fetch(url, {
    method: method,
    body: body ? JSON.stringify(body) : null,
    headers: headers,
  });

  return { data: await response.json(), status: response.status };
}

export const API_URL = process.env.REACT_APP_API_URL!;

export enum METHOD {
  Post = "POST",
  Get = "GET",
  Put = "PUT",
  Delete = "DELETE",
}
