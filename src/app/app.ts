import { Component } from '@angular/core';
import { CarouselComponent } from "./carrousel-component/carousel-component";

@Component({
  selector: 'app-root',
  imports: [ CarouselComponent, CarouselComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'download-my-app';
}
