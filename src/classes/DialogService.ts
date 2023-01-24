import { openDialog } from 'vue3-promise-dialog';
import DialogFilter from '@/components/DialogFilter.vue';
import type { EventCategory } from './EventCategory';

export async function filter(eventdata: EventCategory[]) {
    return await openDialog(DialogFilter, {eventdata});
}