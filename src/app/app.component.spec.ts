import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {BoxComponent} from './box/box.component';
import {TileComponent} from './tile/tile.component';
import {GameService} from './shared/game.service';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        BoxComponent,
        TileComponent
      ],
      providers: [
        GameService
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
