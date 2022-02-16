import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import store from "./app/store";
import GlobalStyle from "./common/components/GlobalStyle";
import Ui from "./common/components/Sidebar";
import Chatroom from "./features/chat/Chatroom";
import ChatroomList from "./features/chat/ChatroomList";
import ErrorPage from "./features/error/ErrorPage";
import Login from "./features/login/Login";
import { checkToken } from "./features/login/loginSlice";
import Main from "./features/main/Main";
import Profile from "./features/profile/Profile";
import ProfileEdit from "./features/profile/ProfileEdit";
import ReviewEdit from "./features/review/ReviewEdit";
import Toilet from "./features/toilet/Toilet";
import Toilets from "./features/toilet/Toilets";

axios.defaults.baseURL = process.env.REACT_APP_AXIOS_BASE_URL;
store.dispatch(checkToken);

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/toilets" element={<Toilets />} />
          <Route path="/toilets/:toilet_id" element={<Toilet />} />
          <Route path="/chatroomList" element={<ChatroomList />} />
          <Route path="/chatroomList/:chatroomId" element={<Chatroom />} />
          <Route path="/editReview" element={<ReviewEdit />} />
          <Route path="/editReview/:reviewId" element={<ReviewEdit />} />
          <Route path="/users/:userId" element={<Profile />} />
          <Route path="/editProfile/:user_id" element={<ProfileEdit />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/ui" element={<Ui />} />
          <Route path="/login/process" element={<Login />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
