import { io } from "socket.io-client";

function connectSocketNamespace(prefix, namespace) {
  const socket = io(
    `${process.env.REACT_APP_AXIOS_BASE_URL}/${prefix}-${namespace}`,
    {
      withCredentials: true,
    }
  );

  socket.on("connect", () => {
    // eslint-disable-next-line no-console
    console.log("connected", socket.id);
  });

  return socket;
}

export default connectSocketNamespace;
