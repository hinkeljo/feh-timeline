import { fetchEvents } from '../remote/api';
import { categorize_events, get_first_month, get_months, sort_events } from '../utils/EventUtils';

export const prerender = true;

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	let events = await fetchEvents();

	let event_data = categorize_events(events);
	let anchor_date = get_first_month(events);
	let months = get_months(events);

	return {
		anchor_date: anchor_date,
		months: months,
		event_data: event_data
	};
}
