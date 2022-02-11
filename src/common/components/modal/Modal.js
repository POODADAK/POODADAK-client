import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import { COLOR } from "../../util/constants";

const ModalWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 40%;
  background-color: black;
  color: ${COLOR.HEAVY_GOLD};
  z-index: 3;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;

  .close-button {
    position: relative;
    left: 90%;
    width: 1rem;
    height: 1rem;
    background-color: transparent;
    color: black;
    font-size: 1.5rem;
    font-weight: bolder;
    text-decoration: none;
    cursor: pointer;
  }

  header {
    width: 100%;
    height: 10%;
    top: 0;
    left: 0;
    background-color: ${COLOR.HEAVY_GOLD};
    position: sticky;
    transform: translateY(-4px);
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
            X
          </div>
        </header>
        {children}
      </ModalWrapper>
    </>,
    $rootElement
  );
}

Modal.propTypes = {
  onModalCloseClick: PropTypes.func,
};

export default Modal;
