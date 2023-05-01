import type { FehEvent } from '../interfaces/FehEvent';
import type { FehEventCategory } from '../interfaces/FehEventCategory';
import type { Month } from '../interfaces/Month';

export function get_duration(event: FehEvent) {
	const one_day = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
	const date_start = new Date(event.date_start).valueOf();
	const date_end = new Date(event.date_end).valueOf();
	const diff_time = Math.abs(date_start - date_end);
	const diff_days = diff_time / one_day;

	return diff_days;
}

export function get_offset(event: FehEvent, anchor: string) {
	const start_date = new Date(event.date_start);

	// calculate the number of days between the anchor date and the event start date
	const one_day = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
	const anchor_date = new Date(anchor);
	const diff_time = Math.abs(anchor_date.valueOf() - start_date.valueOf());
	const diff_days = diff_time / one_day;

	return diff_days;
}

export function categorize_events(events: FehEvent[]): FehEventCategory[] {
	// sort events by category
	let categories: FehEventCategory[] = [];
	for (const event of events) {
		let category = categories.find((category) => category.id == event.expand.event_type.id);
		if (category) {
			category.events.push(event);
		} else {
			categories.push({
				id: event.expand.event_type.id,
				name: event.expand.event_type.name,
				description: event.expand.event_type.description,
				events: [event],
				rows: []
			});
		}
	}

	// sort events in each category into rows
	for (const category of categories) {
		category.rows = sort_events(category.events);
	}

	return categories;
}

export function sort_events(events: FehEvent[]): [FehEvent[]] {
	events.sort((a, b) => new Date(a.date_start).valueOf() - new Date(b.date_start).valueOf());
	const rows: [FehEvent[]] = [[]];

	events.forEach((event, index) => {
		// if this is the first entry, add the first row
		if (index == 0 && rows.length == 1) {
			rows[0].push(event);
		} else {
			// check if event can fit in an existing row
			let foundRow = false;
			for (const row of rows) {
				let fitsInRow = fits_in_row(event, row);
				if (fitsInRow) {
					row.push(event);
					foundRow = true;
					break;
				}
			}
			// if it can't fit in any row, create new row for it
			if (!foundRow) {
				rows.push([event]);
			}
		}
	});

	return rows;
}

function fits_in_row(event: FehEvent, row: FehEvent[]): boolean {
	for (const existing_event of row) {
		if (events_overlap(event, existing_event)) return false;
	}
	return true;
}

function events_overlap(event_1: FehEvent, event_2: FehEvent): boolean {
	return (
		(event_1.date_start >= event_2.date_start && event_1.date_start < event_2.date_end) ||
		(event_1.date_end > event_2.date_start && event_1.date_end < event_2.date_end) ||
		(event_2.date_start >= event_1.date_start && event_2.date_start < event_1.date_end) ||
		(event_2.date_end > event_1.date_start && event_2.date_end < event_1.date_end)
	);
}

export function get_first_month(events: FehEvent[]) {
	const sortedEvents = events.sort(
		(a, b) => new Date(a.date_start).valueOf() - new Date(b.date_start).valueOf()
	);
	const earliestEvent = sortedEvents[0];
	const earliestDate = new Date(earliestEvent.date_start);
	const year = earliestDate.getFullYear();
	const month = earliestDate.getMonth() + 1;
	const formattedMonth = month.toString().padStart(2, '0');
	return `${year}-${formattedMonth}-01 00:00`;
}

export function get_months(events: FehEvent[]): Month[] {
	let months: Month[] = [];
	let earliest_event = events.sort(
		(a, b) => new Date(a.date_start).valueOf() - new Date(b.date_start).valueOf()
	)[0];
	let latest_event = events.sort(
		(a, b) => new Date(b.date_end).valueOf() - new Date(a.date_end).valueOf()
	)[0];
	let earliset_month = get_month(earliest_event, true);
	let latest_month = get_month(latest_event, false);

	// get all months between earliest and latest month
	let current_month = earliset_month;
	while (!are_equal_months(current_month, latest_month)) {
		months.push(current_month);
		current_month = get_next_month(current_month);
	}
	months.push(current_month);

	return months;
}

function get_month(event: FehEvent, start: boolean): Month {
	const ref = start ? event.date_start : event.date_end;
	const ref_date = new Date(ref);

	const year = ref_date.getFullYear();
	const month = ref_date.getMonth();
	const days = new Date(year, month + 1, 0).getDate();

	return {
		name: ref_date.toLocaleString('default', { month: 'long' }),
		year: year,
		index: month,
		days: days
	};
}

function are_equal_months(month_1: Month, month_2: Month): boolean {
	return month_1.year == month_2.year && month_1.index == month_2.index;
}

function get_next_month(month: Month) {
	const year = month.index == 11 ? month.year + 1 : month.year;
	const index = month.index == 11 ? 0 : month.index + 1;
	const days = new Date(year, index + 1, 0).getDate();
	return {
		name: new Date(year, index, 1).toLocaleString('default', { month: 'long' }),
		year: year,
		index: index,
		days: days
	};
}
