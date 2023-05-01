import type { FehEvent } from '../interfaces/FehEvent';
import { http, type HttpResponse } from './http';

export const api_url = 'https://lazy-match.pockethost.io/api';

export async function fetchEvents(): Promise<FehEvent[]> {

	// for debugging
	return [
        {
            "collectionId": "dyzxcy173cbbbqm",
            "collectionName": "events",
            "created": "2023-05-01 12:20:51.129Z",
            "date_end": "2023-05-15 07:00:00.000Z",
            "date_start": "2023-04-30 07:00:00.000Z",
            "event_type": "dsqo21c2uvyw061",
            "expand": {
                "event_type": {
                    "collectionId": "smrtirr7w9k41hy",
                    "collectionName": "event_type",
                    "created": "2023-05-01 12:20:25.643Z",
                    "description": "",
                    "id": "dsqo21c2uvyw061",
                    "name": "Quest",
                    "updated": "2023-05-01 12:20:25.643Z"
                }
            },
            "id": "qmtu3j95c2n12qe",
            "name": "Sword Arts Quests",
            "updated": "2023-05-01 12:20:51.129Z"
        },
        {
            "collectionId": "dyzxcy173cbbbqm",
            "collectionName": "events",
            "created": "2023-04-28 04:58:05.249Z",
            "date_end": "2023-05-11 07:00:00.000Z",
            "date_start": "2023-04-28 07:00:00.000Z",
            "event_type": "1tbad1sn715rodq",
            "expand": {
                "event_type": {
                    "collectionId": "smrtirr7w9k41hy",
                    "collectionName": "event_type",
                    "created": "2023-04-28 04:58:16.212Z",
                    "description": "",
                    "id": "1tbad1sn715rodq",
                    "name": "Summoning Event",
                    "updated": "2023-04-28 04:58:16.212Z"
                }
            },
            "id": "dgqs0l1tfs3v9hx",
            "name": "Mythic Hero Summoning Event",
            "updated": "2023-04-28 05:00:40.367Z"
        },
        {
            "collectionId": "dyzxcy173cbbbqm",
            "collectionName": "events",
            "created": "2023-05-01 06:37:38.974Z",
            "date_end": "2023-05-11 07:00:00.000Z",
            "date_start": "2023-04-28 07:00:00.000Z",
            "event_type": "q16j3xwsz8ius4f",
            "expand": {
                "event_type": {
                    "collectionId": "smrtirr7w9k41hy",
                    "collectionName": "event_type",
                    "created": "2023-05-01 06:35:56.764Z",
                    "description": "",
                    "id": "q16j3xwsz8ius4f",
                    "name": "Event",
                    "updated": "2023-05-01 06:35:56.764Z"
                }
            },
            "id": "qcw7d0cwbp7ekup",
            "name": "Mythic Hero Battle",
            "updated": "2023-05-01 06:37:38.974Z"
        },
        {
            "collectionId": "dyzxcy173cbbbqm",
            "collectionName": "events",
            "created": "2023-05-01 07:27:08.171Z",
            "date_end": "2023-05-10 07:00:00.000Z",
            "date_start": "2023-05-01 07:00:00.000Z",
            "event_type": "1tbad1sn715rodq",
            "expand": {
                "event_type": {
                    "collectionId": "smrtirr7w9k41hy",
                    "collectionName": "event_type",
                    "created": "2023-04-28 04:58:16.212Z",
                    "description": "",
                    "id": "1tbad1sn715rodq",
                    "name": "Summoning Event",
                    "updated": "2023-04-28 04:58:16.212Z"
                }
            },
            "id": "eknw4nsezn36eeu",
            "name": "Summoning Focus: Harsh Command+",
            "updated": "2023-05-01 07:29:33.748Z"
        },
        {
            "collectionId": "dyzxcy173cbbbqm",
            "collectionName": "events",
            "created": "2023-05-01 06:36:50.579Z",
            "date_end": "2023-05-08 07:00:00.000Z",
            "date_start": "2023-05-03 07:00:00.000Z",
            "event_type": "q16j3xwsz8ius4f",
            "expand": {
                "event_type": {
                    "collectionId": "smrtirr7w9k41hy",
                    "collectionName": "event_type",
                    "created": "2023-05-01 06:35:56.764Z",
                    "description": "",
                    "id": "q16j3xwsz8ius4f",
                    "name": "Event",
                    "updated": "2023-05-01 06:35:56.764Z"
                }
            },
            "id": "1ox344cfztvz2lj",
            "name": "Voting Gauntlet",
            "updated": "2023-05-01 06:36:50.579Z"
        },
        {
            "collectionId": "dyzxcy173cbbbqm",
            "collectionName": "events",
            "created": "2023-05-01 06:38:02.031Z",
            "date_end": "2023-05-07 07:00:00.000Z",
            "date_start": "2023-05-04 07:00:00.000Z",
            "event_type": "q16j3xwsz8ius4f",
            "expand": {
                "event_type": {
                    "collectionId": "smrtirr7w9k41hy",
                    "collectionName": "event_type",
                    "created": "2023-05-01 06:35:56.764Z",
                    "description": "",
                    "id": "q16j3xwsz8ius4f",
                    "name": "Event",
                    "updated": "2023-05-01 06:35:56.764Z"
                }
            },
            "id": "y5pcnrf17ywzkhq",
            "name": "Summoner Duels R",
            "updated": "2023-05-01 07:28:56.867Z"
        },
        {
            "collectionId": "dyzxcy173cbbbqm",
            "collectionName": "events",
            "created": "2023-05-01 06:39:11.060Z",
            "date_end": "2023-05-07 07:00:00.000Z",
            "date_start": "2023-04-24 07:00:00.000Z",
            "event_type": "q16j3xwsz8ius4f",
            "expand": {
                "event_type": {
                    "collectionId": "smrtirr7w9k41hy",
                    "collectionName": "event_type",
                    "created": "2023-05-01 06:35:56.764Z",
                    "description": "",
                    "id": "q16j3xwsz8ius4f",
                    "name": "Event",
                    "updated": "2023-05-01 06:35:56.764Z"
                }
            },
            "id": "k53639ynx558332",
            "name": "Hall of Forms",
            "updated": "2023-05-01 07:29:13.606Z"
        }
    ];


	/* let endpoint = 'collections/events/records';
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
	} */
}
