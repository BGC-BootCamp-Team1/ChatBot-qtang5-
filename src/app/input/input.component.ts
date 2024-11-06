import {Component, EventEmitter, Output} from '@angular/core';
import { AIGenerationService } from '../service/aigeneration.service';

/**
 * @title Input with hints
 */
@Component({
  selector: 'input-component',
  templateUrl: 'input.component.html',
  styleUrl: 'input.component.css',
})

export class InputComponent {
  @Output() historyUpdated = new EventEmitter<string>();
  loading: boolean = false;

  constructor(private aiGenerationService: AIGenerationService) {}

  onKeyDown(event: KeyboardEvent, messageInput: HTMLInputElement): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.onSubmit(messageInput);
    }
  }

  onSubmit(messageInput: HTMLInputElement): void {
    const message = messageInput.value;
    if (message) {
      this.loading = true; // 显示加载动画
      this.aiGenerationService.generateContent(message).subscribe(
        response => {
          console.log('Generated content:', response);
          this.aiGenerationService.responseHistory.push(response);
          this.historyUpdated.emit(response);
          console.log('History:', this.aiGenerationService.responseHistory);
          messageInput.value = ''; // 清空输入框
          this.loading = false; // 隐藏加载动画
        },
        error => {
          console.error('Error generating content:', error);
          this.loading = false; // 隐藏加载动画
        }
      );
    }
  }
}
