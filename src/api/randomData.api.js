import axios from "axios";
import Constants from "expo-constants";

const backendApi = Constants.expoConfig.extra.backendApi;

export const fetchRandomData = async (
  categoryName,
  usedWords,
  setUsedWords,
  setRandomData
) => {
  console.log("category:", categoryName);

  try {
    const response = await axios.get(backendApi, {
      params: {
        category: categoryName,
      },
    });
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
