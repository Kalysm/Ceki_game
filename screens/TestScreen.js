import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { Border, Color, FontSize } from "./GlobalStyles";

const TestScreen = () => {
  return (
    <View style={styles.homepage}>
      <LinearGradient
        style={[styles.background, styles.cardPosition]}
        locations={[1, 0]}
        colors={["#fff", "grey"]}
        e
      >
        <View style={[styles.card, styles.cardPosition]}>
          <View style={[styles.selection, styles.selectionPosition]}>
            <View style={[styles.column1, styles.column1ShadowBox]}>
              <Image
                style={[styles.cardIcon, styles.cardIconLayout]}
                contentFit="cover"
                source={require("../assets/creature.jpg")}
              />
              <Image
                style={[styles.cardIcon1, styles.cardIconLayout]}
                contentFit="cover"
                source={require("../assets/creature2.jpg")}
              />
              <Image
                style={[styles.cardIcon2, styles.cardIconLayout]}
                contentFit="cover"
                source={require("../assets/creature3.jpg")}
              />
              <Image
                style={[styles.cardIcon3, styles.cardIconLayout]}
                contentFit="cover"
                source={require("../assets/creature.jpg")}
              />
              <Image
                style={[styles.cardIcon4, styles.cardIconLayout]}
                contentFit="cover"
                source={require("../assets/creature.jpg")}
              />
            </View>
            <View style={[styles.columln2, styles.column1ShadowBox]}>
              <Image
                style={[styles.cardIcon, styles.cardIconLayout]}
                contentFit="cover"
                source={require("../assets/creature.jpg")}
              />
              <Image
                style={[styles.cardIcon1, styles.cardIconLayout]}
                contentFit="cover"
                source={require("../assets/creature.jpg")}
              />
              <Image
                style={[styles.cardIcon2, styles.cardIconLayout]}
                contentFit="cover"
                source={require("../assets/creature.jpg")}
              />
              <Image
                style={[styles.cardIcon3, styles.cardIconLayout]}
                contentFit="cover"
                source={require("../assets/creature.jpg")}
              />
              <Image
                style={[styles.cardIcon4, styles.cardIconLayout]}
                contentFit="cover"
                source={require("../assets/creature.jpg")}
              />
            </View>
            <Text style={[styles.title, styles.titleFlexBox]}>Texte 1</Text>
          </View>
        </View>
        <View
          style={[styles.userphotoprofileWrapper, styles.searchbarPosition]}
        >
          <Image
            style={[styles.userphotoprofileIcon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/logo.png")}
          />
        </View>
        <View style={styles.username}>
          <Text style={[styles.adolphAlter, styles.titleFlexBox]}>
            Adolph Alter
          </Text>
        </View>
        <View style={[styles.searchbar, styles.searchbarPosition]}>
          <View style={styles.searchbarChild} />
          <Text style={[styles.recherche, styles.titleFlexBox]}>Recherche</Text>
          <Image
            style={[styles.imgIcon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/logo.png")}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  cardPosition: {
    left: "50%",
    position: "absolute",
  },
  selectionPosition: {
    left: "0%",
    top: "0%",
  },
  column1ShadowBox: {
    height: 657,
    width: 167,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    top: 0,
    left: "50%",
    position: "absolute",
  },
  cardIconLayout: {
    height: 121,
    borderRadius: Border.br_xs,
    marginLeft: -83.5,
    width: 167,
    left: "50%",
    position: "absolute",
  },
  titleFlexBox: {
    textAlign: "left",
    position: "absolute",
  },
  searchbarPosition: {
    left: 27,
    position: "absolute",
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  background: {
    marginLeft: -217.5,
    top: -6,
    borderRadius: 28,
    width: 435,
    height: 202,
    backgroundColor: "transparent",
  },
  cardIcon: {
    top: 0,
    height: 121,
    borderRadius: Border.br_xs,
    marginLeft: -83.5,
  },
  cardIcon1: {
    top: 134,
  },
  cardIcon2: {
    top: 268,
  },
  cardIcon3: {
    top: 402,
  },
  cardIcon4: {
    top: 536,
  },
  column1: {
    marginLeft: -169,
  },
  columln2: {
    marginLeft: 13,
  },
  title: {
    top: 8,
    left: 26,
    fontWeight: "700",
    fontFamily: "WendyOne",
    color: Color.white,
    textAlign: "left",
    fontSize: FontSize.size_base,
  },
  underlineIcon: {
    top: 29,
    left: 29,
    width: 39,
    height: 1,
    position: "absolute",
  },
  selection: {
    bottom: "0%",
    right: "0%",
    height: "100%",
    left: "0%",
    top: "0%",
    position: "absolute",
    width: "100%",
  },
  card: {
    marginLeft: -169.5,
    top: 220,
    height: 714,
    width: 338,
  },
  userphotoprofileIcon: {
    height: "121.74%",
    width: "120.4%",
    top: "-2.17%",
    right: "-10.2%",
    bottom: "-19.57%",
    left: "-10.2%",
    borderRadius: 42,
  },
  userphotoprofileWrapper: {
    top: 54,
    width: 49,
    height: 46,
  },
  adolphAlter: {
    fontSize: 20,
    fontWeight: "800",
    fontFamily: "WendyOne",
    color: Color.black,
    textAlign: "left",
    left: "0%",
    top: "0%",
  },
  username: {
    top: 65,
    left: 89,
    width: 125,
    height: 24,
    position: "absolute",
  },
  searchbarChild: {
    borderRadius: 15,
    backgroundColor: "#f9f9f9",
    shadowColor: "rgba(211, 211, 211, 0.24)",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  recherche: {
    top: "29.79%",
    left: "37.87%",
    fontWeight: "500",
    fontFamily: "WendyOne",
    color: "#bebebe",
    fontSize: FontSize.size_base,
  },
  imgIcon: {
    height: "61.7%",
    width: "8.58%",
    top: "19.15%",
    right: "85.8%",
    bottom: "19.15%",
    left: "5.62%",
  },
  searchbar: {
    top: 129,
    height: 47,
    width: 338,
  },
  homepage: {
    backgroundColor: Color.white,
    flex: 1,
    height: 1140,
    overflow: "hidden",
    width: "100%",
  },
});

export default TestScreen;
