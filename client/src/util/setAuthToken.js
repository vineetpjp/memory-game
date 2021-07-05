import axios from "axios";
//set jwt token to header

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["file_id"] = token;
  } else {
    delete axios.defaults.headers.common["file_id"];
  }
};

export default setAuthToken;
