import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import store from "./app/store";
import GlobalStyle from "./common/components/GlobalStyle";
import Ui from "./common/components/Ui";
import Chat from "./features/chat/Chat";
import Chats from "./features/chat/Chats";
import Main from "./features/main/Main";
import Profile from "./features/profile/Profile";
import ProfileEdit from "./features/profile/ProfileEdit";
import ReviewEdit from "./features/review/ReviewEdit";
import Process from "./features/sidebar/Process";
import Sidebar from "./features/sidebar/Sidebar";
import Toilet from "./features/toilet/Toilet";
import Toilets from "./features/toilet/Toilets";

axios.defaults.baseURL = process.env.REACT_APP_AXIOS_BASE_URL;

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
          <Route path="/signin" element={<Sidebar />}>
            <Route path="process" element={<Process />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
