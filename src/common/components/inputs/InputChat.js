import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import ButtonSmall from "../buttons/ButtonSmall";

const StyledInputChat = styled.form`
  width: 100%;
  height: 60px;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;

  .input-container {
    width: 94%;
    display: flex;
    align-items: center;
    padding: 4px 10px;
  }

  input {
    width: 100%;
    height: 36px;
    font-size: medium;
    border: none;
    border-radius: none;
    outline: none;

    ::placeholder {
      font-size: medium;
      color: gray;
      padding-left: 0.5rem;
    }
  }

  .btn {
    width: fit-content;
    margin-left: -65px;
  }
`;

function InputChat({ chat, onChange, onSubmit }) {
  return (
    <StyledInputChat autoComplete="off" onSubmit={onSubmit}>
      <div className="input-container">
        <input
          id="input"
          type="text"
          placeholder="채팅 메시지를 입력하세요."
          value={chat}
          onChange={onChange}
        />
        <div className="btn">
          <ButtonSmall type="submit">보내기</ButtonSmall>
        </div>
      </div>
    </StyledInputChat>
  );
}

InputChat.propTypes = {
  chat: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

InputChat.defaultProps = {
  chat: "",
};

export default InputChat;
