import type { FehEvent } from './FehEvent';

export interface FehEventCategory {
	id: string;
	name: string;
	description: string;
	events: FehEvent[];
	rows: FehEvent[][];
}
