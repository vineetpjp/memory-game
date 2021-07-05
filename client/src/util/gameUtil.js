import axios from "axios";

export class gameUtil {
  static getCardsNoFromLevel(level) {
    return level === 1 ? 5 : level === 2 ? 10 : 25;
  }

  static async initGame(level) {
    const response = await axios.post("/create", {
      level,
    });
    if (response?.data) {
      return response.data;
    }
    return { init: false, file_id: null };
  }

  static async getCard1Value(index) {
    const response = await axios.get("/cardone", {
      params: {
        cardIndex: index,
      },
    });
    if (response?.data?.data) {
      return response.data.data;
    }
    return null;
  }

  static async getCard2Value(card1Index, card2Index) {
    const response = await axios.get("/cardtwo", {
      params: {
        card1Index,
        card2Index,
      },
    });

    if (response?.data) {
      return response?.data;
    }
  }

  static async deleteFile() {
    await axios.delete("/");
  }
}
