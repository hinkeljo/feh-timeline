import type { FehEvent } from '../interfaces/FehEvent';
import { http, type HttpResponse } from './http';

export const api_url = 'https://lazy-match.pockethost.io/api';

export async function fetchEvents(): Promise<FehEvent[]> {
	const endpoint = 'collections/events/records';
	const sort = '-date_end';
	const expand = ['event_type'];
	const limit = 100;

	const url = `${api_url}/${endpoint}?expand=${expand.join(',')}&sort=${sort}&perPage=${limit}`;

	let response: HttpResponse<{ items: FehEvent[] }>;

	try {
		response = await http<{ items: FehEvent[] }>(url);
		if (response.parsedBody == undefined) throw new Error();
		return response.parsedBody.items;
	} catch (err) {
		throw new Error();
	}
}
