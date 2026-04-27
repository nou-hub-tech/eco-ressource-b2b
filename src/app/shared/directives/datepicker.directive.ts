import { Directive, ElementRef, Input, Output, EventEmitter, AfterViewInit, OnDestroy, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/l10n/fr.js';

@Directive({
  selector: '[appDatepicker]',
  standalone: false, // Explicitly set to false for NgModule-based architecture
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerDirective),
      multi: true
    }
  ]
})
export class DatepickerDirective implements AfterViewInit, OnDestroy, ControlValueAccessor {
  @Input() dateFormat = 'Y-m-d';
  @Input() minDate?: string;
  @Input() maxDate?: string;
  @Input() placeholder = 'Select date';
  @Output() dateChange = new EventEmitter<string>();

  private flatpickrInstance: any;
  private value: string = '';
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private el: ElementRef) {
    // Set input type to text to prevent native picker
    this.el.nativeElement.type = 'text';
    this.el.nativeElement.placeholder = this.placeholder;
  }

  ngAfterViewInit() {
    this.flatpickrInstance = flatpickr(this.el.nativeElement, {
      dateFormat: this.dateFormat,
      locale: 'fr',
      allowInput: true,
      disableMobile: true,
      onChange: (selectedDates: Date[], dateStr: string) => {
        this.value = dateStr;
        this.onChange(dateStr);
        this.onTouched();
        this.dateChange.emit(dateStr);
      },
      onClose: () => {
        this.onTouched();
      },
      position: 'auto',
      animate: true
    });

    // Set initial value if exists
    if (this.value) {
      this.flatpickrInstance.setDate(this.value, false);
    }
  }

  ngOnDestroy() {
    if (this.flatpickrInstance) {
      this.flatpickrInstance.destroy();
    }
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    this.value = value;
    if (this.flatpickrInstance) {
      if (value) {
        this.flatpickrInstance.setDate(value, false);
      } else {
        this.flatpickrInstance.clear();
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (this.flatpickrInstance) {
      if (isDisabled) {
        this.flatpickrInstance.set('disable', []);
        this.el.nativeElement.disabled = true;
      } else {
        this.flatpickrInstance.set('enable', []);
        this.el.nativeElement.disabled = false;
      }
    }
  }
}