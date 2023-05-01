import type { FehEvent } from '../interfaces/FehEvent';
import { http, type HttpResponse } from './http';

export const api_url = 'https://lazy-match.pockethost.io/api';

export async function fetchEvents(): Promise<FehEvent[]> {
	let endpoint = 'collections/events/records';
	let sort = '-date_end';
	let expand = ['event_type'];
	let limit = 100;

	let url = `${api_url}/${endpoint}?expand=${expand.join(',')}&sort=${sort}&perPage=${limit}`;

	let response: HttpResponse<{ items: FehEvent[] }>;

	try {
		response = await http<{ items: FehEvent[] }>(url);
		if (response.parsedBody == undefined) throw new Error();
		return response.parsedBody.items;
	} catch (err) {
		throw new Error();
	}
}
