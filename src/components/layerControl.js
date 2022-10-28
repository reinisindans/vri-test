import React, { useState, useEffect } from "react";

import "../css/layerControl.css";

const LayerControl = (props) => {

    const layers = ["heloo", "Hahaha"]
    
  return (
    <div className="layerControlContainer">
      <div className="layerControlHeader">
        <text>Layers</text>
      </div>
      <div className="layerControlBody">
        {layers.map((layer) => {
          return (
              <div className="layerControlEntry" key={layer}>
                  
              <text className="layerControlLayerName">{layer}</text>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LayerControl;
