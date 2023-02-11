import json from "@/assets/events.json";
import { describe, expect, test } from "vitest";

describe('EventData', () => {

    json.forEach(element => {
        test('checking ' + element._event._name, () => {
            expect(element._event._start < element._event._end).toBe(true);
        });
    });
});