import { Event } from "@/classes/Event";
import { EventData } from "@/classes/EventData";
import { describe, expect, test } from "vitest";

describe('EventData', () => {

    const eventData: EventData = new EventData([
        new Event('Testing 1', 1670655600, 1671951600),
        new Event('Testing 2', 1671865200, 1672902000),
        new Event('Testing 2', 1671865200, 1672988400)
    ]);

    test('calculates the correct month list', () => {
        let months = eventData.months;
        expect(months.length).toBe(2);
    });
});