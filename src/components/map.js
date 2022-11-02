import React, { useState, useEffect, useRef } from "react";

import { MapContainer, TileLayer, WMSTileLayer } from "react-leaflet";

import {
  workspaceName,
  layerPath,
  WMSPath,
  legendGraphicTemplate,
} from "../constants/geoserver";
import Legend from "./legend";
import LayerControl from "./layerControl";
import BasemapSwitch from "./basemapSwitch";

import "leaflet/dist/leaflet.css";

import "../css/map.css";

import { basemaps } from "../constants/basemaps";

const MainMap = (props) => {
  const cesisLocation = [57.31485, 25.27096];
  const [layers, setLayers] = useState([]);
  const [layerStyles, setLayerStyles] = useState([]);
  const [basemap, setBasemap] = useState(basemaps[1]);

  const ref= useRef()

  const parseLayers = (requestResult) => {
    let layersArray = [];
    const layerArray = requestResult.layers.layer;
    for (let index in layerArray) {
      console.log(layerArray[index].name);

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
  const switchBasemap = (basemapName) => {
    const newBasemap = basemaps.find((basemap) => {
      return basemap.name === basemapName;
    });
    console.log("Basemap switchin:", newBasemap.url);
    console.log(newBasemap.url);
    setBasemap(newBasemap);
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
  // needed to update the otherwise immutable url property of basemap TileLayer
  useEffect(() => {
    if (ref.current) {
      ref.current.setUrl(basemap.url);
    }
  }, [basemap]);
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
      <BasemapSwitch basemapName={basemap.name} setBasemap={switchBasemap} />
      <MapContainer center={cesisLocation} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          ref={ref}
          attribution={basemap.attribution}
          url={basemap.url}
        />
        {layers.map((layer) => {
          return drawLayer(layer);
        })}
      </MapContainer>
    </div>
  );
};

export default MainMap;
