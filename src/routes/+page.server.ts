import { fetchEvents } from '../remote/api';
import { categorize_events, get_first_month, get_months } from '../utils/EventUtils';

export const prerender = true;

export async function load() {
	const events = await fetchEvents();

	const event_data = categorize_events(events);
	const anchor_date = get_first_month(events);
	const months = get_months(events);

	return {
		anchor_date: anchor_date,
		months: months,
		event_data: event_data
	};
}
