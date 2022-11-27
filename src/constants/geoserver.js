// This file stores all the url patterns to be able to query the geoserver 

export const geoserver_IP = "http://35.228.26.179:8080/geoserver/";

export const workspaceName= "vri-test"

export const layerPath = geoserver_IP + "rest/workspaces/" + workspaceName + "/layers.json"

export const WMSPath = geoserver_IP + workspaceName + "/wms?"

// legend graphic needs the <LayerName> appended to it to access it
export const legendGraphicTemplate =
  geoserver_IP +
  "wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=40&HEIGHT=40&LAYER=" +
  workspaceName +
  ":";