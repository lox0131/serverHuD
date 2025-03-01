import sslChecker from "ssl-checker";
import axios from "axios";
import prependHttp from "prepend-http";
const sr = require("server-reachability");

export const isUp = async (hostname: string) => {
  let fixedUrl = hostname.replace(/^https?\:\/\//i, "").replace(/\/$/, "");
  let res = await sr.isReachable(fixedUrl, 80);
  if (res) return "up";
  else return "down";
};


export const getSslDetails = async (hostname: string) => {
  let fixedUrl = hostname.replace(/^https?\:\/\//i, "").replace(/\/$/, "");
  try {
    return await sslChecker(fixedUrl)
  } catch (err) {
    return err;
  }
};

export const hudServerData = async (url: string) => {
  console.log("url hud: ", url)
  return axios({
    method: "get",
    url: prependHttp(url, {https: false}),
  }).then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.log("hudServerFetch error: ", error);
      return error;
    }
  );
};
