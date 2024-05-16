import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

export interface textMessageEvent {
  prompt: string;
  file?: File | null;
}

@Component({
  selector: 'app-text-box',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './text-box.component.html',
  styleUrl: './text-box.component.scss',
})
export class TextBoxComponent {
  private fb = inject(FormBuilder);
  @Output() onMessage = new EventEmitter<textMessageEvent>();
  file: undefined | File = undefined;

  form = this.fb.group({
    prompt: ['', Validators.required],
    file: [null],
  });

  handleSelectedFile(event: any) {
    const file = event.target.files.item(0);
    this.form.controls.file.setValue(file);
  }

  onSubmit() {
    if (this.form.invalid) return;
    const { prompt, file } = this.form.value;

    this.onMessage.emit({ prompt: prompt!, file });
    this.form.reset()
  }
}
