import type { Event } from "./Event";
import type { EventData } from "./EventData";

export class EventCategory {
    private _name: string; 
    private _events: EventData;
    private _visible: boolean; 

    constructor(name: string, events: EventData, visible: boolean) {
        this._name = name; 
        this._events = events; 
        this._visible = visible; 
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

    get visible(): boolean {
        return this._visible;
    }

    set visible(visible: boolean) {
        this._visible = visible; 
    }
}