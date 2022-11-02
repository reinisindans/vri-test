import React, { useState, useEffect } from "react";

import "../css/basemapSwitch.css";

import { basemaps } from "../constants/basemaps";


const BasemapSwitch = (props) => {

    console.log("In switch component")
    console.log(props.basemapName)

    const selectBasemap = (event) => {
        console.log(event.target.value)
        props.setBasemap(event.target.value);
    }

  return (
    <div className="basemapSwitchContainer">
      <div className="switchBody">
        <text>Basemap: </text>
        {basemaps.map((basemap) => (
          <div>
            <input
              type="radio"
              value={basemap.name}
              name="basemapSwitch"
              checked={props.basemapName == basemap.name ? true : false}
              onChange={selectBasemap}
            />
            <text>{basemap.name}</text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BasemapSwitch;
