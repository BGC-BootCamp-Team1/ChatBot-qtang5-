import {Component} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { AIGenerationService } from '../service/aigeneration.service';

/**
 * @title Input with hints
 */
@Component({
  selector: 'input-component',
  templateUrl: 'input.component.html',
  styleUrl: 'input.component.css',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
})
export class InputComponent {
  constructor(private aiGenerationService: AIGenerationService) {}

  onKeyDown(event: KeyboardEvent, message: string): void {
    if (event.key === 'Enter') {
      event.preventDefault(); // 阻止默认的回车行为（如表单提交）
      this.aiGenerationService.generateContent(message).subscribe(
        response => {
          console.log('Generated content:', response);
          // 你可以在这里处理返回的内容，比如显示在页面上
        },
        error => {
          console.error('Error generating content:', error);
        }
      );
    }
  }
}
