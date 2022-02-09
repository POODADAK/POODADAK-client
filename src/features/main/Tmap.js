import React, { useEffect } from "react";
import styled from "styled-components";

const StyledTmap = styled.div`
  width: 100%;
  height: 100%;
  min-height: 568px;
`;

function Tmap() {
  useEffect(() => {
    const script = document.createElement("script");
    script.innerHTML = `
        function initTmap() {
            var map = new Tmapv2.Map("TMapApp", {
                center: new Tmapv2.LatLng(37.566481622437934,126.98502302169841),
                width: "100%",
                height: "100%",
                zoom:15
            });
            console.log(map)
        }

        initTmap();
   `;
    script.type = "text/javascript";
    script.async = "async";
    document.head.appendChild(script);
  }, []);

  return (
    <StyledTmap>
      <div id="TMapApp" />
    </StyledTmap>
  );
}

export default Tmap;
