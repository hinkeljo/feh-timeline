import type { FehEvent } from './FehEvent';

export interface FehEventCategory {
	id: string;
	name: string;
	description: string;
	colour: string;
	priority: number;
	events: FehEvent[];
	rows: FehEvent[][];
	shown: boolean;
}
