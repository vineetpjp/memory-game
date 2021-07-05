import { v4 } from "uuid";
import fs, { readFileSync } from "fs";
import { join, resolve } from "path";

export class genUtil {
  static generateRandomArrayData(level) {
    let file_id = v4();
    let size = level == 1 ? 5 : level == 2 ? 10 : 25;
    let arr1 = [];
    let arr2 = [];
    while (arr1.length < size) {
      let r = Math.floor(Math.random() * size) + 1;
      if (arr1.indexOf(r) === -1) arr1.push(r);
    }
    while (arr2.length < size) {
      let r = Math.floor(Math.random() * size) + 1;
      if (arr2.indexOf(r) === -1) arr2.push(r);
    }
    return { file_id, arr1, arr2, errScore: 0 };
  }

  static getFilePathById(id) {
    return join(resolve(), "game-boards", `${id}.json`);
  }

  static readFile(id) {
    try {
      const path = genUtil.getFilePathById(id);
      const data = fs.readFileSync(path);
      return JSON.parse(data);
    } catch (error) {
      throw error;
    }
    // return new Promise((resolve, reject) => {
    //   const filePath = genUtil.getFilePathById(id);
    //   console.log(filePath);
    //   fs.readFile(filePath, (err, data) => {
    //     console.log(err, data);
    //     if (err) {
    //       reject(err);
    //     }
    //     const obj = JSON.parse(data);
    //     resolve(obj);
    //   });
    // });
  }

  static writeFileErrScore(id, errScore) {
    try {
      const obj = genUtil.readFile(id);
      const filePath = genUtil.getFilePathById(id);

      const newData = {
        ...obj,
        errScore,
      };
      fs.writeFileSync(filePath, JSON.stringify(newData));
    } catch (error) {
      throw error;
    }
  }
}
