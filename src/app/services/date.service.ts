import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

const pipe = new DatePipe('en-US');

@Injectable({ providedIn: 'root' })
export class DateService {

  constructor() { }

  getShortDateDisplay(dateValue: number): string {
      let myFormattedDate = pipe.transform(dateValue, 'shortDate');
      return myFormattedDate;
  }

  getMediumDateDisplay(dateValue: number): string {
      let myFormattedDate = pipe.transform(dateValue, 'mediumDate');
      return myFormattedDate;
  }

  getShortDateAndTimeDisplay(dateValue: number): string {
      let myFormattedDate = pipe.transform(dateValue, 'short');
      return myFormattedDate;
  }

  getShortTimeDisplay(dateValue: number): string {
      let myFormattedDate = pipe.transform(dateValue, 'shortTime');
      return myFormattedDate;
  }

  isInThePast(dateValue: number): boolean {
    let inPast: boolean = false;
    let today: number = Date.now();

    if (dateValue < today) {
      inPast = true;
    }

    return inPast;
  }

  isToday(dateValue: number): boolean {
      let today = Date.now();
      let todayDate = this.getShortDateDisplay(today);
      let otherDate = this.getShortDateDisplay(dateValue);

      let isToday = (todayDate === otherDate);
      return isToday;
  }

  getDaysForwardAsNumber(daysForward: number): number {
      let dateValue = -1;

      let date: Date = new Date();
      date.setDate(date.getDate() + daysForward);
      date.setHours(8);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);

      dateValue = date.getTime();

      return dateValue;
  }

  getDaysBackwardAsNumber(daysBackward: number): number {
    let dateValue = -1;

    let date: Date = new Date();
    date.setDate(date.getDate() - daysBackward);
    date.setHours(8);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    dateValue = date.getTime();

    return dateValue;
  }

  getDaysForwardAtMidnightAsNumber(daysForward: number): number {
      let dateValue = -1;

      let date: Date = new Date();
      date.setDate(date.getDate() + daysForward);
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);

      dateValue = date.getTime();

      return dateValue;
  }

  getMonthsForwardAsNumber(monthsForward: number): number {
      let dateValue = -1;

      let date: Date = new Date();
      date.setMonth(date.getMonth() + monthsForward);
      date.setHours(8);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);

      console.log(date);

      dateValue = date.getTime();

      return dateValue;
  }

  getTodayAtMidnightAsNumber(): number {
      let today = new Date();

      let dateString = "";

      dateString += today.getFullYear();
      dateString += '-';
      dateString += this.pad(today.getMonth() + 1);
      dateString += '-';
      dateString += this.pad(today.getDate());
      dateString += 'T';
      dateString += '00:00:00';

      let midnightDate = new Date(dateString);

      return midnightDate.getTime();
  }

  translateDatePickerValueToNumber(dateString: string): number {
    let newDate: Date = new Date(dateString);
    return newDate.getTime();
  }

  getDateVal(date: string, hour: string, minute: string, meridian: string): number {
    let dateVal: number = this.translateDatePickerValueToNumber(date);

    if (hour) {
      let hourValue: number = Number(hour);
      if (meridian == 'PM') hourValue += 12;
      else if (hourValue == 12) hourValue = 0;

      hourValue = hourValue * 60 * 60 * 1000;
      dateVal += hourValue;
    }

    if (minute) {
      let minuteValue: number = Number(minute);
      minuteValue = minuteValue * 60 * 1000;
      dateVal += minuteValue;
    }

    return dateVal;
  }

  private pad(valNumber: number) {
      let val: string = '' + valNumber;

      if (val.length < 2) {
          val = '0' + val;
      }

      return val;
  }
}
