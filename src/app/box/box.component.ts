import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {GameService} from '../shared/game.service';
import {TileState, TileSwapEvent} from '../shared/models';
import {TileComponent} from '../tile/tile.component';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxComponent implements OnInit {
  @Input() matrixSize = 4;
  @Input() tileSize = 40; // in px
  @Input() animationDelay = 250; // in ms
  valueArray: number[];
  valueMatrix: number[][];
  tileStateMatrix: TileState[][];

  @ViewChildren(TileComponent) tileComponents: QueryList<TileComponent>;

  constructor(private cdr: ChangeDetectorRef,
              private gameService: GameService) {
  }

  ngOnInit() {
    this.init();
  }

  init() {
    // this.valueArray = this.gameService.getEasyRandomTileArray(this.matrixSize);
    this.valueArray = this.gameService.getRandomTileArray(this.matrixSize);
    this.valueMatrix = this.gameService.createMatrix(this.valueArray, this.matrixSize);

    this.buildStateMatrix(this.valueMatrix);

    this.cdr.detectChanges();
  }

  tileIsDraggable(tileState: TileState): boolean {
    if (tileState.row - 1 >= 0 && this.tileStateMatrix[tileState.row - 1][tileState.col].value === 0) {
      return true;
    }

    if (tileState.row + 1 < this.matrixSize && this.tileStateMatrix[tileState.row + 1][tileState.col].value === 0) {
      return true;
    }

    if (tileState.col - 1 >= 0 && this.tileStateMatrix[tileState.row][tileState.col - 1].value === 0) {
      return true;
    }

    if (tileState.col + 1 < this.matrixSize && this.tileStateMatrix[tileState.row][tileState.col + 1].value === 0) {
      return true;
    }

    return false;
  }

  onTileSwap(tileSwapEvent: TileSwapEvent) {
    this.animateTiles(tileSwapEvent.source, tileSwapEvent.target).subscribe(_ => {
      this.swaptTiles(tileSwapEvent.source, tileSwapEvent.target);
      this.cdr.detectChanges();

      this.determineIfWon().subscribe(won => {
        if (won) {
          alert('Congrats! You won!');
          this.init();
        }
      });
    });
  }

  getLinearIndex(row: number, col: number, matrixSize: number): number {
    return row * matrixSize + col;
  }

  getLinearArray(stateMatrix: TileState[][], matrixSize: number): number[] {
    let arr: number[] = [];
    stateMatrix.map(row => {
      arr = arr.concat(row.map(tileState => tileState.value));
    });

    return arr;
  }

  animateTiles(source: TileState, target: TileState): Observable<boolean> {
    // @TODO: animate source tile to target tile
    const componentsArray = this.tileComponents.toArray();
    const sourceComponent = componentsArray[this.getLinearIndex(source.row, source.col, this.matrixSize)];
    const targetComponent = componentsArray[this.getLinearIndex(target.row, target.col, this.matrixSize)];
    sourceComponent.highlight();
    targetComponent.highlight();

    return Observable.of(true).delay(this.animationDelay);
  }

  swaptTiles(tileState1: TileState, tileState2: TileState) {
    const tileState1value = tileState1.value;
    tileState1.value = tileState2.value;
    tileState2.value = tileState1value;

    this.tileStateMatrix[tileState1.row][tileState1.col] = tileState1;
    this.tileStateMatrix[tileState2.row][tileState2.col] = tileState2;
  }

  determineIfWon(): Observable<boolean> {
    const linearArr = this.getLinearArray(this.tileStateMatrix, this.matrixSize);
    const won = this.gameService.won(linearArr, this.matrixSize);
    return Observable.of(won).delay(this.animationDelay);
  }

  buildStateMatrix(valueMatrix: number[][]) {
    const stateMatrix: TileState[][] = [];

    for (let i = 0; i < valueMatrix.length; i++) {
      stateMatrix[i] = [];
      for (let j = 0; j < valueMatrix.length; j++) {
        stateMatrix[i][j] = {row: i, col: j, value: valueMatrix[i][j]} as TileState;
      }
    }

    this.tileStateMatrix = stateMatrix;
  }
}
