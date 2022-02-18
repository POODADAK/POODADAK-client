/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable new-cap */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { geolocated } from "react-geolocated";
import { Rings } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import pinSosToilet from "../../assets/icon-pin-sos.svg";
import pinToilet from "../../assets/icon-pin.svg";
import pinCurrent from "../../assets/pin-current-small.gif";
import { getMyLngLat, makePosionToLngLat } from "../../common/api/getMyGeo";
import getPathToToiletInfo from "../../common/api/getPathToToiletInfo";
import getToilets from "../../common/api/getToilets";
import ButtonFull from "../../common/components/buttons/ButtonFull";
import ButtonSmall from "../../common/components/buttons/ButtonSmall";
import HeaderMain from "../../common/components/headers/HeaderMain";
import Modal from "../../common/components/modal/Modal";
import Sidebar from "../../common/components/Sidebar";
import usePosition from "../../common/hooks/usePosition";
import ToiletCard from "../toilet/ToiletCard";
import { nearToiletsUpdated } from "../toilet/toiletSlice";
import { userLocationUpdated } from "./mainSlice";
import Start from "./Start";

const StyledMain = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .loader {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .map-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .full-button {
    display: flex;
  }
  .card {
    position: absolute;
    bottom: 60px;
    width: 100%;
    z-index: 1;
    margin-bottom: 4px;
    .close {
      display: flex;
      justify-content: center;
      margin-top: 4px;
    }
  }
  .start,
  .sidebar {
    position: absolute;
    z-index: 2;
    top: 48px;
    right: 0;
    width: 100%;
    height: calc(100% - 48px);
    background-color: #0000004b;
    display: flex;
    justify-content: end;
  }
`;

const { Tmapv2 } = window;
const ANI_TYPE = Tmapv2.MarkerOptions.ANIMATE_BOUNCE_ONCE;

function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const defaultLocation = [126.97796919, 37.566535];
  const { latitude, longitude, error } = usePosition();

  const [map, setMap] = useState(null);
  const [mapCenter, setMapCenter] = useState(null);
  const [watchId, setWatchId] = useState(null);
  const [useCurrent, setUseCurrent] = useState([]);
  const [currentMarker, setCurrentMarker] = useState(null);
  const [toiletMarkers, setToiletMarkers] = useState([]);
  const [selectedToilet, setSelectedToilet] = useState(null);
  const [selectedToiletDistance, setSelectedToiletDistance] = useState(null);
  const [selectedToiletTime, setSelectedToiletTime] = useState(null);
  const [drawPathInfos, setDrawPathInfos] = useState([]);
  const [drawPathResults, setDrawPathResults] = useState([]);
  const [pathMarkers, setPathMarkers] = useState([]);
  const [polyline, setPolyline] = useState(null);
  const [onSideBar, setOnSideBar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [modal, setModal] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const gotUserLocation = useSelector((state) => state.main.gotUserLocation);
  const currentLocation = useSelector((state) => state.main.userLocation);
  const nearToilets = useSelector((state) => state.toilet.nearToilets);

  const adjMap = map;
  const adjCurrentMarker = currentMarker;
  const adjToiletMarkers = toiletMarkers;
  const adjDrawPathInfos = drawPathInfos;
  const adjDrawPathResults = drawPathResults;
  const adjPathMarkers = pathMarkers;
  const adjPolyline = polyline;

  // 처음 렌더링하면 내 위치를 불러온다.
  useEffect(() => {
    async function makeMap() {
      const location = gotUserLocation ? currentLocation : defaultLocation;
      setMap(
        await new Tmapv2.Map("TMapApp", {
          center: new Tmapv2.LatLng(location[1], location[0]),
          width: "100%",
          height: "100%",
          zoom: 17,
          draggable: true,
        })
      );
      getMyLocation();
    }
    makeMap();
    if (adjMap) {
      adjMap.addListener("drag", () => {
        navigator.geolocation.clearWatch(watchId);
      });
    }
  }, []);

  // TODO: 모니터링용 유즈이펙트!!!!
  useEffect(() => {
    console.log("map", map);
  }, [map]);

  async function forceSetMapCenter(center) {
    const newLocation = new Tmapv2.LatLng(center[1], center[0]);
    await map.setCenter(newLocation);
  }

  async function getMyLocation() {
    setIsLoading(true);
    try {
      const position = await getMyLngLat();
      const lngLat = makePosionToLngLat(position);
      dispatch(userLocationUpdated(lngLat));
      setIsLoading(false);
      setIsStarted(true);
    } catch (err) {
      const newChildren =
        "위치정보 제공 동의를 진행하지 않으면 정확한 거리정보를 제공받을 수 없습니다. 그래도 지도를 통해 화장실들을 볼 수는 있습니다.";
      setIsLoading(false);
      setModal(newChildren);
      setOpenModal(true);
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
        <div className="full-button">
          <ButtonFull
            onClick={() => {
              console.log("map", map);
              console.log("currentLocation", currentLocation);
              forceSetMapCenter([currentLocation[1], currentLocation[0]]);
            }}
          >
            내 위치로 이동
          </ButtonFull>
          <ButtonFull
            onClick={() => navigate("/toilets", { state: nearToilets })}
          >
            주변 화장실 리스트
          </ButtonFull>
        </div>
      </div>

      {isLoading && (
        <div className="loader">
          <Rings
            height="100%"
            width="200%"
            color="#bc955c"
            ariaLabel="loading"
          />
        </div>
      )}

      {openModal && (
        <Modal
          onModalCloseClick={() => {
            setOpenModal(false);
            setIsStarted(true);
          }}
        >
          {modal}
        </Modal>
      )}

      {selectedToilet && (
        <div className="card">
          <ToiletCard
            toilet={selectedToilet}
            distance={selectedToiletDistance}
            time={selectedToiletTime}
          />
          <div className="close">
            <ButtonSmall onClick={() => setSelectedToilet(null)}>
              카드 닫기
            </ButtonSmall>
          </div>
        </div>
      )}

      {!isStarted && (
        <div className="start">
          <Start onClick={() => setIsStarted(true)} />
        </div>
      )}

      {onSideBar && gotUserLocation && (
        <div className="sidebar">
          <Sidebar onClick={toggleSidebar} />
        </div>
      )}
    </StyledMain>
  );
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Main);
