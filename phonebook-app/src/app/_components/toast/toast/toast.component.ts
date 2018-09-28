import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

  @Component({
  selector: 'toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('state', [
      state('active', style({
        bottom: '3rem',
        opacity: 1
      })),
      state('inactive', style({
        bottom: '*',
        opacity: 0
      })),
      transition('inactive <=> active', animate('500ms ease')),
    ])
  ],
  })

  export class ToastComponent implements OnInit, OnDestroy {
  public onInit: EventEmitter<boolean> = new EventEmitter();
  public onClose: EventEmitter<boolean> = new EventEmitter();
  public onDestroy: EventEmitter<boolean> = new EventEmitter();
  public type = 'default';

  public currentState = 'inactive';
  public message: string;

  constructor() {}

  ngOnInit() {
    this.onInit.emit();
  }

  ngOnDestroy() {
    this.onDestroy.emit();
  }

  /**
  * Opens the toast with a given message.
  */
  public open(message): Promise<boolean> {
    this.currentState = 'active';
    this.message = message;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  }
  /**
  * Closes the toast, unless it has been blocked using lock().
  */
  public close(): Promise<boolean> {
    this.currentState = 'inactive';
    return new Promise((resolve) => {
      setTimeout(() => {
        this.onClose.emit();
        resolve();
      }, 500);
    });
  }

  /**
  * Opens the toast with a given message, and closes it after 2500 miliseconds.
  * A time can be provided, to change how long it should stay open.
  */
  public show(message, time): Promise<boolean> {
    return new Promise((resolve) => {
      this.open(message)
        .then(() => {
          if (time !== Infinity) {
            setTimeout(() => {
              this.close()
                .then(() => resolve());
            }, time || 2000);
          }
        });
    });
  }
  }
