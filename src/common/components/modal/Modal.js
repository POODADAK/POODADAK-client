import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import iconClose from "../../../assets/icon-close.svg";
import { COLOR } from "../../util/constants";

const ModalWrapper = styled.div`
  z-index: 3;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  min-width: 280px;
  max-width: 390px;
  height: fit-content;
  background-color: black;
  color: ${COLOR.HEAVY_GOLD};
  border-radius: 0.5rem;
  overflow: hidden;
  text-align: center;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  header {
    width: 100%;
    height: 3rem;
    background-color: ${COLOR.HEAVY_GOLD};
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .close-button {
      width: 3rem;
      height: 3rem;
      color: black;
      font-size: 1.2rem;
      cursor: pointer;
      margin-right: 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  body {
    padding: 2rem 1rem 3rem 1rem;
    min-height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
  }
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(72, 72, 72, 0.46);
  z-index: 2;
  cursor: default;
`;

function Modal({ children, onModalCloseClick }) {
  const $rootElement = document.querySelector("#root");

  function handleCloseClick() {
    onModalCloseClick();
  }

  return ReactDOM.createPortal(
    <>
      <Backdrop onClick={handleCloseClick} />
      <ModalWrapper>
        <header>
          <div
            className="close-button"
            onClick={handleCloseClick}
            onKeyDown={handleCloseClick}
            role="button"
            tabIndex={0}
          >
            <img src={iconClose} alt="닫기" />
          </div>
        </header>
        <body>{children}</body>
      </ModalWrapper>
    </>,
    $rootElement
  );
}

Modal.propTypes = {
  onModalCloseClick: PropTypes.func,
};

export default Modal;
