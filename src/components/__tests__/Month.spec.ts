import { Month } from "@/classes/Month";
import { describe, expect, test } from "vitest";

describe('Month', () => {
    test('extracts correct data from timestamp', () => {
        const month = new Month(1671479171);
        expect(month.year).toBe(2022);
        expect(month.index).toBe(11);
    });

    test('detects months as equal', () => {
        const month_1 = new Month(1671479171);
        const month_2 = new Month(1668887171);
        expect(month_1.isEqual(month_2)).toBe(false);
        expect(month_1.isEqual(month_1)).toBe(true);
    });
});