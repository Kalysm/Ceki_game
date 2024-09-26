import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useTime } from "../context/TimeContext";
import { colorStyles } from "../styles/globalStyles";
import { fetchRandomData } from "../api/randomData.api";
import LoadingIndicator from "../components/ui/LoadingIndicator";
import useDeviceMotionHandler from "../hooks/useDeviceMotionHandler";
import {
  orientations,
  useDeviceOrientation,
} from "../hooks/useDeviceOrientation";

const GameScreen = ({ navigation }) => {
  const route = useRoute();
  const { categoryName } = route.params;
  const { selectedDuration } = useTime();

  const [text, setText] = useState("Placez votre téléphone \nsur votre front");
  const [randomData, setRandomData] = useState(null);

  const [timer, setTimer] = useState(0);
  const [gameTimer, setGameTimer] = useState(selectedDuration);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const [isMovingUp, setIsMovingUp] = useState(false);
  const [isMovingDown, setIsMovingDown] = useState(false);

  const [win, setWin] = useState(false);
  const [lose, setLose] = useState(false);

  const [wonWords, setWonWords] = useState([]);
  const [lostWords, setLostWords] = useState([]);

  const [usedWords, setUsedWords] = useState([]);

  // Verrouille l'orientation du téléphone
  useDeviceOrientation(orientations.LANDSCAPE_LEFT);

  useDeviceMotionHandler(setIsMovingUp, setIsMovingDown, restartGame);

  const restartGame = () => {
    setRandomData(null);
    setTimer(1);
    setGameTimer(selectedDuration);
    setIsGameStarted(false);
    setIsMovingUp(false);
    setIsMovingDown(false);
    setWin(false);
    setLose(false);
    setUsedWords([]);
    setWonWords([]);
    setLostWords([]);
  };

  useEffect(() => {
    setUsedWords([]);
    // Premier timeout pour le compte à rebours avant le début du jeu
    const startGame = () => {
      pregameTimeout = setTimeout(() => {
        setTimer(0);
        setText("Attention, c'est parti");
        fetchRandomData(categoryName, usedWords, setUsedWords, setRandomData);

        gameStartTimeout = setTimeout(() => {
          // Démarre le jeu après 3 secondes
          setIsGameStarted(true);
        }, 3000);
      }, 3000);
      // Intervalle pour mettre à jour le timer (affichage du compte à rebours)
      if (isGameStarted == false) {
        countdownInterval = setInterval(() => {
          setTimer((prevTimer) => prevTimer + 1);
        }, 1000);
      }
    };

    startGame();

    return () => {
      clearTimeout(gameStartTimeout); // Nettoyage du timeout du démarrage du jeu
      clearTimeout(pregameTimeout); // Nettoyage du timeout du message "Attention, c'est parti"
    };
  }, []);

  // Interval de temps de jeu
  useEffect(() => {
    let gameInterval;

    if (isGameStarted) {
      clearInterval(countdownInterval);
      gameInterval = setInterval(() => {
        setGameTimer((prevGameTimer) =>
          prevGameTimer > 0 ? prevGameTimer - 1 : 0
        );
      }, 1000);
    }

    return () => {
      clearInterval(gameInterval);
    };
  }, [isGameStarted]);

  const handleMoveUp = () => {
    setWin(true);
    setWonWords((prevWonWords) => [...prevWonWords, randomData]);
    fetchRandomData(categoryName, usedWords, setUsedWords, setRandomData);

    setTimeout(() => {
      setWin(false);
    }, 1500);
  };

  const handleMoveDown = () => {
    setLose(true);
    setLostWords((prevLostWords) => [...prevLostWords, randomData]);
    fetchRandomData(categoryName, usedWords, setUsedWords, setRandomData);

    setTimeout(() => {
      setLose(false);
    }, 1500);
  };

  useEffect(() => {
    if (isGameStarted && isMovingDown) {
      handleMoveDown();
    } else if (isGameStarted && isMovingUp) {
      handleMoveUp();
    }
  }, [isGameStarted, isMovingUp, isMovingDown]);

  useEffect(() => {
    if (isGameStarted && gameTimer === 0) {
      navigation.replace("Score", {
        wonWords: wonWords,
        lostWords: lostWords,
        categoryName: categoryName,
      });
    }
  }, [isGameStarted, gameTimer]);

  return (
    <View style={styles.container}>
      <View style={styles.gamecontainer}>
        {randomData && isGameStarted && (
          <Text style={styles.text}>{randomData}</Text>
        )}
        {!isGameStarted && <Text style={styles.text}>{text}</Text>}
        {!randomData && isGameStarted && <LoadingIndicator />}
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>
            {isGameStarted && gameTimer > -1 ? gameTimer : timer}
          </Text>
        </View>
        {win && isGameStarted && (
          <View style={styles.winOverlay}>
            <Text style={styles.winText}>Gagné</Text>
          </View>
        )}
        {lose && isGameStarted && (
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 45,
    color: "white",
    fontFamily: "LeagueSpartan",
    textAlign: "center",
  },
  timerContainer: {
    position: "absolute",
    left: 20,
    bottom: 20,
  },
  timerText: {
    fontSize: 25,
    color: "white",
    fontFamily: "LeagueSpartan",
  },
  winOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colorStyles.greenWin,
  },
  loseOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colorStyles.redLose,
  },
  winText: {
    fontSize: 40,
    color: "white",
    fontFamily: "LeagueSpartan",
  },
  loseText: {
    fontSize: 40,
    color: "white",
    fontFamily: "LeagueSpartan",
  },
});

export default GameScreen;
