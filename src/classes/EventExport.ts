import type { Event } from "./Event";

export class EventExport {
    private _category: string; 
    private _event: Event;
    
    constructor(category: string, event: Event) {
        this._category = category; 
        this._event = event; 
    }

    get category(): string {
        return this._category;
    }

    set category(category: string) {
        this._category = category; 
    }

    get event(): Event {
        return this._event;
    }

    set event(event: Event) {
        this._event = event; 
    }
}