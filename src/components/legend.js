import React from "react";

import "../css/legend.css"

const Legend = (props) => {
  return (
    <div className="legendContainer">
      <div className="legendHeader">
        <text>Legend</text>
      </div>
      <div className="legendBody">
        {props.layerStyles.map((layer) => {
          return (
            <div className="layerLegendEntry" key={layer.layerName}>
              <img className="legendLayerGraphic" src={layer.legendGraphic} alt="legend graphic" />
              <text className="legendLayerText">{layer.layerName}</text>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Legend;
