import React, { useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";

const orientations = {
  LANDSCAPE_LEFT: ScreenOrientation.OrientationLock.LANDSCAPE_LEFT,
  DEFAULT: ScreenOrientation.OrientationLock.DEFAULT,
  PORTAIT: ScreenOrientation.OrientationLock.PORTAIT,
};

const useDeviceOrientation = (orientation) => {
  useEffect(() => {
    const lockScreenOrientation = async () => {
      await ScreenOrientation.lockAsync(orientation);
    };

    lockScreenOrientation();

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);
};

export { useDeviceOrientation, orientations };
