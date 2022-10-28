import React, { useState, useEffect } from "react";

import { MapContainer, TileLayer, WMSTileLayer } from "react-leaflet";

import { workspaceName, layerPath, WMSPath, legendGraphicTemplate } from "../constants/geoserver";
import Legend from "./legend";
import LayerControl from "./layerControl";

import "leaflet/dist/leaflet.css";

import "../css/map.css";
import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils";

const MainMap = (props) => {
  const cesisLocation = [57.31485, 25.27096];
  const [layers, setLayers] = useState([]);
  const [layerStyles, setLayerStyles] = useState([]);


  const parseLayers = (requestResult) => {
    let layersArray = [];
    const layerArray = requestResult.layers.layer;
    for (let index in layerArray) {
      console.log("Layer name: ", layerArray[index].name);
      let layerObject= {"name":layerArray[index].name, "show":true, "id":index}
      layersArray.push(layerObject);
    }
    return layersArray;
  };

  const getLayerStyles = (layerNamesArray) => {
    let layerStylesArray = layerNamesArray.map((layer)=>{return { layerName: layer.name.split("_")[0], legendGraphic: legendGraphicTemplate +layer.name};})
    setLayerStyles(layerStylesArray);
  }

  const handleLayers = (layerArray) => {
    setLayers(layerArray)
  }

  const getAllLayerNames = () => {
    const options = {
      method: "GET", //, POST, PUT, DELETE, etc.
    };
    fetch(layerPath, options)
      .then((res) => res.json())
      .then((result) => parseLayers(result))
      .then((result) => setLayers(result))
      .catch(console.log);
  };

  const drawLayer = (layer) => {
    console.log("Trying to draw layer ", layer)
    return layer.show ? <WMSTileLayer
              layers={workspaceName + ":" + layer.name}
              url={WMSPath}
              transparent={true}
              format="image/png"
              opacity={0.8}
              key={layer.id}
    />
      : null
  }

  useEffect(() => { getAllLayerNames() }, []);
  useEffect(() => { getLayerStyles(layers) }, [layers]);

  console.log("parsing map");
  return (
    <div className={"mapdiv"}>
      <Legend layerStyles={layerStyles} />
      <LayerControl layerNames={ layers} handleLayers={handleLayers} />
      <MapContainer center={cesisLocation} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {layers.map((layer) => {
          console.log("getting layer: ", layer.name)
          return drawLayer(layer)
        })}
      </MapContainer>
    </div>
  );
};

export default MainMap;
