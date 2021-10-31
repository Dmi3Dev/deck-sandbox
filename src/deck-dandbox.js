import React, { useState } from "react";
import DeckGL from "@deck.gl/react";
import { MapView, OrthographicView, COORDINATE_SYSTEM } from "@deck.gl/core";
import { BitmapLayer } from "@deck.gl/layers";
import GL from "@luma.gl/constants";

export const DEFAULT_MAP_VIEW_STATE = Object.freeze({
  longitude: 0,
  latitude: 0,
  zoom: 15,
  minZoom: 10,
  maxZoom: 24,
  pitch: 0,
  bearing: 0,
  maxPitch: 90,
});

export const VIEW = Object.freeze({
  MAIN: "main-view",
  HUD: "hud-view",
});

const DATA = {
  tick: 0,
};

const DeckSandbox = () => {
  const [viewState, setViewState] = useState({ ...DEFAULT_MAP_VIEW_STATE });

  const setCustomViewState = ({ viewState: newViewState }) => {
    // fix by setting view only every other tick during zoom
    // if (newViewState.zoom === viewState.zoom || DATA.tick++ % 2 === 0) {
    //   setViewState(newViewState);
    // }

    // note: with this one it will produce warnings. Comment this one and uncomment
    //       the one above to fix the issue
    setViewState(newViewState);
  };

  const views = [
    new MapView({
      id: VIEW.MAIN,
      controller: true,
      viewState,
      onViewStateChange: setCustomViewState,
    }),
    new OrthographicView({ id: VIEW.HUD }),
  ];

  const layers = [
    new BitmapLayer({
      id: "bg",
      pickable: true,

      coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,

      // these make image sharp on zoom
      textureParameters: {
        [GL.TEXTURE_MIN_FILTER]: GL.NEAREST,
        [GL.TEXTURE_MAG_FILTER]: GL.NEAREST,
      },

      image: "bg.jpg",
      bounds: [-1920, -1080, 1920, 1080],
    }),
  ];

  const layerFilter = ({ layer, viewport }) => {
    switch (viewport?.id) {
      case VIEW.MAIN:
        return !layer.id.startsWith(VIEW.HUD) && !layer.id.startsWith(VIEW.MAG);
      default:
        return layer?.id.startsWith(viewport?.id);
    }
  };

  return (
    <DeckGL
      // layers
      layers={layers}
      layerFilter={layerFilter}
      // view
      views={views}
      initialViewState={{ [VIEW.MAIN]: { ...DEFAULT_MAP_VIEW_STATE } }}
    />
  );
};

export default DeckSandbox;
