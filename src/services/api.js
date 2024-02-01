import Axios from "axios";
import { getConfig } from "../config/config";

const config = getConfig();
const client = Axios.create({
  baseURL: config.baseUrl,
});

export { client };
