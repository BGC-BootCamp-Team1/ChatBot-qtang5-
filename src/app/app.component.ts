import { Component } from '@angular/core';
import { AIGenerationService } from './service/aigeneration.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public response: string = '';

  onResponseUpdated(newResponse: string) {
    this.response = newResponse;
  }
  constructor(public aiGenerationService: AIGenerationService) {}
}
