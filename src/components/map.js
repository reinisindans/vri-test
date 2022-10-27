import React, { useState, useEffect } from "react";

import { MapContainer, TileLayer, WMSTileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import "../css/map.css";

const MainMap = (props) => {
  const cesisLocation = [57.31485, 25.27096];
  const [getLayers, setLayers] = useState();
  console.log("parsing map");

  const getAllLayerNames = () => {
      const options = {
        method: "GET", //, POST, PUT, DELETE, etc.
        
      };
    fetch(
      "http://35.228.26.108:8080/geoserver/rest/workspaces/vri-test/layers",
      options
    )
      .then((res) => res.json())
      .then((result) => console.log(result))
      .catch(console.log);;
  };

    useEffect(getAllLayerNames, []);
    
  return (
    <div className={"mapdiv"}>
      <MapContainer center={cesisLocation} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <WMSTileLayer
          layers={"vri-test:akas_cesis"}
          url={`http://35.228.26.108:8080/geoserver/vri-test/wms?s`}
          transparent={true}
          format="image/png"
          opacity={0.8}
        />
        <WMSTileLayer
          layers={"vri-test:gravji_cesis"}
          url={`http://35.228.26.108:8080/geoserver/vri-test/wms?s`}
          transparent={true}
          format="image/png"
          opacity={0.8}
        />
        <WMSTileLayer
          layers={"vri-test:drenas_cesis"}
          url={`http://35.228.26.108:8080/geoserver/vri-test/wms?s`}
          transparent={true}
          format="image/png"
          opacity={0.8}
        />
        <WMSTileLayer
          layers={"vri-test:kolektori_cesis"}
          url={`http://35.228.26.108:8080/geoserver/vri-test/wms?s`}
          transparent={true}
          format="image/png"
          opacity={0.8}
        />
      </MapContainer>
    </div>
  );
};

export default MainMap;
