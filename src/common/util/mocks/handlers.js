// src/mocks/handlers.js
import { rest } from "msw";

const handlers = [
  rest.get("/chatroom/:chatroomId", (req, res, ctx) =>
    res(
      ctx.json({
        chatroom: {
          isLive: false,
          toilet: 2,
          owner: "test",
          chatroomId: 1,
        },
      })
    )
  ),
];

export default handlers;
