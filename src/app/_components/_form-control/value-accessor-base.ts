import { Optional, Inject } from '@angular/core';
import { ControlValueAccessor, NgModel, NG_VALUE_ACCESSOR, NG_VALIDATORS, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AsyncValidatorArray, ValidatorArray, ValidationResult, validate } from './validate';

export abstract class ValueAccessorBase<T> implements ControlValueAccessor {  
	protected abstract model: NgModel;
	private innerValue: T;

	private changeWatchers = new Array<(value: T) => void>();
	private touchWatchers = new Array<() => void>();

	constructor() {}

	get value(): T {
		return this.innerValue;
	}

	set value(value: T) {
		if (this.innerValue !== value) {
			this.innerValue = value;
			this.changeWatchers.forEach(f => f(value));
		}
	}

	touch() {
		this.touchWatchers.forEach(f => f());
	}

	writeValue(value: T) {
		this.innerValue = value;
	}

	registerOnChange(fn: (value: T) => void) {
		this.changeWatchers.push(fn);
	}

	registerOnTouched(fn: () => void) {
		this.touchWatchers.push(fn);
	}

}