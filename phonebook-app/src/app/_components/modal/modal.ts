import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.html',
  styleUrls: ['./modal.scss']
})
export class ModalComponent {
  @Output() public onOpen = new EventEmitter<boolean>();
  @Output() public onClose = new EventEmitter<boolean>();
  @Input() public isLocked = false;

  @ViewChild('container') public container: ElementRef;

  public isVisible = false;
  public isOpen = false;

   // Must be the same as in modal.scss
  public readonly transitionTime = 200;

  constructor() { }

  public open(): void {
    this.onOpen.emit();
    this.isOpen = true;
    setTimeout(() => {
      this.isVisible = true;
    }, 25);
  }

  public close(): void {
    this.isVisible = false;
    setTimeout(() => {
      this.isOpen = false;
      this.onClose.emit(true);
    }, this.transitionTime);
  }
}
