import { Component, OnInit, Input, Output, EventEmitter, Optional, Inject, ViewChild } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR, NG_VALIDATORS, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { AsyncValidatorArray, ValidatorArray, ValidationResult, validate } from '../_form-control/validate';
import { ValueAccessorBase } from '../_form-control/value-accessor-base';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'checkbox',
	templateUrl: './checkbox.component.html',
	styleUrls: ['./checkbox.component.scss'],
	providers: [ { provide: NG_VALUE_ACCESSOR, useExisting: CheckboxComponent, multi: true } ],
})
export class CheckboxComponent extends ValueAccessorBase<boolean> implements OnInit {
	// tslint:disable-next-line:no-input-rename
	@Input('ngModel') protected model: NgModel;
	// tslint:disable-next-line:no-input-rename
	@Input('name') public id;
	@Input('checked') public checked;
	@Input('disabled') public disabled = false;
	@Output('change') public change: EventEmitter<boolean> = new EventEmitter();

	ngOnInit() {
	}

	public toggle($event): void {
		if (!this.disabled && this.model !== undefined) {
			this.value = !this.value;
			this.change.emit(this.value);
		}
	}

	public setValue(value): void {
		if (this.value !== value) {
			this.value = value;
			this.change.emit(this.value);
		}
	}

}
