import { Signal } from "./Signal";

export class RefreshService {
    private constructor() {}

    private static _instance: RefreshService | undefined = undefined; 
        
    public static get Instance(): RefreshService {
        if(this._instance == undefined) {
            this._instance = new RefreshService();
        }
        return this._instance; 
    }

    public refresh() {
        const currentKey = this._refreshKey.key;
        const newKey = currentKey + 1;
        this._refreshKey = {key: newKey};
        this._onRefresh.trigger(this, newKey);
    }

    private _refreshKey: {
        key: number
    } = {
        key: 0
    }

    get refreshKey() {
        return this._refreshKey;
    }

    private readonly _onRefresh = new Signal<RefreshService, number>();

    public get OnRefresh(): Signal<RefreshService, number> {
        return this._onRefresh;
    }
}