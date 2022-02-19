import { rest } from "msw";

const handlers = [
  rest.get("http://localhost/chatroom/:chatroomId", (req, res, ctx) =>
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
  rest.get("http://localhost/chatroom/live-chatroom-list", (req, res, ctx) =>
    res(
      ctx.json({
        liveChatRoomData: {
          liveChatroomList: [],
        },
      })
    )
  ),
  rest.post("http://localhost/chatroom/new-chatroom", (req, res, ctx) =>
    res(ctx.json({ newLiveChatroom: {} }))
  ),
];

export default handlers;
