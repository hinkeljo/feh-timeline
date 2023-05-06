import type { FehEventType } from './FehEventType';

export interface FehEvent {
	id: string;
	name: string;
	date_start: string;
	date_end: string;
	event_type: string;
	expand: {
		event_type: FehEventType;
	};
	collectionId: string;
	collectionName: string;
	created: string;
	updated: string;
	end_unkown: boolean;
}
