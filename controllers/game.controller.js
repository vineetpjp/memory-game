import fs from "fs";
import { join, resolve } from "path";
import { genUtil } from "../utils/genUtil.js";

export class GameController {
  static initGame(req, res) {
    const level = req.body.level;
    const data = genUtil.generateRandomArrayData(level);
    const jsonString = JSON.stringify(data);
    const filePath = join(resolve(), "game-boards", `${data.file_id}.json`);

    fs.writeFile(filePath, jsonString, (err) => {
      if (err) {
        res.status(400).send("try again! Something went wrong!!");
      } else {
        res.json({ init: true, file_id: data.file_id });
      }
    });
  }

  static async getTable1Card(req, res) {
    const { file_id } = req.headers;
    const { cardIndex } = req.query;
    try {
      const obj = genUtil.readFile(file_id);

      const arr1 = obj.arr1[cardIndex - 1];
      res.json({ data: arr1 });
    } catch (error) {
      console.log(error);
    }
  }

  static getTable2Card(req, res) {
    const { file_id } = req.headers;
    const { card1Index, card2Index } = req.query;

    const obj = genUtil.readFile(file_id);
    const value1 = obj.arr1[card1Index - 1];
    const value2 = obj.arr2[card2Index - 1];
    const currentErrScore = obj.errScore;
    if (value1 === value2) {
      res.json({
        card2value: value2,
        match: true,
        errScore: currentErrScore,
      });
      return;
    }

    genUtil.writeFileErrScore(file_id, currentErrScore + 1);
    res.json({
      card2value: value2,
      match: false,
      errScore: currentErrScore + 1,
    });
  }

  static deleteFile(req, res) {
    const { file_id } = req.headers;

    const path = genUtil.getFilePathById(file_id);
    fs.unlinkSync(path);
    res.send({ success: true });
  }
}
