import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import store from "./app/store";
import GlobalStyle from "./common/components/GlobalStyle";
import Chat from "./common/components/pages/Chat";
import Chats from "./common/components/pages/Chats";
import Main from "./common/components/pages/Main";
import Profile from "./common/components/pages/Profile";
import ProfileEdit from "./common/components/pages/ProfileEdit";
import ReviewEdit from "./common/components/pages/ReviewEdit";
import Toilet from "./common/components/pages/Toilet";
import Toilets from "./common/components/pages/Toilets";
import Ui from "./common/components/Ui";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/toilets" element={<Toilets />} />
          <Route path="/toilets/:toilet_id" element={<Toilet />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/chats/:chat_id" element={<Chat />} />
          <Route path="/editReview/:review_id" element={<ReviewEdit />} />
          <Route path="/users/:user_id" element={<Profile />} />
          <Route path="/editProfile/:user_id" element={<ProfileEdit />} />
          <Route path="/ui" element={<Ui />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
