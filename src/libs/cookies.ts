import Cookies from "js-cookie";

export const setCookie = (key: string, value: string) => {
  Cookies.set(key, value);
};

export const getCookie = (key: string) => {
  return Cookies.get(key);
};