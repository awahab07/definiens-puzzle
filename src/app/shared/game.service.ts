import {Injectable} from '@angular/core';

@Injectable()
export class GameService {

  constructor() {
  }

  getRandomTileArray(matrixSize: number = 4): number[] {
    const newArr = Array.apply(null, {length: matrixSize * matrixSize}).map(Number.call, Number);
    // Shifting zero to the end
    newArr.push(newArr.shift());

    this.shuffle(newArr);
    return newArr;
  }

  getEasyRandomTileArray(matrixSize: number = 4): number[] {
    const newArr = Array.apply(null, {length: matrixSize * matrixSize}).map(Number.call, Number);
    newArr.push(newArr.shift());

    const lastVal = newArr[matrixSize * matrixSize - 1];
    newArr[matrixSize * matrixSize - 1] = newArr[matrixSize * matrixSize - 2];
    newArr[matrixSize * matrixSize - 2] = lastVal;
    return newArr;
  }

  /**
   * Shuffles array in place.
   * @param {Array} arr items An array containing the items.
   */
  shuffle(arr: number[]) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /**
   * Creates n x n matrix (2 dimentional array) from linear array of length n x n
   * @param tileValueArray
   */
  createMatrix(arr: number[], matrixSize: number): number[][] {
    const matrix = [];

    for (let i = 0; i < matrixSize; i++) {
      matrix[i] = [];
      for (let j = 0; j < matrixSize; j++) {
        matrix[i][j] = arr[i * matrixSize + j];
      }
    }
    return matrix;
  }

  won(arr: number[], matrixSize: number): boolean {
    if (arr[arr.length - 1] !== 0) {
      return false;
    }

    for (let i = 1; i < (matrixSize * matrixSize) - 2; i++) {
      if (arr[i - 1] !== i) {
        return false;
      }
    }

    return true;
  }
}
