import axios from "axios";

const isLocalServer = process.env["REACT_APP_LOCAL_SERVER"] === 'true'
const BASE_URL = isLocalServer ? "http://localhost:5000/" : "https://oleinikovlibrarybackend.vercel.app";
export default axios.create({
  baseURL: BASE_URL
});