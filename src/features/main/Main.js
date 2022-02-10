import React, { useEffect, useState, useCallback } from "react";
import { Route, useNavigate } from "react-router-dom";
import styled from "styled-components";

import pinCurrent from "../../assets/pin-current-small.gif";
import ButtonFull from "../../common/components/buttons/ButtonFull";
import HeaderMain from "../../common/components/headers/HeaderMain";
import Sidebar from "../../common/components/Sidebar";
import ErrorPage from "../error/ErrorPage";
import Start from "./Start";

const StyledMain = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 568px;
  .map-container {
    position: absolute;
    z-index: 1;
    top: 40;
    left: 0;
    width: 100%;
    height: 100%;
    min-height: 568px;
    background-color: green;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .start,
  .sidebar {
    position: absolute;
    z-index: 2;
    top: 20;
    right: 0;
    width: 100%;
    background-color: #0000004b;
    display: flex;
    justify-content: end;
  }
`;

const { Tmapv2 } = window;

function Main() {
  const navigate = useNavigate();
  const defaultLocation = [127.0016985, 37.5642135];

  const [currentLocation, setCurrentLocation] = useState(defaultLocation);
  const [map, setMap] = useState(null);
  const [currentMarker, setCurrentMarker] = useState(null);
  const [mapCenter, setMapCenter] = useState(defaultLocation);
  const [isStart, setIsStart] = useState(true);
  const [onSideBar, setOnSideBar] = useState(false);
  const [err, setErr] = useState(null);

  const adjMap = map;
  const adjCurrentMarker = currentMarker;
  const forceSetMapCenter = useCallback(
    async (center) => {
      const newLocation = new Tmapv2.LatLng(center[1], center[0]);
      await adjMap.setCenter(newLocation);
    },
    [adjMap]
  );

  useEffect(() => {
    setMap(
      new Tmapv2.Map("TMapApp", {
        center: new Tmapv2.LatLng(defaultLocation[1], defaultLocation[0]),
        width: "100%",
        height: "100%",
        zoom: 16,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCurrentMarker(
      new Tmapv2.Marker({
        position: new Tmapv2.LatLng(defaultLocation[1], defaultLocation[0]),
        icon: pinCurrent,
        map: adjMap,
      })
    );
    forceSetMapCenter(defaultLocation[1], defaultLocation[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adjMap, forceSetMapCenter]);

  useEffect(() => {
    forceSetMapCenter(mapCenter);
  }, [mapCenter, forceSetMapCenter]);

  useEffect(() => {
    async function checkCurrentMarker(location) {
      const newLocation = new Tmapv2.LatLng(location[1], location[0]);
      await adjCurrentMarker.setPosition(newLocation);
    }
    checkCurrentMarker(currentLocation);
  }, [currentMarker, currentLocation, adjCurrentMarker]);

  function getLocation() {
    setIsStart(false);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lng = position.coords.longitude;
          const lat = position.coords.latitude;
          setCurrentLocation([lng, lat]);
          setMapCenter([lng, lat]);
        },
        (error) => {
          const newErr = {
            title: "에러가 발생했습니다.",
            description: "메인으로 이동해주세요.",
            errorMsg: error.message,
          };
          setErr(newErr);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    } else {
      const newErr = {
        title: "GPS를 지원하지 않습니다",
        description: "위치정보 제공에 동의해주셔야 앱을 사용하실 수 있습니다.",
      };
      setErr(newErr);
    }
  }

  function toggleSidebar() {
    setOnSideBar((current) => !current);
  }

  return (
    <StyledMain>
      <HeaderMain onClick={toggleSidebar} />
      <div className="map-container">
        <div id="TMapApp" />
        <ButtonFull onClick={() => navigate("/toilets")}>
          리스트 보기
        </ButtonFull>
      </div>
      {isStart && (
        <div className="start">
          <Start onClick={getLocation} />
        </div>
      )}
      {onSideBar && !isStart && (
        <div className="sidebar">
          <Sidebar onClick={toggleSidebar} />
        </div>
      )}
      {err && <Route path="/error" element={<ErrorPage error={err} />} />}
    </StyledMain>
  );
}

export default Main;
