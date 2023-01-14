import { Month } from "./Month";

export class Event {
    private _name: string;
    private _start: number;
    private _end: number;

    constructor(name: string, start: number, end: number) {
        this._name = name;
        this._start = start;
        this._end = end;
    }

    get name() {
        return this._name; 
    }

    get start() {
        return this._start; 
    }

    set name(name: string) {
        this._name = name; 
    }

    set start(start: number) {
        this._start = start; 
    }

    get end() {
        return this._end; 
    }

    set end(end: number) {
        this._end = end; 
    }

    public overlaps(event: Event): boolean {
        return ((event.start >= this._start && event.start < this._end)
            || (event.end > this._start && event.end < this._end) 
            || (this._start >= event.start && this._start < event.end)
            || (this._end > event.start && this._end < event.end));
    }

    public getMonths(): Month[] {
        let eventMonths: Month[] = []; 
        const monthStart: Month = new Month(this._start);
        const monthEnd: Month = new Month(this._end);
        if(!monthStart.isEqual(monthEnd)) {
          // iterate through months until the end month is reached
          let monthIterate = monthStart; 
          do {
            eventMonths.push(monthIterate);
            monthIterate = monthIterate.getNextMonth();
          } while(!monthIterate.isEqual(monthEnd));
          eventMonths.push(monthEnd);
        } else {
          eventMonths.push(monthStart); 
        }
        return eventMonths; 
    }

    getLengthInDays(): number {
        const length = this._end - this._start;
        return length / 60 / 60 / 24; 
    }
}
