import React, { useEffect, useRef, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { DeviceMotion } from "expo-sensors";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { useTime } from "../components/TimeContext";

const GameScreen = ({ navigation }) => {
  const route = useRoute();
  const { categoryName, gameplay } = route.params;
  const { selectedDuration } = useTime();

  const [text, setText] = useState("Placez votre téléphone sur votre front");
  const [randomData, setRandomData] = useState(null);
  const [timer, setTimer] = useState(1);
  const [gameTimer, setGameTimer] = useState(selectedDuration);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isMovingUp, setIsMovingUp] = useState(false);
  const [isMovingDown, setIsMovingDown] = useState(false);
  const lastDetectionTimeRef = useRef(0);
  const [win, setWin] = useState(false);
  const [lose, setLose] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [usedWords, setUsedWords] = useState([]);
  const [wonWords, setWonWords] = useState([]);
  const [lostWords, setLostWords] = useState([]);

  useEffect(() => {
    const lockScreenOrientation = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
      );
    };

    lockScreenOrientation();

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  useEffect(() => {
    // Abonnez-vous aux événements de mouvement de l'appareil
    DeviceMotion.addListener(handleDeviceMotion);

    // Désabonnez-vous des événements de mouvement de l'appareil lors du nettoyage
    return () => {
      DeviceMotion.removeAllListeners();
    };
  }, []);

  const fetchRandomData = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.17:3000/getRandomData`,
        {
          params: {
            category: categoryName,
          },
        }
      );
      const randomData = response.data;

      // Vérifiez si le mot est déjà dans la liste des mots utilisés
      if (usedWords.includes(randomData)) {
        // Si oui, appelez à nouveau la fonction pour obtenir un autre mot
        fetchRandomData();
      } else {
        // Sinon, mettez à jour la liste des mots utilisés et définissez le nouveau mot
        setUsedWords((prevUsedWords) => [...prevUsedWords, randomData]);
        setRandomData(randomData);
      }
    } catch (error) {
      console.error("Error fetching random data:", error);
    }
  };

  useEffect(() => {
    return () => {
      setUsedWords([]);
    };
  }, []);

  const handleDeviceMotion = (data) => {
    const { acceleration } = data;
    if (acceleration && acceleration.hasOwnProperty("x")) {
      let { x } = acceleration;

      const now = Date.now();
      const timeSinceLastDetection = now - lastDetectionTimeRef.current;

      if (x > 6.8 && timeSinceLastDetection > 1000) {
        lastDetectionTimeRef.current = now;
        setIsMovingUp(true);
        setIsMovingDown(false);
      } else if (x < -6.8 && timeSinceLastDetection > 1000) {
        lastDetectionTimeRef.current = now;
        setIsMovingUp(false);
        setIsMovingDown(true);
      } else {
        setIsMovingUp(false);
        setIsMovingDown(false);
      }
    } else {
      restartGame();
    }
  };

  const restartGame = () => {
    setRandomData(null);
    setTimer(1);
    setGameTimer(selectedDuration);
    setIsGameStarted(false);
    setIsMovingUp(false);
    setIsMovingDown(false);
    setWin(false);
    setLose(false);
    setShowScore(false);
    setUsedWords([]);
    setWonWords([]);
    setLostWords([]);
  };

  useEffect(() => {
    const firstTimeout = setTimeout(() => {
      setText("Attention, c'est parti");

      const secondTimeout = setTimeout(() => {
        if (randomData === null) fetchRandomData();
        setTimer(1);
        setIsGameStarted(true);
      }, 3000);
      setTimer(0);
      return () => clearTimeout(secondTimeout);
    }, 5000);

    const interval = setInterval(() => {
      if (timer < 6) {
        setTimer((prevTimer) => prevTimer + 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(firstTimeout);
    };
  }, [randomData, isGameStarted]);

  useEffect(() => {
    const gameInterval = setInterval(() => {
      if (isGameStarted && gameTimer > 0) {
        setGameTimer((prevTimer) => prevTimer - 1);
      }
    }, 1000);

    return () => {
      clearInterval(gameInterval);
    };
  }, [isGameStarted]);

  useEffect(() => {
    if (isGameStarted) {
      if (isMovingUp) {
        // L'utilisateur a bougé son téléphone vers le haut (action de validation)
        if (Platform.OS === "ios") {
          handleMoveUp();
        } else {
          handleMoveDown();
        }
      }

      if (isMovingDown) {
        // L'utilisateur a bougé son téléphone vers le bas (action de passer)
        if (Platform.OS === "ios") {
          handleMoveDown();
        } else {
          handleMoveUp();
        }
      }
    }
  }, [isGameStarted, isMovingUp, isMovingDown]);

  const handleMoveUp = () => {
    console.log("TELEPHONE EN HAUT ^^^^^^");
    setWin(true);
    setShowScore(true);
    fetchRandomData();
    setWonWords((prevWonWords) => [...prevWonWords, randomData]);

    setTimeout(() => {
      setShowScore(false);
      setWin(false);
    }, 1000);
  };

  const handleMoveDown = () => {
    console.log("TELEPHONE EN BAS llllllll");
    setLose(true);
    setShowScore(true);
    fetchRandomData();
    setLostWords((prevLostWords) => [...prevLostWords, randomData]);

    setTimeout(() => {
      setShowScore(false);

      setLose(false);
    }, 1000);
  };

  useEffect(() => {
    if (isGameStarted && gameTimer === 0) {
      navigation.replace("Score", {
        wonWords: wonWords,
        lostWords: lostWords,
        categoryName: categoryName,
        gameplay: gameplay,
      });
    }
  }, [isGameStarted, gameTimer]);

  return (
    <View style={styles.container}>
      <View style={styles.gamecontainer}>
        {isGameStarted && gameplay && (
          <Text style={styles.gameplayText}>{gameplay}:</Text>
        )}
        {randomData && isGameStarted && (
          <Text style={styles.text}>{randomData}</Text>
        )}
        {!isGameStarted && <Text style={styles.text}>{text}</Text>}
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>
            {isGameStarted && gameTimer > 0
              ? gameTimer
              : timer < 6
              ? timer
              : null}
          </Text>
        </View>
        {showScore && win && isGameStarted && (
          <View style={styles.winOverlay}>
            <Text style={styles.winText}>Gagné</Text>
          </View>
        )}
        {showScore && lose && isGameStarted && (
          <View style={styles.loseOverlay}>
            <Text style={styles.loseText}>Passé</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gamecontainer: {
    flex: 1, // Adjust flex to control the space distribution
    justifyContent: "center",
    alignItems: "center",
  },
  gameplayText: {
    fontSize: 25,
    color: "white",
    fontFamily: "WendyOne",
    textShadowColor: "orange", // Change to your shadow color
    textShadowOffset: { width: 1, height: 1 }, // Change the offset
    textShadowRadius: 8,
    opacity: 0.5,
    marginBottom: 10,
  },
  text: {
    fontSize: 35,
    color: "white",
    fontFamily: "WendyOne",
    textAlign: "center",
  },
  timerContainer: {
    position: "absolute",
    left: 20,
    bottom: 20,
  },
  timerText: {
    fontSize: 20,
    color: "white",
    fontFamily: "WendyOne",
  },
  winOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green", // A semi-transparent background overlay
  },
  loseOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey", // A semi-transparent background overlay
  },
  winText: {
    fontSize: 40,
    color: "white",
    fontFamily: "WendyOne",
  },
  loseText: {
    fontSize: 40,
    color: "white",
    fontFamily: "WendyOne",
  },
});

export default GameScreen;
