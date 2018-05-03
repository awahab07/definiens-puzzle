import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BoxComponent} from './box.component';
import {TileComponent} from '../tile/tile.component';
import {GameService} from '../shared/game.service';

describe('BoxComponent', () => {
  let component: BoxComponent;
  let fixture: ComponentFixture<BoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BoxComponent, TileComponent],
      providers: [GameService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize matrix', function () {
    component.matrixSize = 2;
    component.ngOnInit();

    expect(component.tileStateMatrix[0].length).toEqual(2);
    expect(component.tileStateMatrix[1].length).toEqual(2);
  });

  it('should return draggable true only for tiles around empty tile', function () {
    component.matrixSize = 2;
    component.ngOnInit();
    component.valueArray = [0, 1, 2, 3];
    component.valueMatrix = [[0, 1], [2, 3]];
    component.buildStateMatrix(component.valueMatrix);

    expect(component.tileIsDraggable(component.tileStateMatrix[0][0])).toBeFalsy();
    expect(component.tileIsDraggable(component.tileStateMatrix[0][1])).toBeTruthy();
    expect(component.tileIsDraggable(component.tileStateMatrix[1][0])).toBeTruthy();
    expect(component.tileIsDraggable(component.tileStateMatrix[1][1])).toBeFalsy();
  });

  it('should calculate linear index', function () {
    component.matrixSize = 2;
    component.ngOnInit();

    expect(component.getLinearIndex(0, 1, 2)).toEqual(1);
  });

  it('should wap tiles', function () {
    component.matrixSize = 2;
    component.ngOnInit();

    component.valueArray = [0, 1, 2, 3];
    component.valueMatrix = [[0, 1], [2, 3]];
    component.buildStateMatrix(component.valueMatrix);
    const fristCornerValue = component.valueMatrix[0][0];
    const lastCornerValue = component.valueMatrix[1][1];
    component.swaptTiles(component.tileStateMatrix[0][0], component.tileStateMatrix[1][1]);
    expect(component.tileStateMatrix[1][1].value).toEqual(fristCornerValue);
    expect(component.tileStateMatrix[0][0].value).toEqual(lastCornerValue);

    // Should not swap indices
    expect(component.tileStateMatrix[0][0].row).toEqual(0);
    expect(component.tileStateMatrix[0][0].col).toEqual(0);

    // Swapped tiles should have different value
    expect(component.tileStateMatrix[1][1].value).not.toEqual(component.tileStateMatrix[0][0].value);
  });

  it('should generate linear array', function () {
    component.matrixSize = 2;
    component.ngOnInit();

    component.valueArray = [0, 1, 2, 3];
    component.valueMatrix = [[0, 1], [2, 3]];
    component.buildStateMatrix(component.valueMatrix);

    const generatedArr = component.getLinearArray(component.tileStateMatrix, component.matrixSize);

    expect(generatedArr.sort((a, b) => a - b)).toEqual(component.valueArray);
  });
});
