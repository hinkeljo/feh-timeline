import { openDialog } from 'vue3-promise-dialog';
import DialogFilter from '@/components/DialogFilter.vue';
import DialogInfo from '@/components/DialogInfo.vue';

import type { EventCategory } from './EventCategory';

export async function filter(eventdata: EventCategory[]) {
    return await openDialog(DialogFilter, {eventdata});
}

export async function showInfo(): Promise<void> {
    return await openDialog(DialogInfo, {});
}