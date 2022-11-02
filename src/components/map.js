import React, { useState, useEffect } from "react";

import { MapContainer, TileLayer, WMSTileLayer } from "react-leaflet";

import {
  workspaceName,
  layerPath,
  WMSPath,
  legendGraphicTemplate,
} from "../constants/geoserver";
import Legend from "./legend";
import LayerControl from "./layerControl";

import "leaflet/dist/leaflet.css";

import "../css/map.css";

const MainMap = (props) => {
  const cesisLocation = [57.31485, 25.27096];
  const [layers, setLayers] = useState([]);
  const [layerStyles, setLayerStyles] = useState([]);

  const parseLayers = (requestResult) => {
    let layersArray = [];
    const layerArray = requestResult.layers.layer;
    for (let index in layerArray) {
      let layerObject = {
        name: layerArray[index].name,
        title: layerArray[index].name.split("_")[0],
        show: true,
        id: index,
      };
      layersArray.push(layerObject);
    }
    return layersArray;
  };

    const getLayerStyles = (layerNamesArray) => {
      // filter out the layers that should not be shown
      const filteredLayerArray = layerNamesArray.filter((layer) => layer.show);
      // create an array of layer legend graphic urls
      const layerStylesArray = filteredLayerArray.map((layer) => {
        return {
          layerName: layer.name.split("_")[0],
          legendGraphic: legendGraphicTemplate + layer.name,
        };
      });
      setLayerStyles(layerStylesArray);
    };

  const handleLayers = (layerArray) => {
    setLayers(layerArray);
  };

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
    return layer.show ? (
      <WMSTileLayer
        layers={workspaceName + ":" + layer.name}
        url={WMSPath}
        transparent={true}
        format="image/png"
        opacity={0.8}
        key={layer.id}
      />
    ) : null;
  };

  useEffect(() => {
    getAllLayerNames();
  }, []);
  useEffect(() => {
    getLayerStyles(layers);
  }, [layers]);

  return (
    <div className={"mapdiv"}>
      <Legend layerStyles={layerStyles} />
      <LayerControl layers={layers} handleLayers={handleLayers} />
      <MapContainer center={cesisLocation} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {layers.map((layer) => {
          return drawLayer(layer);
        })}
      </MapContainer>
    </div>
  );
};

export default MainMap;
