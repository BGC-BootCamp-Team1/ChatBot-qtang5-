import {Component} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

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
}
