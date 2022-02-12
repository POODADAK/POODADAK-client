import axios from "axios";

async function authenticate(state, code) {
  if (!state) {
    await axios.post("auth/kakao", { token: code }, { withCredentials: true });
  } else {
    await axios.post("auth/naver", { code, state }, { withCredentials: true });
  }
}

export default authenticate;
