import type { Event } from "./Event";
import type { EventData } from "./EventData";

export class EventCategory {
    private _name: string; 
    private _events: EventData;

    constructor(name: string, events: EventData) {
        this._name = name; 
        this._events = events; 
    }

    get name(): string {
        return this._name; 
    }

    set name(name: string) {
        this._name = name;
    }

    get events(): EventData {
        return this._events;
    }

    set events(events: EventData) {
        this._events = events; 
    }
}