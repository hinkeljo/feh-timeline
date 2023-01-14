import type { Event } from "./Event";
import { Month } from "./Month";

export class EventData {
  private _eventList: Event[];
  
  constructor(events: Event[]) {
    // adjust events to correct timezone
    events.forEach((event: Event) => {
      const newStart = event.start; 
      const newEnd = event.end; 
      event.start = newStart; 
      event.end = newEnd; 
    });
    // sort by start date
    events.sort((a, b) => (a.start > b.start) ? 1 : ((b.start > a.start) ? -1 : 0));
    // add events
    this._eventList = events;  
  }

  get eventList() {
    return this._eventList; 
  }

  get months() {
    return this.calculateMonths(); 
  }

  addEvent(event: Event) {
    this._eventList.push(event);
    this._eventList.sort((a, b) => (a.start > b.start) ? 1 : ((b.start > a.start) ? -1 : 0));
  }

  // TODO: increase performance by caching months
  calculateMonths(): Month[] {
    let months: Month[] = []; 
    this._eventList.forEach((event: Event) => {
      // calcualte months that the events takes place in 
      let eventMonths = event.getMonths();
      // add all month to list
      eventMonths.forEach((month: Month) => {
        months.push(month);
      });
    });
    // filter duplicate months
    return this.filterDuplicates(months);
  }

  filterDuplicates(array: Month[]): Month[] {
    return array.filter((item, index) => {
      return !array.slice(index + 1).some(other => {
        return item.isEqual(other);
      });
    });
  }
  
  getRows(): {event: Event, offsetDays: number}[][] {
    let rows: {event: Event, offsetDays: number}[][] = [[]]; 
    this._eventList.forEach((event, index) => {
      // if this is the first entry, add the first row
      if(index == 0 && rows.length == 1) {
        rows[0].push({event: event, offsetDays: this.getOffset(event, undefined)});
      } else {
        // check if event can fit in an existing row
        let foundRow = false; 
        for(const row of rows) {
          let fitsInRow: boolean = this.fitsInRow(event, row); 
          if(fitsInRow) {
            let before = row[row.length - 1];
            row.push({event: event, offsetDays: this.getOffset(event, before.event)}); 
            foundRow = true; 
            break; 
          }
        }
        // if it can't fit, create new row for it
        if(!foundRow) {
          rows.push([{event: event, offsetDays: this.getOffset(event, undefined)}]); 
        }
      }
    });
    return rows; 
  }

  fitsInRow(event: Event, row: {event: Event, offsetDays: number}[]): boolean {
    for(const existing of row) {
      if(event.overlaps(existing.event)) {
        return false;   
      }
    }
    return true; 
  }

  getOffset(event: Event, eventBefore: Event | undefined): number {
    if(eventBefore == undefined) {
      // calcualte offset to first day of timeline
      let month: Month = this.months[0];
      let firstDay: number = Month.getTimestampForMonth(month.index, month.year);
      let offsetDays = EventData.calculateDayOffset(event.start, firstDay);
      return offsetDays;
    }
    else return EventData.calculateDayOffset(eventBefore.end, event.start);  
  }

  static calculateDayOffset(timestamp1: number, timestamp2: number) {
    let differenceSeconds = Math.abs(timestamp1 - timestamp2);
    return differenceSeconds / (60 * 60 * 24);
  }
}