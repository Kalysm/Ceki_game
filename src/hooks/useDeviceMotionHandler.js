import { DeviceMotion } from "expo-sensors";
import React, { useRef, useEffect } from "react";
import { Platform } from "react-native";

const useDeviceMotionHandler = (
  setIsMovingUp,
  setIsMovingDown,
  restartGame
) => {
  const lastDetectionTimeRef = useRef(0);

  const handleDeviceMotion = (data) => {
    const { rotationRate } = data;

    if (rotationRate) {
      let { beta } = rotationRate;

      const now = Date.now();
      const timeSinceLastDetection = now - lastDetectionTimeRef.current;

      // Détection des mouvements pour Android
      if (Platform.OS === "android") {
        if (beta > 350 && timeSinceLastDetection > 2000) {
          lastDetectionTimeRef.current = now;
          setIsMovingUp(true);
          setIsMovingDown(false);
        } else if (beta < -350 && timeSinceLastDetection > 2000) {
          lastDetectionTimeRef.current = now;
          setIsMovingUp(false);
          setIsMovingDown(true);
        } else {
          setIsMovingUp(false);
          setIsMovingDown(false);
        }
      }
      // Détection des mouvements pour iOS
      else if (Platform.OS === "ios") {
        if (beta > 70 && timeSinceLastDetection > 2000) {
          lastDetectionTimeRef.current = now;
          setIsMovingUp(true);
          setIsMovingDown(false);
        } else if (beta < -70 && timeSinceLastDetection > 2000) {
          lastDetectionTimeRef.current = now;
          setIsMovingUp(false);
          setIsMovingDown(true);
        } else {
          setIsMovingUp(false);
          setIsMovingDown(false);
        }
      }
    } else {
      restartGame();
    }
  };

  // useEffect pour ajouter et supprimer le listener
  useEffect(() => {
    const subscription = DeviceMotion.addListener(handleDeviceMotion);

    return () => {
      subscription.remove();
    };
  }, []);
};

export default useDeviceMotionHandler;
