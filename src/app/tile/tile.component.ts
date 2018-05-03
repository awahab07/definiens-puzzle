import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TileSwapEvent, TileState} from '../shared/models';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TileComponent implements OnInit {
  state: TileState;

  @Input()
  set tileState(state: TileState) {
    this.state = state;
  }

  get tileState(): TileState {
    return this.state;
  }

  @Input() tileSize = 40;
  @Input() draggable = false;
  @Output() tileSwap: EventEmitter<TileSwapEvent> = new EventEmitter();

  @ViewChild('tile') tileElement: ElementRef;

  constructor() {
  }

  ngOnInit() {
  }

  onDragStart(event: DragEvent) {
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.setData('tile', JSON.stringify(this.state));
  }

  onDragOver(event: DragEvent) {
    if (event.preventDefault) {
      event.preventDefault(); // Necessary. Allows us to drop.
    }

    event.dataTransfer.dropEffect = 'move';
  }

  onDrop(event: DragEvent) {
    const sourceTile = JSON.parse(event.dataTransfer.getData('tile')) as TileState;
    this.tileSwap.emit({source: sourceTile, target: this.state});
  }

  highlight() {
    // @TODO: implement proper binding and timeout
    this.tileElement.nativeElement.style.border = '1px solid red';
  }
}
