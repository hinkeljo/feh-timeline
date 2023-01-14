<script setup lang="ts">
    import type { Event } from '@/classes/Event';
    import { ref } from 'vue';

    const props = defineProps<{
        event: Event,
    }>();

    const today: Date = new Date();

    const nameInput = ref(); 
    const startInput = ref(); 
    const endInput = ref(); 

    function setName(): void {
        let name = nameInput.value.value;
        props.event.name = name; 
    }

    function setStart(): void {
        let start = startInput.value.value; 
        let timestamp =  dateToTimestamp(start);
        console.log(timestamp);
        props.event.start = timestamp; 
    }

    function setEnd(): void {
        let end = endInput.value.value;
        let timestamp =  dateToTimestamp(end);
        console.log(timestamp);
        props.event.end = timestamp; 
    }

    function dateToTimestamp(date: string): number {
        // split the date string into its component parts
        const dateParts = date.split("-");

        // parse the date parts
        const year = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10);
        const day = parseInt(dateParts[2], 10);

        // create a date object
        const timestamp = new Date(year, month - 1, day);

        // return the UNIX timestamp for the date
        let pst = timestamp.getTime() / 1000;

        // apply 8 hours offset from PST to UTC
        // and 1 day offset from twitter calendar
        let utc = pst + (1 * 60 * 60 * 8) + (1 * 60 * 60 * 24);
        return utc; 
    }
</script>

<template>
    <div class="custom-event-card">
        <div class="input-field">
            <div class="text-subheading">Event</div>
            <input type="text" ref="nameInput" value="New Event" @input="setName">
        </div>
        <div class="inputs">
            <div class="input-field">
                <div class="text-subheading">Start</div>
                <input type="date" ref="startInput" @input="setStart">
            </div>
            <div class="input-field">
                <div class="text-subheading">End</div>
                <input type="date" ref="endInput" @input="setEnd">
            </div>
        </div>
    </div>
</template>

<style scoped>
    .custom-event-card {
        border-radius: 4px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 6px;
        background: lightgray;
    }

    .inputs {
        display: flex;
        flex-direction: row;
        gap: 6px;
    }

    .input-field  {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    ::-webkit-datetime-edit-text { 
        font-size: 12px;
        font-weight: bold;
        color: black;
    }
    ::-webkit-datetime-edit-month-field { 
        font-size: 12px;
        font-weight: bold;
        color: black;
    }
    ::-webkit-datetime-edit-day-field { 
        font-size: 12px;
        font-weight: bold;
        color: black;
    }
    ::-webkit-datetime-edit-year-field { 
        font-size: 12px;
        font-weight: bold;
        color: black;
    }

    @media (max-width: 776px) {
        .custom-event-card {
            flex-direction: column;
        }
    }
</style>