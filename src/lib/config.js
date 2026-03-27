export const API_ENDPOINT = "http://127.0.0.1:8000/";
// export const API_ENDPOINT = "https://api.singaporemaxi.com/";
// export const API_ENDPOINT = "api.singaporemaxi.com";
// export const  API_ENDPOINT = "http://192.168.29.187:8006/";
// export const API_ENDPOINT = "http://192.168.29.183:8008/";

export const API_TOKEN = "Th45Dc@g9K3gaFuWlaLV901Ds2";
export const capitalizeText = (text) => {
  if (text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  } else {
    // Handle the case when text is undefined or null
    return "";
  }
};




