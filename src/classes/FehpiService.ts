import PocketBase from 'pocketbase';
import type { EventCategory } from './EventCategory';

export class FehpiService {
    
    private constructor() {

    }

    private static _instance: FehpiService | undefined = undefined; 
    
    private _pb: PocketBase = new PocketBase('http://127.0.0.1:8090');
    
    public static get Instance(): FehpiService {
        if(this._instance == undefined) {
            return new FehpiService(); 
        } else return this._instance; 
    }

    public async getFullEventList(): Promise<EventCategory[]> {
        console.log('[FehPI] Fetching event list...');
        const resultList = await this._pb.collection('feh_events')
            .getFullList(200, {
                sort: '-created',
                
            }); 
        console.log('[FehPI] Got event lsit:');
        console.log(resultList);
        return [];
    }

}