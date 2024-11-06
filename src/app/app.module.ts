import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { InputComponent } from './input/input.component';
import { IconComponent } from './icon/icon.component';
import { CardComponent } from './card/card.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AIGenerationService } from './service/aigeneration.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    InputComponent,
    IconComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
    // CardComponent,
    HttpClientModule,MatCardModule, MatButtonModule,
    FormsModule, MatFormFieldModule, MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  providers: [
    provideAnimationsAsync(),
    AIGenerationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
