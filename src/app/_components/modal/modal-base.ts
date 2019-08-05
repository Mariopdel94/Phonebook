import { EventEmitter, Output, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ModalComponent } from '../modal/modal';

export class ModalBase implements OnInit, OnDestroy {
  @Output() public onClose = new EventEmitter<boolean>();
  @Output() public onOpen = new EventEmitter<boolean>();
  @ViewChild(ModalComponent) public modal: ModalComponent;
  public destroyed$ = new Subject();

  public ngOnInit() {
    this.modal.onOpen
    .takeUntil(this.destroyed$)
    .subscribe((...args) => this.onOpen.emit(...args));

    this.modal.onClose
    .takeUntil(this.destroyed$)
    .subscribe((...args) => this.onClose.emit(...args));
  }

  public ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  public open() {
    this.modal.open();
  }

  public close() {
    this.modal.close();
  }
}
