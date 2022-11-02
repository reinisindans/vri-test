import React from "react";
import { Switch } from "@mui/material";
import "../css/layerControl.css";

const LayerControl = (props) => {
  const onButtonPress = (event) => {
    let currentButtonState = event.target.checked;

    var newLayerArray = props.layers.map((layer) =>
      layer.id == event.target.value
        ? { ...layer, show: currentButtonState }
        : layer
    );
    props.handleLayers(newLayerArray);
  };

  return (
    <div className="layerControlContainer">
      <div className="layerControlHeader">
        <text>Layers</text>
      </div>
      <div className="layerControlBody">
        {props.layers.map((layer) => {
          return (
            <div className="layerControlEntry" key={layer.id}>
              <Switch
                checked={layer.show}
                onChange={onButtonPress}
                value={layer.id}
              />
              <text className="layerControlLayerName">{layer.title}</text>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LayerControl;
