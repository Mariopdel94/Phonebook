import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessorBase } from '../_form-control/value-accessor-base';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: SearchBoxComponent, multi: true }]
})
export class SearchBoxComponent extends ValueAccessorBase<string> implements OnInit {
  @Output() onSearch: EventEmitter<string> = new EventEmitter();
  @Output() onCreate: EventEmitter<boolean> = new EventEmitter();
  @Input() type: string;
  public value = '';

  @ViewChild(NgModel) protected model: NgModel;
  public loading: boolean;
  ngOnInit() {

  }

  triggerSearch() {
    this.onSearch.emit(this.value);
  }

  triggerCreate() {
    this.onCreate.emit(true);
  }

}
