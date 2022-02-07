import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const StyledInput = styled.form`
  width: 100%;
  height: 50px;
  background-color: black;
  display: flex;
  flex-direction: column;
  font-size: large;
  margin-bottom: 10px;
  label {
    width: auto;
    font-size: large;
    font-weight: 600;
    color: beige;
    padding: 10px 10px 10px 10px;
  }
  input {
    height: 30px;
    font-size: large;
    font-weight: 200;
    color: white;
    caret-color: white;
    background-color: black;
    padding: 0px 10px 10px 10px;
    border: none;
    outline: none;
    ::placeholder {
      font-size: medium;
      color: gray;
    }
  }
`;

function Input({ label, onChange, placeholder }) {
  function onChangeHandle() {
    onChange();
  }

  return (
    <StyledInput>
      <label htmlFor="input">{label}</label>
      <input
        type="text"
        id="input"
        onChange={onChangeHandle}
        placeholder={placeholder}
      />
    </StyledInput>
  );
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  placeholder: "입력하세요...",
};

export default Input;
