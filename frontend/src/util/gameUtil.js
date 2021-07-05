import axios from "axios";

export class gameUtil {
  static async initGame(level) {
    await axios.post("/", {
      level,
    });
  }
}
