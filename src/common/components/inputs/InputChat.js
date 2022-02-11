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

  .form {
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
    margin-left: -65px;
  }
`;

function InputChat() {
  return (
    <StyledInputChat>
      <div className="form">
        <input id="input" placeholder="채팅 메시지를 입력하세요." />
        <div className="btn">
          <ButtonSmall>보내기</ButtonSmall>
        </div>
      </div>
    </StyledInputChat>
  );
}

export default InputChat;
