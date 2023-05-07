import { writable } from "svelte/store";

export const localeOptions = [
    {
        name: "EN",
        value: "en-US",
    },
    {
        name: "DE",
        value: "de-DE",
    },
    {
        name: "JP",
        value: "ja-JP",
    },
]; 
export const locale = writable('de-DE');