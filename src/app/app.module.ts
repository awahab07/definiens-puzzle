import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BoxComponent } from './box/box.component';
import { TileComponent } from './tile/tile.component';
import {GameService} from './shared/game.service';


@NgModule({
  declarations: [
    AppComponent,
    BoxComponent,
    TileComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
