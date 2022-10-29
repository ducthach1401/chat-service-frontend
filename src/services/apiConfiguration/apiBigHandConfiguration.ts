import axios from 'axios';
// import * as CONSTANTS from 'src/config/constants';

// let isRefreshing = false;
// let failedQueue: any[] = [];

const AppAPIInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

AppAPIInstance.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';

export const setToken = (token: string) => {
  AppAPIInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  // AppAPIInstance.defaults.headers.common['token'] = `${token}`;
};

// AppAPIInstance.interceptors.response.use(
//   response => {
//     // if (response && response.data) {
//     //   return response.data || null;
//     // }
//     return response.data || null;
//   },
//   error => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise(function (resolve, reject) {
//           failedQueue.push({ resolve, reject })
//         }).then(token => {
//           originalRequest.headers['Authorization'] = 'Bearer ' + token;
//           return AppAPIInstance(originalRequest);
//         }).catch(err => {
//           return null
//         })
//       }

//       originalRequest._retry = true;
//       setIsRefreshing(true)

//       return new Promise(function (resolve, reject) {
//         getNewToken()
//           .then(token => {
//             setToken(token)
//             originalRequest.headers['Authorization'] = 'Bearer ' + token;
//             processQueue(null, token);
//             return resolve(AppAPIInstance(originalRequest));
//           })
//           .catch((err) => {
//             localStorage.clear();
//             const _window: any = window;
//             if (_window.location.pathname.split("/")[1].toString() === "admin") {
//               _window.location = "/admin"
//             } else {
//               _window.location = "/"
//             }
//             return reject(err);
//           })
//           .finally(() => { setIsRefreshing(false) })
//       })
//     }
//     return Promise.reject(error?.response?.data?.error || error);
//   }
// );

// const processQueue = (error: any, token: string = '') => {
//   failedQueue.forEach((prom: any) => {
//     if (error) { prom.reject(error); }
//     else { prom.resolve(token); }
//   })
//   failedQueue = [];
// }

// export const getNewToken = async () => {
//   let refreshToken: any = localStorage.getItem(CONSTANTS.REFRESH_TOKEN) || null
//   if (!refreshToken) { return Promise.reject({ error: 'RefreshToken Invalid' }) }

//   const tokenData: any = await axios.post(`${process.env.REACT_APP_API_URL}${CONSTANTS.API.AUTH_USER.REFRESH_TOKEN}`, { refreshToken }).then(r => r.data).catch(() => null);
//   if (!tokenData) { return Promise.reject({ error: 'RefreshToken Invalid' }) }

//   const token = tokenData.result.accessToken;
//   localStorage.setItem(CONSTANTS.ACCESS_TOKEN, tokenData.result.accessToken);
//   localStorage.setItem(CONSTANTS.REFRESH_TOKEN, tokenData.result.refreshToken);
//   setToken(token);

//   return token;
// }

// export const startWatchStorage = () => {
//   window.addEventListener("storage", (event: any) => {
//     if (event.storageArea === localStorage) {
//       let v;
//       try { v = JSON.parse(event.newValue); }
//       catch (e) { v = event.newValue; }

//       if (event.key === CONSTANTS.isRefreshing) {
//         isRefreshing = v;
//         if (!v && !!failedQueue?.length) {
//           let token = localStorage.getItem(CONSTANTS.ACCESS_TOKEN) || ''
//           processQueue(null, token);
//         }
//       }
//     }
//   });
// }

// const setIsRefreshing = (status: boolean) => {
//   isRefreshing = status;
//   localStorage.setItem(CONSTANTS.isRefreshing, status.toString());
// }

export default AppAPIInstance;