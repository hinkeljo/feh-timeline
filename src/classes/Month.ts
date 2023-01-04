import dayjs from 'dayjs';

export class Month {

    static monthNames: string[] = 
        ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; 
    
    private _index: number; 
    private _year: number; 

    private _name: string;
    private _days: number;

    get index() {
        return this._index; 
    }

    get year() {
        return this._year; 
    }

    get name() {
        return this._name; 
    }

    get days() {
        return this._days; 
    }
    
    constructor(timestamp: number) {
        const date = dayjs.unix(timestamp);
        this._days = date.daysInMonth();
        this._name = Month.monthNames[date.month()]; 
        this._year = date.year(); 
        this._index = date.month();
    }

    isEqual(month: Month): boolean {
        return month.index == this._index && month.year == this._year; 
    }

    getNextMonth(): Month {
        let month = this._index; 
        let year = this._year; 
        month++; 
        if(month > 11) {
            month = 0; 
            year++; 
        }
        const timestamp = Month.getTimestampForMonth(month, year);
        return new Month(timestamp);
    }

    static getTimestampForMonth(month: number, year: number) {
        // create a Date object for the first day of the month
        const date = new Date(year, month, 1);
        // return the Unix timestamp for that date
        return date.getTime() / 1000;
    }
}