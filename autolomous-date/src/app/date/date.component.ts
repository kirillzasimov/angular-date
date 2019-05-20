import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateComponent),
      multi: true
    }
  ]
})
export class DateComponent implements OnInit, ControlValueAccessor {

  selectedDate = {
    day: null,
    month: null,
    year: null,
  };
  _value;

  expandPressed: boolean;

  monthsWith31 = ['Jan', 'Mar', 'May', 'Jul', 'Aug', 'Oct', 'Dec'];

  constructor() { }

  ngOnInit() {
    this.expandPressed = false;
    let date: Date = new Date();
    this.selectedDate.day = date.getDate();
    this.selectedDate.month = date.toDateString().split(' ')[1];
    this.selectedDate.year = date.getFullYear();
  }

  get value(){
    const date = this.selectedDateToString();
    return date;
  }

  set value(val){
    if(val){
      this._value = val;
      this.propogateChange(this._value);
    }
  }

  addEvent($event) {
    this.value = this.selectedDateToString();
    this.propogateChange(this.value);
  }

  writeValue(value){
    if(value !== undefined){
      this.value = value;
      this.propogateChange(this.value);
    }
  }

  propogateChange = (_: any) => {};

  registerOnChange(fn){
    this.propogateChange = fn;
  }
  
  registerOnTouched(){}

  selectedDateToString(){
    return this.selectedDate.day + ' / ' + this.selectedDate.month + ' / ' + this.selectedDate.year;
  }

  expand(){
    if(!this.expandPressed){
      this.expandPressed = true;
    } else {
      this.expandPressed = false;
    }
  }

  monthChangeHandler(event){
    this.selectedDate.month = event.target.value;
    this.value = this.selectedDateToString();
    this.propogateChange(this.value);
  }

  yearChangeHandler(event){
    this.selectedDate.year = event.target.value;
    this.value = this.selectedDateToString();
    this.propogateChange(this.value);
  }

  setDay(day){
    this.selectedDate.day = day;
    this.expand();
    this.value = this.selectedDateToString();
    this.propogateChange(this.value);
  }
}
