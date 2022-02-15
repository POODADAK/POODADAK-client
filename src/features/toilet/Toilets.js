import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import HeaderSub from "../../common/components/headers/HeaderSub";
import Title from "../../common/components/Title";
import ToiletCard from "./ToiletCard";

const StyledToilets = styled.div`
  width: 100%;
  height: 100%;
  min-height: 568px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
  .title {
    width: 90%;
  }
  .list {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

function Toilets() {
  const location = useLocation();

  const toilets = location.state;

  return (
    <StyledToilets>
      <HeaderSub />
      <div className="title">
        <Title
          title="내 주변 화장실"
          description="내 주변 반경 500m 이내 화장실 리스트 입니다."
        />
      </div>
      <div className="list">
        {toilets &&
          Array.from(toilets).map((toilet) => (
            <ToiletCard
              toilet={toilet}
              distance={toilet.tDistance}
              time={toilet.tTime}
            />
          ))}
      </div>
    </StyledToilets>
  );
}

export default Toilets;
