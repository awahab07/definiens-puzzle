import {TestBed, inject} from '@angular/core/testing';

import {GameService} from './game.service';

describe('GameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameService]
    });
  });

  it('should be created', inject([GameService], (service: GameService) => {
    expect(service).toBeTruthy();
  }));

  it('should return random array with distinct values', inject([GameService], (service: GameService) => {
    const sequencedArray = [0, 1, 2, 3]; // 2 x 2 array
    const randomArr = service.getRandomTileArray(2);
    expect(randomArr).not.toEqual(sequencedArray);
  }));

  it('should create proper range', inject([GameService], (service: GameService) => {
    const sequencedArray = [0, 1, 2, 3]; // 2 x 2 array
    const seqSum = sequencedArray.reduce((acc, curr) => acc + curr);
    const randomArr = service.getRandomTileArray(2);
    const randomSum = randomArr.reduce((acc, curr) => acc + curr);
    expect(randomSum).toEqual(seqSum);
  }));

  it('should create matrix from linear array', inject([GameService], (service: GameService) => {
    const sequencedArray = [0, 1, 2, 3]; // 2 x 2 array
    const seqSum = sequencedArray.reduce((acc, curr) => acc + curr);
    const randomArr = service.getRandomTileArray(2);
    const randomSum = randomArr.reduce((acc, curr) => acc + curr);
    expect(randomSum).toEqual(seqSum);
  }));

  it('should determine if game is won', inject([GameService], (service: GameService) => {
    const wonArray = [1, 2, 3, 0];
    const sequencedArray = [0, 1, 2, 3];
    const nonSeqArray = [0, 2, 3, 1];
    expect(service.won(wonArray, 2)).toBeTruthy();
    expect(service.won(sequencedArray, 2)).toBeFalsy();
    expect(service.won(nonSeqArray, 2)).toBeFalsy();
  }));
});
