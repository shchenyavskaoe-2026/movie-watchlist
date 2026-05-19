import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {
    @Input() title = '';
    @Input() isOpen = false;
    @Output() close = new EventEmitter<void>();

    onClose(): void {
      this.close.emit();
    }
}
